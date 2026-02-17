<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HotelsController extends Controller
{
    /**
     * Display a listing of hotels.
     */
    public function index(Request $request): Response
    {
        $query = Hotel::query()
            ->with(['images', 'features'])
            ->where('is_active', true)
            ->withActiveSubscription();

        // Add subquery to calculate average rating from approved reviews
        $query->addSelect([
            'rating' => \App\Models\Review::selectRaw('COALESCE(AVG(rating), 0)')
                ->whereColumn('hotel_id', 'hotels.id')
                ->where('status', 'approved')
        ]);

        // Add subquery to count approved reviews
        $query->addSelect([
            'reviews_count' => \App\Models\Review::selectRaw('COUNT(*)')
                ->whereColumn('hotel_id', 'hotels.id')
                ->where('status', 'approved')
        ]);

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by location
        if ($request->filled('location')) {
            $query->where('location', 'like', '%'.$request->location.'%');
        }

        // Search by name, description, or features
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
                    ->orWhereHas('features', function ($sq) use ($search) {
                        $sq->where('feature', 'like', '%'.$search.'%');
                    });
            });
        }

        // Sorting
        $sortBy = $request->get('sort', 'rating');
        match ($sortBy) {
            'price_low' => $query->orderBy('price_per_night'),
            'price_high' => $query->orderByDesc('price_per_night'),
            'newest' => $query->latest(),
            default => $query->orderByDesc('rating')->orderByDesc('reviews_count'),
        };

        $hotels = $query->paginate(12)->withQueryString();

        // Format hotels for frontend
        $formattedHotels = $hotels->items();
        $formattedHotels = collect($formattedHotels)->map(function ($hotel) {
            $primaryImage = $hotel->images()->where('is_primary', true)->first() ?? $hotel->images()->first();

            return [
                'id' => $hotel->id,
                'name' => $hotel->name,
                'type' => $hotel->type,
                'rating' => $hotel->rating > 0 ? round($hotel->rating, 1) : 4.5,
                'reviews_count' => $hotel->reviews_count,
                'price_per_night' => number_format($hotel->price_per_night, 2),
                'location' => $hotel->location,
                'image' => $primaryImage?->image_path,
                'amenities' => $hotel->amenities ?? [],
            ];
        });

        // Build pagination URLs
        $baseUrl = $request->url();
        $queryParams = $request->except('page');
        $currentPage = $hotels->currentPage();
        $lastPage = $hotels->lastPage();

        $prevPageUrl = $currentPage > 1
            ? $baseUrl.'?'.http_build_query(array_merge($queryParams, ['page' => $currentPage - 1]))
            : null;

        $nextPageUrl = $currentPage < $lastPage
            ? $baseUrl.'?'.http_build_query(array_merge($queryParams, ['page' => $currentPage + 1]))
            : null;

        return Inertia::render('visitor/hotels/index', [
            'hotels' => [
                'data' => $formattedHotels,
                'current_page' => $currentPage,
                'last_page' => $lastPage,
                'per_page' => $hotels->perPage(),
                'total' => $hotels->total(),
                'from' => $hotels->firstItem(),
                'to' => $hotels->lastItem(),
                'prev_page_url' => $prevPageUrl,
                'next_page_url' => $nextPageUrl,
            ],
            'filters' => $request->only(['search', 'location', 'type', 'sort']),
        ]);
    }

    /**
     * Display the specified hotel.
     */
    public function show(string $id): Response
    {
        $hotel = Hotel::with(['images', 'features', 'user'])
            ->with(['reviews' => function ($query) {
                $query->approved()
                    ->with('images')
                    ->latest()
                    ->limit(50);
            }])
            ->withActiveSubscription()
            ->findOrFail($id);

        // Increment view count
        $hotel->increment('views_count');

        // Format check-in/check-out times
        $checkInTime = $hotel->check_in_time ? date('g:i A', strtotime($hotel->check_in_time)) : null;
        $checkOutTime = $hotel->check_out_time ? date('g:i A', strtotime($hotel->check_out_time)) : null;

        // Calculate rating breakdown from approved reviews
        $ratingBreakdown = [
            5 => $hotel->reviews->where('rating', 5)->count(),
            4 => $hotel->reviews->where('rating', 4)->count(),
            3 => $hotel->reviews->where('rating', 3)->count(),
            2 => $hotel->reviews->where('rating', 2)->count(),
            1 => $hotel->reviews->where('rating', 1)->count(),
        ];

        // Format reviews for frontend
        $formattedReviews = $hotel->reviews->map(function ($review) {
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

        return Inertia::render('visitor/hotels/view', [
            'hotel' => [
                'id' => $hotel->id,
                'name' => $hotel->name,
                'type' => $hotel->type,
                'description' => $hotel->description,
                'rating' => $hotel->average_rating ?: 0,
                'reviews_count' => $hotel->reviews_count,
                'price_per_night' => number_format($hotel->price_per_night, 2),
                'location' => $hotel->location,
                'address' => $hotel->address,
                'phone' => $hotel->phone,
                'whatsapp' => $hotel->whatsapp,
                'email' => $hotel->email,
                'rooms_count' => $hotel->rooms_count,
                'check_in_time' => $checkInTime,
                'check_out_time' => $checkOutTime,
                'amenities' => $hotel->amenities ?? [],
                'features' => $hotel->features->pluck('feature'),
                'images' => $hotel->images->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image_path' => $image->image_path,
                        'is_primary' => $image->is_primary,
                        'display_order' => $image->display_order,
                    ];
                })->sortBy('display_order')->values(),
                'is_verified' => $hotel->is_verified,
                'is_active' => $hotel->is_active,
                'views_count' => $hotel->views_count,
            ],
            'reviews' => $formattedReviews,
            'average_rating' => $hotel->average_rating,
            'reviews_count' => $hotel->reviews_count,
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
