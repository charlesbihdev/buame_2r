<?php

namespace App\Services;

use App\Models\Artisan;
use App\Models\Hotel;
use App\Models\Job;
use App\Models\Rental;
use App\Models\Store;
use App\Models\TransportRide;
use App\Models\User;
use Illuminate\Support\Str;

class CategoryProfileService
{
    /**
     * Get or create category profile for a user.
     */
    public function getOrCreateProfile(User $user, string $category): mixed
    {
        return match ($category) {
            'artisans' => $this->getOrCreateArtisan($user),
            'hotels' => $this->getOrCreateHotel($user),
            'transport' => $this->getOrCreateTransport($user),
            'rentals' => $this->getOrCreateRental($user),
            'marketplace' => $this->getOrCreateStore($user),
            'jobs' => $this->getOrCreateJob($user),
            default => null,
        };
    }

    /**
     * Get or create artisan profile.
     */
    protected function getOrCreateArtisan(User $user): Artisan
    {
        $artisan = $user->artisans()->firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $user->name,
                'skill' => '',
                'skill_type' => 'other',
                'price_per_day' => 0,
                'location' => '',
                'phone' => $user->phone ?? '',
            ]
        );

        // Reload with relationships if it was just created
        if ($artisan->wasRecentlyCreated) {
            $artisan->load(['specialties', 'portfolio']);
        } else {
            // Ensure relationships are loaded
            if (! $artisan->relationLoaded('specialties')) {
                $artisan->load('specialties');
            }
            if (! $artisan->relationLoaded('portfolio')) {
                $artisan->load('portfolio');
            }
        }

        return $artisan;
    }

    /**
     * Get or create hotel profile.
     */
    protected function getOrCreateHotel(User $user): Hotel
    {
        return $user->hotels()->with(['amenities', 'features', 'images'])->firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => '',
                'type' => 'guest_house',
                'price_per_night' => 0,
                'location' => '',
                'phone' => $user->phone,
            ]
        );
    }

    /**
     * Get or create transport profile.
     */
    protected function getOrCreateTransport(User $user): TransportRide
    {
        return $user->transportRides()->with(['images'])->firstOrCreate(
            ['user_id' => $user->id],
            [
                'company_name' => '',
                'type' => 'okada_car',
                'price_per_seat' => 0,
                'seats_available' => 1,
                'location' => '',
                'phone' => $user->phone,
            ]
        );
    }

    /**
     * Get or create rental profile.
     */
    protected function getOrCreateRental(User $user): Rental
    {
        return $user->rentals()->with(['images', 'features'])->firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => '',
                'type' => 'house',
                'price' => 0,
                'period' => 'month',
                'location' => '',
                'phone' => $user->phone ?? '',
            ]
        );
    }

    /**
     * Get or create job profile.
     */
    protected function getOrCreateJob(User $user): Job
    {
        return $user->jobs()->with(['requirements', 'responsibilities', 'benefits'])->firstOrCreate(
            ['user_id' => $user->id],
            [
                'title' => '',
                'company' => '',
                'type' => 'full_time',
                'category' => 'other',
                'location' => '',
                'phone' => $user->phone,
                'description' => '',
            ]
        );
    }

    /**
     * Get or create store.
     */
    protected function getOrCreateStore(User $user): ?Store
    {
        $store = $user->store;

        if (!$store) {
            $baseSlug = Str::slug($user->name);
            $slug = $baseSlug;
            $counter = 1;

            while (Store::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            $store = Store::create([
                'user_id' => $user->id,
                'name' => $user->name . "'s Store",
                'slug' => $slug,
                'tier' => 'starter',
                'is_active' => false,
            ]);
        }

        return $store->load('products');
    }
}
