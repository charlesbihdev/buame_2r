<?php

namespace App\Console\Commands;

use App\Services\SubscriptionService;
use Illuminate\Console\Command;

class ProcessSubscriptionStatuses extends Command
{
    protected $signature = 'subscriptions:process-statuses';

    protected $description = 'Update subscription statuses (active -> grace_period -> expired)';

    public function handle(SubscriptionService $subscriptionService): int
    {
        $this->info('Processing subscription statuses...');

        $stats = $subscriptionService->updateSubscriptionStatuses();

        $this->info("Moved to grace period: {$stats['to_grace_period']}");
        $this->info("Moved to expired: {$stats['to_expired']}");

        return Command::SUCCESS;
    }
}
