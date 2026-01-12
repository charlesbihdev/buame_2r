<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\PhoneVerificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class PhoneNewPasswordController extends Controller
{
    public function __construct(
        protected PhoneVerificationService $phoneVerificationService
    ) {}

    /**
     * Show the password reset page (code + new password).
     */
    public function create(Request $request): Response|RedirectResponse
    {
        $phone = $request->session()->get('password_reset_phone');

        if (! $phone) {
            return redirect()->route('user.password.request');
        }

        return Inertia::render('user/auth/reset-password', [
            'phone' => $phone,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle password reset with code verification.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'phone' => ['required', 'string', 'regex:/^0[0-9]{9}$/'],
            'code' => ['required', 'string', 'size:6', 'regex:/^[0-9]{6}$/'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'code.required' => 'Verification code is required.',
            'code.size' => 'Verification code must be 6 digits.',
            'code.regex' => 'Verification code must contain only numbers.',
            'password.required' => 'Password is required.',
            'password.confirmed' => 'Passwords do not match.',
        ]);

        $phone = $request->session()->get('password_reset_phone');

        if (! $phone || $phone !== $request->phone) {
            return redirect()->route('user.password.request')
                ->withErrors(['phone' => 'Session expired. Please try again.']);
        }

        // Verify the code
        $result = $this->phoneVerificationService->verifyOtp($phone, $request->code);

        if (! $result['success']) {
            return back()->withErrors(['code' => $result['message']]);
        }

        // Find user and update password
        $user = User::where('phone', $phone)->first();

        if (! $user) {
            return redirect()->route('user.password.request')
                ->withErrors(['phone' => 'User not found.']);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // Clear session
        $request->session()->forget('password_reset_phone');

        return redirect()->route('user.login')
            ->with('status', 'Password reset successfully. Please log in.');
    }

    /**
     * Resend password reset code.
     */
    public function resendCode(Request $request): RedirectResponse
    {
        $phone = $request->session()->get('password_reset_phone');

        if (! $phone) {
            return redirect()->route('user.password.request');
        }

        // Check rate limiting
        $rateLimitCheck = $this->phoneVerificationService->canRequestOtp($phone);
        if (! $rateLimitCheck['can_request']) {
            return back()->withErrors(['code' => $rateLimitCheck['message']]);
        }

        // Send code
        $this->phoneVerificationService->sendOtp($phone);

        return back()->with('status', 'A new verification code has been sent.');
    }
}
