<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class JobPosterController extends Controller
{
    /**
     * Toggle job poster active status.
     */
    public function toggleActive(): RedirectResponse
    {
        $user = Auth::user();
        $poster = $user->jobPoster;

        if (!$poster) {
            return back()->with('error', 'Job poster profile not found.');
        }

        // If trying to activate, validate required fields
        if (!$poster->is_active) {
            $errors = [];

            if (empty($poster->name)) {
                $errors['name'] = 'Company name is required before making profile visible.';
            }

            if (empty($poster->phone)) {
                $errors['phone'] = 'Phone number is required before making profile visible.';
            }

            if (!empty($errors)) {
                $fieldLabels = [
                    'name' => 'company name',
                    'phone' => 'phone number',
                ];

                $missingFields = [];
                foreach (array_keys($errors) as $field) {
                    $missingFields[] = $fieldLabels[$field] ?? $field;
                }

                $errorMessage = 'Error: Update your profile with ' . implode(', ', $missingFields);

                return back()->withErrors($errors)->with('error', $errorMessage);
            }
        }

        $poster->is_active = !$poster->is_active;
        $poster->save();

        return back()->with('success', $poster->is_active ? 'Profile is now visible.' : 'Profile is now hidden.');
    }

    /**
     * Update job poster profile.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $poster = $user->jobPoster;

        if (!$poster) {
            return back()->withErrors(['poster' => 'Job poster profile not found.']);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9-]+$/', 'unique:job_posters,slug,' . $poster->id],
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email'],
            'website' => ['nullable', 'url'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($poster->logo) {
                Storage::disk('public')->delete($poster->logo);
            }

            $validated['logo'] = $request->file('logo')->store('job-posters/logos', 'public');
        }

        $poster->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }

    /**
     * Remove logo from job poster.
     */
    public function removeLogo(): RedirectResponse
    {
        $user = Auth::user();
        $poster = $user->jobPoster;

        if (!$poster) {
            return back()->with('error', 'Job poster profile not found.');
        }

        if ($poster->logo) {
            Storage::disk('public')->delete($poster->logo);
            $poster->update(['logo' => null]);
        }

        return back()->with('success', 'Logo removed successfully.');
    }
}
