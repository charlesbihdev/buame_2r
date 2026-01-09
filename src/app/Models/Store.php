<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'thumbnail',
        'tier',
        'tier_expires_at',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'tier_expires_at' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(MarketplaceProduct::class);
    }

    public function getProductLimitAttribute()
    {
        return config("categories.list.marketplace.tiers.{$this->tier}.product_limit", 5);
    }

    public function getRemainingProductSlotsAttribute()
    {
        $used = $this->products()->count();
        return max(0, $this->product_limit - $used);
    }
}
