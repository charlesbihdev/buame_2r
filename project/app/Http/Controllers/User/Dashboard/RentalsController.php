<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Rental;
use App\Models\RentalImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RentalsController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $rentals = $user->rentals()->with('images')->latest()->get();

        return Inertia::render('user/dashboard/rentals/index', [
            'rentals' => $rentals,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('user/dashboard/rentals/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:house,equipment,tools,land,commercial,vehicle,store'],
            'location' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'price' => ['required', 'numeric', 'min:0'],
            'period' => ['required', 'string', 'in:day,week,month'],
            'description' => ['nullable', 'string'],
        ]);

        $user = Auth::user();
        $user->rentals()->create($validated);

        return redirect()->route('user.dashboard.category', ['category' => 'rentals'])
            ->with('success', 'Rental listing created successfully.');
    }

    public function edit(Rental $rental): Response
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/rentals/edit', [
            'rental' => $rental->load('images'),
        ]);
    }

    public function update(Request $request, Rental $rental): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:house,equipment,tools,land,commercial,vehicle,store'],
            'location' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'period' => ['required', 'string', 'in:day,week,month'],
            'description' => ['nullable', 'string'],
            'rental_terms' => ['nullable', 'string'],
            'features' => ['nullable', 'array'],
            'features.*' => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'primary_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
        ]);

        // Handle primary image upload
        if ($request->hasFile('primary_image')) {
            // Delete old primary image if exists
            $oldPrimary = $rental->images()->where('is_primary', true)->first();
            if ($oldPrimary) {
                $oldPath = str_replace(Storage::url(''), '', $oldPrimary->image_path);
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
                $oldPrimary->delete();
            }

            // Upload new primary image
            $path = $request->file('primary_image')->store('rentals/'.$rental->id, 'public');

            $rental->images()->create([
                'image_path' => Storage::url($path),
                'is_primary' => true,
                'display_order' => 0,
            ]);
        }

        // Handle features
        $features = $validated['features'] ?? [];
        unset($validated['features']);

        // Remove primary_image from validated data before updating
        unset($validated['primary_image']);

        $rental->update($validated);

        // Sync features
        $rental->features()->delete();
        foreach ($features as $feature) {
            $rental->features()->create(['feature' => $feature]);
        }

        return back()->with('success', 'Rental updated successfully.');
    }

    public function destroy(Rental $rental): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        // Delete all images from storage
        foreach ($rental->images as $image) {
            $path = str_replace(Storage::url(''), '', $image->image_path);
            if ($path && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        $rental->delete();

        return redirect()->route('user.dashboard.category', ['category' => 'rentals'])
            ->with('success', 'Rental listing deleted successfully.');
    }

    // Image Management Methods
    public function storeImage(Request $request, Rental $rental): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'display_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $path = $request->file('image')->store('rentals/'.$rental->id, 'public');

        // If this is the first image, make it primary
        $isPrimary = $rental->images()->count() === 0;

        $rental->images()->create([
            'image_path' => Storage::url($path),
            'is_primary' => $isPrimary,
            'display_order' => $validated['display_order'] ?? 0,
        ]);

        return back()->with('success', 'Image added successfully.');
    }

    public function updateImage(Request $request, Rental $rental, RentalImage $image): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'display_order' => ['nullable', 'integer', 'min:0'],
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            $oldPath = str_replace(Storage::url(''), '', $image->image_path);
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }

            // Upload new image
            $path = $request->file('image')->store('rentals/'.$rental->id, 'public');
            $image->image_path = Storage::url($path);
        }

        if (isset($validated['display_order'])) {
            $image->display_order = $validated['display_order'];
        }

        $image->save();

        return back()->with('success', 'Image updated successfully.');
    }

    public function destroyImage(Rental $rental, RentalImage $image): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        // Delete from storage
        $path = str_replace(Storage::url(''), '', $image->image_path);
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }

        $wasPrimary = $image->is_primary;
        $image->delete();

        // If deleted image was primary, set another as primary
        if ($wasPrimary) {
            $newPrimary = $rental->images()->first();
            if ($newPrimary) {
                $newPrimary->update(['is_primary' => true]);
            }
        }

        return back()->with('success', 'Image deleted successfully.');
    }

    public function setPrimaryImage(Rental $rental, RentalImage $image): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        // Remove primary from all images
        $rental->images()->update(['is_primary' => false]);

        // Set new primary
        $image->update(['is_primary' => true]);

        return back()->with('success', 'Primary image updated.');
    }
}
