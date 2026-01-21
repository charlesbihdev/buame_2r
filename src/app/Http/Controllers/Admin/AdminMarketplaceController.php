<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceProduct;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminMarketplaceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = MarketplaceProduct::with(['user:id,name,phone', 'store:id,name,slug', 'images'])
            ->latest();

        // Status filter
        if ($status = $request->query('status')) {
            if ($status === 'pending') {
                $query->where('is_approved', false);
            } elseif ($status === 'approved') {
                $query->where('is_approved', true);
            } elseif ($status === 'active') {
                $query->where('is_approved', true)->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Category filter
        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        // Search filter
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $products = $query->paginate(20)->withQueryString();

        // Product categories for filter
        $productCategories = [
            'mobile_phones' => 'Mobile Phones',
            'electronics' => 'Electronics',
            'computers' => 'Computers',
            'fashion' => 'Fashion',
            'footwear' => 'Footwear',
            'health_beauty' => 'Health & Beauty',
            'groceries' => 'Groceries',
            'home_living' => 'Home & Living',
            'baby_kids' => 'Baby & Kids',
            'sports_outdoor' => 'Sports & Outdoor',
            'automotive' => 'Automotive',
            'books_stationery' => 'Books & Stationery',
            'building_hardware' => 'Building & Hardware',
            'agriculture' => 'Agriculture',
            'pet_supplies' => 'Pet Supplies',
            'gifts' => 'Gifts',
            'others' => 'Others',
        ];

        return Inertia::render('admin/marketplace/index', [
            'products' => $products,
            'filters' => $request->only(['status', 'category', 'search']),
            'productCategories' => $productCategories,
        ]);
    }

    public function pending(): Response
    {
        $products = MarketplaceProduct::with(['user:id,name,phone', 'store:id,name,slug', 'images', 'specifications'])
            ->where('is_approved', false)
            ->latest()
            ->paginate(20);

        return Inertia::render('admin/marketplace/pending', [
            'products' => $products,
        ]);
    }

    public function show(MarketplaceProduct $product): Response
    {
        $product->load(['user', 'store', 'images', 'specifications']);

        return Inertia::render('admin/marketplace/show', [
            'product' => $product,
        ]);
    }

    public function approve(MarketplaceProduct $product): RedirectResponse
    {
        $product->update([
            'is_approved' => true,
            'is_active' => true,
        ]);

        return back()->with('success', "Product '{$product->title}' has been approved.");
    }

    public function reject(MarketplaceProduct $product): RedirectResponse
    {
        $product->update([
            'is_approved' => false,
            'is_active' => false,
        ]);

        return back()->with('success', "Product '{$product->title}' has been rejected.");
    }

    public function toggleActive(MarketplaceProduct $product): RedirectResponse
    {
        $product->update(['is_active' => !$product->is_active]);

        $message = $product->is_active
            ? "Product '{$product->title}' has been activated."
            : "Product '{$product->title}' has been deactivated.";

        return back()->with('success', $message);
    }
}
