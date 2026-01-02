<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\User\Auth\AuthenticatedSessionController;
use App\Http\Controllers\User\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| User (Category Users) Authentication Routes
|--------------------------------------------------------------------------
|
| These routes handle phone-based authentication for category users
| (artisans, hotel owners, marketplace vendors, etc.)
|
*/

Route::prefix('user')->name('user.')->middleware('guest')->group(function () {
    // Registration routes
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('register/verify-otp', [RegisteredUserController::class, 'showVerify'])
        ->name('register.verify');

    Route::post('register/verify-otp', [RegisteredUserController::class, 'verifyOtp']);

    Route::get('register/category', [RegisteredUserController::class, 'showCategorySelection'])
        ->name('register.category');

    Route::post('register/category', [RegisteredUserController::class, 'selectCategory']);

    Route::get('register/payment', [RegisteredUserController::class, 'showPayment'])
        ->name('register.payment');

    Route::post('register/payment', [PaymentController::class, 'processPayment']);

    Route::post('register/resend-otp', [RegisteredUserController::class, 'resendOtp'])
        ->name('register.resend-otp');

    // Login routes
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('login/verify-otp', [AuthenticatedSessionController::class, 'showVerify'])
        ->name('login.verify');

    Route::post('login/verify-otp', [AuthenticatedSessionController::class, 'verifyOtp']);

    Route::post('login/resend-otp', [AuthenticatedSessionController::class, 'resendOtp'])
        ->name('login.resend-otp');
});

Route::prefix('user')->name('user.')->middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
