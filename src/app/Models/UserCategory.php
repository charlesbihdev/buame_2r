<?php

namespace App\Models;

use App\Enums\BillingCycle;
use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category',
        'payment_id',
        'billing_cycle',
        'subscription_status',
        'expires_at',
        'grace_period_ends_at',
        'last_reminder_sent_at',
        'reminder_count',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'expires_at' => 'datetime',
            'grace_period_ends_at' => 'datetime',
            'last_reminder_sent_at' => 'datetime',
            'billing_cycle' => BillingCycle::class,
            'subscription_status' => SubscriptionStatus::class,
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'category', 'category')
            ->where('user_id', $this->user_id);
    }

    /**
     * Check if the subscription is currently in grace period.
     */
    public function isInGracePeriod(): bool
    {
        if (! $this->expires_at) {
            return false;
        }

        $gracePeriodDays = config('categories.subscription.grace_period_days', 7);
        $gracePeriodEnd = $this->expires_at->copy()->addDays($gracePeriodDays);

        return now()->isAfter($this->expires_at) && now()->isBefore($gracePeriodEnd);
    }

    /**
     * Check if the subscription has expired (past grace period).
     */
    public function isExpired(): bool
    {
        if (! $this->expires_at) {
            return false;
        }

        $gracePeriodDays = config('categories.subscription.grace_period_days', 7);

        return now()->isAfter($this->expires_at->copy()->addDays($gracePeriodDays));
    }

    /**
     * Get the number of days until expiry (negative if past expiry).
     */
    public function daysUntilExpiry(): int
    {
        if (! $this->expires_at) {
            return 0;
        }

        return (int) now()->diffInDays($this->expires_at, false);
    }

    /**
     * Check if user can access this category.
     */
    public function canAccessCategory(): bool
    {
        return $this->is_active
            && $this->subscription_status?->canAccessCategory();
    }

    /**
     * Get the category label from config.
     */
    public function getCategoryLabelAttribute(): string
    {
        return config("categories.list.{$this->category}.label", ucfirst($this->category));
    }

    /**
     * Check if subscription is expiring soon (within 7 days).
     */
    public function isExpiringSoon(): bool
    {
        if (! $this->expires_at) {
            return false;
        }

        $daysUntil = $this->daysUntilExpiry();

        return $daysUntil >= 0 && $daysUntil <= 7;
    }

    /**
     * Get the subscription status color for UI.
     */
    public function getStatusColorAttribute(): string
    {
        return $this->subscription_status?->color() ?? 'gray';
    }
}
