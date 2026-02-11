<?php

namespace App\Services;

use App\Enums\BillingCycle;
use App\Enums\SubscriptionStatus;
use App\Models\Payment;
use App\Models\UserCategory;
use Carbon\Carbon;

class SubscriptionService
{
    /**
     * Calculate expiry date based on billing cycle.
     */
    public function calculateExpiryDate(BillingCycle $cycle, ?Carbon $startFrom = null): Carbon
    {
        $start = $startFrom ?? now();

        return $start->copy()->addDays($cycle->durationDays());
    }

    /**
     * Get the price for a category based on billing cycle.
     */
    public function getCategoryPrice(string $category, BillingCycle $cycle, ?string $tier = null): float
    {
        // For marketplace with tiers
        if ($category === 'marketplace' && $tier) {
            $price = config("categories.list.marketplace.tiers.{$tier}.pricing.{$cycle->value}");
            if ($price !== null) {
                return (float) $price;
            }
        }

        // Standard category pricing
        $price = config("categories.list.{$category}.pricing.{$cycle->value}");

        if ($price !== null) {
            return (float) $price;
        }

        // Fallback to legacy price field
        $legacyPrice = config("categories.list.{$category}.price");

        return $legacyPrice !== null ? (float) $legacyPrice : (float) config('categories.default_price');
    }

    /**
     * Get pricing for all billing cycles for a category.
     */
    public function getCategoryPricing(string $category, ?string $tier = null): array
    {
        $pricing = [];

        foreach (BillingCycle::cases() as $cycle) {
            $pricing[$cycle->value] = $this->getCategoryPrice($category, $cycle, $tier);
        }

        return $pricing;
    }

    /**
     * Process a renewal payment and update the subscription.
     */
    public function processRenewal(UserCategory $userCategory, Payment $payment): void
    {
        $billingCycle = $payment->billing_cycle;
        $gracePeriodDays = config('categories.subscription.grace_period_days', 7);

        // Calculate new expiry from current expiry (not from now) to avoid gaps
        // But only if the current expiry is in the future
        $startFrom = $userCategory->expires_at && $userCategory->expires_at->isFuture()
            ? $userCategory->expires_at
            : now();

        $newExpiry = $this->calculateExpiryDate($billingCycle, $startFrom);

        $userCategory->update([
            'expires_at' => $newExpiry,
            'grace_period_ends_at' => $newExpiry->copy()->addDays($gracePeriodDays),
            'subscription_status' => SubscriptionStatus::Active,
            'billing_cycle' => $billingCycle,
            'is_active' => true,
            'payment_id' => $payment->id,
            'reminder_count' => 0,
            'last_reminder_sent_at' => null,
        ]);
    }

    /**
     * Create a new subscription after initial payment.
     */
    public function createSubscription(Payment $payment): UserCategory
    {
        $billingCycle = $payment->billing_cycle;
        $gracePeriodDays = config('categories.subscription.grace_period_days', 7);
        $expiryDate = $this->calculateExpiryDate($billingCycle);

        return UserCategory::updateOrCreate(
            [
                'user_id' => $payment->user_id,
                'category' => $payment->category,
            ],
            [
                'payment_id' => $payment->id,
                'billing_cycle' => $billingCycle,
                'subscription_status' => SubscriptionStatus::Active,
                'expires_at' => $expiryDate,
                'grace_period_ends_at' => $expiryDate->copy()->addDays($gracePeriodDays),
                'is_active' => true,
                'reminder_count' => 0,
                'last_reminder_sent_at' => null,
            ]
        );
    }

    /**
     * Check if free access mode is enabled.
     */
    public function isFreeAccessEnabled(): bool
    {
        return config('categories.free_access.enabled', false);
    }

