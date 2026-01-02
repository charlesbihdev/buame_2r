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
    public function index(): Response
    {
        $user = Auth::user();
        $jobs = $user->jobs()->latest()->get();

        return Inertia::render('user/dashboard/jobs/index', [
            'jobs' => $jobs,
        ]);
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

        return redirect()->route('user.dashboard.index')
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

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Job posting updated successfully.');
    }

    public function destroy(Job $job): RedirectResponse
    {
        $user = Auth::user();
        if ($job->user_id !== $user->id) {
            abort(403);
        }

        $job->delete();

        return redirect()->route('user.dashboard.index')
            ->with('success', 'Job posting deleted successfully.');
    }
}
