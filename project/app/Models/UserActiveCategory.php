<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserActiveCategory extends Model
{
    use HasFactory;

    protected $table = 'user_active_category';

    protected $fillable = [
        'user_id',
        'active_category',
        'switched_at',
    ];

    protected function casts(): array
    {
        return [
            'switched_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
