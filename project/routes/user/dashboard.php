<?php

use App\Http\Controllers\User\Dashboard\ArtisansController;
use App\Http\Controllers\User\Dashboard\DashboardController;
use App\Http\Controllers\User\Dashboard\HotelsController;
use App\Http\Controllers\User\Dashboard\JobsController;
use App\Http\Controllers\User\Dashboard\MarketplaceController;
use App\Http\Controllers\User\Dashboard\RentalsController;
use App\Http\Controllers\User\Dashboard\TransportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('user/dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('/{category}', [DashboardController::class, 'showCategory'])->name('category')->where('category', 'artisans|hotels|transport|rentals|marketplace|jobs');
    Route::post('/payment/initialize', [\App\Http\Controllers\PaymentController::class, 'processPayment'])->name('payment.initialize');

    // Artisans routes
    Route::resource('artisans', ArtisansController::class)->except(['show']);

    // Portfolio routes
    Route::post('artisans/portfolio', [ArtisansController::class, 'storePortfolio'])->name('artisans.portfolio.store');
    Route::put('artisans/portfolio/{portfolio}', [ArtisansController::class, 'updatePortfolio'])->name('artisans.portfolio.update');
    Route::delete('artisans/portfolio/{portfolio}', [ArtisansController::class, 'destroyPortfolio'])->name('artisans.portfolio.destroy');

    // Marketplace routes
    Route::resource('marketplace', MarketplaceController::class)->except(['show']);

    // Hotels routes
    Route::resource('hotels', HotelsController::class)->except(['show']);

    // Hotel images routes
    Route::post('hotels/images', [HotelsController::class, 'storeImage'])->name('hotels.images.store');
    Route::put('hotels/images/{image}', [HotelsController::class, 'updateImage'])->name('hotels.images.update');
    Route::post('hotels/images/{image}/set-primary', [HotelsController::class, 'setPrimaryImage'])->name('hotels.images.set-primary');
    Route::delete('hotels/images/{image}', [HotelsController::class, 'destroyImage'])->name('hotels.images.destroy');

    // Transport routes
    Route::resource('transport', TransportController::class)->except(['show']);

    // Transport images routes
    Route::post('transport/images', [TransportController::class, 'storeImage'])->name('transport.images.store');
    Route::put('transport/images/{image}', [TransportController::class, 'updateImage'])->name('transport.images.update');
    Route::post('transport/images/{image}/set-primary', [TransportController::class, 'setPrimaryImage'])->name('transport.images.set-primary');
    Route::delete('transport/images/{image}', [TransportController::class, 'destroyImage'])->name('transport.images.destroy');

    // Rentals routes
    Route::resource('rentals', RentalsController::class)->except(['show']);

    // Jobs routes
    Route::resource('jobs', JobsController::class)->except(['show']);
});
