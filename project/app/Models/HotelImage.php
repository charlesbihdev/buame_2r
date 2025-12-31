<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'image_path',
        'is_primary',
        'display_order',
    ];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
        ];
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
