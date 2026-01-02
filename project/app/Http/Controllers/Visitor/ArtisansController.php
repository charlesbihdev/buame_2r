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
            ->where('is_available', true);

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

        // Search by name or skill
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%')
                    ->orWhere('skill', 'like', '%'.$request->search.'%')
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
                'skill' => $artisan->skill,
                'skill_type' => $artisan->skill_type,
                'rating' => $artisan->rating ?? 4.5, // Default rating for new artisans
                'reviews_count' => $artisan->reviews_count,
                'experience_years' => $artisan->experience_years,
                'experience_level' => $artisan->experience_level,
                'price_per_day' => number_format($artisan->price_per_day, 2),
                'location' => $artisan->location,
                'profile_image' => $artisan->profile_image,
                'is_verified' => $artisan->is_verified,
                'is_available' => $artisan->is_available,
                'specialties' => $artisan->specialties->pluck('specialty'),
                'phone' => $artisan->phone,
            ];
        });

        // Get counts for quick categories
        $categoryCounts = [
            'carpenter' => Artisan::where('skill_type', 'carpenter')->where('is_active', true)->count(),
            'mason' => Artisan::where('skill_type', 'mason')->where('is_active', true)->count(),
            'electrician' => Artisan::where('skill_type', 'electrician')->where('is_active', true)->count(),
            'plumber' => Artisan::where('skill_type', 'plumber')->where('is_active', true)->count(),
            'tiler' => Artisan::where('skill_type', 'tiler')->where('is_active', true)->count(),
            'tailor' => Artisan::where('skill_type', 'tailor')->where('is_active', true)->count(),
            'welder' => Artisan::where('skill_type', 'welder')->where('is_active', true)->count(),
            'painter' => Artisan::where('skill_type', 'painter')->where('is_active', true)->count(),
        ];

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
        $artisan = Artisan::with(['specialties', 'portfolio', 'reviews', 'user'])
            ->findOrFail($id);

        // Increment view count
        $artisan->increment('views_count');

        return Inertia::render('visitor/artisans/view', [
            'artisan' => [
                'id' => $artisan->id,
                'name' => $artisan->name,
                'skill' => $artisan->skill,
                'skill_type' => $artisan->skill_type,
                'description' => $artisan->description,
                'rating' => $artisan->rating ?? 4.5, // Default rating
                'reviews_count' => $artisan->reviews_count,
                'experience_years' => $artisan->experience_years,
                'experience_level' => $artisan->experience_level,
                'price_per_day' => number_format($artisan->price_per_day, 2),
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
        ]);
    }
}
