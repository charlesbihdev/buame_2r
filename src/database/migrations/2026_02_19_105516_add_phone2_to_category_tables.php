<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('artisans', function (Blueprint $table) {
            $table->string('phone_2', 20)->nullable()->after('phone');
        });

        Schema::table('rentals', function (Blueprint $table) {
            $table->string('phone_2', 20)->nullable()->after('phone');
        });

        Schema::table('transport_rides', function (Blueprint $table) {
            $table->string('phone_2', 20)->nullable()->after('phone');
        });

        Schema::table('job_posters', function (Blueprint $table) {
            $table->string('phone_2', 20)->nullable()->after('phone');
        });

        Schema::table('job_listings', function (Blueprint $table) {
            $table->string('phone_2', 20)->nullable()->after('phone');
        });
    }

    public function down(): void
    {
        Schema::table('artisans', function (Blueprint $table) {
            $table->dropColumn('phone_2');
        });

        Schema::table('rentals', function (Blueprint $table) {
            $table->dropColumn('phone_2');
        });

        Schema::table('transport_rides', function (Blueprint $table) {
            $table->dropColumn('phone_2');
        });

        Schema::table('job_posters', function (Blueprint $table) {
            $table->dropColumn('phone_2');
        });

        Schema::table('job_listings', function (Blueprint $table) {
            $table->dropColumn('phone_2');
        });
    }
};
