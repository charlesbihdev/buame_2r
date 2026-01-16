<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class StoreController extends Controller
{
    /**
     * Toggle store active status.
     */
    public function toggleActive(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $store = $user->store;

        if (!$store) {
            return back()->with('error', 'Store not found.');
        }

        // If trying to activate, validate required fields
        if (!$store->is_active) {
            $errors = [];

            if (empty($store->name)) {
                $errors['name'] = 'Store name is required before making it visible.';
            }

            if (empty($store->slug)) {
                $errors['slug'] = 'Store URL slug is required before making it visible.';
            }

            if (empty($store->description)) {
                $errors['description'] = 'Store description is required before making it visible.';
            }

            if (!empty($errors)) {
                // Map field names to user-friendly labels
                $fieldLabels = [
                    'name' => 'store name',
                    'slug' => 'store URL slug',
                    'description' => 'description',
                ];

                $missingFields = [];
                foreach (array_keys($errors) as $field) {
                    $missingFields[] = $fieldLabels[$field] ?? $field;
                }

                $errorMessage = 'Error: Update your dashboard with ' . implode(', ', $missingFields);

                return back()->withErrors($errors)->with('error', $errorMessage);
            }
        }

        $store->is_active = !$store->is_active;
        $store->save();

        return back()->with('success', $store->is_active ? 'Store is now visible.' : 'Store is now hidden.');
    }

    /**
     * Update store settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $store = $user->store;

        if (!$store) {
            return back()->withErrors(['store' => 'Store not found.']);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'regex:/^[a-z0-9-]+$/', 'unique:stores,slug,' . $store->id],
            'description' => ['nullable', 'string', 'max:1000'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        // Only update provided fields
        $store->update($validated);

        return back()->with('success', 'Store updated successfully.');
    }

    /**
     * Handle tier upgrade payment.
     * Merges tier into request and forwards to payment controller.
     */
    public function upgrade(Request $request)
    {
        $validated = $request->validate([
            'tier' => ['required', 'string', 'in:starter,professional,enterprise'],
        ]);

        $user = Auth::user();
        $store = $user->store;

        if (!$store) {
            return back()->withErrors(['store' => 'Store not found.']);
        }

        // Merge category and tier into request and forward to payment controller
        // Only set category if not already set (safety check)
        $request->merge([
            'category' => $request->input('category', 'marketplace'), // Use existing category or default to marketplace
            'tier' => $validated['tier'],
        ]);

        $paymentController = app(\App\Http\Controllers\PaymentController::class);
        return $paymentController->processPayment($request);
    }
}
