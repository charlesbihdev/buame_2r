<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

/*
|--------------------------------------------------------------------------
| Subscription Management Schedules
|--------------------------------------------------------------------------
|
| These scheduled commands handle the subscription lifecycle:
| - Process statuses: Moves subscriptions from active -> grace_period -> expired
| - Send reminders: Sends SMS/email reminders at configured intervals
|
*/

Schedule::command('subscriptions:process-statuses')
    ->hourly()
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/subscription-statuses.log'));

Schedule::command('subscriptions:send-reminders')
    ->dailyAt('09:00')
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/subscription-reminders.log'));
