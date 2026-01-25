<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminReviewController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Review::with([
            'images',
            'artisan:id,name',
            'hotel:id,name',
            'transportRide:id,vehicle_name',
            'marketplaceProduct:id,title',
            'rental:id,name',
            'job:id,title',
            'store:id,name',
        ])->latest();

        // Status filter (tab)
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        // Search filter
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('reviewer_name', 'like', "%{$search}%")
                    ->orWhere('reviewer_phone', 'like', "%{$search}%")
                    ->orWhere('comment', 'like', "%{$search}%");
            });
        }

        // Rating filter
        if ($rating = $request->query('rating')) {
            $query->where('rating', $rating);
        }

        // Type filter (artisan, hotel, etc.)
        if ($type = $request->query('type')) {
            $foreignKeyMap = [
                'artisan' => 'artisan_id',
                'hotel' => 'hotel_id',
                'transport' => 'transport_ride_id',
                'marketplace' => 'marketplace_product_id',
                'rental' => 'rental_id',
                'job' => 'job_id',
                'store' => 'store_id',
            ];
            if (isset($foreignKeyMap[$type])) {
                $query->whereNotNull($foreignKeyMap[$type]);
            }
        }

        $reviews = $query->paginate(20)->withQueryString();

        // Get counts for tabs
        $counts = [
            'all' => Review::count(),
            'pending' => Review::pending()->count(),
            'approved' => Review::approved()->count(),
            'disapproved' => Review::disapproved()->count(),
        ];

        return Inertia::render('admin/reviews/index', [
            'reviews' => $reviews,
            'filters' => $request->only(['status', 'search', 'rating', 'type']),
            'counts' => $counts,
        ]);
    }

    public function approve(Review $review): RedirectResponse
    {
        $review->update(['status' => 'approved']);

        return back()->with('success', 'Review has been approved.');
    }

    public function disapprove(Review $review): RedirectResponse
    {
        $review->update(['status' => 'disapproved']);

        return back()->with('success', 'Review has been disapproved.');
    }

    public function destroy(Review $review): RedirectResponse
    {
        // Delete associated images from storage
        foreach ($review->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $review->delete();

        return back()->with('success', 'Review has been deleted.');
    }

    public function bulkApprove(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:reviews,id',
        ]);

        Review::whereIn('id', $request->ids)->update(['status' => 'approved']);

        return back()->with('success', count($request->ids).' review(s) have been approved.');
    }

    public function bulkDisapprove(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:reviews,id',
        ]);

        Review::whereIn('id', $request->ids)->update(['status' => 'disapproved']);

        return back()->with('success', count($request->ids).' review(s) have been disapproved.');
    }

    public function bulkDelete(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:reviews,id',
        ]);

        $reviews = Review::with('images')->whereIn('id', $request->ids)->get();

        foreach ($reviews as $review) {
            foreach ($review->images as $image) {
                Storage::disk('public')->delete($image->image_path);
            }
            $review->delete();
        }

        return back()->with('success', count($request->ids).' review(s) have been deleted.');
    }
}
