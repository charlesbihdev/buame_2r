<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    /**
     * Display the specified store with its products.
     */
    public function show(string $slug, Request $request): Response
    {
        $store = Store::with(['user', 'products' => function ($query) {
            $query->with(['images', 'specifications'])
                ->where('is_active', true)
                ->latest();
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

        // Search products
        $productsQuery = $store->products()
            ->with(['images', 'specifications'])
            ->where('is_active', true);

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $productsQuery->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $productsQuery->where('category', $request->category);
        }

        // Filter by location
        if ($request->has('location') && $request->location) {
            $productsQuery->where('location', 'like', "%{$request->location}%");
        }

        // Sort
        $sort = $request->get('sort', 'newest');
        match ($sort) {
            'price_low' => $productsQuery->orderBy('price', 'asc'),
            'price_high' => $productsQuery->orderBy('price', 'desc'),
            'name' => $productsQuery->orderBy('title', 'asc'),
            default => $productsQuery->latest(),
        };

        // Get category counts
        $categoryCounts = $store->products()
            ->where('is_active', true)
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->pluck('count', 'category')
            ->toArray();

        // Paginate products
        $products = $productsQuery->paginate(12)->withQueryString()->through(function ($product) {
            $primaryImage = $product->images()->where('is_primary', true)->first()
                ?? $product->images()->orderBy('display_order')->first();

            return [
                'id' => $product->id,
                'title' => $product->title,
                'category' => $product->category,
                'price' => $product->price,
                'price_type' => $product->price_type,
                'condition' => $product->condition,
                'location' => $product->location,
                'image' => $primaryImage ? '/storage/'.$primaryImage->image_path : null,
                'delivery_available' => $product->delivery_available,
            ];
        });

        // Calculate rating breakdown from approved reviews
        $ratingBreakdown = [
            5 => $store->reviews->where('rating', 5)->count(),
            4 => $store->reviews->where('rating', 4)->count(),
            3 => $store->reviews->where('rating', 3)->count(),
            2 => $store->reviews->where('rating', 2)->count(),
            1 => $store->reviews->where('rating', 1)->count(),
        ];

        // Format reviews for frontend
        $formattedReviews = $store->reviews->map(function ($review) {
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

        return Inertia::render('visitor/stores/show', [
            'store' => [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
                'description' => $store->description,
                'thumbnail' => $store->thumbnail ? '/storage/'.$store->thumbnail : null,
                'user' => [
                    'name' => $store->user->name,
                    'phone' => $store->user->phone,
                ],
            ],
            'products' => $products,
            'filters' => $request->only(['search', 'location', 'category', 'sort']),
            'categoryCounts' => $categoryCounts,
            'reviews' => $formattedReviews,
            'average_rating' => $store->average_rating,
            'reviews_count' => $store->reviews_count,
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
