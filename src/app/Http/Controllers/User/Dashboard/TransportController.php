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
            'company_name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:okada,car,taxi,bus,cargo,other'],
            'location' => ['required', 'string', 'max:255'],
            'price_per_seat' => ['required', 'numeric', 'min:0'],
            'seats_available' => ['required', 'integer', 'min:1'],
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
            'company_name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:okada,car,taxi,bus,cargo,other'],
            'location' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'price_per_seat' => ['required', 'numeric', 'min:0'],
            'seats_available' => ['required', 'integer', 'min:1'],
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
            'company_name' => $validated['company_name'],
            'type' => $validated['type'],
            'location' => $validated['location'],
            'address' => $validated['address'] ?? null,
            'phone' => $validated['phone'],
            'whatsapp' => $validated['whatsapp'] ?? null,
            'email' => $validated['email'] ?? null,
            'price_per_seat' => $validated['price_per_seat'],
            'seats_available' => $validated['seats_available'],
            'description' => $validated['description'] ?? null,
            'operating_hours' => $validated['operating_hours'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('user.dashboard.index', ['category' => 'transport', 'section' => 'profile'])
            ->with('success', 'Transport profile updated successfully.');
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
