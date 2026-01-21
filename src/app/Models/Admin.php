<?php

namespace App\Models;

use App\Enums\AdminRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_at' => 'datetime',
            'is_active' => 'boolean',
            'password' => 'hashed',
            'role' => AdminRole::class,
        ];
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === AdminRole::SuperAdmin;
    }

    public function isAdmin(): bool
    {
        return $this->role === AdminRole::Admin;
    }

    public function canAccessRevenue(): bool
    {
        return $this->role->canAccessRevenue();
    }

    public function canManageAdmins(): bool
    {
        return $this->role->canManageAdmins();
    }

    public function canAccessSubscriptions(): bool
    {
        return $this->role->canAccessSubscriptions();
    }
}
