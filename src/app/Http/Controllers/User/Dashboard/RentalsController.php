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
    public function index(): RedirectResponse
    {
        // Redirect to main dashboard - category content is rendered there
        return redirect()->route('user.dashboard.index', ['category' => 'rentals']);
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
            'price' => ['nullable', 'numeric', 'min:0'],
            'period' => ['nullable', 'string', 'in:day,week,month,year'],
            'description' => ['nullable', 'string'],
        ]);

        $user = Auth::user();
        $user->rentals()->create($validated);

        return redirect()->route('user.dashboard.index', ['category' => 'rentals'])
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
            'price' => ['nullable', 'numeric', 'min:0'],
            'period' => ['nullable', 'string', 'in:day,week,month,year'],
            'description' => ['nullable', 'string'],
            'rental_terms' => ['nullable', 'string'],
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
            $path = $request->file('primary_image')->store('rentals/' . $rental->id, 'public');

            $rental->images()->create([
                'image_path' => Storage::url($path),
                'is_primary' => true,
                'display_order' => 0,
            ]);
        }

        // Remove primary_image from validated data before updating
        unset($validated['primary_image']);

        $rental->update($validated);

        return back()->with('success', 'Rental updated successfully.');
    }

    /**
     * Toggle rental active status.
     */
    public function toggleActive(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $rental = $user->rentals()->first();

        if (!$rental) {
            return back()->with('error', 'Rental profile not found.');
        }

        // If trying to activate, validate required fields
        if (!$rental->is_active) {
            $errors = [];

            if (empty($rental->name)) {
                $errors['name'] = 'Rental name is required before making it visible.';
            }

            if (empty($rental->type)) {
                $errors['type'] = 'Rental type is required before making it visible.';
            }

            if (empty($rental->location)) {
                $errors['location'] = 'Location is required before making it visible.';
            }

            if (empty($rental->phone)) {
                $errors['phone'] = 'Phone number is required before making it visible.';
            }

            if (empty($rental->description)) {
                $errors['description'] = 'Description is required before making it visible.';
            }

            // Check if at least one image exists
            if ($rental->images()->count() === 0) {
                $errors['images'] = 'Please upload at least one image before making your rental visible.';
            }

            if (!empty($errors)) {
                // Map field names to user-friendly labels
                $fieldLabels = [
                    'name' => 'rental name',
                    'type' => 'rental type',
                    'location' => 'location',
                    'phone' => 'phone number',
                    'description' => 'description',
                    'images' => 'at least one image',
                ];

                $missingFields = [];
                foreach (array_keys($errors) as $field) {
                    $missingFields[] = $fieldLabels[$field] ?? $field;
                }

                $errorMessage = 'Error: Update your dashboard with ' . implode(', ', $missingFields);

                return back()->withErrors($errors)->with('error', $errorMessage);
            }
        }

        $rental->is_active = !$rental->is_active;
        $rental->save();

        return back()->with('success', $rental->is_active ? 'Rental is now visible.' : 'Rental is now hidden.');
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

        return redirect()->route('user.dashboard.index', ['category' => 'rentals'])
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

        $path = $request->file('image')->store('rentals/' . $rental->id, 'public');

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
            $path = $request->file('image')->store('rentals/' . $rental->id, 'public');
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

    // Feature Management Methods
    public function storeFeature(Request $request, Rental $rental): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'feature' => ['required', 'string', 'max:100'],
        ]);

        // Check if feature already exists
        $exists = $rental->features()->where('feature', $validated['feature'])->exists();
        if ($exists) {
            return back()->with('error', 'This feature already exists.');
        }

        $rental->features()->create($validated);

        return back()->with('success', 'Feature added successfully.');
    }

    public function destroyFeature(Rental $rental, \App\Models\RentalFeature $feature): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        $feature->delete();

        return back()->with('success', 'Feature removed successfully.');
    }
}
