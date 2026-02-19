<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Models\Rental;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RentalsController extends Controller
{
    /**
     * Display a listing of rentals.
     */
    public function index(Request $request): Response
    {
        $query = Rental::with(['images', 'features', 'user'])
            ->where('is_active', true)
            ->withActiveSubscription();

        // Search by name or location
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by type
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        // Filter by location
        if ($request->has('location') && $request->location) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        // Sort
        $sort = $request->get('sort', 'newest');
        match ($sort) {
            'price_low' => $query->orderBy('price', 'asc'),
            'price_high' => $query->orderBy('price', 'desc'),
            'top_rated' => $query->orderBy('views_count', 'desc'),
            default => $query->latest(),
        };

        // Get counts by type for quick filters (only from users with active subscriptions)
        $typeCounts = Rental::where('is_active', true)
            ->withActiveSubscription()
            ->selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->pluck('count', 'type')
            ->toArray();

        // Paginate with formatting
        $rentals = $query->paginate(12)->withQueryString()->through(function ($rental) {
            $primaryImage = $rental->images()->where('is_primary', true)->first()
                ?? $rental->images()->orderBy('display_order')->first();

            return [
                'id' => $rental->id,
                'name' => $rental->name,
                'type' => $rental->type,
                'price' => $rental->price,
                'period' => $rental->period,
                'location' => $rental->location,
                'image' => $primaryImage ? $primaryImage->image_path : null,
                'features' => $rental->features->pluck('feature')->toArray(),
            ];
        });

        return Inertia::render('visitor/rentals/index', [
            'rentals' => $rentals,
            'filters' => $request->only(['search', 'location', 'type', 'sort']),
            'typeCounts' => $typeCounts,
        ]);
    }

    /**
     * Display the specified rental.
     */
    public function show(string $id): Response
    {
        $rental = Rental::with(['images', 'features', 'user'])
            ->with(['reviews' => function ($query) {
                $query->approved()
                    ->with('images')
                    ->latest()
                    ->limit(50);
            }])
            ->where('is_active', true)
            ->withActiveSubscription()
            ->findOrFail($id);

        // Increment views
        $rental->increment('views_count');

        $primaryImage = $rental->images()->where('is_primary', true)->first()
            ?? $rental->images()->orderBy('display_order')->first();

        $allImages = $rental->images()
            ->orderBy('display_order')
            ->get()
            ->pluck('image_path')
            ->toArray();

        // Calculate rating breakdown from approved reviews
        $ratingBreakdown = [
            5 => $rental->reviews->where('rating', 5)->count(),
            4 => $rental->reviews->where('rating', 4)->count(),
            3 => $rental->reviews->where('rating', 3)->count(),
            2 => $rental->reviews->where('rating', 2)->count(),
            1 => $rental->reviews->where('rating', 1)->count(),
        ];

        // Format reviews for frontend
        $formattedReviews = $rental->reviews->map(function ($review) {
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

        return Inertia::render('visitor/rentals/view', [
            'rental' => [
                'id' => $rental->id,
                'name' => $rental->name,
                'type' => $rental->type,
                'price' => $rental->price,
                'period' => $rental->period,
                'location' => $rental->location,
                'phone' => $rental->phone,
                'phone_2' => $rental->phone_2,
                'whatsapp' => $rental->whatsapp,
                'email' => $rental->email,
                'description' => $rental->description,
                'rental_terms' => $rental->rental_terms,
                'primary_image' => $primaryImage ? $primaryImage->image_path : null,
                'images' => $allImages,
                'features' => $rental->features->pluck('feature')->toArray(),
                'user' => [
                    'name' => $rental->user->name,
                    'phone' => $rental->user->phone,
                ],
            ],
            'reviews' => $formattedReviews,
            'average_rating' => $rental->average_rating,
            'reviews_count' => $rental->reviews_count,
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
