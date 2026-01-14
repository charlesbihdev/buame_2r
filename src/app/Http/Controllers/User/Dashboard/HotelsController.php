<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\HotelImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HotelsController extends Controller
{
    public function index(): RedirectResponse
    {
        // Redirect to main dashboard - category content is rendered there
        return redirect()->route('user.dashboard.index', ['category' => 'hotels']);
    }

    public function create(): Response
    {
        return Inertia::render('user/dashboard/hotels/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'price_per_night' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->hotels()->create($validated);

        return redirect()->route('user.dashboard.index', ['category' => 'hotels'])
            ->with('success', 'Hotel listing created successfully.');
    }

    public function edit(Hotel $hotel): Response
    {
        $user = Auth::user();
        if ($hotel->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/hotels/edit', [
            'hotel' => $hotel,
        ]);
    }

    public function update(Request $request, Hotel $hotel): RedirectResponse
    {
        $user = Auth::user();
        if ($hotel->user_id !== $user->id) {
            abort(403);
        }

        // Check if this is a settings-only update (only amenities and features, no name/type/etc)
        $isSettingsUpdate = ! $request->has('name') && ($request->has('amenities') || $request->has('features'));

        if ($isSettingsUpdate) {
            // Settings-only update - only validate amenities and features
            $validated = $request->validate([
                'amenities' => ['nullable', 'array'],
                'amenities.*' => ['string', 'max:255'],
                'features' => ['nullable', 'array'],
                'features.*' => ['string', 'max:255'],
            ]);

            // Update amenities (JSON field)
            if ($request->has('amenities')) {
                $hotel->update(['amenities' => $validated['amenities'] ?? []]);
            }

            // Handle features
            if ($request->has('features') && is_array($request->features)) {
                $hotel->features()->delete();
                foreach ($request->features as $feature) {
                    if (! empty(trim($feature))) {
                        $hotel->features()->create(['feature' => trim($feature)]);
                    }
                }
            }

            return redirect()->route('user.dashboard.index', ['category' => 'hotels', 'section' => 'settings'])
                ->with('success', 'Settings saved successfully.');
        }

        // Full profile update - validate all fields
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:hotel,guest_house,lodge,short_stay'],
            'location' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['required', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'price_per_night' => ['required', 'numeric', 'min:0'],
            'rooms_count' => ['nullable', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
            'check_in_time' => ['nullable', 'date_format:H:i'],
            'check_out_time' => ['nullable', 'date_format:H:i'],
            'is_active' => ['boolean'],
            'amenities' => ['nullable', 'array'],
            'amenities.*' => ['string', 'max:255'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string', 'max:255'],
            'primary_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'], // 5MB max
        ]);

        // Handle primary image upload
        if ($request->hasFile('primary_image')) {
            // Delete old primary image if exists
            $oldPrimary = $hotel->images()->where('is_primary', true)->first();
            if ($oldPrimary) {
                $oldPath = str_replace(Storage::url(''), '', $oldPrimary->image_path);
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
                $oldPrimary->delete();
            }

            // Store new primary image
            $imagePath = $request->file('primary_image')->store('hotels/images', 'public');
            $hotel->images()->create([
                'image_path' => Storage::url($imagePath),
                'is_primary' => true,
                'display_order' => 0,
            ]);
        }

        // Update hotel data (amenities stored as JSON)
        $hotel->update([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'location' => $validated['location'],
            'address' => $validated['address'] ?? null,
            'phone' => $validated['phone'],
            'whatsapp' => $validated['whatsapp'] ?? null,
            'email' => $validated['email'] ?? null,
            'price_per_night' => $validated['price_per_night'],
            'rooms_count' => $validated['rooms_count'] ?? 1,
            'description' => $validated['description'] ?? null,
            'check_in_time' => $validated['check_in_time'] ?? null,
            'check_out_time' => $validated['check_out_time'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'amenities' => $validated['amenities'] ?? [],
        ]);

        // Handle features
        if ($request->has('features') && is_array($request->features)) {
            $hotel->features()->delete();
            foreach ($request->features as $feature) {
                if (! empty(trim($feature))) {
                    $hotel->features()->create(['feature' => trim($feature)]);
                }
            }
        }

        return redirect()->route('user.dashboard.index', ['category' => 'hotels', 'section' => 'profile'])
            ->with('success', 'Hotel profile updated successfully.');
    }

    public function destroy(Hotel $hotel): RedirectResponse
    {
        $user = Auth::user();
        if ($hotel->user_id !== $user->id) {
            abort(403);
        }

        // Delete all images
        foreach ($hotel->images as $image) {
            $imagePath = str_replace(Storage::url(''), '', $image->image_path);
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $hotel->delete();

        return redirect()->route('user.dashboard.index', ['category' => 'hotels'])
            ->with('success', 'Hotel listing deleted successfully.');
    }

    /**
     * Store a hotel image.
     */
    public function storeImage(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $hotel = $user->hotels()->first();

        if (! $hotel) {
            return redirect()->route('user.dashboard.index', ['category' => 'hotels', 'section' => 'gallery'])
                ->withErrors(['error' => 'Hotel profile not found.']);
        }

        $validated = $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'], // 5MB max
            'is_primary' => ['boolean'],
        ]);

        $imagePath = $request->file('image')->store('hotels/images', 'public');
        $storedPath = Storage::url($imagePath);

        // If setting as primary, unset other primary images
        if ($validated['is_primary'] ?? false) {
            $hotel->images()->update(['is_primary' => false]);
        }

        // Get max display order
        $maxOrder = $hotel->images()->max('display_order') ?? 0;

        $hotel->images()->create([
            'image_path' => $storedPath,
            'is_primary' => $validated['is_primary'] ?? false,
            'display_order' => $maxOrder + 1,
        ]);

        return redirect()->route('user.dashboard.index', ['category' => 'hotels', 'section' => 'gallery'])
            ->with('success', 'Image added successfully.');
    }

    /**
     * Update a hotel image.
     */
    public function updateImage(Request $request, HotelImage $image): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $hotel = $user->hotels()->first();

        if (! $hotel || $image->hotel_id !== $hotel->id) {
            abort(403);
        }

        $validated = $request->validate([
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
        ]);

        $imagePath = $image->image_path;
        if ($request->hasFile('image')) {
            // Delete old image
            $oldPath = str_replace(Storage::url(''), '', $image->image_path);
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }

            // Store new image
            $newPath = $request->file('image')->store('hotels/images', 'public');
            $imagePath = Storage::url($newPath);
        }

        $image->update(['image_path' => $imagePath]);

        return redirect()->route('user.dashboard.index', ['category' => 'hotels', 'section' => 'gallery'])
            ->with('success', 'Image updated successfully.');
    }

    /**
     * Set an image as primary.
     */
    public function setPrimaryImage(HotelImage $image): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $hotel = $user->hotels()->first();

        if (! $hotel || $image->hotel_id !== $hotel->id) {
            abort(403);
        }

        // Unset all other primary images
        $hotel->images()->update(['is_primary' => false]);

        // Set this as primary
        $image->update(['is_primary' => true]);

        return redirect()->route('user.dashboard.index', ['category' => 'hotels', 'section' => 'gallery'])
            ->with('success', 'Primary image updated successfully.');
    }

    /**
     * Delete a hotel image.
     */
    public function destroyImage(HotelImage $image): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $hotel = $user->hotels()->first();

        if (! $hotel || $image->hotel_id !== $hotel->id) {
            abort(403);
        }

        // Delete image file
        $imagePath = str_replace(Storage::url(''), '', $image->image_path);
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        $image->delete();

        return redirect()->route('user.dashboard.index', ['category' => 'hotels', 'section' => 'gallery'])
            ->with('success', 'Image deleted successfully.');
    }
}
