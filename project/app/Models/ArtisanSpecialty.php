<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtisanSpecialty extends Model
{
    use HasFactory;

    protected $fillable = [
        'artisan_id',
        'specialty',
    ];

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
}
