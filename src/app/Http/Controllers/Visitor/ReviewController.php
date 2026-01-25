<?php

namespace App\Http\Controllers\Visitor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;

class ReviewController extends Controller
{
    /**
     * Store a newly created review.
     */
    public function store(StoreReviewRequest $request, string $type, int $id): RedirectResponse
    {
        // Map type to foreign key column
        $foreignKeyMap = [
            'artisan' => 'artisan_id',
            'hotel' => 'hotel_id',
            'transport' => 'transport_ride_id',
            'marketplace' => 'marketplace_product_id',
            'rental' => 'rental_id',
            'job' => 'job_id',
            'store' => 'store_id',
        ];

        if (! isset($foreignKeyMap[$type])) {
            return back()->withErrors(['error' => 'Invalid review type.']);
        }

        // Create review with foreign key
        $review = Review::create([
            'reviewer_name' => $request->reviewer_name,
            'reviewer_phone' => $request->reviewer_phone,
            'rating' => $request->rating,
            'comment' => $request->comment,
            $foreignKeyMap[$type] => $id,
        ]);

        // Upload images if provided
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $review->images()->create(['image_path' => $path]);
            }
        }

        // Clear rating cache for the reviewed item
        Cache::forget("{$type}.{$id}.rating");
        Cache::forget("{$type}.{$id}.reviews_count");

        return back()->with('success', 'Thank you for your review! It will be published after approval.');
    }
}
