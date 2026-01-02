<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use App\Models\UserActiveCategory;
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
     * Initialize Paystack payment and redirect to Paystack checkout.
     */
    public function processPayment(Request $request): RedirectResponse|Response
    {
        $userId = $request->session()->get('registration_user_id');
        $selectedCategory = $request->session()->get('selected_category');

        if (! $userId || ! $selectedCategory) {
            return redirect()->route('user.register');
        }

        $user = User::find($userId);

        if (! $user || ! $user->phone_verified_at) {
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
                    'registration_user_id' => $userId,
                ],
            ];

            // Initialize Paystack payment
            $authorizationUrl = $this->paystackService->getAuthorizationUrl($paystackData);

            // Redirect to Paystack checkout (external URL)
            return Inertia::location($authorizationUrl->url);
        } catch (\Exception $e) {
            Log::error('Paystack payment initialization failed', [
                'user_id' => $userId,
                'category' => $selectedCategory,
                'error' => $e->getMessage(),
            ]);

            return back()->withErrors(['payment' => 'Failed to initialize payment. Please try again.']);
        }
    }

    /**
     * Handle Paystack payment callback.
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

            // Payment successful - complete registration
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

            // Set active category
            UserActiveCategory::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'active_category' => $selectedCategory,
                    'switched_at' => now(),
                ]
            );

            // Activate user account
            $user->update(['is_active' => true]);

            DB::commit();

            // Fire registered event
            event(new Registered($user));

            // Login user
            Auth::login($user);
            $request->session()->regenerate();
            $request->session()->forget(['registration_user_id', 'selected_category']);

            // Redirect to dashboard
            return redirect()->route('user.dashboard.index')
                ->with('success', 'Registration successful! Welcome to BUAME 2R.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Paystack callback processing failed', [
                'reference' => $reference,
                'error' => $e->getMessage(),
            ]);

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

                        // Set active category
                        UserActiveCategory::updateOrCreate(
                            ['user_id' => $user->id],
                            [
                                'active_category' => $selectedCategory,
                                'switched_at' => now(),
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
     * Get category price.
     */
    protected function getCategoryPrice(string $category): float
    {
        $prices = [
            'artisans' => 50.00,
            'hotels' => 100.00,
            'transport' => 30.00,
            'rentals' => 75.00,
            'marketplace' => 40.00,
            'jobs' => 60.00,
        ];

        return $prices[$category] ?? 50.00;
    }
}
