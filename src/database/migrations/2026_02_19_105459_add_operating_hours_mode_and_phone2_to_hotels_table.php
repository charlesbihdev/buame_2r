<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->enum('operating_hours_mode', ['disabled', '24_7', 'custom'])
                ->default('24_7')
                ->after('check_out_time');
            $table->string('phone_2', 20)->nullable()->after('phone');
            $table->integer('rooms_count')->nullable()->default(null)->change();
        });

        // Migrate existing data: hotels with check-in/check-out times should be 'custom'
        DB::table('hotels')
            ->where(function ($query) {
                $query->whereNotNull('check_in_time')
                    ->orWhereNotNull('check_out_time');
            })
            ->update(['operating_hours_mode' => '24_7']);
    }

    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn(['operating_hours_mode', 'phone_2']);
            $table->integer('rooms_count')->default(1)->change();
        });
    }
};
