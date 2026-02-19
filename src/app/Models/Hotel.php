<?php

namespace App\Models;

use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Cache;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'price_per_night',
        'location',
        'address',
        'latitude',
        'longitude',
        'phone',
        'phone_2',
        'whatsapp',
        'email',
        'description',
        'rooms_count',
        'check_in_time',
        'check_out_time',
        'operating_hours_mode',
        'amenities',
        'is_verified',
        'is_active',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'price_per_night' => 'decimal:2',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'amenities' => 'array',
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function features()
    {
        return $this->hasMany(HotelFeature::class);
    }

    public function images()
    {
        return $this->hasMany(HotelImage::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function getAverageRatingAttribute(): float
    {
        return Cache::remember("hotel.{$this->id}.rating", 300, fn () => round($this->reviews()->approved()->avg('rating') ?? 0, 1));
    }

    public function getReviewsCountAttribute(): int
    {
        return Cache::remember("hotel.{$this->id}.reviews_count", 300, fn () => $this->reviews()->approved()->count());
    }

    public function favorites(): MorphMany
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function primaryImage()
    {
        return $this->hasOne(HotelImage::class)->where('is_primary', true);
    }

    /**
     * Scope to filter hotels whose owners have active subscriptions.
     */
    public function scopeWithActiveSubscription(Builder $query): Builder
    {
        return $query->whereHas('user.categories', function (Builder $q) {
            $q->where('category', 'hotels')
                ->where('is_active', true)
                ->whereIn('subscription_status', [
                    SubscriptionStatus::Active->value,
                    SubscriptionStatus::GracePeriod->value,
                ]);
        });
    }
}
