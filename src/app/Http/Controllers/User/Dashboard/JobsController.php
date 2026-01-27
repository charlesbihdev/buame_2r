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
        $user = Auth::user();
        $poster = $user->jobPoster;

        if (!$poster) {
            return back()->with('error', 'Please set up your employer profile first.');
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:full_time,part_time,daily_wage,apprenticeship'],
            'category' => ['required', 'string', 'in:construction_trades,home_services,auto_mechanical,transport_equipment,electrical_electronics,ict_digital,business_office,education_training,health_care,hospitality_events,fashion_beauty,agriculture,security,media_creative,general_jobs'],
            'salary' => ['nullable', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'phone' => ['nullable', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'description' => ['required', 'string'],
            'requirements' => ['nullable', 'string'],
            'responsibilities' => ['nullable', 'string'],
            'benefits' => ['nullable', 'string'],
            'application_link' => ['nullable', 'url', 'max:255'],
            'application_instructions' => ['nullable', 'string'],
            'is_urgent' => ['nullable', 'boolean'],
        ]);

        $poster->jobs()->create(array_merge($validated, [
            'posted_at' => now(),
            'is_active' => false,
        ]));

        return redirect()->route('user.dashboard.index', ['category' => 'jobs'])
            ->with('success', 'Job posting created successfully.');
    }

    public function edit(Job $job): Response
    {
        $user = Auth::user();

        if (!$user->jobPoster || $job->job_poster_id !== $user->jobPoster->id) {
            abort(403);
        }

        return Inertia::render('user/dashboard/jobs/edit', [
            'job' => $job,
        ]);
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $user = Auth::user();

        if (!$user->jobPoster || $job->job_poster_id !== $user->jobPoster->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:full_time,part_time,daily_wage,apprenticeship'],
            'category' => ['required', 'string', 'in:construction_trades,home_services,auto_mechanical,transport_equipment,electrical_electronics,ict_digital,business_office,education_training,health_care,hospitality_events,fashion_beauty,agriculture,security,media_creative,general_jobs'],
            'salary' => ['nullable', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'phone' => ['nullable', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'description' => ['required', 'string'],
            'requirements' => ['nullable', 'string'],
            'responsibilities' => ['nullable', 'string'],
            'benefits' => ['nullable', 'string'],
            'application_link' => ['nullable', 'url', 'max:255'],
            'application_instructions' => ['nullable', 'string'],
            'is_urgent' => ['nullable', 'boolean'],
        ]);

        $job->update($validated);

        return redirect()->route('user.dashboard.index', ['category' => 'jobs'])
            ->with('success', 'Job posting updated successfully.');
    }

    /**
     * Toggle job active status.
     */
    public function toggleActive(Job $job): RedirectResponse
    {
        $user = Auth::user();

        if (!$user->jobPoster || $job->job_poster_id !== $user->jobPoster->id) {
            abort(403);
        }

        // If trying to activate, validate required fields
        if (!$job->is_active) {
            $errors = [];

            if (empty($job->title)) {
                $errors['title'] = 'Job title is required before making it visible.';
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

            if (empty($job->description)) {
                $errors['description'] = 'Description is required before making it visible.';
            }

            if (!empty($errors)) {
                $fieldLabels = [
                    'title' => 'job title',
                    'type' => 'job type',
                    'category' => 'job category',
                    'location' => 'location',
                    'description' => 'description',
                ];

                $missingFields = [];
                foreach (array_keys($errors) as $field) {
                    $missingFields[] = $fieldLabels[$field] ?? $field;
                }

                $errorMessage = 'Error: Update your job with ' . implode(', ', $missingFields);

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

        if (!$user->jobPoster || $job->job_poster_id !== $user->jobPoster->id) {
            abort(403);
        }

        $job->delete();

        return redirect()->route('user.dashboard.index', ['category' => 'jobs'])
            ->with('success', 'Job posting deleted successfully.');
    }
}
