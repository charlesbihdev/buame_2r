<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobPosterController extends Controller
{
    /**
     * Display the specified job poster with their jobs.
     */
    public function show(string $slug, Request $request): Response
    {
        $poster = JobPoster::with(['user', 'jobs' => function ($query) {
            $query->where('is_active', true)->latest();
        }])
            ->with(['reviews' => function ($query) {
                $query->approved()
                    ->with('images')
                    ->latest()
                    ->limit(50);
            }])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->withActiveSubscription()
            ->firstOrFail();

        // Build jobs query with filters
        $jobsQuery = $poster->jobs()
            ->where('is_active', true);

        // Search jobs
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $jobsQuery->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by type
        if ($request->has('type') && $request->type) {
            $types = explode(',', $request->type);
            $jobsQuery->whereIn('type', $types);
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $categories = explode(',', $request->category);
            $jobsQuery->whereIn('category', $categories);
        }

        // Filter by location
        if ($request->has('location') && $request->location) {
            $jobsQuery->where('location', 'like', "%{$request->location}%");
        }

        // Filter urgent only
        if ($request->has('urgent') && $request->urgent === 'true') {
            $jobsQuery->where('is_urgent', true);
        }

        // Sort
        $sort = $request->get('sort', 'newest');
        match ($sort) {
            'urgent_first' => $jobsQuery->orderBy('is_urgent', 'desc')->latest(),
            'oldest' => $jobsQuery->oldest(),
            default => $jobsQuery->latest(),
        };

        // Get type counts
        $typeCounts = $poster->jobs()
            ->where('is_active', true)
            ->selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->pluck('count', 'type')
            ->toArray();

        // Paginate jobs
        $jobs = $jobsQuery->paginate(12)->withQueryString()->through(function ($job) use ($poster) {
            $typeLabels = [
                'full_time' => 'Full Time',
                'part_time' => 'Part Time',
                'daily_wage' => 'Daily Wage',
                'apprenticeship' => 'Apprenticeship',
            ];

            $categoryLabels = [
                'construction_trades' => 'Construction & Trades',
                'home_services' => 'Home Services',
                'auto_mechanical' => 'Auto & Mechanical',
                'transport_equipment' => 'Transport & Equipment',
                'electrical_electronics' => 'Electrical & Electronics',
                'ict_digital' => 'ICT & Digital',
                'business_office' => 'Business & Office',
                'education_training' => 'Education & Training',
                'health_care' => 'Health & Care',
                'hospitality_events' => 'Hospitality & Events',
                'fashion_beauty' => 'Fashion & Beauty',
                'agriculture' => 'Agriculture',
                'security' => 'Security',
                'media_creative' => 'Media & Creative',
                'general_jobs' => 'General Jobs',
            ];

            return [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company,
                'poster' => [
                    'id' => $poster->id,
                    'name' => $poster->name,
                    'slug' => $poster->slug,
                    'logo' => $poster->logo ? '/storage/' . $poster->logo : null,
                    'is_verified' => $poster->is_verified,
                ],
                'type' => $job->type,
                'type_label' => $typeLabels[$job->type] ?? ucfirst($job->type),
                'category' => $job->category ? ($categoryLabels[$job->category] ?? ucfirst(str_replace('_', ' ', $job->category))) : null,
                'salary' => $job->salary,
                'location' => $job->location,
                'is_urgent' => $job->is_urgent,
                'posted_at' => $job->posted_at ? $job->posted_at->toISOString() : $job->created_at->toISOString(),
                'posted_at_human' => $job->posted_at ? $job->posted_at->diffForHumans() : $job->created_at->diffForHumans(),
                'requirements_count' => $job->requirements ? substr_count($job->requirements, "\n") + 1 : 0,
                'benefits_count' => $job->benefits ? substr_count($job->benefits, "\n") + 1 : 0,
            ];
        });

        // Calculate rating breakdown
        $ratingBreakdown = [
            5 => $poster->reviews->where('rating', 5)->count(),
            4 => $poster->reviews->where('rating', 4)->count(),
            3 => $poster->reviews->where('rating', 3)->count(),
            2 => $poster->reviews->where('rating', 2)->count(),
            1 => $poster->reviews->where('rating', 1)->count(),
        ];

        // Format reviews
        $formattedReviews = $poster->reviews->map(function ($review) {
            return [
                'id' => $review->id,
                'reviewer_name' => $review->reviewer_name,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at->toISOString(),
                'initials' => collect(explode(' ', $review->reviewer_name))->map(fn ($n) => strtoupper(substr($n, 0, 1)))->take(2)->join(''),
                'images' => $review->images->map(fn ($img) => ['url' => asset('storage/' . $img->image_path)]),
            ];
        });

        return Inertia::render('visitor/jobs/poster', [
            'poster' => [
                'id' => $poster->id,
                'name' => $poster->name,
                'slug' => $poster->slug,
                'description' => $poster->description,
                'logo' => $poster->logo ? '/storage/' . $poster->logo : null,
                'location' => $poster->location,
                'phone' => $poster->phone,
                'whatsapp' => $poster->whatsapp,
                'email' => $poster->email,
                'website' => $poster->website,
                'is_verified' => $poster->is_verified,
                'user' => [
                    'name' => $poster->user->name,
                ],
            ],
            'jobs' => $jobs,
            'filters' => $request->only(['search', 'type', 'category', 'location', 'urgent', 'sort']),
            'typeCounts' => $typeCounts,
            'reviews' => $formattedReviews,
            'average_rating' => $poster->average_rating,
            'reviews_count' => $poster->reviews_count,
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
