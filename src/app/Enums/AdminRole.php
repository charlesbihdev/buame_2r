<?php

namespace App\Enums;

enum AdminRole: string
{
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::SuperAdmin => 'Super Admin',
            self::Admin => 'Admin',
        };
    }

    public function canAccessRevenue(): bool
    {
        return $this === self::SuperAdmin;
    }

    public function canManageAdmins(): bool
    {
        return $this === self::SuperAdmin;
    }

    public function canAccessSubscriptions(): bool
    {
        return $this === self::SuperAdmin;
    }
}
