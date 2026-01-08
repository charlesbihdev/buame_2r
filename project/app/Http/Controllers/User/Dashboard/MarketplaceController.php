<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceProduct;
use App\Models\ProductImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MarketplaceController extends Controller
{
    /**
     * Display a listing of the resource.
     * Redirects to main dashboard with marketplace as active category.
     */
    public function index(): RedirectResponse
    {
        return redirect()->route('user.dashboard.index');
    }

    /**
     * Show the form for creating a new resource.
     * Redirects to main dashboard - product creation is handled via modal.
     */
    public function create(): RedirectResponse
    {
        return redirect()->route('user.dashboard.index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $store = $user->store;

        if (!$store) {
            return back()->withErrors(['store' => 'Store not found. Please set up your store first.']);
        }

        // Check product limit
        if ($store->remaining_product_slots <= 0) {
            return back()->withErrors([
                'limit' => 'You have reached your product limit (' . $store->product_limit . '). Please upgrade your tier to add more products.',
            ]);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'in:electronics,furniture,food,agriculture,clothes,others'],
            'price' => ['required', 'numeric', 'min:0'],
            'price_type' => ['nullable', 'string', 'max:50'],
            'condition' => ['nullable', 'string', 'in:new,like_new,used,refurbished'],
            'location' => ['required', 'string', 'max:255'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'description' => ['nullable', 'string'],
            'delivery_available' => ['boolean'],
            'warranty' => ['nullable', 'string', 'max:255'],
            'images' => ['nullable', 'array', 'max:10'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
        ]);

        $validated['user_id'] = $user->id;
        $validated['store_id'] = $store->id;
        $validated['delivery_available'] = $request->has('delivery_available') ? (bool) $request->delivery_available : false;

        // Remove images from validated data before creating product
        $images = $request->file('images', []);
        unset($validated['images']);

        $product = MarketplaceProduct::create($validated);

        // Handle image uploads
        foreach ($images as $index => $image) {
            $path = $image->store('products', 'public');
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $path,
                'is_primary' => $index === 0,
                'display_order' => $index,
            ]);
        }

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     * Redirects to main dashboard - product editing is handled via modal.
     */
    public function edit(MarketplaceProduct $marketplaceProduct): RedirectResponse
    {
        return redirect()->route('user.dashboard.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MarketplaceProduct $marketplace): RedirectResponse
    {
        $user = Auth::user();
        if ($marketplace->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'in:electronics,furniture,food,agriculture,clothes,others'],
            'price' => ['required', 'numeric', 'min:0'],
            'price_type' => ['nullable', 'string', 'max:50'],
            'condition' => ['nullable', 'string', 'in:new,like_new,used,refurbished'],
            'location' => ['required', 'string', 'max:255'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'description' => ['nullable', 'string'],
            'delivery_available' => ['boolean'],
            'warranty' => ['nullable', 'string', 'max:255'],
            'images' => ['nullable', 'array', 'max:10'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'remove_images' => ['nullable', 'array'],
            'remove_images.*' => ['integer', 'exists:product_images,id'],
        ]);

        $validated['delivery_available'] = $request->has('delivery_available') ? (bool) $request->delivery_available : false;

        // Remove images and remove_images from validated data
        $newImages = $request->file('images', []);
        $removeImageIds = $request->input('remove_images', []);
        unset($validated['images'], $validated['remove_images']);

        $marketplace->update($validated);

        // Remove selected images
        if (!empty($removeImageIds)) {
            $imagesToDelete = ProductImage::where('product_id', $marketplace->id)
                ->whereIn('id', $removeImageIds)
                ->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        // Add new images
        $currentMaxOrder = $marketplace->images()->max('display_order') ?? -1;
        foreach ($newImages as $index => $image) {
            $path = $image->store('products', 'public');
            ProductImage::create([
                'product_id' => $marketplace->id,
                'image_path' => $path,
                'is_primary' => $marketplace->images()->count() === 0 && $index === 0,
                'display_order' => $currentMaxOrder + $index + 1,
            ]);
        }

        // Ensure at least one primary image exists
        if ($marketplace->images()->where('is_primary', true)->count() === 0) {
            $firstImage = $marketplace->images()->orderBy('display_order')->first();
            if ($firstImage) {
                $firstImage->update(['is_primary' => true]);
            }
        }

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MarketplaceProduct $marketplace): RedirectResponse
    {
        $user = Auth::user();
        if ($marketplace->user_id !== $user->id) {
            abort(403);
        }

        // Delete associated images from storage
        foreach ($marketplace->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $marketplace->delete();

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Product deleted successfully.');
    }
}
