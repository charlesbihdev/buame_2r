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
        'status',
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
            'rating' => 'integer',
        ];
    }

    /**
     * Scope for approved reviews only.
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope for pending reviews only.
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for disapproved reviews only.
     */
    public function scopeDisapproved(Builder $query): Builder
    {
        return $query->where('status', 'disapproved');
    }

    /**
     * Get the reviewable entity (artisan, hotel, etc.)
     */
    public function getReviewableAttribute(): ?Model
    {
        return $this->artisan
            ?? $this->hotel
            ?? $this->transportRide
            ?? $this->marketplaceProduct
            ?? $this->rental
            ?? $this->job
            ?? $this->store;
    }

    /**
     * Get the type of entity being reviewed.
     */
    public function getReviewableTypeAttribute(): ?string
    {
        if ($this->artisan_id) {
            return 'Artisan';
        }
        if ($this->hotel_id) {
            return 'Hotel';
        }
        if ($this->transport_ride_id) {
            return 'Transport';
        }
        if ($this->marketplace_product_id) {
            return 'Product';
        }
        if ($this->rental_id) {
            return 'Rental';
        }
        if ($this->job_id) {
            return 'Job';
        }
        if ($this->store_id) {
            return 'Store';
        }

        return null;
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
