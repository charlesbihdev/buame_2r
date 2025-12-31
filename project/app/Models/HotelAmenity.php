<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelAmenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'amenity',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
