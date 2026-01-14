<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureActiveSubscription
{
    /**
     * Handle an incoming request.
     *
     * Checks if the user has an active subscription for the given category.
     * If not, redirects back with an error flash message.
     */
    public function handle(Request $request, Closure $next, string $category): Response
    {
        $user = Auth::user();

        if (! $user) {
            return redirect()->route('user.login');
        }

        $userCategory = $user->categories()->where('category', $category)->first();

        if (! $userCategory || ! $userCategory->canAccessCategory()) {
            return redirect()->back()
                ->with('error', 'Your subscription has expired. Please renew your subscription to continue editing your profile and listings.');
        }

        return $next($request);
    }
}
