<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tables = ['artisans', 'hotels', 'transport_rides', 'rentals', 'marketplace_products'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->string('slug')->nullable()->after('id');
            });
        }

        // Backfill slugs for existing records
        $this->backfillSlugs('artisans', 'name');
        $this->backfillSlugs('hotels', 'name');
        $this->backfillSlugs('transport_rides', 'driver_name');
        $this->backfillSlugs('rentals', 'name');
        $this->backfillSlugs('marketplace_products', 'title');

        // Now make slug non-nullable and add unique index
        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->string('slug')->nullable(false)->unique()->index()->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = ['artisans', 'hotels', 'transport_rides', 'rentals', 'marketplace_products'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->dropColumn('slug');
            });
        }
    }

    /**
     * Backfill slugs for existing records in a table.
     */
    private function backfillSlugs(string $table, string $sourceColumn): void
    {
        $records = DB::table($table)->select('id', $sourceColumn)->orderBy('id')->get();
        $usedSlugs = [];

        foreach ($records as $record) {
            $baseSlug = Str::slug($record->{$sourceColumn} ?: 'item');
            $slug = $baseSlug;
            $counter = 1;

            while (in_array($slug, $usedSlugs)) {
                $slug = $baseSlug.'-'.$counter;
                $counter++;
            }

            $usedSlugs[] = $slug;

            DB::table($table)->where('id', $record->id)->update(['slug' => $slug]);
        }
    }
};
