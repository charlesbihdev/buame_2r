<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckCategoryAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $category): Response
    {
        $user = Auth::user();

        if (! $user) {
            return redirect()->route('user.login');
        }

        // Check if user has paid for this category
        $hasAccess = $user->hasCategoryAccess($category);

        if (! $hasAccess) {
            return redirect()->route('user.dashboard.index')
                ->withErrors(['category' => 'You need to pay for this category to access it.']);
        }

        return $next($request);
    }
}
