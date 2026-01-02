<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'profile_image',
        'is_active',
        'phone_verified_at',
        'last_login_at',
    ];

    protected $hidden = [
        // No hidden fields needed
    ];

    protected function casts(): array
    {
        return [
            'phone_verified_at' => 'datetime',
            'last_login_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    // Relationships
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function categories()
    {
        return $this->hasMany(UserCategory::class);
    }

    public function activeCategory()
    {
        return $this->hasOne(UserActiveCategory::class);
    }

    /**
     * Get the artisan profiles for the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function artisans()
    {
        return $this->hasMany(Artisan::class);
    }

    public function hotels()
    {
        return $this->hasMany(Hotel::class);
    }

    public function transportRides()
    {
        return $this->hasMany(TransportRide::class);
    }

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }

    public function marketplaceProducts()
    {
        return $this->hasMany(MarketplaceProduct::class);
    }

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // Helper methods
    public function hasCategoryAccess(string $category): bool
    {
        return $this->categories()
            ->where('category', $category)
            ->where('is_active', true)
            ->whereHas('payment', function ($query) {
                $query->where('status', 'completed');
            })
            ->exists();
    }

    /**
     * Check if phone is verified
     */
    public function hasVerifiedPhone(): bool
    {
        return ! is_null($this->phone_verified_at);
    }

    /**
     * Mark phone as verified
     */
    public function markPhoneAsVerified(): void
    {
        $this->forceFill([
            'phone_verified_at' => $this->freshTimestamp(),
        ])->save();
    }
}
