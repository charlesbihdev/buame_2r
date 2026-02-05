<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Artisan;
use App\Models\ArtisanPortfolio;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ArtisansController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): RedirectResponse
    {
        // Redirect to main dashboard - category content is rendered there
        return redirect()->route('user.dashboard.index', ['category' => 'artisans']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('user/dashboard/artisans/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        /** @var User $user */
        $user = Auth::user();
        $user->artisans()->create($validated);

        return redirect()->route('user.dashboard.index', ['category' => 'artisans'])
            ->with('success', 'Artisan listing created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artisan $artisan): Response
    {
        $user = Auth::user();
        if ($artisan->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/artisans/edit', [
            'artisan' => $artisan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Artisan $artisan): RedirectResponse
    {
        $user = Auth::user();
        if ($artisan->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'skill_type' => ['required', 'string', 'in:carpenter,mason,electrician,plumber,tiler,tailor,welder,painter,hairdressing,mechanic,bakery,decoration,makeup_artistry,bead_making,shoe_making,event_mc,event_planners,graphics_designer,radio_presenter,drivers,borehole_drillers,printer_repairers,tv_decoder_repairers,air_conditioning_installers,multi_tv_dstv_installers,phone_repairers,other'],
            'description' => ['nullable', 'string'],
            'experience_years' => ['nullable', 'integer', 'min:0'],
            'price_per_day' => ['nullable', 'numeric', 'min:0'],
            'show_price' => ['boolean'],
            'location' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['required', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'working_hours' => ['nullable', 'string', 'max:255'],
            'is_available' => ['boolean'],
            'specialties' => ['nullable', 'array'],
            'specialties.*' => ['string', 'max:255'],
            'profile_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'], // 5MB max
        ]);

        // Default experience_level to expert
        $validated['experience_level'] = 'expert';

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            // Delete old image if exists
            if ($artisan->profile_image) {
                $oldPath = str_replace(Storage::url(''), '', $artisan->profile_image);
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $imagePath = $request->file('profile_image')->store('artisans/profile', 'public');
            $validated['profile_image'] = Storage::url($imagePath);
        }

        $artisan->update($validated);

        // Handle specialties if provided
        if ($request->has('specialties') && is_array($request->specialties)) {
            $artisan->specialties()->delete();
            foreach ($request->specialties as $specialty) {
                if (! empty(trim($specialty))) {
                    $artisan->specialties()->create(['specialty' => trim($specialty)]);
                }
            }
        }

        return redirect()->route('user.dashboard.index', ['category' => 'artisans', 'section' => 'profile'])
            ->with('success', 'Profile updated successfully.');
    }

    /**
     * Toggle artisan active status.
     */
    public function toggleActive(Request $request): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $artisan = $user->artisans()->first();

        if (!$artisan) {
            return back()->with('error', 'Artisan profile not found.');
        }

        // If trying to activate, validate required fields
        if (!$artisan->is_active) {
            $errors = [];

            if (empty($artisan->name)) {
                $errors['name'] = 'Name is required before making your profile visible.';
            }

            if (empty($artisan->skill_type) || $artisan->skill_type === 'other') {
                $errors['skill_type'] = 'Skill type is required before making your profile visible.';
            }

            if (empty($artisan->location)) {
                $errors['location'] = 'Location is required before making your profile visible.';
            }

            if (empty($artisan->phone)) {
                $errors['phone'] = 'Phone number is required before making your profile visible.';
            }

            if (empty($artisan->description)) {
                $errors['description'] = 'Description is required before making your profile visible.';
            }

            if (empty($artisan->profile_image)) {
                $errors['profile_image'] = 'Please upload a profile image before making your profile visible.';
            }

            if (!empty($errors)) {
                // Map field names to user-friendly labels
                $fieldLabels = [
                    'name' => 'name',
                    'skill_type' => 'skill type',
                    'location' => 'location',
                    'phone' => 'phone number',
                    'description' => 'description',
                    'profile_image' => 'profile picture',
                ];

                $missingFields = [];
                foreach (array_keys($errors) as $field) {
                    $missingFields[] = $fieldLabels[$field] ?? $field;
                }

                $errorMessage = 'Error: Update your dashboard with ' . implode(', ', $missingFields);

                return back()->withErrors($errors)->with('error', $errorMessage);
            }
        }

        $artisan->is_active = !$artisan->is_active;
        $artisan->save();

        return back()->with('success', $artisan->is_active ? 'Profile is now visible.' : 'Profile is now hidden.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artisan $artisan): RedirectResponse
    {
        $user = Auth::user();
        if ($artisan->user_id !== $user->id) {
            abort(403);
        }

        $artisan->delete();

        return redirect()->route('user.dashboard.index', ['category' => 'artisans'])
            ->with('success', 'Artisan listing deleted successfully.');
    }

    /**
     * Store a portfolio item.
     */
    public function storePortfolio(Request $request): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $artisan = $user->artisans()->first();

        if (! $artisan) {
            return redirect()->route('user.dashboard.index', ['category' => 'artisans', 'section' => 'portfolio'])
                ->withErrors(['error' => 'Artisan profile not found.']);
        }

        $validated = $request->validate([
            'item' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'], // 5MB max
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $storedPath = $request->file('image')->store('artisans/portfolio', 'public');
            $imagePath = Storage::url($storedPath);
        }

        $artisan->portfolio()->create([
            'item' => $validated['item'],
            'image_path' => $imagePath,
        ]);

        return redirect()->route('user.dashboard.index', ['category' => 'artisans', 'section' => 'portfolio'])
            ->with('success', 'Portfolio item added successfully.');
    }

    /**
     * Update a portfolio item.
     */
    public function updatePortfolio(Request $request, ArtisanPortfolio $portfolio): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $artisan = $user->artisans()->first();

        if (! $artisan || $portfolio->artisan_id !== $artisan->id) {
            abort(403);
        }

        $validated = $request->validate([
            'item' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
        ]);

        $imagePath = $portfolio->image_path;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($portfolio->image_path) {
                $oldPath = str_replace(Storage::url(''), '', $portfolio->image_path);
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $storedPath = $request->file('image')->store('artisans/portfolio', 'public');
            $imagePath = Storage::url($storedPath);
        }

        $portfolio->update([
            'item' => $validated['item'],
            'image_path' => $imagePath,
        ]);

        return redirect()->route('user.dashboard.index', ['category' => 'artisans', 'section' => 'portfolio'])
            ->with('success', 'Portfolio item updated successfully.');
    }

    /**
     * Delete a portfolio item.
     */
    public function destroyPortfolio(ArtisanPortfolio $portfolio): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $artisan = $user->artisans()->first();

        if (! $artisan || $portfolio->artisan_id !== $artisan->id) {
            abort(403);
        }

        // Delete image if exists
        if ($portfolio->image_path) {
            $imagePath = str_replace('/storage/', '', $portfolio->image_path);
            Storage::disk('public')->delete($imagePath);
        }

        $portfolio->delete();

        return redirect()->route('user.dashboard.index', ['category' => 'artisans', 'section' => 'portfolio'])
            ->with('success', 'Portfolio item deleted successfully.');
    }
}
