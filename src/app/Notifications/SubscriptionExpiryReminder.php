<?php

namespace App\Notifications;

use App\Channels\SmsChannel;
use App\Models\UserCategory;
// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionExpiryReminder extends Notification
{
    // use Queueable;

    public function __construct(
        public UserCategory $subscription,
        public string $type,
        public int $daysUntilExpiry
    ) {}

    public function via($notifiable): array
    {
        $channels = [];

        // Prefer SMS for Ghana market
        if ($notifiable->phone) {
            $channels[] = SmsChannel::class;
        }

        // Also send email if available
        if ($notifiable->email && ! str_ends_with($notifiable->email, '@buame2r.com')) {
            $channels[] = 'mail';
        }

        return $channels ?: [SmsChannel::class];
    }

    public function toSms($notifiable): string
    {
        $category = config("categories.list.{$this->subscription->category}.label", ucfirst($this->subscription->category));
        $expiryDate = $this->subscription->expires_at?->format('M d, Y') ?? 'soon';
        $billingCycle = $this->subscription->billing_cycle?->label() ?? 'subscription';

        return match ($this->type) {
            'expiry_warning' => $this->daysUntilExpiry === 0
                ? "BUAME 2R: Your {$category} {$billingCycle} subscription expires TODAY! Renew now to keep your services active. Login to your dashboard to renew."
                : "BUAME 2R: Your {$category} {$billingCycle} subscription expires on {$expiryDate} ({$this->daysUntilExpiry} days left). Renew now to avoid service interruption.",
            'grace_period' => "BUAME 2R: Your {$category} subscription has expired! You have ".abs($this->daysUntilExpiry).' days left in your grace period. Renew immediately to keep your services!',
            'final_warning' => "BUAME 2R: FINAL WARNING - Your {$category} subscription will be deactivated tomorrow! Renew now or lose access to your services.",
            default => "BUAME 2R: Your {$category} subscription needs attention. Please login to your dashboard.",
        };
    }

    public function toMail($notifiable): MailMessage
    {
        $category = config("categories.list.{$this->subscription->category}.label", ucfirst($this->subscription->category));
        $expiryDate = $this->subscription->expires_at?->format('F d, Y') ?? 'soon';
        $billingCycle = $this->subscription->billing_cycle?->label() ?? 'subscription';

        $subject = match ($this->type) {
            'expiry_warning' => $this->daysUntilExpiry === 0
                ? "Your {$category} Subscription Expires Today!"
                : "Your {$category} Subscription Expires Soon",
            'grace_period' => "URGENT: Your {$category} Subscription Has Expired",
            'final_warning' => "FINAL WARNING: {$category} Subscription Deactivation",
            default => "{$category} Subscription Reminder",
        };

        $message = (new MailMessage)
            ->subject($subject)
            ->greeting("Hello {$notifiable->name},");

        if ($this->type === 'expiry_warning') {
            if ($this->daysUntilExpiry === 0) {
                $message->line("Your {$category} {$billingCycle} subscription expires **today**!")
                    ->line('Renew now to avoid any interruption to your services.');
            } else {
                $message->line("Your {$category} {$billingCycle} subscription will expire on **{$expiryDate}**.")
                    ->line("You have **{$this->daysUntilExpiry} days** left before your subscription expires.");
            }
        } elseif ($this->type === 'grace_period') {
            $daysLeft = abs($this->daysUntilExpiry);
            $graceDays = config('categories.subscription.grace_period_days', 7);
            $message->line("Your {$category} subscription has **expired**!")
                ->line("You are currently in a **{$graceDays}-day grace period**. You have **{$daysLeft} days** remaining before your access is deactivated.")
                ->line('Please renew immediately to keep your services active.');
        } elseif ($this->type === 'final_warning') {
            $message->line('**This is your final warning!**')
                ->line("Your {$category} subscription will be **deactivated tomorrow** if not renewed.")
                ->line('After deactivation, you will lose access to all your services in this category.');
        }

        return $message
            ->action('Renew Now', url('/user/dashboard'))
            ->line('Thank you for being a valued BUAME 2R member!')
            ->salutation('Best regards, The BUAME 2R Team');
    }

    public function toArray($notifiable): array
    {
        return [
            'subscription_id' => $this->subscription->id,
            'category' => $this->subscription->category,
            'type' => $this->type,
            'days_until_expiry' => $this->daysUntilExpiry,
        ];
    }
}
