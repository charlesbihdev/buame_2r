<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Rental;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RentalsController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $rentals = $user->rentals()->latest()->get();

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
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'price_per_month' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $user = Auth::user();
        $user->rentals()->create($validated);

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Rental listing created successfully.');
    }

    public function edit(Rental $rental): Response
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/rentals/edit', [
            'rental' => $rental,
        ]);
    }

    public function update(Request $request, Rental $rental): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'price_per_month' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $rental->update($validated);

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Rental listing updated successfully.');
    }

    public function destroy(Rental $rental): RedirectResponse
    {
        $user = Auth::user();
        if ($rental->user_id !== $user->id) {
            abort(403);
        }

        $rental->delete();

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Rental listing deleted successfully.');
    }
}
