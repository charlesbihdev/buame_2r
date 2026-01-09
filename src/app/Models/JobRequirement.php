<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'requirement',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
