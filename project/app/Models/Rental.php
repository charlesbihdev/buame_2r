<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Rental extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'price',
        'period',
        'location',
        'address',
        'latitude',
        'longitude',
        'phone',
        'whatsapp',
        'email',
        'description',
        'bedrooms',
        'bathrooms',
        'area',
        'furnished',
        'available_from',
        'rental_terms',
        'is_verified',
        'is_active',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'available_from' => 'date',
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
        return $this->hasMany(RentalFeature::class);
    }

    public function images()
    {
        return $this->hasMany(RentalImage::class);
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
        return $this->hasOne(RentalImage::class)->where('is_primary', true);
    }
}