    /**
     * Create a free trial subscription without payment.
     */
    public function createFreeTrialSubscription(int $userId, string $category, ?string $tier = null): UserCategory
    {
        $durationDays = config('categories.free_access.duration_days', 30);
        $gracePeriodDays = config('categories.subscription.grace_period_days', 7);
        $expiryDate = now()->addDays($durationDays);

        // Create Payment record for tracking
        $payment = Payment::create([
            'user_id' => $userId,
            'category' => $category,
            'billing_cycle' => BillingCycle::Monthly,
            'payment_type' => 'initial',
            'amount' => 0.00,
            'currency' => 'GHS',
            'payment_method' => 'free_trial',
            'status' => 'completed',
            'paid_at' => now(),
            'expires_at' => $expiryDate,
            'metadata' => [
                'type' => 'free_trial',
                'tier' => $tier,
                'reason' => 'Paystack verification pending',
            ],
        ]);

        return UserCategory::updateOrCreate(
            ['user_id' => $userId, 'category' => $category],
            [
                'payment_id' => $payment->id,
                'billing_cycle' => BillingCycle::Monthly,
                'subscription_status' => SubscriptionStatus::Active,
                'expires_at' => $expiryDate,
                'grace_period_ends_at' => $expiryDate->copy()->addDays($gracePeriodDays),
                'is_active' => true,
                'reminder_count' => 0,
                'last_reminder_sent_at' => null,
            ]
        );
    }

    /**
     * Update subscription statuses based on expiry dates.
     * Should be called by a scheduled command.
     */
    public function updateSubscriptionStatuses(): array
    {
        $stats = ['to_grace_period' => 0, 'to_expired' => 0];
        $gracePeriodDays = config('categories.subscription.grace_period_days', 7);

        // Move active subscriptions to grace period if expired
        $toGracePeriod = UserCategory::query()
            ->where('subscription_status', SubscriptionStatus::Active)
            ->where('is_active', true)
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', now())
            ->get();

        foreach ($toGracePeriod as $subscription) {
            $subscription->update([
                'subscription_status' => SubscriptionStatus::GracePeriod,
                'grace_period_ends_at' => $subscription->expires_at->copy()->addDays($gracePeriodDays),
            ]);
            $stats['to_grace_period']++;
        }

        // Move grace period subscriptions to expired if grace period ended
        $toExpired = UserCategory::query()
            ->where('subscription_status', SubscriptionStatus::GracePeriod)
            ->where('is_active', true)
            ->whereNotNull('grace_period_ends_at')
            ->where('grace_period_ends_at', '<=', now())
            ->get();

        foreach ($toExpired as $subscription) {
            $subscription->update([
                'subscription_status' => SubscriptionStatus::Expired,
                'is_active' => false,
            ]);
            $stats['to_expired']++;
        }

        return $stats;
    }

    /**
     * Get subscriptions that need reminder notifications.
     */
    public function getSubscriptionsNeedingReminders(): array
    {
        $reminderDays = config('categories.subscription.reminder_days', [7, 3, 1, 0, -3, -5]);
        $subscriptions = [];

        foreach ($reminderDays as $days) {
            $targetDate = now()->addDays($days)->toDateString();

            $found = UserCategory::query()
                ->with('user')
                ->where('is_active', true)
                ->whereIn('subscription_status', [SubscriptionStatus::Active, SubscriptionStatus::GracePeriod])
                ->whereDate('expires_at', $targetDate)
                ->whereHas('user', fn ($q) => $q->where('is_active', true))
                ->get();

            foreach ($found as $subscription) {
                $subscriptions[] = [
                    'subscription' => $subscription,
                    'days_until_expiry' => $days,
                ];
            }
        }

        return $subscriptions;
    }

    /**
     * Check if user can access a specific category.
     */
    public function canUserAccessCategory(int $userId, string $category): bool
    {
        $userCategory = UserCategory::query()
            ->where('user_id', $userId)
            ->where('category', $category)
            ->first();

        return $userCategory?->canAccessCategory() ?? false;
    }
}
