<?php

namespace App\Services;

use App\Models\VerificationCode;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PhoneVerificationService
{
    /**
     * Generate and send OTP code to phone number
     */
    public function sendOtp(string $phone): array
    {
        // Generate 6-digit code
        $code = $this->generateCode();

        // Store in verification_codes table
        $verification = VerificationCode::create([
            'phone' => $phone,
            'code' => $code,
            'expires_at' => Carbon::now()->addMinutes(15),
            'attempts' => 0,
        ]);

        // Send OTP (for now, log to console for development)
        $this->sendSms($phone, $code);

        return [
            'success' => true,
            'message' => 'OTP sent successfully',
            'expires_in' => 15, // minutes
        ];
    }

    /**
     * Verify OTP code
     */
    public function verifyOtp(string $phone, string $code): array
    {
        $verification = VerificationCode::where('phone', $phone)
            ->where('code', $code)
            ->whereNull('verified_at')
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (! $verification) {
            // Check if code exists but expired or wrong
            $existingCode = VerificationCode::where('phone', $phone)
                ->whereNull('verified_at')
                ->latest()
                ->first();

            if ($existingCode) {
                $existingCode->increment('attempts');

                if ($existingCode->attempts >= 3) {
                    return [
                        'success' => false,
                        'message' => 'Too many failed attempts. Please request a new code.',
                    ];
                }
            }

            return [
                'success' => false,
                'message' => 'Invalid or expired verification code',
            ];
        }

        // Mark as verified
        $verification->update(['verified_at' => Carbon::now()]);

        return [
            'success' => true,
            'message' => 'Phone verified successfully',
        ];
    }

    /**
     * Check if phone can request new OTP (rate limiting)
     */
    public function canRequestOtp(string $phone): array
    {
        $recentCode = VerificationCode::where('phone', $phone)
            ->where('created_at', '>', Carbon::now()->subMinutes(2))
            ->orderBy('created_at', 'desc')
            ->first();

        if ($recentCode) {
            $secondsSinceCreation = Carbon::now()->diffInSeconds($recentCode->created_at);
            $waitTime = max(0, 120 - $secondsSinceCreation); // Ensure never negative

            if ($waitTime > 0) {
                return [
                    'can_request' => false,
                    'message' => "Please wait {$waitTime} seconds before requesting a new code",
                    'wait_seconds' => $waitTime,
                ];
            }
        }

        return [
            'can_request' => true,
        ];
    }

    /**
     * Generate 6-digit OTP code
     */
    protected function generateCode(): string
    {
        return str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    /**
     * Send SMS (placeholder for actual SMS integration)
     */
    protected function sendSms(string $phone, string $code): void
    {
        // For development: Log to console
        Log::info("OTP Code for {$phone}: {$code}");

        // TODO: Integrate with SMS provider (Twilio, etc.)
        // Example:
        // $twilio = new \Twilio\Rest\Client($sid, $token);
        // $twilio->messages->create($phone, [
        //     'from' => config('services.twilio.phone'),
        //     'body' => "Your BUAME 2R verification code is: {$code}"
        // ]);
    }

    /**
     * Clean up expired codes
     */
    public function cleanupExpiredCodes(): int
    {
        return VerificationCode::where('expires_at', '<', Carbon::now())
            ->orWhereNotNull('verified_at')
            ->where('created_at', '<', Carbon::now()->subDays(7))
            ->delete();
    }
}
