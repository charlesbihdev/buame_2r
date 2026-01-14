<?php

namespace App\Enums;

enum SubscriptionStatus: string
{
    case Active = 'active';
    case GracePeriod = 'grace_period';
    case Expired = 'expired';
    case Cancelled = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::Active => 'Active',
            self::GracePeriod => 'Grace Period',
            self::Expired => 'Expired',
            self::Cancelled => 'Cancelled',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Active => 'green',
            self::GracePeriod => 'yellow',
            self::Expired => 'red',
            self::Cancelled => 'gray',
        };
    }

    public function canAccessCategory(): bool
    {
        return match ($this) {
            self::Active, self::GracePeriod => true,
            self::Expired, self::Cancelled => false,
        };
    }
}
