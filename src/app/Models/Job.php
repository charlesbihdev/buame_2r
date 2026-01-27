<?php

namespace App\Models;

use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_listings';

    protected $fillable = [
        'job_poster_id',
        'company',
        'phone',
        'whatsapp',
        'email',
        'title',
        'type',
        'category',
        'salary',
        'location',
        'address',
        'latitude',
        'longitude',
        'description',
        'requirements',
        'responsibilities',
        'benefits',
        'application_link',
        'application_instructions',
        'is_urgent',
        'posted_at',
        'expires_at',
        'is_active',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'is_urgent' => 'boolean',
            'is_active' => 'boolean',
            'posted_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function poster(): BelongsTo
    {
        return $this->belongsTo(JobPoster::class, 'job_poster_id');
    }

    /**
     * Get the user through the poster relationship.
     */
    public function getUserAttribute()
    {
        return $this->poster?->user;
    }

    public function favorites(): MorphMany
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    /**
     * Scope to filter jobs whose poster owners have active subscriptions.
     */
    public function scopeWithActiveSubscription(Builder $query): Builder
    {
        return $query->whereHas('poster.user.categories', function (Builder $q) {
            $q->where('category', 'jobs')
                ->where('is_active', true)
                ->whereIn('subscription_status', [
                    SubscriptionStatus::Active->value,
                    SubscriptionStatus::GracePeriod->value,
                ]);
        });
    }
}
