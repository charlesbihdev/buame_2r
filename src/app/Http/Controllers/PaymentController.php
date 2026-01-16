<?php

namespace App\Http\Controllers;

use App\Enums\BillingCycle;
use App\Enums\SubscriptionStatus;
use App\Models\Payment;
use App\Models\Store;
use App\Models\User;
use App\Models\UserCategory;
use App\Services\PaystackService;
use App\Services\SubscriptionService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct(
        protected PaystackService $paystackService,
        protected SubscriptionService $subscriptionService
    ) {}

    /**
     * Initialize Paystack payment for category subscription.
     * Works for both registration and existing users adding categories.
     */
    public function processPayment(Request $request): RedirectResponse|Response
    {
        $user = Auth::user();

        if (! $user || ! $user->phone_verified_at) {
            return redirect()->route('user.register');
        }

        Log::info('Payment request received', [
            'user_id' => $user->id,
            'request_data' => $request->all(),
        ]);

        try {
            $validated = $request->validate([
                'category' => ['required', 'string', 'in:'.implode(',', config('categories.valid'))],
                'tier' => ['nullable', 'string', 'in:starter,professional,enterprise'],
                'billing_cycle' => ['required', 'string', 'in:monthly,biannually,annual'],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Payment validation failed', [
                'errors' => $e->errors(),
                'request_data' => $request->all(),
            ]);

            return back()->withErrors($e->errors());
        }

        $selectedCategory = $validated['category'];
        $billingCycle = BillingCycle::from($validated['billing_cycle']);

        // Initialize tier - only used for marketplace
        $tier = null;
        if ($selectedCategory === 'marketplace') {
            $tier = $validated['tier'] ?? 'starter';
        }

        // Check if user already has active subscription for this category
        $existingSubscription = UserCategory::where('user_id', $user->id)
            ->where('category', $selectedCategory)
            ->first();

        // Determine if this is a new subscription or renewal
        $isRenewal = false;
        $previousPaymentId = null;

        if ($existingSubscription) {
            // Check if subscription is still active (not expired beyond grace period)
            if ($existingSubscription->subscription_status === SubscriptionStatus::Active) {
                return back()->withErrors(['payment' => 'You already have an active subscription for this category.']);
            }

            // If in grace period or expired, allow renewal
            $isRenewal = true;
            $previousPaymentId = $existingSubscription->payment_id;
        }

        // Determine if this is a new registration
        $hasPaidCategories = UserCategory::where('user_id', $user->id)
            ->whereHas('payment', fn ($query) => $query->where('status', 'completed'))
            ->exists();

        $isRegistrationPayment = ! $hasPaidCategories;

        try {
            $reference = $this->paystackService->genTranxRef();

            // Calculate price using SubscriptionService
            $amount = $this->subscriptionService->getCategoryPrice($selectedCategory, $billingCycle, $tier);

            // Calculate expiry date
            $expiresAt = $this->subscriptionService->calculateExpiryDate($billingCycle);

            Log::info('Payment amount calculated', [
                'category' => $selectedCategory,
                'tier' => $tier,
                'billing_cycle' => $billingCycle->value,
                'amount' => $amount,
                'expires_at' => $expiresAt,
            ]);

            // Create payment record
            $payment = Payment::create([
                'user_id' => $user->id,
                'amount' => $amount,
                'currency' => 'GHS',
                'payment_method' => 'paystack',
                'payment_reference' => $reference,
                'category' => $selectedCategory,
                'billing_cycle' => $billingCycle,
                'payment_type' => $isRenewal ? 'renewal' : 'initial',
                'previous_payment_id' => $previousPaymentId,
                'status' => 'pending',
                'expires_at' => $expiresAt,
                'metadata' => $tier ? ['tier' => $tier] : null,
            ]);

            // Calculate amount in pesewas
            $amountInPesewas = (int) ceil($amount * 100);

            // Build Paystack metadata
            $paystackMetadata = [
                'user_id' => $user->id,
                'category' => $selectedCategory,
                'billing_cycle' => $billingCycle->value,
                'is_new_registration' => $isRegistrationPayment,
                'is_renewal' => $isRenewal,
            ];

            if ($selectedCategory === 'marketplace' && $tier) {
                $paystackMetadata['tier'] = $tier;
            }

            $paystackData = [
                'amount' => $amountInPesewas,
                'currency' => 'GHS',
                'email' => $user->email ?? $user->phone.'@buame2r.com',
                'reference' => $reference,
                'callback_url' => route('payment.callback'),
                'metadata' => $paystackMetadata,
            ];

            $authorizationUrl = $this->paystackService->getAuthorizationUrl($paystackData);

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
     */
    public function handleCallback(Request $request): RedirectResponse
    {
        $reference = $request->query('reference');

        if (! $reference) {
            return redirect()->route('user.register.payment')
                ->withErrors(['payment' => 'Invalid payment reference.']);
        }

        try {
            $paymentData = $this->paystackService->getPaymentData($reference);
            $payment = Payment::where('payment_reference', $reference)->first();

            if (! $payment) {
                Log::error('Payment record not found', ['reference' => $reference]);

                return redirect()->route('user.register.payment')
                    ->withErrors(['payment' => 'Payment record not found.']);
            }

            if ($paymentData['status'] !== 'success') {
                $payment->update(['status' => 'failed']);

                return redirect()->route('user.register.payment')
                    ->withErrors(['payment' => 'Payment was not successful. Please try again.']);
            }

            DB::beginTransaction();

            $selectedCategory = $payment->category;
            $originalMetadata = is_array($payment->metadata) ? $payment->metadata : (is_string($payment->metadata) ? json_decode($payment->metadata, true) : []);

            $tier = null;
            if ($selectedCategory === 'marketplace') {
                $tier = $originalMetadata['tier'] ?? 'starter';
            }

            $alreadyProcessed = $payment->status === 'completed';

            if (! $alreadyProcessed) {
                $paystackMetadata = $paymentData['metadata'] ?? [];
                $mergedMetadata = array_merge($originalMetadata ?? [], $paystackMetadata);
                if ($tier) {
                    $mergedMetadata['tier'] = $tier;
                }

                $payment->update([
                    'status' => 'completed',
                    'transaction_id' => $paymentData['id'],
                    'paid_at' => now(),
                    'metadata' => $mergedMetadata,
                ]);
            }

            $user = User::find($payment->user_id);

            if (! $user) {
                throw new \Exception('User not found');
            }

            // Check if this is a renewal
            $existingSubscription = UserCategory::where('user_id', $user->id)
                ->where('category', $selectedCategory)
                ->first();

            if ($existingSubscription) {
                // Process renewal
                $this->subscriptionService->processRenewal($existingSubscription, $payment);
                Log::info('Subscription renewed', [
                    'user_id' => $user->id,
                    'category' => $selectedCategory,
                    'billing_cycle' => $payment->billing_cycle->value,
                ]);
            } else {
                // Create new subscription
                $this->subscriptionService->createSubscription($payment);
                Log::info('New subscription created', [
                    'user_id' => $user->id,
                    'category' => $selectedCategory,
                    'billing_cycle' => $payment->billing_cycle->value,
                ]);
            }

            // Handle marketplace store
            if ($selectedCategory === 'marketplace') {
                $tier = $tier ?? 'starter';
                $existingStore = $user->store;

                if (! $existingStore) {
                    $baseSlug = Str::slug($user->name);
                    $slug = $baseSlug;
                    $counter = 1;
                    while (Store::where('slug', $slug)->exists()) {
                        $slug = $baseSlug.'-'.$counter;
                        $counter++;
                    }

                    Store::create([
                        'user_id' => $user->id,
                        'name' => $user->name."'s Store",
                        'slug' => $slug,
                        'tier' => $tier,
                        'is_active' => false,
                    ]);
                } else {
                    $existingStore->update(['tier' => $tier]);
                }
            }

            $isNewRegistrationRaw = $paymentData['metadata']['is_new_registration'] ?? false;
            $isNewRegistration = filter_var($isNewRegistrationRaw, FILTER_VALIDATE_BOOLEAN);

            if (! $user->is_active) {
                $user->update(['is_active' => true]);
            }

            DB::commit();

            $billingCycleLabel = $payment->billing_cycle->label();

            if ($isNewRegistration) {
                event(new Registered($user));
                $request->session()->forget(['registration_user_id', 'selected_category', 'selected_tier']);

                return redirect()->route('user.dashboard.index', ['category' => $selectedCategory])
                    ->with('success', "Registration successful! Your {$billingCycleLabel} subscription is now active.");
            } else {
                $isRenewal = $payment->payment_type === 'renewal';
                $message = $isRenewal
                    ? "Successfully renewed your {$selectedCategory} subscription ({$billingCycleLabel})!"
                    : "Successfully subscribed to {$selectedCategory} ({$billingCycleLabel})!";

                return redirect()->route('user.dashboard.index', ['category' => $selectedCategory])
                    ->with('success', $message);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Paystack callback processing failed', [
                'reference' => $reference,
                'error' => $e->getMessage(),
            ]);

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

                if ($payment->status === 'pending') {
                    DB::beginTransaction();

                    $payment->update([
                        'status' => 'completed',
                        'transaction_id' => $data['id'] ?? null,
                        'paid_at' => now(),
                        'metadata' => $data['metadata'] ?? null,
                    ]);

                    $user = User::find($payment->user_id);
                    $selectedCategory = $payment->category;

                    if ($user) {
                        // Check if existing subscription exists
                        $existingSubscription = UserCategory::where('user_id', $user->id)
                            ->where('category', $selectedCategory)
                            ->first();

                        if ($existingSubscription) {
                            $this->subscriptionService->processRenewal($existingSubscription, $payment);
                        } else {
                            $this->subscriptionService->createSubscription($payment);
                        }

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
}
