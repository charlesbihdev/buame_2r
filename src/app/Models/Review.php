<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'reviewer_name',
        'reviewer_phone',
        'rating',
        'comment',
        'is_approved',
        'artisan_id',
        'hotel_id',
        'transport_ride_id',
        'marketplace_product_id',
        'rental_id',
        'job_id',
        'store_id',
    ];

    protected function casts(): array
    {
        return [
            'is_approved' => 'boolean',
            'rating' => 'integer',
        ];
    }

    /**
     * Scope for approved reviews only.
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('is_approved', true);
    }

    /**
     * Get the review images.
     */
    public function images(): HasMany
    {
        return $this->hasMany(ReviewImage::class);
    }

    /**
     * Get reviewer initials for avatar.
     */
    public function getInitialsAttribute(): string
    {
        $words = explode(' ', $this->reviewer_name);
        $initials = '';

        foreach (array_slice($words, 0, 2) as $word) {
            $initials .= mb_strtoupper(mb_substr($word, 0, 1));
        }

        return $initials;
    }

    // Relationships to each category
    public function artisan(): BelongsTo
    {
        return $this->belongsTo(Artisan::class);
    }

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    public function transportRide(): BelongsTo
    {
        return $this->belongsTo(TransportRide::class);
    }

    public function marketplaceProduct(): BelongsTo
    {
        return $this->belongsTo(MarketplaceProduct::class);
    }

    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'job_id');
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}
