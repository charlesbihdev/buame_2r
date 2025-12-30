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
    return Inertia::render('visitor/marketplace');
})->name('marketplace');

Route::get('/food-stay', function () {
    return Inertia::render('visitor/food-stay');
})->name('food-stay');

Route::get('/jobs', function () {
    return Inertia::render('visitor/jobs');
})->name('jobs');

Route::get('/join-as-provider', function () {
    return Inertia::render('visitor/join-as-provider');
})->name('join-as-provider');

// Dashboard Routes (Auth Required)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
