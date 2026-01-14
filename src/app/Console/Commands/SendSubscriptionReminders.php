<?php

namespace App\Console\Commands;

use App\Models\SubscriptionReminder;
use App\Models\UserCategory;
use App\Notifications\SubscriptionExpiryReminder;
use App\Services\SubscriptionService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SendSubscriptionReminders extends Command
{
    protected $signature = 'subscriptions:send-reminders';

    protected $description = 'Send SMS/email reminders for expiring subscriptions';

    public function handle(SubscriptionService $subscriptionService): int
    {
        $this->info('Sending subscription reminders...');

        $subscriptionsToNotify = $subscriptionService->getSubscriptionsNeedingReminders();
        $sentCount = 0;

        foreach ($subscriptionsToNotify as $item) {
            $subscription = $item['subscription'];
            $daysUntilExpiry = $item['days_until_expiry'];

            try {
                $this->sendReminder($subscription, $daysUntilExpiry);
                $sentCount++;
            } catch (\Exception $e) {
                Log::error('Failed to send subscription reminder', [
                    'user_id' => $subscription->user_id,
                    'category' => $subscription->category,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $this->info("Sent {$sentCount} reminders.");

        return Command::SUCCESS;
    }

    protected function sendReminder(UserCategory $subscription, int $daysUntilExpiry): void
    {
        $user = $subscription->user;

        if (! $user) {
            return;
        }

        // Determine reminder type
        $type = match (true) {
            $daysUntilExpiry > 0 => 'expiry_warning',
            $daysUntilExpiry === 0 => 'expiry_warning',
            $daysUntilExpiry < 0 => 'grace_period',
        };

        // Send notification
        $user->notify(new SubscriptionExpiryReminder($subscription, $type, $daysUntilExpiry));

        // Update subscription reminder tracking
        $subscription->update([
            'last_reminder_sent_at' => now(),
            'reminder_count' => $subscription->reminder_count + 1,
        ]);

        // Log the reminder in the audit table
        SubscriptionReminder::create([
            'user_id' => $user->id,
            'user_category_id' => $subscription->id,
            'channel' => $user->phone ? 'sms' : 'email',
            'type' => $type,
            'days_before_expiry' => $daysUntilExpiry,
            'was_sent' => true,
            'sent_at' => now(),
        ]);

        $this->line("Sent reminder to user {$user->id} for {$subscription->category} ({$daysUntilExpiry} days)");
    }
}
