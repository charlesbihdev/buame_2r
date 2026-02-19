<?php

namespace App\Models;

use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Cache;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'thumbnail',
        'tier',
        'tier_expires_at',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'tier_expires_at' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(MarketplaceProduct::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function getAverageRatingAttribute(): float
    {
        return Cache::remember("store.{$this->id}.rating", 300, fn () => round($this->reviews()->approved()->avg('rating') ?? 0, 1));
    }

    public function getReviewsCountAttribute(): int
    {
        return Cache::remember("store.{$this->id}.reviews_count", 300, fn () => $this->reviews()->approved()->count());
    }

    public function getProductLimitAttribute()
    {
        return config("categories.list.marketplace.tiers.{$this->tier}.product_limit", 10);
    }

    public function videoLinks(): MorphMany
    {
        return $this->morphMany(VideoLink::class, 'linkable');
    }

    public function getRemainingProductSlotsAttribute()
    {
        $used = $this->products()->count();

        return max(0, $this->product_limit - $used);
    }

    /**
     * Scope to filter stores whose owners have active subscriptions.
     */
    public function scopeWithActiveSubscription(Builder $query): Builder
    {
        return $query->whereHas('user.categories', function (Builder $q) {
            $q->where('category', 'marketplace')
                ->where('is_active', true)
                ->whereIn('subscription_status', [
                    SubscriptionStatus::Active->value,
                    SubscriptionStatus::GracePeriod->value,
                ]);
        });
    }
}
