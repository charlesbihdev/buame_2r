<?php

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
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    // Payment route for adding new categories from dashboard
    Route::post('/payment/initialize', [\App\Http\Controllers\PaymentController::class, 'processPayment'])->name('payment.initialize');

    // Artisans routes
    Route::resource('artisans', ArtisansController::class)->except(['show']);

    // Portfolio routes
    Route::post('artisans/portfolio', [ArtisansController::class, 'storePortfolio'])->name('artisans.portfolio.store');
    Route::put('artisans/portfolio/{portfolio}', [ArtisansController::class, 'updatePortfolio'])->name('artisans.portfolio.update');
    Route::delete('artisans/portfolio/{portfolio}', [ArtisansController::class, 'destroyPortfolio'])->name('artisans.portfolio.destroy');

    // Marketplace routes
    Route::resource('marketplace', MarketplaceController::class)->except(['show']);

    // Store routes
    Route::post('marketplace/store/toggle-active', [StoreController::class, 'toggleActive'])->name('marketplace.store.toggle-active');
    Route::put('marketplace/store', [StoreController::class, 'update'])->name('marketplace.store.update');
    Route::post('marketplace/store/upgrade', [StoreController::class, 'upgrade'])->name('marketplace.store.upgrade');

    // Hotels routes
    Route::resource('hotels', HotelsController::class)->except(['show']);

    // Transport routes
    Route::resource('transport', TransportController::class)->except(['show']);

    // Rentals routes
    Route::resource('rentals', RentalsController::class)->except(['show']);
    Route::post('rentals/{rental}/images', [RentalsController::class, 'storeImage'])->name('rentals.images.store');
    Route::post('rentals/{rental}/images/{image}', [RentalsController::class, 'updateImage'])->name('rentals.images.update');
    Route::delete('rentals/{rental}/images/{image}', [RentalsController::class, 'destroyImage'])->name('rentals.images.destroy');
    Route::put('rentals/{rental}/images/{image}/primary', [RentalsController::class, 'setPrimaryImage'])->name('rentals.images.primary');
    Route::post('rentals/{rental}/features', [RentalsController::class, 'storeFeature'])->name('rentals.features.store');
    Route::delete('rentals/{rental}/features/{feature}', [RentalsController::class, 'destroyFeature'])->name('rentals.features.destroy');

    // Jobs routes
    Route::resource('jobs', JobsController::class)->except(['show']);
});
