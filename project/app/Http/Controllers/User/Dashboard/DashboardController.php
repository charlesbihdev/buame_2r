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
     * Show the main dashboard.
     * Category is determined by ?category= query string.
     * Section is determined by ?section= query string.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $user = Auth::user();

        if (! $user) {
            return redirect()->route('user.login');
        }

        // Get paid categories
        $paidCategories = $user->categories()
            ->whereHas('payment', function ($query) {
                $query->where('status', 'completed');
            })
            ->with('payment')
            ->get();

        // If no paid categories, redirect to category selection for payment
        if ($paidCategories->isEmpty()) {
            return redirect()->route('user.register.category')
                ->with('info', 'Please select a category and complete payment to access your dashboard.');
        }

        // Get category from query string, default to first paid category
        $paidCategoryList = $paidCategories->pluck('category')->toArray();
        $requestedCategory = $request->query('category');

        // Validate requested category - must be one of user's paid categories
        if ($requestedCategory && in_array($requestedCategory, $paidCategoryList)) {
            $activeCategory = $requestedCategory;
        } else {
            // Default to first paid category
            $activeCategory = $paidCategoryList[0] ?? null;
        }

        // Default section based on category
        $defaultSection = match ($activeCategory) {
            'marketplace' => 'store',
            default => 'profile',
        };
        $activeSection = $request->query('section', $defaultSection);

        // Get category-specific data based on active category
        $categoryData = $this->getCategoryData($user, $activeCategory);

        // Get all categories (paid and unpaid) for switcher
        $allCategories = ['artisans', 'hotels', 'transport', 'rentals', 'marketplace', 'jobs'];
        $unpaidCategories = collect($allCategories)
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

        // Build categories from config for PaymentModal
        $categories = [];
        foreach (config('categories.list', []) as $key => $categoryConfig) {
            $categories[$key] = [
                'label' => $categoryConfig['label'],
                'description' => $categoryConfig['description'],
                'price' => $categoryConfig['price'],
            ];
            // Add tiers for marketplace
            if ($key === 'marketplace' && isset($categoryConfig['tiers'])) {
                $categories[$key]['tiers'] = $categoryConfig['tiers'];
            }
        }

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
            'activeCategory' => $activeCategory,
            'activeSection' => $activeSection,
            'categoryData' => $categoryData,
            'payments' => $payments,
            'categories' => $categories,
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
                'store' => $user->store ? [
                    'id' => $user->store->id,
                    'name' => $user->store->name,
                    'slug' => $user->store->slug,
                    'description' => $user->store->description,
                    'tier' => $user->store->tier,
                    'is_active' => $user->store->is_active,
                    'product_limit' => $user->store->product_limit,
                    'remaining_slots' => $user->store->remaining_product_slots,
                    'products_count' => $user->store->products()->count(),
                ] : null,
                'products' => $user->marketplaceProducts()->with(['images', 'specifications', 'store'])->latest()->get(),
                'tiers' => config('categories.list.marketplace.tiers', []),
                'stats' => [
                    'total' => $user->marketplaceProducts()->count(),
                    'active' => $user->marketplaceProducts()->where('is_active', true)->count(),
                    'views' => $user->marketplaceProducts()->sum('views_count'),
                ],
            ],
            'hotels' => [
                'profile' => $profileService->getOrCreateProfile($user, 'hotels'),
                'listings' => $user->hotels()->latest()->get(),
                'stats' => [
                    'total' => $user->hotels()->count(),
                    'active' => $user->hotels()->where('is_active', true)->count(),
                    'views' => $user->hotels()->sum('views_count'),
                ],
            ],
            'transport' => [
                'profile' => $profileService->getOrCreateProfile($user, 'transport'),
                'listings' => $user->transportRides()->latest()->get(),
                'stats' => [
                    'total' => $user->transportRides()->count(),
                    'active' => $user->transportRides()->where('is_active', true)->count(),
                    'views' => $user->transportRides()->sum('views_count'),
                ],
            ],
            'rentals' => [
                'profile' => $profileService->getOrCreateProfile($user, 'rentals'),
                'listings' => $user->rentals()->latest()->get(),
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
