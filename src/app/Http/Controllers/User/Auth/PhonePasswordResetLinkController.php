<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Services\PhoneVerificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PhonePasswordResetLinkController extends Controller
{
    public function __construct(
        protected PhoneVerificationService $phoneVerificationService
    ) {}

    /**
     * Show the forgot password page (phone input).
     */
    public function create(Request $request): Response
    {
        return Inertia::render('user/auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Send password reset code via SMS.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'phone' => ['required', 'string', 'regex:/^0[0-9]{9}$/', 'exists:users,phone'],
        ], [
            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Please enter a valid 10-digit phone number starting with 0.',
            'phone.exists' => 'No account found with this phone number.',
        ]);

        $phone = $request->phone;

        // Check rate limiting
        $rateLimitCheck = $this->phoneVerificationService->canRequestOtp($phone);
        if (! $rateLimitCheck['can_request']) {
            return back()->withErrors(['phone' => $rateLimitCheck['message']]);
        }

        // Send reset code via SMS (reuse OTP service)
        $this->phoneVerificationService->sendOtp($phone);

        // Store phone in session
        $request->session()->put('password_reset_phone', $phone);

        return redirect()->route('user.password.reset')
            ->with('status', 'We sent a verification code to your phone.');
    }
}
