<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PhoneLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page (phone + password).
     */
    public function create(Request $request): Response|RedirectResponse
    {
        // If user is already authenticated, redirect to dashboard
        if ($request->user()) {
            return redirect()->route('user.dashboard.index');
        }

        return Inertia::render('user/auth/phone-login', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(PhoneLoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        // Check if phone is verified - REQUIRED before proceeding
        if (! $user->hasVerifiedPhone()) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            // Store user ID in session for verification flow
            $request->session()->put('registration_user_id', $user->id);

            // Send OTP for verification
            $phoneVerificationService = app(\App\Services\PhoneVerificationService::class);
            $rateLimitCheck = $phoneVerificationService->canRequestOtp($user->phone);
            
            if (! $rateLimitCheck['can_request']) {
                return redirect()->route('user.register.verify')
                    ->withErrors(['phone' => $rateLimitCheck['message']]);
            }

            $result = $phoneVerificationService->sendOtp($user->phone);

            return redirect()->route('user.register.verify')
                ->with('status', $result['message'])
                ->withErrors(['phone' => 'Please verify your phone number to continue.']);
        }

        // Update last login
        $user->update(['last_login_at' => now()]);

        // Check if user has paid for any category
        $hasPaidCategory = $user->categories()
            ->whereHas('payment', function ($query) {
                $query->where('status', 'completed');
            })
            ->exists();

        if (! $hasPaidCategory) {
            // User authenticated but no payment - redirect to payment
            $request->session()->put('registration_user_id', $user->id);
            if (! $request->session()->has('selected_category')) {
                return redirect()->route('user.register.category')
                    ->with('info', 'Please select a category and complete payment to access your dashboard.');
            }

            return redirect()->route('user.register.payment')
                ->with('info', 'Please complete payment to access your dashboard.');
        }

        // Redirect to dashboard
        return redirect()->route('user.dashboard.index');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
