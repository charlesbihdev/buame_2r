<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Artisan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'skill',
        'skill_type',
        'experience_years',
        'experience_level',
        'price_per_day',
        'rating',
        'reviews_count',
        'location',
        'address',
        'latitude',
        'longitude',
        'phone',
        'whatsapp',
        'email',
        'description',
        'profile_image',
        'is_verified',
        'is_available',
        'working_hours',
        'is_active',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'price_per_day' => 'decimal:2',
            'rating' => 'decimal:2',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'is_verified' => 'boolean',
            'is_available' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function specialties()
    {
        return $this->hasMany(ArtisanSpecialty::class);
    }

    public function portfolio()
    {
        return $this->hasMany(ArtisanPortfolio::class);
    }

    public function images()
    {
        return $this->hasMany(ArtisanImage::class);
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
        return $this->hasOne(ArtisanImage::class)->where('is_primary', true);
    }
}
