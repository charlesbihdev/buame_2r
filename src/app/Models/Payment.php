<?php

namespace App\Models;

use App\Enums\BillingCycle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category',
        'billing_cycle',
        'payment_type',
        'previous_payment_id',
        'amount',
        'currency',
        'payment_method',
        'transaction_id',
        'payment_reference',
        'status',
        'paid_at',
        'expires_at',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'paid_at' => 'datetime',
            'expires_at' => 'datetime',
            'metadata' => 'array',
            'billing_cycle' => BillingCycle::class,
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function userCategory()
    {
        return $this->hasOne(UserCategory::class);
    }

    public function previousPayment()
    {
        return $this->belongsTo(Payment::class, 'previous_payment_id');
    }

    public function renewalPayments()
    {
        return $this->hasMany(Payment::class, 'previous_payment_id');
    }

    public function isRenewal(): bool
    {
        return $this->payment_type === 'renewal';
    }

    public function isInitial(): bool
    {
        return $this->payment_type === 'initial';
    }
}
