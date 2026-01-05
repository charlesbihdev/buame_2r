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
            ->where('is_verified', true);

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

        // Get counts by type for quick filters
        $typeCounts = Rental::where('is_active', true)
            ->where('is_verified', true)
            ->selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->pluck('count', 'type')
            ->toArray();

        // Paginate
        $rentals = $query->paginate(12)->withQueryString();

        // Format rentals for frontend
        $formattedRentals = $rentals->map(function ($rental) {
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
            'rentals' => $formattedRentals,
            'filters' => [
                'search' => $request->search,
                'type' => $request->type,
                'location' => $request->location,
                'sort' => $sort,
            ],
            'typeCounts' => $typeCounts,
            'pagination' => [
                'current_page' => $rentals->currentPage(),
                'last_page' => $rentals->lastPage(),
                'per_page' => $rentals->perPage(),
                'total' => $rentals->total(),
            ],
        ]);
    }

    /**
     * Display the specified rental.
     */
    public function show(string $id): Response
    {
        $rental = Rental::with(['images', 'features', 'user', 'reviews'])
            ->where('is_active', true)
            ->where('is_verified', true)
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

        return Inertia::render('visitor/rentals/view', [
            'rental' => [
                'id' => $rental->id,
                'name' => $rental->name,
                'type' => $rental->type,
                'price' => $rental->price,
                'period' => $rental->period,
                'location' => $rental->location,
                'phone' => $rental->phone,
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
        ]);
    }
}

