<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class TransportRide extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'type',
        'price_per_seat',
        'seats_available',
        'location',
        'address',
        'latitude',
        'longitude',
        'operating_locations',
        'rating',
        'reviews_count',
        'phone',
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
            'rating' => 'decimal:2',
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

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
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
