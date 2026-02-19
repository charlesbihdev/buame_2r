<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Cache;

class TransportRide extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'driver_name',
        'type',
        'price_per_seat',
        'seats_available',
        'location',
        'address',
        'latitude',
        'longitude',
        'operating_locations',
        'phone',
        'phone_2',
        'whatsapp',
        'email',
        'description',
        'operating_hours',
        'payment_methods',
        'is_verified',
        'is_active',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'price_per_seat' => 'decimal:2',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'payment_methods' => 'array',
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(TransportImage::class, 'transport_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function getAverageRatingAttribute(): float
    {
        return Cache::remember("transport_ride.{$this->id}.rating", 300, fn () => round($this->reviews()->approved()->avg('rating') ?? 0, 1));
    }

    public function getReviewsCountAttribute(): int
    {
        return Cache::remember("transport_ride.{$this->id}.reviews_count", 300, fn () => $this->reviews()->approved()->count());
    }

    public function favorites(): MorphMany
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function primaryImage()
    {
        return $this->hasOne(TransportImage::class, 'transport_id')->where('is_primary', true);
    }
}
