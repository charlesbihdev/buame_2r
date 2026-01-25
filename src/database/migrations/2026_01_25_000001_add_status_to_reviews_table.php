<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add status column if it doesn't exist (handles partial migration state)
        if (! Schema::hasColumn('reviews', 'status')) {
            Schema::table('reviews', function (Blueprint $table) {
                $table->string('status', 20)->default('pending')->after('comment')->index();
            });
        }

        // Migrate existing data if is_approved column still exists
        if (Schema::hasColumn('reviews', 'is_approved')) {
            DB::table('reviews')->where('is_approved', true)->update(['status' => 'approved']);
            DB::table('reviews')->where('is_approved', false)->update(['status' => 'pending']);

            // Drop the index first (for SQLite compatibility)
            Schema::table('reviews', function (Blueprint $table) {
                $table->dropIndex(['is_approved']);
            });

            Schema::table('reviews', function (Blueprint $table) {
                $table->dropColumn('is_approved');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('reviews', 'is_approved')) {
            Schema::table('reviews', function (Blueprint $table) {
                $table->boolean('is_approved')->default(false)->after('comment')->index();
            });
        }

        if (Schema::hasColumn('reviews', 'status')) {
            DB::table('reviews')->where('status', 'approved')->update(['is_approved' => true]);
            DB::table('reviews')->whereIn('status', ['pending', 'disapproved'])->update(['is_approved' => false]);

            // Drop the index first (for SQLite compatibility)
            Schema::table('reviews', function (Blueprint $table) {
                $table->dropIndex(['status']);
            });

            Schema::table('reviews', function (Blueprint $table) {
                $table->dropColumn('status');
            });
        }
    }
};
