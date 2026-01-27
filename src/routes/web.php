<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Visitor Routes (Public - No Auth Required)
Route::get('/', function () {
    return Inertia::render('visitor/home');
})->name('home');

Route::get('/services', function () {
    return Inertia::render('visitor/services');
})->name('services');

Route::get('/about', function () {
    return Inertia::render('visitor/about');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('visitor/contact');
})->name('contact');

Route::get('/marketplace', [\App\Http\Controllers\Visitor\MarketplaceController::class, 'index'])->name('marketplace');

Route::get('/food-stay', function () {
    return Inertia::render('visitor/food-stay');
})->name('food-stay');

Route::get('/jobs', [\App\Http\Controllers\Visitor\JobsController::class, 'index'])->name('jobs');

Route::get('/join-as-provider', function () {
    return Inertia::render('user/choose-path');
})->name('join-as-provider');

Route::get('/choose-path', function () {
    return Inertia::render('user/choose-path');
})->name('choose-path');

Route::get('/artisans', [\App\Http\Controllers\Visitor\ArtisansController::class, 'index'])->name('artisans');

Route::get('/hotels', [\App\Http\Controllers\Visitor\HotelsController::class, 'index'])->name('hotels');

Route::get('/transport', [\App\Http\Controllers\Visitor\TransportController::class, 'index'])->name('transport');

Route::get('/rentals', [\App\Http\Controllers\Visitor\RentalsController::class, 'index'])->name('rentals');

Route::get('/rentals/{id}', [\App\Http\Controllers\Visitor\RentalsController::class, 'show'])->name('rentals.view');

Route::get('/store/{slug}', [\App\Http\Controllers\Visitor\StoreController::class, 'show'])->name('store.show');

Route::get('/restaurants', function () {
    return Inertia::render('visitor/restaurants');
})->name('restaurants');

// View pages for categories
Route::get('/artisans/{id}', [\App\Http\Controllers\Visitor\ArtisansController::class, 'show'])->name('artisans.view');

Route::get('/hotels/{id}', [\App\Http\Controllers\Visitor\HotelsController::class, 'show'])->name('hotels.view');

Route::get('/transport/{id}', [\App\Http\Controllers\Visitor\TransportController::class, 'show'])->name('transport.view');

Route::get('/marketplace/{marketplaceProduct:id}', [\App\Http\Controllers\Visitor\MarketplaceController::class, 'show'])->name('marketplace.view');

Route::get('/jobs/employer/{slug}', [\App\Http\Controllers\Visitor\JobPosterController::class, 'show'])->name('jobs.employer');

Route::get('/jobs/{job}', [\App\Http\Controllers\Visitor\JobsController::class, 'show'])->name('jobs.view');

// Review submission route
Route::post('/reviews/{type}/{id}', [\App\Http\Controllers\Visitor\ReviewController::class, 'store'])->name('reviews.store');

// Dashboard route moved to routes/user/dashboard.php

// Paystack Payment Routes
Route::get('/payment/callback', [\App\Http\Controllers\PaymentController::class, 'handleCallback'])
    ->name('payment.callback');

// Paystack Webhook (must be outside auth middleware and exclude CSRF)
Route::post('/payment/webhook', [\App\Http\Controllers\PaymentController::class, 'handleWebhook'])
    ->name('paystack.webhook')
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class]);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
