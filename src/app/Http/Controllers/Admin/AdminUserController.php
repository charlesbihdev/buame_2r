<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::with(['categories.payment'])
            ->withCount(['marketplaceProducts', 'artisans', 'hotels', 'transportRides', 'rentals', 'jobs'])
            ->latest();

        // Search filter
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($status = $request->query('status')) {
            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'blocked') {
                $query->where('is_active', false);
            }
        }

        // Verification filter
        if ($verified = $request->query('verified')) {
            if ($verified === 'yes') {
                $query->whereNotNull('phone_verified_at');
            } elseif ($verified === 'no') {
                $query->whereNull('phone_verified_at');
            }
        }

        $users = $query->paginate(20)->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'status', 'verified']),
        ]);
    }

    public function show(User $user): Response
    {
        $user->load([
            'categories.payment',
            'payments' => fn($q) => $q->latest()->take(10),
            'store',
            'marketplaceProducts' => fn($q) => $q->with('images')->latest()->take(10),
            'artisans' => fn($q) => $q->latest()->take(5),
            'hotels' => fn($q) => $q->latest()->take(5),
            'transportRides' => fn($q) => $q->latest()->take(5),
            'rentals' => fn($q) => $q->latest()->take(5),
            'jobs' => fn($q) => $q->latest()->take(5),
        ]);

        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    public function toggleBlock(User $user): RedirectResponse
    {
        $user->update(['is_active' => !$user->is_active]);

        $message = $user->is_active
            ? "User '{$user->name}' has been unblocked."
            : "User '{$user->name}' has been blocked.";

        return back()->with('success', $message);
    }

    public function verifyManually(User $user): RedirectResponse
    {
        if ($user->hasVerifiedPhone()) {
            return back()->with('info', 'User is already verified.');
        }

        $user->markPhoneAsVerified();

        return back()->with('success', "User '{$user->name}' has been manually verified.");
    }
}
