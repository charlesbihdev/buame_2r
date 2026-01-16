<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class JobsController extends Controller
{
    public function index(): RedirectResponse
    {
        // Redirect to main dashboard - category content is rendered there
        return redirect()->route('user.dashboard.index', ['category' => 'jobs']);
    }

    public function create(): Response
    {
        return Inertia::render('user/dashboard/jobs/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company_name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $user = Auth::user();
        $user->jobs()->create($validated);

        return redirect()->route('user.dashboard.index', ['category' => 'jobs'])
            ->with('success', 'Job posting created successfully.');
    }

    public function edit(Job $job): Response
    {
        $user = Auth::user();
        if ($job->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/jobs/edit', [
            'job' => $job,
        ]);
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $user = Auth::user();
        if ($job->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company_name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $job->update($validated);

        return redirect()->route('user.dashboard.index', ['category' => 'jobs'])
            ->with('success', 'Job posting updated successfully.');
    }

    /**
     * Toggle job active status.
     */
    public function toggleActive(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $job = $user->jobs()->first();

        if (!$job) {
            return back()->with('error', 'Job profile not found.');
        }

        // If trying to activate, validate required fields
        if (!$job->is_active) {
            $errors = [];

            if (empty($job->title)) {
                $errors['title'] = 'Job title is required before making it visible.';
            }

            if (empty($job->company)) {
                $errors['company'] = 'Company name is required before making it visible.';
            }

            if (empty($job->type)) {
                $errors['type'] = 'Job type is required before making it visible.';
            }

            if (empty($job->category)) {
                $errors['category'] = 'Job category is required before making it visible.';
            }

            if (empty($job->location)) {
                $errors['location'] = 'Location is required before making it visible.';
            }

            if (empty($job->phone)) {
                $errors['phone'] = 'Phone number is required before making it visible.';
            }

            if (empty($job->description)) {
                $errors['description'] = 'Description is required before making it visible.';
            }

            if (!empty($errors)) {
                // Map field names to user-friendly labels
                $fieldLabels = [
                    'title' => 'job title',
                    'company' => 'company name',
                    'type' => 'job type',
                    'category' => 'job category',
                    'location' => 'location',
                    'phone' => 'phone number',
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

        $job->is_active = !$job->is_active;
        $job->save();

        return back()->with('success', $job->is_active ? 'Job posting is now visible.' : 'Job posting is now hidden.');
    }

    public function destroy(Job $job): RedirectResponse
    {
        $user = Auth::user();
        if ($job->user_id !== $user->id) {
            abort(403);
        }

        $job->delete();

        return redirect()->route('user.dashboard.index', ['category' => 'jobs'])
            ->with('success', 'Job posting deleted successfully.');
    }
}
