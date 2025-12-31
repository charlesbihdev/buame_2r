<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'transport_id',
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

    public function transport()
    {
        return $this->belongsTo(TransportRide::class, 'transport_id');
    }
}
