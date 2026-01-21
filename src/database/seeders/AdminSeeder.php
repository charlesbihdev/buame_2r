<?php

namespace Database\Seeders;

use App\Enums\AdminRole;
use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Admin Seeder
 *
 * Creates default admin accounts for the BUAME 2R admin dashboard.
 *
 * Default Credentials:
 * - Super Admin: charlesowusubih@gmail.com / Charles123!
 * - Admin: bobreynolds556@gmail.com / Bob123!
 *
 * IMPORTANT: Change these passwords after first login!
 */
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Admin - Charles Owusu
        Admin::firstOrCreate(
            ['email' => 'charlesowusubih@gmail.com'],
            [
                'name' => 'Charles Owusu',
                'email' => 'charlesowusubih@gmail.com',
                'password' => Hash::make('Pa$$w0rd!'),
                'role' => AdminRole::SuperAdmin,
                'is_active' => true,
            ]
        );

        // Admin - Bob Reynolds
        Admin::firstOrCreate(
            ['email' => 'bobreynolds556@gmail.com'],
            [
                'name' => 'Bob Reynolds',
                'email' => 'bobreynolds556@gmail.com',
                'password' => Hash::make('Bob123@'),
                'role' => AdminRole::Admin,
                'is_active' => true,
            ]
        );
    }
}
