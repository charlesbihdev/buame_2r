<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HotelsController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $hotels = $user->hotels()->latest()->get();

        return Inertia::render('user/dashboard/hotels/index', [
            'hotels' => $hotels,
        ]);
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

        $user = Auth::user();
        $user->hotels()->create($validated);

        return redirect()->route('user.dashboard.index')
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

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'price_per_night' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $hotel->update($validated);

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Hotel listing updated successfully.');
    }

    public function destroy(Hotel $hotel): RedirectResponse
    {
        $user = Auth::user();
        if ($hotel->user_id !== $user->id) {
            abort(403);
        }

        $hotel->delete();

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Hotel listing deleted successfully.');
    }
}
