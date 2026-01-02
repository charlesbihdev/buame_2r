<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceProduct;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MarketplaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $products = $user->marketplaceProducts()->latest()->get();

        return Inertia::render('user/dashboard/marketplace/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('user/dashboard/marketplace/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'location' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $user = Auth::user();
        $user->marketplaceProducts()->create($validated);

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MarketplaceProduct $marketplaceProduct): Response
    {
        $user = Auth::user();
        if ($marketplaceProduct->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/marketplace/edit', [
            'product' => $marketplaceProduct,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MarketplaceProduct $marketplaceProduct): RedirectResponse
    {
        $user = Auth::user();
        if ($marketplaceProduct->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'location' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $marketplaceProduct->update($validated);

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MarketplaceProduct $marketplaceProduct): RedirectResponse
    {
        $user = Auth::user();
        if ($marketplaceProduct->user_id !== $user->id) {
            abort(403);
        }

        $marketplaceProduct->delete();

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Product deleted successfully.');
    }
}
