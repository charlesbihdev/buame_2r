<?php

namespace App\Enums;

enum BillingCycle: string
{
    case Monthly = 'monthly';
    case Biannually = 'biannually';
    case Annual = 'annual';

    public function label(): string
    {
        return match ($this) {
            self::Monthly => 'Monthly',
            self::Biannually => 'Biannually',
            self::Annual => 'Annual',
        };
    }

    public function durationDays(): int
    {
        return config("categories.subscription.billing_cycles.{$this->value}.duration_days", match ($this) {
            self::Monthly => 30,
            self::Biannually => 180,
            self::Annual => 365,
        });
    }

    public function discountPercent(): int
    {
        return config("categories.subscription.billing_cycles.{$this->value}.discount_percent", match ($this) {
            self::Monthly => 0,
            self::Biannually => 10,
            self::Annual => 20,
        });
    }
}
