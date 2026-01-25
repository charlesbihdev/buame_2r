<?php

namespace App\Models;

use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Cache;

class MarketplaceProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'store_id',
        'title',
        'category',
        'price',
        'price_type',
        'condition',
        'location',
        'latitude',
        'longitude',
        'description',
        'delivery_available',
        'warranty',
        'is_approved',
        'is_active',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'delivery_available' => 'boolean',
            'is_approved' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function specifications()
    {
        return $this->hasMany(ProductSpecification::class, 'product_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function getAverageRatingAttribute(): float
    {
        return Cache::remember("marketplace_product.{$this->id}.rating", 300, fn () => round($this->reviews()->approved()->avg('rating') ?? 0, 1));
    }

    public function getReviewsCountAttribute(): int
    {
        return Cache::remember("marketplace_product.{$this->id}.reviews_count", 300, fn () => $this->reviews()->approved()->count());
    }

    public function favorites(): MorphMany
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function primaryImage()
    {
        return $this->hasOne(ProductImage::class, 'product_id')->where('is_primary', true);
    }

    /**
     * Scope to filter marketplace products whose owners have active subscriptions.
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
