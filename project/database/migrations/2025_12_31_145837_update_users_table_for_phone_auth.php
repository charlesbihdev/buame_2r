<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove email-based auth fields
            $table->dropUnique(['email']);
            $table->dropColumn(['email', 'email_verified_at', 'password', 'remember_token']);
            
            // Add phone-based auth fields
            $table->string('phone', 20)->unique()->after('name');
            $table->string('email')->nullable()->after('phone');
            $table->timestamp('phone_verified_at')->nullable()->after('email');
            $table->string('verification_code', 6)->nullable()->after('phone_verified_at');
            $table->timestamp('verification_code_expires_at')->nullable()->after('verification_code');
            $table->string('profile_image')->nullable()->after('verification_code_expires_at');
            $table->boolean('is_active')->default(true)->after('profile_image');
            $table->timestamp('last_login_at')->nullable()->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Restore email-based auth
            $table->string('email')->unique()->after('name');
            $table->timestamp('email_verified_at')->nullable()->after('email');
            $table->string('password')->after('email_verified_at');
            $table->rememberToken()->after('password');
            
            // Remove phone-based auth fields
            $table->dropUnique(['phone']);
            $table->dropColumn([
                'phone',
                'phone_verified_at',
                'verification_code',
                'verification_code_expires_at',
                'profile_image',
                'is_active',
                'last_login_at',
            ]);
        });
    }
};
