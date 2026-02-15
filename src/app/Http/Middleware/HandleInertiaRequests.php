<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        // Format admin for shared props if authenticated via admin guard
        $admin = null;
        if (Auth::guard('admin')->check()) {
            $adminModel = Auth::guard('admin')->user();
            $admin = $this->formatAdmin($adminModel);
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'admin' => $admin,
            'categories' => config('categories.list'),
            'marketplaceCategories' => config('categories.marketplace_categories'),
            'flash' => [
                'error' => $request->session()->get('error'),
                'success' => $request->session()->get('success'),
                'info' => $request->session()->get('info'),
                'status' => $request->session()->get('status'),
                'warning' => $request->session()->get('warning'),
            ],
        ];
    }

    /**
     * Format admin model for Inertia shared props.
     * Matches the structure expected by AdminLayout component.
     */
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
