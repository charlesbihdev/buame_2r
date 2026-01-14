<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionReminder extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_category_id',
        'channel',
        'type',
        'days_before_expiry',
        'was_sent',
        'sent_at',
        'error_message',
    ];

    protected function casts(): array
    {
        return [
            'was_sent' => 'boolean',
            'sent_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function userCategory()
    {
        return $this->belongsTo(UserCategory::class);
    }
}
