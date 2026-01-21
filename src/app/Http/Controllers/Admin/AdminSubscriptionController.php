<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BillingCycle;
use App\Enums\SubscriptionStatus;
use App\Http\Controllers\Controller;
use App\Models\UserCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminSubscriptionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = UserCategory::with(['user:id,name,phone,email', 'payment'])
            ->latest();

        // Category filter
        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        // Status filter
        if ($status = $request->query('status')) {
            $query->where('subscription_status', $status);
        }

        // Billing cycle filter
        if ($cycle = $request->query('billing_cycle')) {
            $query->where('billing_cycle', $cycle);
        }

        // Search by user
        if ($search = $request->query('search')) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $subscriptions = $query->paginate(20)->withQueryString();

        return Inertia::render('admin/subscriptions/index', [
            'subscriptions' => $subscriptions,
            'filters' => $request->only(['category', 'status', 'billing_cycle', 'search']),
            'categories' => array_keys(config('categories.list', [])),
            'statuses' => collect(SubscriptionStatus::cases())->map(fn($s) => [
                'value' => $s->value,
                'label' => $s->label(),
            ]),
            'billingCycles' => collect(BillingCycle::cases())->map(fn($c) => [
                'value' => $c->value,
                'label' => $c->label(),
            ]),
        ]);
    }

    public function analytics(Request $request): Response
    {
        $dateRange = (int) $request->query('range', 30);
        $startDate = now()->subDays($dateRange);

        // Subscriptions by category
        $byCategory = UserCategory::select('category', DB::raw('count(*) as count'))
            ->where('subscription_status', SubscriptionStatus::Active)
            ->groupBy('category')
            ->get()
            ->mapWithKeys(fn($item) => [$item->category => $item->count]);

        // Subscriptions by status
        $byStatus = UserCategory::select('subscription_status', DB::raw('count(*) as count'))
            ->groupBy('subscription_status')
            ->get()
            ->mapWithKeys(fn($item) => [$item->subscription_status->label() => $item->count]);

        // Subscriptions by billing cycle
        $byBillingCycle = UserCategory::select('billing_cycle', DB::raw('count(*) as count'))
            ->where('subscription_status', SubscriptionStatus::Active)
            ->groupBy('billing_cycle')
            ->get()
            ->mapWithKeys(fn($item) => [$item->billing_cycle->label() => $item->count]);

        // New subscriptions in date range
        $newSubscriptions = UserCategory::where('created_at', '>=', $startDate)->count();

        // Expiring soon (within 7 days)
        $expiringSoon = UserCategory::where('subscription_status', SubscriptionStatus::Active)
            ->whereBetween('expires_at', [now(), now()->addDays(7)])
            ->count();

        // Recently expired
        $recentlyExpired = UserCategory::where('subscription_status', SubscriptionStatus::Expired)
            ->where('expires_at', '>=', now()->subDays(30))
            ->count();

        // Trend data (subscriptions per day)
        $trend = UserCategory::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where('created_at', '>=', $startDate)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('admin/subscriptions/analytics', [
            'analytics' => [
                'byCategory' => $byCategory,
                'byStatus' => $byStatus,
                'byBillingCycle' => $byBillingCycle,
                'newSubscriptions' => $newSubscriptions,
                'expiringSoon' => $expiringSoon,
                'recentlyExpired' => $recentlyExpired,
                'trend' => $trend,
                'totalActive' => UserCategory::where('subscription_status', SubscriptionStatus::Active)->count(),
            ],
            'dateRange' => $dateRange,
        ]);
    }
}
