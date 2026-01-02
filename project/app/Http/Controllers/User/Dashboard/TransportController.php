<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\TransportRide;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TransportController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $rides = $user->transportRides()->latest()->get();

        return Inertia::render('user/dashboard/transport/index', [
            'rides' => $rides,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('user/dashboard/transport/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'vehicle_type' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'price_per_ride' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $user = Auth::user();
        $user->transportRides()->create($validated);

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Ride listing created successfully.');
    }

    public function edit(TransportRide $transportRide): Response
    {
        $user = Auth::user();
        if ($transportRide->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/transport/edit', [
            'ride' => $transportRide,
        ]);
    }

    public function update(Request $request, TransportRide $transportRide): RedirectResponse
    {
        $user = Auth::user();
        if ($transportRide->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'vehicle_type' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'price_per_ride' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $transportRide->update($validated);

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Ride listing updated successfully.');
    }

    public function destroy(TransportRide $transportRide): RedirectResponse
    {
        $user = Auth::user();
        if ($transportRide->user_id !== $user->id) {
            abort(403);
        }

        $transportRide->delete();

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Ride listing deleted successfully.');
    }
}
