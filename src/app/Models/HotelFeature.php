<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'feature',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
