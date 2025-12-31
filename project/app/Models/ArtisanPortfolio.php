<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtisanPortfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'artisan_id',
        'item',
    ];

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
}
