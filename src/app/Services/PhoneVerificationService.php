<?php

namespace App\Services;

use App\Models\VerificationCode;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
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
     * Rate limiting applies to all OTP requests (registration and login)
     * Only checks for recent unverified codes to prevent abuse
     */
    public function canRequestOtp(string $phone): array
    {
        $twoMinutesAgo = Carbon::now()->subMinutes(2);

        // Check for recent unverified codes (codes that haven't been verified yet)
        // This prevents abuse regardless of whether phone was previously verified
        $recentCode = VerificationCode::where('phone', $phone)
            ->whereNull('verified_at') // Only check unverified codes
            ->where('created_at', '>', $twoMinutesAgo) // Only codes created in last 2 minutes
            ->orderBy('created_at', 'desc')
            ->first();

        if ($recentCode) {
            // Calculate seconds since code was created
            $secondsSinceCreation = (int) Carbon::now()->diffInSeconds($recentCode->created_at);

            // Safety check: if code is older than 2 minutes, allow request
            if ($secondsSinceCreation >= 120) {
                return [
                    'can_request' => true,
                ];
            }

            // Calculate remaining wait time (rounded to whole seconds)
            $waitTime = (int) max(0, 120 - $secondsSinceCreation);

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
     * Send SMS via mNotify API
     */
    protected function sendSms(string $phone, string $code): bool
    {
        $apiKey = config('services.mnotify.key');
        $senderId = config('services.mnotify.sender_id');
        $apiUrl = config('services.mnotify.url');

        // Format phone number (remove leading 0 and add country code if needed)
        $formattedPhone = $this->formatPhoneNumber($phone);

        $message = "Your BUAME 2R verification code is: {$code}. This code expires in 15 minutes.";

        // Log in development
        if (app()->environment('local')) {
            Log::info("OTP Code for {$phone}: {$code}");
        }

        // Skip actual SMS in local/testing environment if no API key
        if (empty($apiKey) || app()->environment('testing')) {
            Log::info("mNotify SMS skipped (no API key or testing): {$formattedPhone}");
            return true;
        }

        try {
            $response = Http::timeout(30)->post($apiUrl, [
                'key' => $apiKey,
                'recipient' => [$formattedPhone],
                'sender' => $senderId,
                'message' => $message,
                'is_schedule' => false,
                'sms_type' => 'otp',
            ]);

            $result = $response->json();

            if ($response->successful() && isset($result['status']) && $result['status'] === 'success') {
                Log::info("mNotify OTP sent successfully to {$formattedPhone}", [
                    'message_id' => $result['message_id'] ?? null,
                ]);
                return true;
            }

            Log::error("mNotify OTP failed for {$formattedPhone}", [
                'response' => $result,
                'status_code' => $response->status(),
            ]);
            return false;
        } catch (\Exception $e) {
            Log::error("mNotify API error for {$formattedPhone}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Format phone number for mNotify (Ghana format)
     * Converts 0241234567 to 233241234567
     */
    protected function formatPhoneNumber(string $phone): string
    {
        // Remove any spaces, dashes, or special characters
        $phone = preg_replace('/[^0-9]/', '', $phone);

        // If starts with 0, replace with 233 (Ghana country code)
        if (str_starts_with($phone, '0')) {
            $phone = '233' . substr($phone, 1);
        }

        // If doesn't start with country code, add it
        if (!str_starts_with($phone, '233')) {
            $phone = '233' . $phone;
        }

        return $phone;
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
