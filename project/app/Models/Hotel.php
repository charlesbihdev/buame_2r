<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'rating',
        'reviews_count',
        'price_per_night',
        'location',
        'address',
        'latitude',
        'longitude',
        'phone',
        'whatsapp',
        'email',
        'description',
        'rooms_count',
        'check_in_time',
        'check_out_time',
        'amenities',
        'is_verified',
        'is_active',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:2',
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

    public function amenities()
    {
        return $this->hasMany(HotelAmenity::class);
    }

    public function features()
    {
        return $this->hasMany(HotelFeature::class);
    }

    public function images()
    {
        return $this->hasMany(HotelImage::class);
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
        return $this->hasOne(HotelImage::class)->where('is_primary', true);
    }
}
