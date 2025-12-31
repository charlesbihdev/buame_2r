<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'rental_id',
        'feature',
    ];

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }
}
