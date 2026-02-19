<?php

namespace App\Models;

use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;

class JobPoster extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'logo',
        'location',
        'phone',
        'phone_2',
        'whatsapp',
        'email',
        'website',
        'is_verified',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function getAverageRatingAttribute(): float
    {
        return Cache::remember("job_poster.{$this->id}.rating", 300, fn () => round($this->reviews()->approved()->avg('rating') ?? 0, 1));
    }

    public function getReviewsCountAttribute(): int
    {
        return Cache::remember("job_poster.{$this->id}.reviews_count", 300, fn () => $this->reviews()->approved()->count());
    }

    /**
     * Scope to filter job posters whose owners have active subscriptions.
     */
    public function scopeWithActiveSubscription(Builder $query): Builder
    {
        return $query->whereHas('user.categories', function (Builder $q) {
            $q->where('category', 'jobs')
                ->where('is_active', true)
                ->whereIn('subscription_status', [
                    SubscriptionStatus::Active->value,
                    SubscriptionStatus::GracePeriod->value,
                ]);
        });
    }
}
