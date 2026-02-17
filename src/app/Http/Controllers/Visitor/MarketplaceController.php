<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarketplaceController extends Controller
{
    /**
     * Display a listing of marketplace products in random order.
     */
    public function index(Request $request): Response
    {
        $query = MarketplaceProduct::query()
            ->where('is_active', true)
            // ->where('is_approved', true)
            ->withActiveSubscription()
            ->with(['images' => function ($query) {
                $query->orderBy('is_primary', 'desc')
                    ->orderBy('display_order');
            }])
            ->with(['specifications'])
            ->with(['store' => function ($query) {
                $query->select('id', 'name', 'slug', 'is_active');
            }]);

        // Apply category filter
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Apply search filter
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        // Apply location filter
        if ($request->filled('location')) {
            $query->where('location', 'like', '%'.$request->location.'%');
        }

        // Apply price range filters
        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }
        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        // Apply condition filter
        if ($request->filled('condition') && $request->condition !== 'all') {
            $query->where('condition', $request->condition);
        }

        // Apply delivery available filter
        if ($request->filled('delivery_available') && $request->delivery_available === '1') {
            $query->where('delivery_available', true);
        }

        // Apply sorting
        $sortBy = $request->get('sort', 'recommended');
        match ($sortBy) {
            'price-low' => $query->orderBy('price', 'asc'),
            'price-high' => $query->orderBy('price', 'desc'),
            'newest' => $query->orderBy('created_at', 'desc'),
            'oldest' => $query->orderBy('created_at', 'asc'),
            default => $query->inRandomOrder(), // Recommended = random order
        };

        // Paginate results
        $perPage = $request->get('per_page', 12);
        $products = $query->paginate($perPage)->withQueryString();

        // Format products for frontend
        $formattedProducts = $products->items();
        $formattedProducts = collect($formattedProducts)->map(function ($product) {
            $primaryImage = $product->images->firstWhere('is_primary', true)
                ?? $product->images->first();

            $imageUrl = $primaryImage
                ? asset('storage/'.$primaryImage->image_path)
                : '/assets/visitors/marketplace.jpg';

            // Format price
            $priceDisplay = null;
            if ($product->price !== null) {
                $priceDisplay = '₵'.number_format($product->price, 2);
                if ($product->price_type) {
                    $priceDisplay .= ' / '.$product->price_type;
                }
            }

            return [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'category' => ucfirst($product->category),
                'price' => $priceDisplay,
                'location' => $product->location,
                'image' => $imageUrl,
                'rating' => $product->average_rating,
                'reviews' => $product->reviews_count,
                'verified' => $product->store?->is_active ?? false,
                'condition' => $product->condition,
                'delivery_available' => $product->delivery_available,
                'specifications' => $product->specifications->pluck('specification')->toArray(),
                'store' => $product->store ? [
                    'id' => $product->store->id,
                    'name' => $product->store->name,
                    'slug' => $product->store->slug,
                    'is_active' => $product->store->is_active,
                ] : null,
            ];
        });

        // Build pagination links
        $paginationLinks = [];
        $currentPage = $products->currentPage();
        $lastPage = $products->lastPage();
        $baseUrl = $request->url();
        $queryParams = $request->except('page');

        // Previous link
        if ($currentPage > 1) {
            $paginationLinks[] = [
                'url' => $currentPage > 1 ? $baseUrl.'?'.http_build_query(array_merge($queryParams, ['page' => $currentPage - 1])) : null,
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
                'url' => $currentPage < $lastPage ? $baseUrl.'?'.http_build_query(array_merge($queryParams, ['page' => $currentPage + 1])) : null,
                'label' => 'Next &raquo;',
                'active' => false,
            ];
        }

        return Inertia::render('visitor/marketplace/index', [
            'products' => $formattedProducts,
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'from' => $products->firstItem(),
                'to' => $products->lastItem(),
                'links' => $paginationLinks,
            ],
            'filters' => [
                'category' => $request->get('category', 'all'),
                'search' => $request->get('search', ''),
                'location' => $request->get('location', ''),
                'price_min' => $request->get('price_min'),
                'price_max' => $request->get('price_max'),
                'condition' => $request->get('condition', 'all'),
                'delivery_available' => $request->get('delivery_available'),
                'sort' => $sortBy,
            ],
        ]);
    }

    /**
     * Display the specified marketplace product.
     */
    public function show(MarketplaceProduct $marketplaceProduct): Response
    {
        $product = MarketplaceProduct::query()
            ->where('id', $marketplaceProduct->id)
            ->where('is_active', true)
            // ->where('is_approved', true)
            ->withActiveSubscription()
            ->with(['images' => function ($query) {
                $query->orderBy('is_primary', 'desc')
                    ->orderBy('display_order');
            }])
            ->with(['specifications'])
            ->with(['user' => function ($query) {
                $query->select('id', 'name', 'email', 'phone');
            }])
            ->with(['store' => function ($query) {
                $query->select('id', 'name', 'slug', 'is_active');
            }])
            ->with(['reviews' => function ($query) {
                $query->approved()
                    ->with('images')
                    ->latest()
                    ->limit(50);
            }])
            ->first();

        if (! $product) {
            abort(404, 'Product not found or not available');
        }

        // Increment views count
        $product->increment('views_count');

        // Calculate rating breakdown
        $ratingBreakdown = [
            5 => $product->reviews->where('rating', 5)->count(),
            4 => $product->reviews->where('rating', 4)->count(),
            3 => $product->reviews->where('rating', 3)->count(),
            2 => $product->reviews->where('rating', 2)->count(),
            1 => $product->reviews->where('rating', 1)->count(),
        ];

        // Format product images
        $images = $product->images->map(function ($image) {
            return asset('storage/'.$image->image_path);
        })->toArray();

        // Get primary image or first image
        $primaryImage = $product->images->firstWhere('is_primary', true)
            ?? $product->images->first();
        $primaryImageUrl = $primaryImage
            ? asset('storage/'.$primaryImage->image_path)
            : '/assets/visitors/marketplace.jpg';

        // Format price
        $priceDisplay = null;
        if ($product->price !== null) {
            $priceDisplay = '₵'.number_format($product->price, 2);
            if ($product->price_type) {
                $priceDisplay .= ' / '.$product->price_type;
            }
        }

        // Format condition
        $conditionLabels = [
            'new' => 'New',
            'like_new' => 'Like New',
            'used' => 'Used',
            'refurbished' => 'Refurbished',
        ];
        $conditionLabel = $conditionLabels[$product->condition] ?? ucfirst($product->condition ?? 'N/A');

        // Get user contact info
        $user = $product->user;
        $phone = $user->phone ?? null;
        $whatsapp = $user->phone ?? null; // Assuming phone can be used for WhatsApp
        $email = $user->email ?? null;

        // Build WhatsApp URL
        $whatsappUrl = null;
        if ($whatsapp) {
            $whatsappNumber = preg_replace('/\D/', '', $whatsapp);
            $message = urlencode("Hello, I'm interested in buying {$product->title}.");
            $whatsappUrl = "https://wa.me/{$whatsappNumber}?text={$message}";
        }

        // Format reviews for frontend
        $formattedReviews = $product->reviews->map(function ($review) {
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

        return Inertia::render('visitor/marketplace/view', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'category' => ucfirst($product->category),
                'price' => $priceDisplay,
                'price_raw' => $product->price,
                'condition' => $conditionLabel,
                'condition_value' => $product->condition,
                'location' => $product->location,
                'latitude' => $product->latitude,
                'longitude' => $product->longitude,
                'description' => $product->description,
                'specifications' => $product->specifications->pluck('specification')->toArray(),
                'delivery_available' => $product->delivery_available,
                'warranty' => $product->warranty,
                'images' => $images,
                'primary_image' => $primaryImageUrl,
                'phone' => $phone,
                'whatsapp' => $whatsapp,
                'whatsapp_url' => $whatsappUrl,
                'email' => $email,
                'verified' => $product->store?->is_active ?? false,
                'store' => $product->store ? [
                    'id' => $product->store->id,
                    'name' => $product->store->name,
                    'slug' => $product->store->slug,
                    'description' => $product->store->description,
                    'is_active' => $product->store->is_active,
                ] : null,
            ],
            'reviews' => $formattedReviews,
            'average_rating' => $product->average_rating,
            'reviews_count' => $product->reviews_count,
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
