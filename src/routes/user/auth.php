<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\User\Auth\AuthenticatedSessionController;
use App\Http\Controllers\User\Auth\PhoneNewPasswordController;
use App\Http\Controllers\User\Auth\PhonePasswordResetLinkController;
use App\Http\Controllers\User\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| User (Category Users) Authentication Routes
|--------------------------------------------------------------------------
|
| These routes handle phone+password authentication for category users
| (artisans, hotel owners, marketplace vendors, etc.)
|
*/

Route::prefix('user')->name('user.')->middleware('guest')->group(function () {
    // Registration routes
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    // Registration phone verification routes
    Route::get('register/verify', [RegisteredUserController::class, 'showVerify'])
        ->name('register.verify');

    Route::post('register/verify', [RegisteredUserController::class, 'verifyOtp']);

    Route::post('register/resend-otp', [RegisteredUserController::class, 'resendOtp'])
        ->name('register.resend-otp');

    // Login routes
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // Password Reset routes
    Route::get('forgot-password', [PhonePasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PhonePasswordResetLinkController::class, 'store'])
        ->name('password.phone');

    Route::get('reset-password', [PhoneNewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [PhoneNewPasswordController::class, 'store'])
        ->name('password.update');

    Route::post('reset-password/resend', [PhoneNewPasswordController::class, 'resendCode'])
        ->name('password.resend');
});

// Registration payment routes - accessible after registration (user is logged in)
Route::prefix('user')->name('user.')->group(function () {
    Route::get('register/payment', [RegisteredUserController::class, 'showPayment'])
        ->name('register.payment');

    Route::post('register/payment', [PaymentController::class, 'processPayment']);

    Route::post('register/payment/tier', [RegisteredUserController::class, 'updateTier'])
        ->name('register.payment.tier');
});

Route::prefix('user')->name('user.')->middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
