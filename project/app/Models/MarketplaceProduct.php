<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class MarketplaceProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'category',
        'price',
        'price_type',
        'condition',
        'location',
        'address',
        'latitude',
        'longitude',
        'phone',
        'whatsapp',
        'email',
        'description',
        'delivery_available',
        'warranty',
        'rating',
        'reviews_count',
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
            'rating' => 'decimal:2',
            'delivery_available' => 'boolean',
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function specifications()
    {
        return $this->hasMany(ProductSpecification::class, 'product_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
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
        return $this->hasOne(ProductImage::class, 'product_id')->where('is_primary', true);
    }
}
