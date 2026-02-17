<?php

namespace App\Channels;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsChannel
{
    public function send($notifiable, Notification $notification): void
    {
        if (! method_exists($notification, 'toSms')) {
            return;
        }

        $message = $notification->toSms($notifiable);
        $phone = $notifiable->phone;

        if (! $phone) {
            return;
        }

        $this->sendSms($phone, $message);
    }

    protected function sendSms(string $phone, string $message): bool
    {
        $apiKey = config('services.mnotify.key');
        $senderId = config('services.mnotify.sender_id');
        $apiUrl = config('services.mnotify.url');

        $formattedPhone = $this->formatPhoneNumber($phone);

        // In testing/local environment, just log the message
        if (empty($apiKey) || app()->environment('testing', 'local')) {
            Log::info('SMS Reminder (not sent in ' . app()->environment() . ')', [
                'phone' => $formattedPhone,
                'message' => $message,
            ]);

            return true;
        }

        try {
            $response = Http::timeout(30)->post($apiUrl, [
                'key' => $apiKey,
                'recipient' => [$formattedPhone],
                'sender' => $senderId,
                'message' => $message,
                'sms_type' => 'otp',
                'is_schedule' => false,
            ]);

            if ($response->successful()) {
                Log::info('SMS sent successfully', [
                    'phone' => $formattedPhone,
                    'code' => $message,
                    'sms_type' => 'otp',
                    'response' => $response->json(),
                ]);

                return true;
            }

            Log::error('SMS send failed', [
                'phone' => $formattedPhone,
                'response' => $response->body(),
            ]);

            return false;
        } catch (\Exception $e) {
            Log::error('SMS send exception', [
                'phone' => $formattedPhone,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    protected function formatPhoneNumber(string $phone): string
    {
        // Remove non-numeric characters
        $phone = preg_replace('/[^0-9]/', '', $phone);

        // Convert local format to international
        if (str_starts_with($phone, '0')) {
            $phone = '233' . substr($phone, 1);
        }

        // Add country code if missing
        if (! str_starts_with($phone, '233')) {
            $phone = '233' . $phone;
        }

        return $phone;
    }
}
