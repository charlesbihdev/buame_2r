<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web')
                ->group(base_path('routes/user/auth.php'));
            Route::middleware('web')
                ->group(base_path('routes/user/dashboard.php'));
            Route::middleware('web')
                ->group(base_path('routes/admin.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'subscription.active' => \App\Http\Middleware\EnsureActiveSubscription::class,
            'admin.auth' => \App\Http\Middleware\AdminAuthenticate::class,
            'admin.super' => \App\Http\Middleware\EnsureSuperAdmin::class,
        ]);

        // Redirect unauthenticated users based on route context
        // Admin routes redirect to admin login, user routes redirect to user login
        $middleware->redirectGuestsTo(function ($request) {
            // Check if the request is for an admin route
            if ($request->is('admin*') || $request->routeIs('admin.*')) {
                return route('admin.login');
            }

            // Default to user login for all other routes
            return '/user/login';
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
