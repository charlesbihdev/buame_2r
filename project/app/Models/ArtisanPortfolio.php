<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtisanPortfolio extends Model
{
    use HasFactory;

    protected $table = 'artisan_portfolios';

    protected $fillable = [
        'artisan_id',
        'item',
        'image_path',
    ];

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
}
