<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE rentals MODIFY COLUMN period ENUM('day', 'week', 'month', 'year') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE rentals MODIFY COLUMN period ENUM('day', 'week', 'month') NOT NULL");
    }
};
