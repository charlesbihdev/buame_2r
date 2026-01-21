<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminTestimonialsController extends Controller
{
    public function index(): Response
    {
        // Placeholder - to be implemented later
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => [],
            'message' => 'Testimonials feature coming soon.',
        ]);
    }
}
