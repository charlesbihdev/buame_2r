<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\TransportImage;
use App\Models\TransportRide;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TransportController extends Controller
{
    use \App\Http\Traits\HasVideoLinks;

    protected function getVideoLinkableModel($request)
    {
        return Auth::user()->transportRides()->first();
    }

    public function index(): RedirectResponse
    {
        // Redirect to main dashboard - category content is rendered there
        return redirect()->route('user.dashboard.index', ['category' => 'transport']);
    }

    public function create(): Response
    {
        return Inertia::render('user/dashboard/transport/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'driver_name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:okada,car,taxi,bus,cargo,other'],
            'location' => ['required', 'string', 'max:255'],
            'price_per_seat' => ['nullable', 'numeric', 'min:0'],
            'seats_available' => ['nullable', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->transportRides()->create($validated);

        return redirect()->route('user.dashboard.index', ['category' => 'transport'])
            ->with('success', 'Transport service created successfully.');
    }

    public function edit(TransportRide $transport): Response
    {
        $user = Auth::user();
        if ($transport->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/transport/edit', [
            'ride' => $transport->load('images'),
        ]);
    }

    public function update(Request $request, TransportRide $transport): RedirectResponse
    {
        $user = Auth::user();
        if ($transport->user_id !== $user->id) {
            abort(403);
        }

        // Profile update - validate all fields
        $validated = $request->validate([
            'driver_name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:okada,car,taxi,bus,cargo,other'],
            'location' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'phone_2' => ['nullable', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'price_per_seat' => ['nullable', 'numeric', 'min:0'],
            'seats_available' => ['nullable', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
            'operating_hours' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'primary_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'], // 5MB max
        ]);

        // Handle primary image upload
        if ($request->hasFile('primary_image')) {
            // Delete old primary image if exists
            $oldPrimary = $transport->images()->where('is_primary', true)->first();
            if ($oldPrimary) {
                $oldPath = str_replace(Storage::url(''), '', $oldPrimary->image_path);
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
                $oldPrimary->delete();
            }

            // Store new primary image
            $imagePath = $request->file('primary_image')->store('transport/images', 'public');
            $transport->images()->create([
                'image_path' => Storage::url($imagePath),
                'is_primary' => true,
                'display_order' => 0,
            ]);
        }

        // Update transport data
        $transport->update([
            'driver_name' => $validated['driver_name'],
            'type' => $validated['type'],
            'location' => $validated['location'],
            'address' => $validated['address'] ?? null,
            'phone' => $validated['phone'],
            'phone_2' => $validated['phone_2'] ?? null,
            'whatsapp' => $validated['whatsapp'] ?? null,
            'email' => $validated['email'] ?? null,
            'price_per_seat' => $validated['price_per_seat'] ?? null,
            'seats_available' => $validated['seats_available'] ?? null,
            'description' => $validated['description'] ?? null,
            'operating_hours' => $validated['operating_hours'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('user.dashboard.index', ['category' => 'transport', 'section' => 'profile'])
            ->with('success', 'Transport profile updated successfully.');
    }

    /**
     * Toggle transport active status.
     */
    public function toggleActive(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $transport = $user->transportRides()->first();

        if (!$transport) {
            return back()->with('error', 'Transport profile not found.');
        }

        // If trying to activate, validate required fields
        if (!$transport->is_active) {
            $errors = [];

            if (empty($transport->driver_name)) {
                $errors['driver_name'] = 'Driver/Rider name is required before making it visible.';
            }

            if (empty($transport->type)) {
                $errors['type'] = 'Service type is required before making it visible.';
            }

            if (empty($transport->location)) {
                $errors['location'] = 'Location is required before making it visible.';
            }

            if (empty($transport->phone)) {
                $errors['phone'] = 'Phone number is required before making it visible.';
            }

            if (empty($transport->description)) {
                $errors['description'] = 'Description is required before making it visible.';
            }

            // Check if at least one image exists
            if ($transport->images()->count() === 0) {
                $errors['images'] = 'Please upload at least one image before making your service visible.';
            }

            if (!empty($errors)) {
                // Map field names to user-friendly labels
                $fieldLabels = [
                    'driver_name' => 'driver/rider name',
                    'type' => 'service type',
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

        $transport->is_active = !$transport->is_active;
        $transport->save();

        return back()->with('success', $transport->is_active ? 'Transport service is now visible.' : 'Transport service is now hidden.');
    }

    public function destroy(TransportRide $transport): RedirectResponse
    {
        $user = Auth::user();
        if ($transport->user_id !== $user->id) {
            abort(403);
        }

        // Delete all images
        foreach ($transport->images as $image) {
            $imagePath = str_replace(Storage::url(''), '', $image->image_path);
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $transport->delete();

        return redirect()->route('user.dashboard.index', ['category' => 'transport'])
            ->with('success', 'Transport service deleted successfully.');
    }

    /**
     * Store a transport image.
     */
    public function storeImage(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $transport = $user->transportRides()->first();

        if (! $transport) {
            return redirect()->route('user.dashboard.index', ['category' => 'transport', 'section' => 'gallery'])
                ->withErrors(['error' => 'Transport profile not found.']);
        }

        $validated = $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'], // 5MB max
            'is_primary' => ['boolean'],
        ]);

        $imagePath = $request->file('image')->store('transport/images', 'public');
        $storedPath = Storage::url($imagePath);

        // If setting as primary, unset other primary images
        if ($validated['is_primary'] ?? false) {
            $transport->images()->update(['is_primary' => false]);
        }

        // Get max display order
        $maxOrder = $transport->images()->max('display_order') ?? 0;

        $transport->images()->create([
            'image_path' => $storedPath,
            'is_primary' => $validated['is_primary'] ?? false,
            'display_order' => $maxOrder + 1,
        ]);

        return redirect()->route('user.dashboard.index', ['category' => 'transport', 'section' => 'gallery'])
            ->with('success', 'Image added successfully.');
    }

    /**
     * Update a transport image.
     */
    public function updateImage(Request $request, TransportImage $image): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $transport = $user->transportRides()->first();

        if (! $transport || $image->transport_id !== $transport->id) {
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
            $newPath = $request->file('image')->store('transport/images', 'public');
            $imagePath = Storage::url($newPath);
        }

        $image->update(['image_path' => $imagePath]);

        return redirect()->route('user.dashboard.index', ['category' => 'transport', 'section' => 'gallery'])
            ->with('success', 'Image updated successfully.');
    }

    /**
     * Set an image as primary.
     */
    public function setPrimaryImage(TransportImage $image): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $transport = $user->transportRides()->first();

        if (! $transport || $image->transport_id !== $transport->id) {
            abort(403);
        }

        // Unset all other primary images
        $transport->images()->update(['is_primary' => false]);

        // Set this as primary
        $image->update(['is_primary' => true]);

        return redirect()->route('user.dashboard.index', ['category' => 'transport', 'section' => 'gallery'])
            ->with('success', 'Primary image updated successfully.');
    }

    /**
     * Delete a transport image.
     */
    public function destroyImage(TransportImage $image): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $transport = $user->transportRides()->first();

        if (! $transport || $image->transport_id !== $transport->id) {
            abort(403);
        }

        // Delete image file
        $imagePath = str_replace(Storage::url(''), '', $image->image_path);
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        $image->delete();

        return redirect()->route('user.dashboard.index', ['category' => 'transport', 'section' => 'gallery'])
            ->with('success', 'Image deleted successfully.');
    }
}
