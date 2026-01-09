<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Store;
use App\Models\User;
use App\Models\UserCategory;
use App\Services\PaystackService;
use Illuminate\Support\Str;
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
        $user = Auth::user();

        if (! $user || ! $user->phone_verified_at) {
            return redirect()->route('user.register');
        }

        // Log incoming request for debugging
        Log::info('Payment request received', [
            'user_id' => $user->id,
            'request_data' => $request->all(),
            'category' => $request->input('category'),
            'tier' => $request->input('tier'),
        ]);

        // Validate request data - category is required, tier is optional (only for marketplace)
        try {
            $validated = $request->validate([
                'category' => ['required', 'string', 'in:' . implode(',', config('categories.valid'))],
                'tier' => ['nullable', 'string', 'in:starter,professional,enterprise'], // Only for marketplace
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Payment validation failed', [
                'errors' => $e->errors(),
                'request_data' => $request->all(),
            ]);
            return back()->withErrors($e->errors());
        }

        $selectedCategory = $validated['category'];

        // Initialize tier - only used for marketplace
        $tier = null;
        if ($selectedCategory === 'marketplace') {
            // Get tier from POST request, default to starter if not provided
            $tier = $validated['tier'] ?? 'starter';
        }
        // For non-marketplace categories, $tier stays null (ignore any tier in request)

        // Check if user already has this category (for dashboard flow)
        $hasCategory = UserCategory::where('user_id', $user->id)
            ->where('category', $selectedCategory)
            ->exists();

        if ($hasCategory) {
            return back()->withErrors(['payment' => 'You already have access to this category.']);
        }

        // Determine if this is a new registration or existing user adding category
        // Check if user has any paid categories
        $hasPaidCategories = UserCategory::where('user_id', $user->id)
            ->whereHas('payment', function ($query) {
                $query->where('status', 'completed');
            })
            ->exists();

        $isRegistrationPayment = ! $hasPaidCategories;

        try {
            // Generate Paystack transaction reference
            $reference = $this->paystackService->genTranxRef();

            // SECURITY: Always calculate price from backend config, never trust frontend price
            // $tier is already set above based on the flow (registration or dashboard)

            if ($selectedCategory === 'marketplace') {
                // For marketplace, use tier (already set above, defaults to 'starter' if not provided)
                $amount = $this->getCategoryPrice($selectedCategory, $tier);
            } else {
                // For all other categories, ignore tier completely
                $amount = $this->getCategoryPrice($selectedCategory);
            }

            // Log for debugging (remove in production if needed)
            Log::info('Payment amount calculated', [
                'category' => $selectedCategory,
                'tier' => $tier,
                'amount' => $amount,
                'user_id' => $user->id,
                'request_tier' => $request->input('tier'),
                'request_category' => $request->input('category'),
            ]);

            // Create payment record with pending status
            $payment = Payment::create([
                'user_id' => $user->id,
                'amount' => $amount,
                'currency' => 'GHS',
                'payment_method' => 'paystack',
                'payment_reference' => $reference,
                'category' => $selectedCategory,
                'status' => 'pending',
                'metadata' => $tier ? json_encode(['tier' => $tier]) : null,
            ]);

            // Calculate amount in pesewas (multiply by 100)
            $amountInPesewas = (int) ceil($amount * 100);

            // Build Paystack authorization data
            $paystackMetadata = [
                'user_id' => $user->id,
                'category' => $selectedCategory,
                'is_new_registration' => $isRegistrationPayment,
            ];

            // Include tier in Paystack metadata for marketplace (so it comes back in callback)
            if ($selectedCategory === 'marketplace' && $tier) {
                $paystackMetadata['tier'] = $tier;
            }

            $paystackData = [
                'amount' => $amountInPesewas,
                'currency' => 'GHS',
                'email' => $user->email ?? $user->phone . '@buame2r.com',
                'reference' => $reference,
                'callback_url' => route('payment.callback'),
                'metadata' => $paystackMetadata,
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

            // IMPORTANT: Read tier from payment metadata BEFORE updating it
            $selectedCategory = $payment->category;
            $originalMetadata = is_string($payment->metadata) ? json_decode($payment->metadata, true) : ($payment->metadata ?? []);

            $tier = null;
            if ($selectedCategory === 'marketplace') {
                $tier = $originalMetadata['tier'] ?? 'starter';
            }

            // Merge Paystack metadata with our original metadata (preserve tier)
            $paystackMetadata = $paymentData['metadata'] ?? [];
            $mergedMetadata = array_merge($originalMetadata, $paystackMetadata);
            if ($tier) {
                $mergedMetadata['tier'] = $tier; // Ensure tier is preserved
            }

            // Update payment record (preserve tier in metadata)
            $payment->update([
                'status' => 'completed',
                'transaction_id' => $paymentData['id'],
                'paid_at' => now(),
                'metadata' => json_encode($mergedMetadata),
            ]);

            $user = User::find($payment->user_id);

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

            // Handle marketplace store creation/upgrade
            if ($selectedCategory === 'marketplace') {
                // Use the tier we extracted earlier
                $tier = $tier ?? 'starter';

                // Get existing store or create new one
                $existingStore = $user->store;
                if (!$existingStore) {
                    // Create new store
                    $baseSlug = Str::slug($user->name);
                    $slug = $baseSlug;
                    $counter = 1;
                    while (Store::where('slug', $slug)->exists()) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    }

                    Store::create([
                        'user_id' => $user->id,
                        'name' => $user->name . "'s Store",
                        'slug' => $slug,
                        'tier' => $tier,
                        'is_active' => false,
                    ]);
                } else {
                    // Update existing store tier
                    $existingStore->update(['tier' => $tier]);
                }
            }

            // Check if this is a new registration or existing user
            $isNewRegistration = $paymentData['metadata']['is_new_registration'] ?? false;

            if ($isNewRegistration) {
                // New user registration - activate account
                $user->update(['is_active' => true]);

                DB::commit();

                // Fire registered event
                event(new Registered($user));

                // Clear registration session data
                $request->session()->forget(['registration_user_id', 'selected_category', 'selected_tier']);

                // Redirect to dashboard
                return redirect()->route('user.dashboard.index')
                    ->with('success', 'Registration successful! Welcome to BUAME 2R.');
            } else {
                // Existing user adding category
                DB::commit();

                // Redirect to dashboard
                return redirect()->route('user.dashboard.index')
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
     * SECURITY: This method ALWAYS reads from backend config to prevent price manipulation.
     * Never trust prices from frontend requests.
     *
     * @param  string  $category
     * @param  string|null  $tier
     * @return float
     */
    protected function getCategoryPrice(string $category, ?string $tier = null): float
    {
        // Only use tier for marketplace category - ignore tier for all other categories
        if ($category === 'marketplace' && $tier) {
            // Validate tier exists in config before using
            $tierPrice = config("categories.list.marketplace.tiers.{$tier}.price");
            if ($tierPrice !== null) {
                return (float) $tierPrice;
            }
            // If tier price not found, fall through to base marketplace price
        }

        // For all categories (including marketplace without valid tier), use base category price
        $basePrice = config("categories.list.{$category}.price");
        if ($basePrice !== null) {
            return (float) $basePrice;
        }

        // Final fallback to default price
        return (float) config('categories.default_price');
    }
}
