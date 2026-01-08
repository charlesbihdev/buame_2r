<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Store;
use App\Models\MarketplaceProduct;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Get all users who have marketplace products but no store
        $usersWithProducts = User::whereHas('marketplaceProducts')
            ->whereDoesntHave('store')
            ->get();

        foreach ($usersWithProducts as $user) {
            // Generate unique slug
            $baseSlug = Str::slug($user->name);
            $slug = $baseSlug;
            $counter = 1;

            while (Store::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            // Create store with starter tier
            $store = Store::create([
                'user_id' => $user->id,
                'name' => $user->name . "'s Store",
                'slug' => $slug,
                'tier' => 'starter',
                'is_active' => false,
            ]);

            // Link existing products to the store
            MarketplaceProduct::where('user_id', $user->id)
                ->whereNull('store_id')
                ->update(['store_id' => $store->id]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Optionally remove stores created by this migration
        // But we'll keep them as they're now part of the system
    }
};
