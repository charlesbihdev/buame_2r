<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaystackService
{
    protected string $secretKey;

    protected string $baseUrl = 'https://api.paystack.co';

    public function __construct()
    {
        $this->secretKey = config('services.paystack.secret_key');
    }

    /**
     * Generate a unique transaction reference.
     */
    public function genTranxRef(): string
    {
        return 'BUAME_'.time().'_'.uniqid();
    }

    /**
     * Initialize payment and get authorization URL.
     */
    public function getAuthorizationUrl(array $data): object
    {
        try {
            $httpClient = Http::withHeaders([
                'Authorization' => 'Bearer '.$this->secretKey,
                'Content-Type' => 'application/json',
            ]);
            
            // Disable SSL verification in local development
            if (app()->environment('local')) {
                $httpClient = $httpClient->withoutVerifying();
            }
            
            $response = $httpClient->post($this->baseUrl.'/transaction/initialize', $data);

            if (! $response->successful()) {
                Log::error('Paystack initialization failed', [
                    'response' => $response->json(),
                    'data' => $data,
                ]);

                throw new \Exception('Failed to initialize Paystack payment');
            }

            $responseData = $response->json();

            if (! $responseData['status']) {
                throw new \Exception($responseData['message'] ?? 'Failed to initialize payment');
            }

            return (object) [
                'url' => $responseData['data']['authorization_url'],
                'access_code' => $responseData['data']['access_code'],
                'reference' => $responseData['data']['reference'],
            ];
        } catch (\Exception $e) {
            Log::error('Paystack service error', [
                'message' => $e->getMessage(),
                'data' => $data,
            ]);

            throw $e;
        }
    }

    /**
     * Verify payment using reference.
     */
    public function getPaymentData(?string $reference = null): array
    {
        if (! $reference) {
            $reference = request()->query('reference');
        }

        if (! $reference) {
            throw new \Exception('Payment reference is required');
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$this->secretKey,
                'Content-Type' => 'application/json',
            ])->get($this->baseUrl.'/transaction/verify/'.$reference);

            if (! $response->successful()) {
                Log::error('Paystack verification failed', [
                    'reference' => $reference,
                    'response' => $response->json(),
                ]);

                throw new \Exception('Failed to verify Paystack payment');
            }

            $responseData = $response->json();

            if (! $responseData['status']) {
                throw new \Exception($responseData['message'] ?? 'Failed to verify payment');
            }

            return $responseData['data'];
        } catch (\Exception $e) {
            Log::error('Paystack verification error', [
                'message' => $e->getMessage(),
                'reference' => $reference,
            ]);

            throw $e;
        }
    }

    /**
     * Verify webhook signature.
     */
    public function verifyWebhookSignature(string $signature, string $payload): bool
    {
        $computedSignature = hash_hmac('sha512', $payload, $this->secretKey);

        return hash_equals($computedSignature, $signature);
    }
}
