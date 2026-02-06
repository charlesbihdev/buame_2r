<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Models\TransportRide;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransportController extends Controller
{
    /**
     * Display a listing of transport rides.
     */
    public function index(Request $request): Response
    {
        $query = TransportRide::query()
            ->with(['images', 'user'])
            ->where('is_active', true);

        // Add subquery to calculate average rating from approved reviews
        $query->addSelect([
            'rating' => \App\Models\Review::selectRaw('COALESCE(AVG(rating), 0)')
                ->whereColumn('transport_ride_id', 'transport_rides.id')
                ->where('status', 'approved')
        ]);

        // Add subquery to count approved reviews
        $query->addSelect([
            'reviews_count' => \App\Models\Review::selectRaw('COUNT(*)')
                ->whereColumn('transport_ride_id', 'transport_rides.id')
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

        // Search by driver name or description
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('driver_name', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        // Sorting
        $sortBy = $request->get('sort', 'rating');
        match ($sortBy) {
            'price_low' => $query->orderBy('price_per_seat'),
            'price_high' => $query->orderByDesc('price_per_seat'),
            'newest' => $query->latest(),
            default => $query->orderByDesc('rating')->orderByDesc('reviews_count'),
        };

        $rides = $query->paginate(12)->through(function ($ride) {
            $primaryImage = $ride->images()->where('is_primary', true)->first() ?? $ride->images()->first();

            return [
                'id' => $ride->id,
                'driver_name' => $ride->driver_name,
                'type' => $ride->type,
                'rating' => $ride->rating ?? 4.5,
                'reviews_count' => $ride->reviews_count,
                'price_per_seat' => number_format($ride->price_per_seat, 2),
                'seats_available' => $ride->seats_available,
                'location' => $ride->location,
                'image' => $primaryImage?->image_path,
                'is_verified' => $ride->is_verified,
                'phone' => $ride->phone,
            ];
        });

        // Get counts for type categories
        $typeCounts = [
            'okada' => TransportRide::where('type', 'okada')->where('is_active', true)->count(),
            'car' => TransportRide::where('type', 'car')->where('is_active', true)->count(),
            'taxi' => TransportRide::where('type', 'taxi')->where('is_active', true)->count(),
            'bus' => TransportRide::where('type', 'bus')->where('is_active', true)->count(),
            'cargo' => TransportRide::where('type', 'cargo')->where('is_active', true)->count(),
        ];

        return Inertia::render('visitor/transport/index', [
            'rides' => $rides,
            'typeCounts' => $typeCounts,
            'filters' => $request->only(['search', 'location', 'type', 'sort']),
        ]);
    }

    /**
     * Display the specified transport ride.
     */
    public function show(string $id): Response
    {
        $ride = TransportRide::with(['images', 'user'])
            ->with(['reviews' => function ($query) {
                $query->approved()
                    ->with('images')
                    ->latest()
                    ->limit(50);
            }])
            ->findOrFail($id);

        // Increment view count
        $ride->increment('views_count');

        // Calculate rating breakdown from approved reviews
        $ratingBreakdown = [
            5 => $ride->reviews->where('rating', 5)->count(),
            4 => $ride->reviews->where('rating', 4)->count(),
            3 => $ride->reviews->where('rating', 3)->count(),
            2 => $ride->reviews->where('rating', 2)->count(),
            1 => $ride->reviews->where('rating', 1)->count(),
        ];

        // Format reviews for frontend
        $formattedReviews = $ride->reviews->map(function ($review) {
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

        return Inertia::render('visitor/transport/view', [
            'ride' => [
                'id' => $ride->id,
                'driver_name' => $ride->driver_name,
                'type' => $ride->type,
                'description' => $ride->description,
                'rating' => $ride->average_rating ?: 0,
                'reviews_count' => $ride->reviews_count,
                'price_per_seat' => number_format($ride->price_per_seat, 2),
                'seats_available' => $ride->seats_available,
                'location' => $ride->location,
                'address' => $ride->address,
                'phone' => $ride->phone,
                'whatsapp' => $ride->whatsapp,
                'email' => $ride->email,
                'operating_hours' => $ride->operating_hours,
                'operating_locations' => $ride->operating_locations,
                'payment_methods' => $ride->payment_methods ?? [],
                'images' => $ride->images->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image_path' => $image->image_path,
                        'is_primary' => $image->is_primary,
                        'display_order' => $image->display_order,
                    ];
                })->sortBy('display_order')->values(),
                'is_verified' => $ride->is_verified,
                'is_active' => $ride->is_active,
                'views_count' => $ride->views_count,
            ],
            'reviews' => $formattedReviews,
            'average_rating' => $ride->average_rating,
            'reviews_count' => $ride->reviews_count,
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
