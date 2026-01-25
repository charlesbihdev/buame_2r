<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Models\Artisan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArtisansController extends Controller
{
    /**
     * Display a listing of artisans.
     */
    public function index(Request $request): Response
    {
        $query = Artisan::query()
            ->with(['specialties', 'user'])
            ->where('is_active', true)
            ->where('is_available', true)
            ->withActiveSubscription();

        // Filter by skill type
        if ($request->filled('skill_type')) {
            $query->where('skill_type', $request->skill_type);
        }

        // Filter by experience level
        if ($request->filled('experience_level')) {
            $query->where('experience_level', $request->experience_level);
        }

        // Filter by location
        if ($request->filled('location')) {
            $query->where('location', 'like', '%'.$request->location.'%');
        }

        // Search by name or company_name
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%')
                    ->orWhere('company_name', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        // Sorting
        $sortBy = $request->get('sort', 'rating');
        match ($sortBy) {
            'experience' => $query->orderByDesc('experience_years'),
            'price_low' => $query->orderBy('price_per_day'),
            'price_high' => $query->orderByDesc('price_per_day'),
            'newest' => $query->latest(),
            default => $query->orderByDesc('rating')->orderByDesc('reviews_count'),
        };

        $artisans = $query->paginate(12)->through(function ($artisan) {
            return [
                'id' => $artisan->id,
                'name' => $artisan->name,
                'company_name' => $artisan->company_name,
                'skill_type' => $artisan->skill_type,
                'rating' => $artisan->rating ?? 4.5, // Default rating for new artisans
                'reviews_count' => $artisan->reviews_count,
                'experience_years' => $artisan->experience_years,
                'price_per_day' => $artisan->show_price && $artisan->price_per_day ? number_format($artisan->price_per_day, 2) : null,
                'show_price' => $artisan->show_price,
                'location' => $artisan->location,
                'profile_image' => $artisan->profile_image,
                'is_verified' => $artisan->is_verified,
                'is_available' => $artisan->is_available,
                'specialties' => $artisan->specialties->pluck('specialty'),
                'phone' => $artisan->phone,
            ];
        });

        // Get counts for quick categories (only from users with active subscriptions)
        $skillTypes = [
            'carpenter', 'mason', 'electrician', 'plumber', 'tiler', 'tailor', 'welder', 'painter',
            'hairdressing', 'mechanic', 'bakery', 'decoration', 'makeup_artistry',
            'bead_making', 'shoe_making', 'event_mc', 'event_planners',
        ];
        $categoryCounts = [];
        foreach ($skillTypes as $type) {
            $categoryCounts[$type] = Artisan::where('skill_type', $type)->where('is_active', true)->withActiveSubscription()->count();
        }

        return Inertia::render('visitor/artisans/index', [
            'artisans' => $artisans,
            'categoryCounts' => $categoryCounts,
            'filters' => $request->only(['search', 'location', 'skill_type', 'experience_level', 'sort']),
        ]);
    }

    /**
     * Display the specified artisan.
     */
    public function show(string $id): Response
    {
        $artisan = Artisan::with(['specialties', 'portfolio', 'user'])
            ->with(['reviews' => function ($query) {
                $query->approved()
                    ->with('images')
                    ->latest()
                    ->limit(50);
            }])
            ->withActiveSubscription()
            ->findOrFail($id);

        // Increment view count
        $artisan->increment('views_count');

        // Calculate rating breakdown from approved reviews
        $ratingBreakdown = [
            5 => $artisan->reviews->where('rating', 5)->count(),
            4 => $artisan->reviews->where('rating', 4)->count(),
            3 => $artisan->reviews->where('rating', 3)->count(),
            2 => $artisan->reviews->where('rating', 2)->count(),
            1 => $artisan->reviews->where('rating', 1)->count(),
        ];

        // Format reviews for frontend
        $formattedReviews = $artisan->reviews->map(function ($review) {
            return [
                'id' => $review->id,
                'reviewer_name' => $review->reviewer_name,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at->toISOString(),
                'initials' => collect(explode(' ', $review->reviewer_name))->map(fn ($n) => strtoupper(substr($n, 0, 1)))->take(2)->join(''),
                'images' => $review->images->map(fn ($img) => ['url' => asset('storage/'.$img->image_path)]),
            ];
        });

        return Inertia::render('visitor/artisans/view', [
            'artisan' => [
                'id' => $artisan->id,
                'name' => $artisan->name,
                'company_name' => $artisan->company_name,
                'skill_type' => $artisan->skill_type,
                'description' => $artisan->description,
                'rating' => $artisan->average_rating ?: 0,
                'reviews_count' => $artisan->reviews_count,
                'experience_years' => $artisan->experience_years,
                'price_per_day' => $artisan->show_price && $artisan->price_per_day ? number_format($artisan->price_per_day, 2) : null,
                'show_price' => $artisan->show_price,
                'location' => $artisan->location,
                'address' => $artisan->address,
                'profile_image' => $artisan->profile_image,
                'is_verified' => $artisan->is_verified,
                'is_available' => $artisan->is_available,
                'working_hours' => $artisan->working_hours,
                'phone' => $artisan->phone,
                'whatsapp' => $artisan->whatsapp,
                'email' => $artisan->email,
                'specialties' => $artisan->specialties->pluck('specialty'),
                'portfolio' => $artisan->portfolio->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'item' => $item->item,
                        'image_path' => $item->image_path,
                    ];
                }),
                'views_count' => $artisan->views_count,
            ],
            'reviews' => $formattedReviews,
            'average_rating' => $artisan->average_rating,
            'reviews_count' => $artisan->reviews_count,
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
