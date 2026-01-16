<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceProduct;
use App\Models\ProductImage;
use App\Models\ProductSpecification;
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

        // Check image sizes before validation (5MB = 5 * 1024 * 1024 bytes)
        $images = $request->file('images', []);
        if (!empty($images)) {
            foreach ($images as $image) {
                if ($image && $image->getSize() > 5 * 1024 * 1024) {
                    return back()->withErrors([
                        'images' => 'One or more images exceed 5MB. Please compress or resize your images before uploading.',
                    ])->withInput();
                }
            }
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
            'delivery_available' => ['nullable', 'boolean'],
            'warranty' => ['nullable', 'string', 'max:255'],
            'images' => ['required', 'array', 'max:10'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'specifications' => ['nullable', 'array'],
            'specifications.*' => ['string', 'max:255'],
        ]);



        $validated['user_id'] = $user->id;
        $validated['store_id'] = $store->id;
        $validated['delivery_available'] = in_array($request->input('delivery_available'), ['true', '1', 'yes', true, 1], true);

        // Remove images and specifications from validated data before creating product
        $specifications = $request->input('specifications', []);
        unset($validated['images'], $validated['specifications']);

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

        // Handle specifications
        foreach ($specifications as $specification) {
            if (!empty(trim($specification))) {
                ProductSpecification::create([
                    'product_id' => $product->id,
                    'specification' => trim($specification),
                ]);
            }
        }

        return redirect()->route('user.dashboard.index', [
            'category' => 'marketplace',
            'section' => 'products',
        ])->with('success', 'Product created successfully.');
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
            'delivery_available' => ['nullable', 'boolean'],
            'warranty' => ['nullable', 'string', 'max:255'],
            'images' => ['nullable', 'array', 'max:10'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'remove_images' => ['nullable', 'array'],
            'remove_images.*' => ['integer', 'exists:product_images,id'],
            'specifications' => ['nullable', 'array'],
            'specifications.*' => ['string', 'max:255'],
            'remove_specifications' => ['nullable', 'array'],
            'remove_specifications.*' => ['integer', 'exists:product_specifications,id'],
        ]);

        $validated['delivery_available'] = in_array($request->input('delivery_available'), ['true', '1', 'yes', true, 1], true);

        // Remove images, specifications and their removal arrays from validated data
        $newImages = $request->file('images', []);
        $removeImageIds = $request->input('remove_images', []);
        $specifications = $request->input('specifications', []);
        $removeSpecificationIds = $request->input('remove_specifications', []);
        unset($validated['images'], $validated['remove_images'], $validated['specifications'], $validated['remove_specifications']);

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

        // Remove selected specifications
        if (!empty($removeSpecificationIds)) {
            ProductSpecification::where('product_id', $marketplace->id)
                ->whereIn('id', $removeSpecificationIds)
                ->delete();
        }

        // Add new specifications
        foreach ($specifications as $specification) {
            if (!empty(trim($specification))) {
                ProductSpecification::create([
                    'product_id' => $marketplace->id,
                    'specification' => trim($specification),
                ]);
            }
        }

        return redirect()->route('user.dashboard.index', [
            'category' => 'marketplace',
            'section' => 'products',
        ])->with('success', 'Product updated successfully.');
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
