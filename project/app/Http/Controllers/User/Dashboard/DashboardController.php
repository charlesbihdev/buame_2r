<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\CategoryProfileService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the main dashboard - redirects to first paid category.
     */
    public function index(): RedirectResponse
    {
        $user = Auth::user();

        if (! $user) {
            return redirect()->route('user.login');
        }

        // Get first paid category
        $firstPaidCategory = $user->categories()
            ->whereHas('payment', function ($query) {
                $query->where('status', 'completed');
            })
            ->first();

        // If no paid categories, redirect to choose path
        if (! $firstPaidCategory) {
            return redirect()->route('choose-path')
                ->with('info', 'Please select a category and complete payment to access your dashboard.');
        }

        // Redirect to first paid category
        return redirect()->route('user.dashboard.category', ['category' => $firstPaidCategory->category]);
    }

    /**
     * Show category-specific dashboard.
     */
    public function showCategory(Request $request, string $category): Response|RedirectResponse
    {
        $user = Auth::user();

        if (! $user) {
            return redirect()->route('user.login');
        }

        // Validate category
        if (! in_array($category, config('categories.valid'))) {
            return redirect()->route('user.dashboard.index');
        }

        $activeSection = $request->query('section', 'profile');

        // Get paid categories
        $paidCategories = $user->categories()
            ->whereHas('payment', function ($query) {
                $query->where('status', 'completed');
            })
            ->with('payment')
            ->get();

        // Check if user has access to this category
        $hasAccess = $paidCategories->contains('category', $category);

        if (! $hasAccess) {
            return redirect()->route('user.dashboard.index')
                ->withErrors(['category' => 'You need to pay for this category to access it.']);
        }

        // Get category-specific data
        $categoryData = $this->getCategoryData($user, $category);

        // Get all categories (paid and unpaid) for switcher
        $unpaidCategories = collect(config('categories.valid'))
            ->diff($paidCategories->pluck('category'))
            ->values()
            ->toArray();

        // Get payment history
        $payments = $user->payments()
            ->latest()
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'category' => $payment->category,
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'created_at' => $payment->created_at->toISOString(),
                ];
            });

        return Inertia::render('user/dashboard/index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'phone' => $user->phone,
                'email' => $user->email,
                'profile_image' => $user->profile_image,
            ],
            'paidCategories' => $paidCategories->map(function ($category) {
                return [
                    'category' => $category->category,
                    'payment_id' => $category->payment_id,
                    'expires_at' => $category->expires_at,
                ];
            }),
            'unpaidCategories' => $unpaidCategories,
            'activeCategory' => $category,
            'activeSection' => $activeSection,
            'categoryData' => $categoryData,
            'payments' => $payments,
        ]);
    }

    /**
     * Get category-specific data.
     */
    protected function getCategoryData($user, ?string $category): array
    {
        if (! $category) {
            return [];
        }

        $profileService = new CategoryProfileService;

        return match ($category) {
            'artisans' => [
                'profile' => $profileService->getOrCreateProfile($user, 'artisans'),
                'stats' => [
                    'total' => $user->artisans()->count(),
                    'active' => $user->artisans()->where('is_active', true)->count(),
                    'views' => $user->artisans()->sum('views_count'),
                ],
            ],
            'marketplace' => [
                'products' => $user->marketplaceProducts()->latest()->get(),
                'stats' => [
                    'total' => $user->marketplaceProducts()->count(),
                    'active' => $user->marketplaceProducts()->where('is_active', true)->count(),
                    'views' => $user->marketplaceProducts()->sum('views_count'),
                ],
            ],
            'hotels' => [
                'profile' => $profileService->getOrCreateProfile($user, 'hotels'),
                'listings' => $user->hotels()->with('images')->latest()->get(),
                'stats' => [
                    'total' => $user->hotels()->count(),
                    'active' => $user->hotels()->where('is_active', true)->count(),
                    'views' => $user->hotels()->sum('views_count'),
                ],
            ],
            'transport' => [
                'profile' => $profileService->getOrCreateProfile($user, 'transport'),
                'listings' => $user->transportRides()->with('images')->latest()->get(),
                'stats' => [
                    'total' => $user->transportRides()->count(),
                    'active' => $user->transportRides()->where('is_active', true)->count(),
                    'views' => $user->transportRides()->sum('views_count'),
                ],
            ],
            'rentals' => [
                'profile' => $profileService->getOrCreateProfile($user, 'rentals'),
                'listings' => $user->rentals()->with('images')->latest()->get(),
                'stats' => [
                    'total' => $user->rentals()->count(),
                    'active' => $user->rentals()->where('is_active', true)->count(),
                    'views' => $user->rentals()->sum('views_count'),
                ],
            ],
            'jobs' => [
                'profile' => $profileService->getOrCreateProfile($user, 'jobs'),
                'listings' => $user->jobs()->latest()->get(),
                'stats' => [
                    'total' => $user->jobs()->count(),
                    'active' => $user->jobs()->where('is_active', true)->count(),
                    'views' => $user->jobs()->sum('views_count'),
                    'applications' => $user->jobs()->sum('applications_count'),
                ],
            ],
            default => [],
        };
    }
}
