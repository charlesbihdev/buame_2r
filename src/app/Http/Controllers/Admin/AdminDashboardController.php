<?php

namespace App\Http\Controllers\Admin;

use App\Enums\SubscriptionStatus;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\MarketplaceProduct;
use App\Models\Payment;
use App\Models\User;
use App\Models\UserCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $admin = Auth::guard('admin')->user();

        $stats = [
            'total_users' => User::count(),
            'active_users' => User::where('is_active', true)->count(),
            'blocked_users' => User::where('is_active', false)->count(),
            'verified_users' => User::whereNotNull('phone_verified_at')->count(),
            'pending_products' => MarketplaceProduct::where('is_approved', false)->count(),
            'total_products' => MarketplaceProduct::count(),
            'approved_products' => MarketplaceProduct::where('is_approved', true)->count(),
        ];

        // Only show revenue and subscription stats for super admin
        if ($admin->isSuperAdmin()) {
            $stats['total_revenue'] = Payment::where('status', 'completed')->sum('amount');
            $stats['monthly_revenue'] = Payment::where('status', 'completed')
                ->whereMonth('paid_at', now()->month)
                ->whereYear('paid_at', now()->year)
                ->sum('amount');
            $stats['active_subscriptions'] = UserCategory::where('subscription_status', SubscriptionStatus::Active)->count();
            $stats['expiring_subscriptions'] = UserCategory::where('subscription_status', SubscriptionStatus::Active)
                ->whereBetween('expires_at', [now(), now()->addDays(7)])
                ->count();
            $stats['total_admins'] = Admin::count();
        }

        // Recent activity
        $recentUsers = User::latest()
            ->take(5)
            ->get(['id', 'name', 'phone', 'is_active', 'created_at']);

        $pendingProducts = MarketplaceProduct::with(['user:id,name', 'images'])
            ->where('is_approved', false)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard/index', [
            'admin' => $this->formatAdmin($admin),
            'stats' => $stats,
            'recentUsers' => $recentUsers,
            'pendingProducts' => $pendingProducts,
        ]);
    }

    private function formatAdmin(Admin $admin): array
    {
        return [
            'id' => $admin->id,
            'name' => $admin->name,
            'email' => $admin->email,
            'role' => $admin->role->value,
            'role_label' => $admin->role->label(),
            'is_super_admin' => $admin->isSuperAdmin(),
            'can_access_revenue' => $admin->canAccessRevenue(),
            'can_manage_admins' => $admin->canManageAdmins(),
        ];
    }
}
