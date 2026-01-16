<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\User\Dashboard\ArtisansController;
use App\Http\Controllers\User\Dashboard\DashboardController;
use App\Http\Controllers\User\Dashboard\HotelsController;
use App\Http\Controllers\User\Dashboard\JobsController;
use App\Http\Controllers\User\Dashboard\MarketplaceController;
use App\Http\Controllers\User\Dashboard\RentalsController;
use App\Http\Controllers\User\Dashboard\StoreController;
use App\Http\Controllers\User\Dashboard\TransportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('user/dashboard')->name('user.dashboard.')->group(function () {
    // Dashboard index - always accessible
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    // Payment route - always accessible (for renewals)
    Route::post('/payment/initialize', [PaymentController::class, 'processPayment'])->name('payment.initialize');

    // ========== ARTISANS ==========
    // Read routes (no subscription check)
    Route::get('artisans', [ArtisansController::class, 'index'])->name('artisans.index');
    Route::get('artisans/create', [ArtisansController::class, 'create'])->name('artisans.create');
    Route::get('artisans/{artisan}/edit', [ArtisansController::class, 'edit'])->name('artisans.edit');

    // Write routes (require active subscription)
    Route::middleware(['subscription.active:artisans'])->group(function () {
        Route::post('artisans/toggle-active', [ArtisansController::class, 'toggleActive'])->name('artisans.toggle-active');
        Route::post('artisans', [ArtisansController::class, 'store'])->name('artisans.store');
        Route::put('artisans/{artisan}', [ArtisansController::class, 'update'])->name('artisans.update');
        Route::patch('artisans/{artisan}', [ArtisansController::class, 'update']);
        Route::delete('artisans/{artisan}', [ArtisansController::class, 'destroy'])->name('artisans.destroy');
        Route::post('artisans/portfolio', [ArtisansController::class, 'storePortfolio'])->name('artisans.portfolio.store');
        Route::put('artisans/portfolio/{portfolio}', [ArtisansController::class, 'updatePortfolio'])->name('artisans.portfolio.update');
        Route::delete('artisans/portfolio/{portfolio}', [ArtisansController::class, 'destroyPortfolio'])->name('artisans.portfolio.destroy');
    });

    // ========== MARKETPLACE ==========
    // Read routes (no subscription check)
    Route::get('marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');
    Route::get('marketplace/create', [MarketplaceController::class, 'create'])->name('marketplace.create');
    Route::get('marketplace/{marketplace}/edit', [MarketplaceController::class, 'edit'])->name('marketplace.edit');

    // Write routes (require active subscription)
    Route::middleware(['subscription.active:marketplace'])->group(function () {
        Route::post('marketplace', [MarketplaceController::class, 'store'])->name('marketplace.store');

        // Store routes MUST come before parameterized routes to avoid route conflicts
        Route::post('marketplace/store/toggle-active', [StoreController::class, 'toggleActive'])->name('marketplace.store.toggle-active');
        Route::put('marketplace/store', [StoreController::class, 'update'])->name('marketplace.store.update');
        Route::post('marketplace/store/upgrade', [StoreController::class, 'upgrade'])->name('marketplace.store.upgrade');

        // Parameterized routes come after specific routes
        Route::put('marketplace/{marketplace}', [MarketplaceController::class, 'update'])->name('marketplace.update');
        Route::patch('marketplace/{marketplace}', [MarketplaceController::class, 'update']);
        Route::delete('marketplace/{marketplace}', [MarketplaceController::class, 'destroy'])->name('marketplace.destroy');
    });

    // ========== HOTELS ==========
    // Read routes (no subscription check)
    Route::get('hotels', [HotelsController::class, 'index'])->name('hotels.index');
    Route::get('hotels/create', [HotelsController::class, 'create'])->name('hotels.create');
    Route::get('hotels/{hotel}/edit', [HotelsController::class, 'edit'])->name('hotels.edit');

    // Write routes (require active subscription)
    Route::middleware(['subscription.active:hotels'])->group(function () {
        Route::post('hotels/toggle-active', [HotelsController::class, 'toggleActive'])->name('hotels.toggle-active');
        Route::post('hotels', [HotelsController::class, 'store'])->name('hotels.store');
        Route::put('hotels/{hotel}', [HotelsController::class, 'update'])->name('hotels.update');
        Route::patch('hotels/{hotel}', [HotelsController::class, 'update']);
        Route::delete('hotels/{hotel}', [HotelsController::class, 'destroy'])->name('hotels.destroy');
        // Hotel image management routes
        Route::post('hotels/images', [HotelsController::class, 'storeImage'])->name('hotels.images.store');
        Route::post('hotels/images/{image}', [HotelsController::class, 'updateImage'])->name('hotels.images.update');
        Route::put('hotels/images/{image}/primary', [HotelsController::class, 'setPrimaryImage'])->name('hotels.images.primary');
        Route::delete('hotels/images/{image}', [HotelsController::class, 'destroyImage'])->name('hotels.images.destroy');
    });

    // ========== TRANSPORT ==========
    // Read routes (no subscription check)
    Route::get('transport', [TransportController::class, 'index'])->name('transport.index');
    Route::get('transport/create', [TransportController::class, 'create'])->name('transport.create');
    Route::get('transport/{transport}/edit', [TransportController::class, 'edit'])->name('transport.edit');

    // Write routes (require active subscription)
    Route::middleware(['subscription.active:transport'])->group(function () {
        Route::post('transport/toggle-active', [TransportController::class, 'toggleActive'])->name('transport.toggle-active');
        Route::post('transport', [TransportController::class, 'store'])->name('transport.store');
        Route::put('transport/{transport}', [TransportController::class, 'update'])->name('transport.update');
        Route::patch('transport/{transport}', [TransportController::class, 'update']);
        Route::delete('transport/{transport}', [TransportController::class, 'destroy'])->name('transport.destroy');
        // Transport image management routes
        Route::post('transport/images', [TransportController::class, 'storeImage'])->name('transport.images.store');
        Route::post('transport/images/{image}', [TransportController::class, 'updateImage'])->name('transport.images.update');
        Route::put('transport/images/{image}/primary', [TransportController::class, 'setPrimaryImage'])->name('transport.images.primary');
        Route::delete('transport/images/{image}', [TransportController::class, 'destroyImage'])->name('transport.images.destroy');
    });

    // ========== RENTALS ==========
    // Read routes (no subscription check)
    Route::get('rentals', [RentalsController::class, 'index'])->name('rentals.index');
    Route::get('rentals/create', [RentalsController::class, 'create'])->name('rentals.create');
    Route::get('rentals/{rental}/edit', [RentalsController::class, 'edit'])->name('rentals.edit');

    // Write routes (require active subscription)
    Route::middleware(['subscription.active:rentals'])->group(function () {
        Route::post('rentals/toggle-active', [RentalsController::class, 'toggleActive'])->name('rentals.toggle-active');
        Route::post('rentals', [RentalsController::class, 'store'])->name('rentals.store');
        Route::put('rentals/{rental}', [RentalsController::class, 'update'])->name('rentals.update');
        Route::patch('rentals/{rental}', [RentalsController::class, 'update']);
        Route::delete('rentals/{rental}', [RentalsController::class, 'destroy'])->name('rentals.destroy');
        Route::post('rentals/{rental}/images', [RentalsController::class, 'storeImage'])->name('rentals.images.store');
        Route::post('rentals/{rental}/images/{image}', [RentalsController::class, 'updateImage'])->name('rentals.images.update');
        Route::delete('rentals/{rental}/images/{image}', [RentalsController::class, 'destroyImage'])->name('rentals.images.destroy');
        Route::put('rentals/{rental}/images/{image}/primary', [RentalsController::class, 'setPrimaryImage'])->name('rentals.images.primary');
        Route::post('rentals/{rental}/features', [RentalsController::class, 'storeFeature'])->name('rentals.features.store');
        Route::delete('rentals/{rental}/features/{feature}', [RentalsController::class, 'destroyFeature'])->name('rentals.features.destroy');
    });

    // ========== JOBS ==========
    // Read routes (no subscription check)
    Route::get('jobs', [JobsController::class, 'index'])->name('jobs.index');
    Route::get('jobs/create', [JobsController::class, 'create'])->name('jobs.create');
    Route::get('jobs/{job}/edit', [JobsController::class, 'edit'])->name('jobs.edit');

    // Write routes (require active subscription)
    Route::middleware(['subscription.active:jobs'])->group(function () {
        Route::post('jobs/toggle-active', [JobsController::class, 'toggleActive'])->name('jobs.toggle-active');
        Route::post('jobs', [JobsController::class, 'store'])->name('jobs.store');
        Route::put('jobs/{job}', [JobsController::class, 'update'])->name('jobs.update');
        Route::patch('jobs/{job}', [JobsController::class, 'update']);
        Route::delete('jobs/{job}', [JobsController::class, 'destroy'])->name('jobs.destroy');
    });
});
