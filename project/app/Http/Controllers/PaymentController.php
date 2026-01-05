<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use App\Models\UserCategory;
use App\Services\PaystackService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct(
        protected PaystackService $paystackService
    ) {}

    /**
     * Initialize Paystack payment for category purchase.
     * Works for both registration and existing users adding categories.
     */
    public function processPayment(Request $request): RedirectResponse|Response
    {
        $authenticatedUser = Auth::user();
        $sessionCategory = $request->session()->get('selected_category');

        // Check if this is a registration payment (category in session)
        // This takes priority even if user is authenticated (after OTP verification)
        if ($sessionCategory) {
            // Registration payment flow
            $user = $authenticatedUser;
            $selectedCategory = $sessionCategory;

            // If not authenticated, fall back to session user_id
            if (! $user) {
                $userId = $request->session()->get('registration_user_id');
                if (! $userId) {
                    return redirect()->route('user.register');
                }
                $user = User::find($userId);
            }

            if (! $user || ! $user->phone_verified_at) {
                return redirect()->route('user.register');
            }

            // Mark as registration payment (not authenticated dashboard user)
            $isRegistrationPayment = true;
        } elseif ($authenticatedUser) {
            // Dashboard category purchase (no session category, must be from dashboard)
            $validated = $request->validate([
                'category' => ['required', 'string', 'in:'.implode(',', config('categories.valid'))],
            ]);

            $user = $authenticatedUser;
            $selectedCategory = $validated['category'];

            // Check if user already has this category
            $hasCategory = UserCategory::where('user_id', $user->id)
                ->where('category', $selectedCategory)
                ->exists();

            if ($hasCategory) {
                return back()->withErrors(['payment' => 'You already have access to this category.']);
            }

            $isRegistrationPayment = false;
        } else {
            // No session category and not authenticated - redirect to register
            return redirect()->route('user.register');
        }

        try {
            // Generate Paystack transaction reference
            $reference = $this->paystackService->genTranxRef();

            // Get category price
            $amount = $this->getCategoryPrice($selectedCategory);

            // Create payment record with pending status
            $payment = Payment::create([
                'user_id' => $user->id,
                'amount' => $amount,
                'currency' => 'GHS',
                'payment_method' => 'paystack',
                'payment_reference' => $reference,
                'category' => $selectedCategory,
                'status' => 'pending',
            ]);

            // Calculate amount in pesewas (multiply by 100)
            $amountInPesewas = (int) ceil($amount * 100);

            // Build Paystack authorization data
            $paystackData = [
                'amount' => $amountInPesewas,
                'currency' => 'GHS',
                'email' => $user->email ?? $user->phone.'@buame2r.com',
                'reference' => $reference,
                'callback_url' => route('payment.callback'),
                'metadata' => [
                    'user_id' => $user->id,
                    'category' => $selectedCategory,
                    'is_authenticated' => ! $isRegistrationPayment,
                ],
            ];

            // Initialize Paystack payment
            $authorizationUrl = $this->paystackService->getAuthorizationUrl($paystackData);

            // Redirect to Paystack checkout (external URL)
            return Inertia::location($authorizationUrl->url);
        } catch (\Exception $e) {
            Log::error('Paystack payment initialization failed', [
                'user_id' => $user->id,
                'category' => $selectedCategory,
                'error' => $e->getMessage(),
            ]);

            return back()->withErrors(['payment' => 'Failed to initialize payment. Please try again.']);
        }
    }

    /**
     * Handle Paystack payment callback.
     * Handles both registration and dashboard category purchases.
     */
    public function handleCallback(Request $request): RedirectResponse
    {
        $reference = $request->query('reference');

        if (! $reference) {
            return redirect()->route('user.register.payment')
                ->withErrors(['payment' => 'Invalid payment reference.']);
        }

        try {
            // Verify payment with Paystack
            $paymentData = $this->paystackService->getPaymentData($reference);

            // Find payment record
            $payment = Payment::where('payment_reference', $reference)->first();

            if (! $payment) {
                Log::error('Payment record not found', ['reference' => $reference]);

                return redirect()->route('user.register.payment')
                    ->withErrors(['payment' => 'Payment record not found.']);
            }

            // Check if payment was successful
            if ($paymentData['status'] !== 'success') {
                $payment->update(['status' => 'failed']);

                return redirect()->route('user.register.payment')
                    ->withErrors(['payment' => 'Payment was not successful. Please try again.']);
            }

            // Payment successful - process category purchase
            DB::beginTransaction();

            // Update payment record
            $payment->update([
                'status' => 'completed',
                'transaction_id' => $paymentData['id'],
                'paid_at' => now(),
                'metadata' => $paymentData['metadata'] ?? null,
            ]);

            $user = User::find($payment->user_id);
            $selectedCategory = $payment->category;

            if (! $user) {
                throw new \Exception('User not found');
            }

            // Create user category access
            UserCategory::create([
                'user_id' => $user->id,
                'category' => $selectedCategory,
                'payment_id' => $payment->id,
                'is_active' => true,
            ]);

            // Check if this is a new registration or existing user
            $isAuthenticated = $paymentData['metadata']['is_authenticated'] ?? false;

            if (! $isAuthenticated) {
                // New user registration - user should already be logged in after OTP verification
                // But if session was lost, log them in again as fallback
                $user->update(['is_active' => true]);

                DB::commit();

                // Fire registered event
                event(new Registered($user));

                // If user is not already authenticated, log them in (fallback for session loss)
                if (!Auth::check()) {
                    Auth::login($user);
                    $request->session()->regenerate();
                }

                // Clear registration session data
                $request->session()->forget(['registration_user_id', 'selected_category']);

                // Redirect to category dashboard
                return redirect()->route('user.dashboard.category', ['category' => $selectedCategory])
                    ->with('success', 'Registration successful! Welcome to BUAME 2R.');
            } else {
                // Existing user adding category
                DB::commit();

                // Redirect to newly purchased category
                return redirect()->route('user.dashboard.category', ['category' => $selectedCategory])
                    ->with('success', "Successfully added {$selectedCategory} category! You can now start managing your profile.");
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Paystack callback processing failed', [
                'reference' => $reference,
                'error' => $e->getMessage(),
            ]);

            // Determine where to redirect on error
            if (Auth::check()) {
                return redirect()->route('user.dashboard.index')
                    ->withErrors(['payment' => 'Payment verification failed. Please contact support.']);
            }

            return redirect()->route('user.register.payment')
                ->withErrors(['payment' => 'Payment verification failed. Please contact support.']);
        }
    }

    /**
     * Handle Paystack webhook events.
     */
    public function handleWebhook(Request $request)
    {
        // Validate webhook signature
        $signature = $request->header('x-paystack-signature');

        if (! $signature) {
            return response()->json(['error' => 'Missing signature'], 400);
        }

        $payload = $request->getContent();
        $isValid = $this->paystackService->verifyWebhookSignature($signature, $payload);

        if (! $isValid) {
            Log::warning('Invalid Paystack webhook signature');

            return response()->json(['error' => 'Invalid signature'], 400);
        }

        $event = $request->input('event');
        $data = $request->input('data');

        if ($event === 'charge.success') {
            try {
                $reference = $data['reference'] ?? null;

                if (! $reference) {
                    return response()->json(['error' => 'Missing reference'], 400);
                }

                $payment = Payment::where('payment_reference', $reference)->first();

                if (! $payment) {
                    Log::warning('Payment record not found in webhook', ['reference' => $reference]);

                    return response()->json(['error' => 'Payment not found'], 404);
                }

                // Only process if payment is still pending
                if ($payment->status === 'pending') {
                    DB::beginTransaction();

                    // Update payment record
                    $payment->update([
                        'status' => 'completed',
                        'transaction_id' => $data['id'] ?? null,
                        'paid_at' => now(),
                        'metadata' => $data['metadata'] ?? null,
                    ]);

                    $user = User::find($payment->user_id);
                    $selectedCategory = $payment->category;

                    if ($user) {
                        // Create user category access if not exists
                        UserCategory::firstOrCreate(
                            [
                                'user_id' => $user->id,
                                'category' => $selectedCategory,
                            ],
                            [
                                'payment_id' => $payment->id,
                                'is_active' => true,
                            ]
                        );

                        // Activate user account
                        $user->update(['is_active' => true]);
                    }

                    DB::commit();
                }

                return response()->json(['status' => 'success'], 200);
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Paystack webhook processing failed', [
                    'event' => $event,
                    'error' => $e->getMessage(),
                ]);

                return response()->json(['error' => 'Processing failed'], 500);
            }
        }

        return response()->json(['status' => 'ignored'], 200);
    }

    /**
     * Get category price from config.
     */
    protected function getCategoryPrice(string $category): float
    {
        return config("categories.list.{$category}.price", config('categories.default_price'));
    }
}
