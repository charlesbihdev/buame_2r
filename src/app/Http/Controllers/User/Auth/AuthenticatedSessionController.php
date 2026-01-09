<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PhoneLoginRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Models\User;
use App\Services\PhoneVerificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function __construct(
        protected PhoneVerificationService $phoneVerificationService
    ) {}

    /**
     * Show the login page (phone input).
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
     * Send OTP to phone number.
     */
    public function store(PhoneLoginRequest $request): RedirectResponse
    {
        $phone = $request->validated()['phone'];

        // Check rate limiting
        $rateLimitCheck = $this->phoneVerificationService->canRequestOtp($phone);
        if (! $rateLimitCheck['can_request']) {
            return back()->withErrors(['phone' => $rateLimitCheck['message']]);
        }

        // Send OTP
        $result = $this->phoneVerificationService->sendOtp($phone);

        // Store phone in session for verification step
        $request->session()->put('login_phone', $phone);

        return redirect()->route('user.login.verify')->with('status', $result['message']);
    }

    /**
     * Show OTP verification page.
     */
    public function showVerify(Request $request): Response|RedirectResponse
    {
        if (! $request->session()->has('login_phone')) {
            return redirect()->route('user.login');
        }

        return Inertia::render('user/auth/verify-otp', [
            'phone' => $request->session()->get('login_phone'),
            'type' => 'login',
        ]);
    }

    /**
     * Verify OTP and login user.
     */
    public function verifyOtp(VerifyOtpRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $phone = $request->session()->get('login_phone');

        if (! $phone || $phone !== $validated['phone']) {
            return redirect()->route('user.login')->withErrors(['phone' => 'Session expired. Please try again.']);
        }

        // Verify OTP
        $result = $this->phoneVerificationService->verifyOtp($validated['phone'], $validated['code']);

        if (! $result['success']) {
            return back()->withErrors(['code' => $result['message']]);
        }

        // Find user
        $user = User::where('phone', $validated['phone'])->first();

        if (! $user) {
            return redirect()->route('user.login')->withErrors(['phone' => 'User not found.']);
        }

        // Update phone verification if not already verified
        if (! $user->phone_verified_at) {
            $user->update(['phone_verified_at' => now()]);
        }

        // Check if user has paid for any category
        $hasPaidCategory = $user->categories()
            ->whereHas('payment', function ($query) {
                $query->where('status', 'completed');
            })
            ->exists();

        if (! $hasPaidCategory) {
            // Login user FIRST (they verified OTP, they're legitimate)
            Auth::login($user);
            $request->session()->regenerate();
            // Phone verified but no payment - redirect to payment
            $request->session()->put('registration_user_id', $user->id);
            if (! $request->session()->has('selected_category')) {
                return redirect()->route('user.register.category')
                    ->with('info', 'Please select a category and complete payment to access your dashboard.');
            }

            return redirect()->route('user.register.payment')
                ->with('info', 'Please complete payment to access your dashboard.');
        }

        // Update last login
        $user->update(['last_login_at' => now()]);

        // Login user
        Auth::login($user);
        $request->session()->regenerate();
        $request->session()->forget('login_phone');

        // Redirect to dashboard (category is determined by query string, defaults to first paid)
        return redirect()->route('user.dashboard.index');
    }

    /**
     * Resend OTP code.
     */
    public function resendOtp(Request $request): RedirectResponse
    {
        $phone = $request->session()->get('login_phone');

        if (! $phone) {
            return redirect()->route('user.login');
        }

        // Check rate limiting
        $rateLimitCheck = $this->phoneVerificationService->canRequestOtp($phone);
        if (! $rateLimitCheck['can_request']) {
            return back()->withErrors(['code' => $rateLimitCheck['message']]);
        }

        // Send OTP
        $result = $this->phoneVerificationService->sendOtp($phone);

        return back()->with('status', $result['message']);
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
