<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AdminRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminCreateRequest;
use App\Http\Requests\Admin\AdminUpdateRequest;
use App\Models\Admin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AdminManagementController extends Controller
{
    public function index(): Response
    {
        $admins = Admin::latest()->paginate(20);

        return Inertia::render('admin/admins/index', [
            'admins' => $admins,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/admins/create', [
            'roles' => collect(AdminRole::cases())->map(fn($r) => [
                'value' => $r->value,
                'label' => $r->label(),
            ]),
        ]);
    }

    public function store(AdminCreateRequest $request): RedirectResponse
    {
        Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_active' => true,
        ]);

        return redirect()->route('admin.admins.index')
            ->with('success', 'Admin created successfully.');
    }

    public function edit(Admin $admin): Response
    {
        return Inertia::render('admin/admins/edit', [
            'adminUser' => $admin,
            'roles' => collect(AdminRole::cases())->map(fn($r) => [
                'value' => $r->value,
                'label' => $r->label(),
            ]),
        ]);
    }

    public function update(AdminUpdateRequest $request, Admin $admin): RedirectResponse
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $admin->update($data);

        return redirect()->route('admin.admins.index')
            ->with('success', 'Admin updated successfully.');
    }

    public function toggleActive(Admin $admin): RedirectResponse
    {
        // Prevent self-deactivation
        if ($admin->id === Auth::guard('admin')->id()) {
            return back()->with('error', 'You cannot deactivate your own account.');
        }

        $admin->update(['is_active' => !$admin->is_active]);

        $message = $admin->is_active
            ? "Admin '{$admin->name}' has been activated."
            : "Admin '{$admin->name}' has been deactivated.";

        return back()->with('success', $message);
    }
}
