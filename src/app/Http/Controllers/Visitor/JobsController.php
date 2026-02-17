<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobsController extends Controller
{
    /**
     * Display a listing of jobs.
     */
    public function index(Request $request): Response
    {
        $query = Job::query()
            ->with(['poster'])
            ->where('is_active', true)
            ->whereHas('poster', function ($q) {
                $q->where('is_active', true);
            })
            ->withActiveSubscription();

        // Apply type filter
        if ($request->filled('type') && $request->type !== 'all') {
            $types = is_array($request->type)
                ? $request->type
                : (str_contains($request->type, ',')
                    ? explode(',', $request->type)
                    : [$request->type]);
            $query->whereIn('type', $types);
        }

        // Apply category filter
        if ($request->filled('category') && $request->category !== 'all') {
            $categories = is_array($request->category)
                ? $request->category
                : (str_contains($request->category, ',')
                    ? explode(',', $request->category)
                    : [$request->category]);
            $query->whereIn('category', $categories);
        }

        // Apply sub_category filter
        if ($request->filled('sub_category')) {
            $subCategories = is_array($request->sub_category)
                ? $request->sub_category
                : (str_contains($request->sub_category, ',')
                    ? explode(',', $request->sub_category)
                    : [$request->sub_category]);
            $query->whereIn('sub_category', $subCategories);
        }



        // Apply location filter
        if ($request->filled('location')) {
            $query->where('location', 'like', '%'.$request->location.'%');
        }

        // Apply search filter (title, description, or poster name)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
                    ->orWhereHas('poster', function ($pq) use ($search) {
                        $pq->where('name', 'like', '%'.$search.'%');
                    });
            });
        }

        // Apply salary range filter
        if ($request->filled('salary')) {
            $salaryRanges = is_array($request->salary)
                ? $request->salary
                : (str_contains($request->salary, ',')
                    ? explode(',', $request->salary)
                    : [$request->salary]);

            $query->where(function ($q) use ($salaryRanges) {
                foreach ($salaryRanges as $range) {
                    $q->orWhere(function ($subQ) use ($range) {
                        // Extract numeric value from salary field using regex
                        // Salary format is typically like "GH₵ 2000" or "GH₵ 2000 - 3000"
                        $extractSalary = "CAST(REGEXP_REPLACE(REGEXP_REPLACE(salary, '[^0-9.-]', ''), '-.*', '') AS UNSIGNED)";

                        if ($range === '10000+') {
                            $subQ->whereRaw("{$extractSalary} >= 10000");
                        } else {
                            [$min, $max] = explode('-', $range);
                            $subQ->whereRaw("{$extractSalary} >= ?", [(int) $min])
                                ->whereRaw("{$extractSalary} < ?", [(int) $max]);
                        }
                    });
                }
            });
        }

        // Apply urgent filter
        if ($request->filled('urgent') && $request->urgent === '1') {
            $query->where('is_urgent', true);
        }

        // Apply date posted filter
        if ($request->filled('date_posted') && $request->date_posted !== '0') {
            $days = (int) $request->date_posted;
            $query->where(function ($q) use ($days) {
                $q->where('posted_at', '>=', now()->subDays($days))
                    ->orWhere(function ($q2) use ($days) {
                        $q2->whereNull('posted_at')
                            ->where('created_at', '>=', now()->subDays($days));
                    });
            });
        }

        // Apply sorting
        $sortBy = $request->get('sort', 'newest');
        match ($sortBy) {
            'salary_high' => $query->orderByRaw('CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(salary, "-", 1), " ", -1) AS UNSIGNED) DESC'),
            'salary_low' => $query->orderByRaw('CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(salary, "-", 1), " ", -1) AS UNSIGNED) ASC'),
            'urgent_first' => $query->orderBy('is_urgent', 'desc')->orderBy('created_at', 'desc'),
            'newest' => $query->orderBy('created_at', 'desc'),
            'oldest' => $query->orderBy('created_at', 'asc'),
            default => $query->orderBy('created_at', 'desc'),
        };

        // Paginate results
        $perPage = $request->get('per_page', 12);
        $jobs = $query->paginate($perPage)->withQueryString();

        // Format jobs for frontend
        $formattedJobs = collect($jobs->items())->map(function ($job) {
            $typeLabels = [
                'full_time' => 'Full Time',
                'part_time' => 'Part Time',
                'contract' => 'Contract',
                'internship' => 'Internship',
                'daily_wage' => 'Daily Wage',
                'apprenticeship' => 'Apprenticeship',
            ];

            $categoryLabels = collect(config('job_categories.categories', []))
                ->mapWithKeys(fn($cat, $id) => [$id => $cat['label']])
                ->toArray();

            return [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company,
                'poster' => $job->poster ? [
                    'id' => $job->poster->id,
                    'name' => $job->poster->name,
                    'slug' => $job->poster->slug,
                    'logo' => $job->poster->logo ? '/storage/'.$job->poster->logo : null,
                    'is_verified' => $job->poster->is_verified,
                ] : null,
                'type' => $job->type,
                'type_label' => $typeLabels[$job->type] ?? ucfirst($job->type),
                'category' => $job->category ? ($categoryLabels[$job->category] ?? ucfirst(str_replace('_', ' ', $job->category))) : null,
                'salary' => $job->salary,
                'salary_display' => $job->salary,
                'location' => $job->location,
                'is_urgent' => $job->is_urgent,
                'posted_at' => $job->posted_at ? $job->posted_at->toISOString() : $job->created_at->toISOString(),
                'posted_at_human' => $job->posted_at ? $job->posted_at->diffForHumans() : $job->created_at->diffForHumans(),
                'requirements_count' => $job->requirements ? substr_count($job->requirements, "\n") + 1 : 0,
                'benefits_count' => $job->benefits ? substr_count($job->benefits, "\n") + 1 : 0,
            ];
        });

        // Build pagination links
        $paginationLinks = [];
        $currentPage = $jobs->currentPage();
        $lastPage = $jobs->lastPage();
        $baseUrl = $request->url();
        $queryParams = $request->except('page');

        // Previous link
        if ($currentPage > 1) {
            $paginationLinks[] = [
                'url' => $baseUrl.'?'.http_build_query(array_merge($queryParams, ['page' => $currentPage - 1])),
                'label' => '&laquo; Previous',
                'active' => false,
            ];
        }

        // Page number links
        for ($i = 1; $i <= $lastPage; $i++) {
            if ($i == 1 || $i == $lastPage || ($i >= $currentPage - 2 && $i <= $currentPage + 2)) {
                $paginationLinks[] = [
                    'url' => $baseUrl.'?'.http_build_query(array_merge($queryParams, ['page' => $i])),
                    'label' => (string) $i,
                    'active' => $i == $currentPage,
                ];
            } elseif ($i == $currentPage - 3 || $i == $currentPage + 3) {
                $paginationLinks[] = [
                    'url' => null,
                    'label' => '...',
                    'active' => false,
                ];
            }
        }

        // Next link
        if ($currentPage < $lastPage) {
            $paginationLinks[] = [
                'url' => $baseUrl.'?'.http_build_query(array_merge($queryParams, ['page' => $currentPage + 1])),
                'label' => 'Next &raquo;',
                'active' => false,
            ];
        }

        return Inertia::render('visitor/jobs/index', [
            'jobs' => $formattedJobs,
            'pagination' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
                'from' => $jobs->firstItem(),
                'to' => $jobs->lastItem(),
                'links' => $paginationLinks,
            ],
            'filters' => [
                'type' => $request->get('type', 'all'),
                'category' => $request->get('category', 'all'),
                'sub_category' => $request->get('sub_category', ''),
                'location' => $request->get('location', ''),
                'search' => $request->get('search', ''),
                'salary' => $request->get('salary', ''),
                'urgent' => $request->get('urgent'),
                'date_posted' => $request->get('date_posted', '0'),
                'sort' => $sortBy,
            ],
        ]);
    }

    /**
     * Display the specified job.
     */
    public function show(Job $job): Response
    {
        $job = Job::query()
            ->where('id', $job->id)
            ->where('is_active', true)
            ->whereHas('poster', function ($q) {
                $q->where('is_active', true);
            })
            ->withActiveSubscription()
            ->with(['poster.user' => function ($query) {
                $query->select('id', 'name', 'email', 'phone');
            }])
            ->with(['poster.reviews' => function ($query) {
                $query->approved()
                    ->with('images')
                    ->latest()
                    ->limit(50);
            }])
            ->first();

        if (! $job) {
            abort(404, 'Job not found or not available');
        }

        // Increment views count
        $job->increment('views_count');

        $poster = $job->poster;

        // Calculate rating breakdown from poster reviews
        $ratingBreakdown = [
            5 => $poster->reviews->where('rating', 5)->count(),
            4 => $poster->reviews->where('rating', 4)->count(),
            3 => $poster->reviews->where('rating', 3)->count(),
            2 => $poster->reviews->where('rating', 2)->count(),
            1 => $poster->reviews->where('rating', 1)->count(),
        ];

        $typeLabels = [
            'full_time' => 'Full Time',
            'part_time' => 'Part Time',
            'contract' => 'Contract',
            'internship' => 'Internship',
            'daily_wage' => 'Daily Wage',
            'apprenticeship' => 'Apprenticeship',
        ];

        $categoryLabels = collect(config('job_categories.categories', []))
            ->mapWithKeys(fn($cat, $id) => [$id => $cat['label']])
            ->toArray();

        // Parse requirements/responsibilities/benefits from text
        $requirements = $job->requirements ? array_filter(array_map('trim', explode("\n", $job->requirements))) : [];
        $responsibilities = $job->responsibilities ? array_filter(array_map('trim', explode("\n", $job->responsibilities))) : [];
        $benefits = $job->benefits ? array_filter(array_map('trim', explode("\n", $job->benefits))) : [];

        // Get contact info from job (jobs can have their own contact for posting jobs for others)
        // Fallback to poster contact if job contact is not available
        $phone = $job->phone ?? $poster->phone ?? $poster->user?->phone ?? null;
        $whatsapp = $job->whatsapp ?? $poster->whatsapp ?? null;
        $email = $job->email ?? $poster->email ?? $poster->user?->email ?? null;

        // Build WhatsApp URL
        $whatsappUrl = null;
        if ($whatsapp) {
            $whatsappNumber = preg_replace('/\D/', '', $whatsapp);
            $companyName = $job->company ?? $poster->name;
            $message = urlencode("Hello, I'm interested in applying for the {$job->title} position at {$companyName}.");
            $whatsappUrl = "https://wa.me/{$whatsappNumber}?text={$message}";
        } elseif ($phone) {
            $whatsappNumber = preg_replace('/\D/', '', $phone);
            $companyName = $job->company ?? $poster->name;
            $message = urlencode("Hello, I'm interested in applying for the {$job->title} position at {$companyName}.");
            $whatsappUrl = "https://wa.me/{$whatsappNumber}?text={$message}";
        }

        // Format reviews for frontend
        $formattedReviews = $poster->reviews->map(function ($review) {
            return [
                'id' => $review->id,
                'reviewer_name' => $review->reviewer_name,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at->toISOString(),
                'initials' => $review->initials,
                'images' => $review->images->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'url' => asset('storage/'.$image->image_path),
                    ];
                })->toArray(),
            ];
        })->toArray();

        return Inertia::render('visitor/jobs/view', [
            'job' => [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company,
                'poster' => [
                    'id' => $poster->id,
                    'name' => $poster->name,
                    'slug' => $poster->slug,
                    'description' => $poster->description,
                    'logo' => $poster->logo ? '/storage/'.$poster->logo : null,
                    'location' => $poster->location,
                    'website' => $poster->website,
                    'is_verified' => $poster->is_verified,
                ],
                'type' => $job->type,
                'type_label' => $typeLabels[$job->type] ?? ucfirst($job->type),
                'category' => $job->category ? ($categoryLabels[$job->category] ?? ucfirst(str_replace('_', ' ', $job->category))) : null,
                'salary' => $job->salary,
                'location' => $job->location,
                'address' => $job->address,
                'description' => $job->description,
                'requirements' => $requirements,
                'responsibilities' => $responsibilities,
                'benefits' => $benefits,
                'application_link' => $job->application_link,
                'application_instructions' => $job->application_instructions,
                'is_urgent' => $job->is_urgent,
                'posted_at' => $job->posted_at ? $job->posted_at->toISOString() : $job->created_at->toISOString(),
                'posted_at_human' => $job->posted_at ? $job->posted_at->diffForHumans() : $job->created_at->diffForHumans(),
                'phone' => $phone,
                'whatsapp' => $whatsapp,
                'whatsapp_url' => $whatsappUrl,
                'email' => $email,
            ],
            'reviews' => $formattedReviews,
            'average_rating' => $poster->average_rating,
            'reviews_count' => $poster->reviews_count,
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
