<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_listings';

    protected $fillable = [
        'user_id',
        'title',
        'company',
        'type',
        'category',
        'salary_min',
        'salary_max',
        'salary_display',
        'location',
        'address',
        'latitude',
        'longitude',
        'phone',
        'whatsapp',
        'email',
        'description',
        'is_urgent',
        'is_verified_employer',
        'posted_at',
        'expires_at',
        'is_active',
        'views_count',
        'applications_count',
    ];

    protected function casts(): array
    {
        return [
            'salary_min' => 'decimal:2',
            'salary_max' => 'decimal:2',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'is_urgent' => 'boolean',
            'is_verified_employer' => 'boolean',
            'is_active' => 'boolean',
            'posted_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function requirements()
    {
        return $this->hasMany(JobRequirement::class);
    }

    public function responsibilities()
    {
        return $this->hasMany(JobResponsibility::class);
    }

    public function benefits()
    {
        return $this->hasMany(JobBenefit::class);
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function favorites(): MorphMany
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }
}
