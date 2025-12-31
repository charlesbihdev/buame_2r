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

Route::get('/marketplace', function () {
    return Inertia::render('visitor/marketplace/index');
})->name('marketplace');

Route::get('/food-stay', function () {
    return Inertia::render('visitor/food-stay');
})->name('food-stay');

Route::get('/jobs', function () {
    return Inertia::render('visitor/jobs/index');
})->name('jobs');

Route::get('/join-as-provider', function () {
    return Inertia::render('visitor/join-as-provider');
})->name('join-as-provider');

Route::get('/artisans', function () {
    return Inertia::render('visitor/artisans/index');
})->name('artisans');

Route::get('/hotels', function () {
    return Inertia::render('visitor/hotels/index');
})->name('hotels');

Route::get('/transport', function () {
    return Inertia::render('visitor/transport/index');
})->name('transport');

Route::get('/rentals', function () {
    return Inertia::render('visitor/rentals/index');
})->name('rentals');

Route::get('/rentals/{id}', function ($id) {
    return Inertia::render('visitor/rentals/view', ['rental' => null]);
})->name('rentals.view');

Route::get('/restaurants', function () {
    return Inertia::render('visitor/restaurants');
})->name('restaurants');

// View pages for categories
Route::get('/artisans/{id}', function ($id) {
    return Inertia::render('visitor/artisans/view', ['artisan' => null]);
})->name('artisans.view');

Route::get('/hotels/{id}', function ($id) {
    return Inertia::render('visitor/hotels/view', ['hotel' => null]);
})->name('hotels.view');

Route::get('/transport/{id}', function ($id) {
    return Inertia::render('visitor/transport/view', ['ride' => null]);
})->name('transport.view');

Route::get('/marketplace/{id}', function ($id) {
    return Inertia::render('visitor/marketplace/view', ['product' => null]);
})->name('marketplace.view');

Route::get('/jobs/{id}', function ($id) {
    return Inertia::render('visitor/jobs/view', ['job' => null]);
})->name('jobs.view');

// Dashboard Routes (Auth Required)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
