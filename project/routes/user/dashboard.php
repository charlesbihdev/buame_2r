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
    Route::post('/switch-category', [DashboardController::class, 'switchCategory'])->name('switch-category');

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

    // Transport routes
    Route::resource('transport', TransportController::class)->except(['show']);

    // Rentals routes
    Route::resource('rentals', RentalsController::class)->except(['show']);

    // Jobs routes
    Route::resource('jobs', JobsController::class)->except(['show']);
});
