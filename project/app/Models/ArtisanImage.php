<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtisanImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'artisan_id',
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

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
}
