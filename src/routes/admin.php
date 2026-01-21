<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminManagementController;
use App\Http\Controllers\Admin\AdminMarketplaceController;
use App\Http\Controllers\Admin\AdminRevenueController;
use App\Http\Controllers\Admin\AdminSubscriptionController;
use App\Http\Controllers\Admin\AdminTestimonialsController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\Auth\AdminAuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| These routes handle the admin dashboard functionality including
| authentication, user management, marketplace moderation, and
| super admin features like revenue and admin management.
|
*/

// Admin Authentication (Guest only)
Route::prefix('admin')->name('admin.')->middleware('guest:admin')->group(function () {
    Route::get('login', [AdminAuthController::class, 'create'])->name('login');
    Route::post('login', [AdminAuthController::class, 'store']);
});

// Admin Dashboard (Authenticated)
Route::prefix('admin')->name('admin.')->middleware(['admin.auth'])->group(function () {
    // Logout
    Route::post('logout', [AdminAuthController::class, 'destroy'])->name('logout');

    // Dashboard
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // User Management (All Admins)
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [AdminUserController::class, 'index'])->name('index');
        Route::get('/{user}', [AdminUserController::class, 'show'])->name('show');
        Route::post('/{user}/toggle-block', [AdminUserController::class, 'toggleBlock'])->name('toggle-block');
        Route::post('/{user}/verify', [AdminUserController::class, 'verifyManually'])->name('verify');
    });

    // Marketplace Moderation (All Admins)
    Route::prefix('marketplace')->name('marketplace.')->group(function () {
        Route::get('/', [AdminMarketplaceController::class, 'index'])->name('index');
        Route::get('/pending', [AdminMarketplaceController::class, 'pending'])->name('pending');
        Route::get('/{product}', [AdminMarketplaceController::class, 'show'])->name('show');
        Route::post('/{product}/approve', [AdminMarketplaceController::class, 'approve'])->name('approve');
        Route::post('/{product}/reject', [AdminMarketplaceController::class, 'reject'])->name('reject');
        Route::post('/{product}/toggle-active', [AdminMarketplaceController::class, 'toggleActive'])->name('toggle-active');
    });

    // Testimonials (All Admins - Placeholder)
    Route::get('/testimonials', [AdminTestimonialsController::class, 'index'])->name('testimonials.index');

    // Super Admin Only Routes
    Route::middleware(['admin.super'])->group(function () {
        // Subscriptions
        Route::prefix('subscriptions')->name('subscriptions.')->group(function () {
            Route::get('/', [AdminSubscriptionController::class, 'index'])->name('index');
            Route::get('/analytics', [AdminSubscriptionController::class, 'analytics'])->name('analytics');
        });

        // Revenue
        Route::prefix('revenue')->name('revenue.')->group(function () {
            Route::get('/', [AdminRevenueController::class, 'index'])->name('index');
            Route::get('/export', [AdminRevenueController::class, 'export'])->name('export');
        });

        // Admin Management
        Route::prefix('admins')->name('admins.')->group(function () {
            Route::get('/', [AdminManagementController::class, 'index'])->name('index');
            Route::get('/create', [AdminManagementController::class, 'create'])->name('create');
            Route::post('/', [AdminManagementController::class, 'store'])->name('store');
            Route::get('/{admin}/edit', [AdminManagementController::class, 'edit'])->name('edit');
            Route::put('/{admin}', [AdminManagementController::class, 'update'])->name('update');
            Route::post('/{admin}/toggle-active', [AdminManagementController::class, 'toggleActive'])->name('toggle-active');
        });
    });
});
