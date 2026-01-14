<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Enums\SubscriptionStatus;
use App\Models\User;

// Get first user with a subscription
$user = User::whereHas('categories')->first();

if (! $user) {
    echo "No user with subscriptions found.\n";
    exit;
}

$subscription = $user->categories()->first();

if (! $subscription) {
    echo "No subscription found.\n";
    exit;
}

// Reset to active (biannually - 6 months from now)
$subscription->update([
    'expires_at' => now()->addDays(180), // 6 months (biannually)
    'subscription_status' => SubscriptionStatus::Active,
    'grace_period_ends_at' => null,
    'is_active' => true,
]);

$subscription->refresh();

echo "✅ Subscription reset to ACTIVE\n";
echo "Status: {$subscription->subscription_status->value}\n";
echo "Expires: {$subscription->expires_at}\n";
echo 'Is Active: '.($subscription->is_active ? 'Yes' : 'No')."\n";
echo 'Can Access: '.($subscription->canAccessCategory() ? 'Yes' : 'No')."\n";
