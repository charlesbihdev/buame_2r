<?php

namespace App\Http\Controllers;

use App\Models\Artisan;
use App\Models\Hotel;
use App\Models\Job;
use App\Models\MarketplaceProduct;
use App\Models\Rental;
use App\Models\TransportRide;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        // Determine base URL based on environment
        $baseUrl = config('app.env') === 'production' 
            ? 'https://2rbuame.com' 
            : config('app.url', 'http://localhost');

        // Static pages
        $staticPages = [
            ['loc' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['loc' => '/services', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['loc' => '/artisans', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['loc' => '/hotels', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['loc' => '/transport', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['loc' => '/rentals', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['loc' => '/marketplace', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['loc' => '/jobs', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['loc' => '/about', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['loc' => '/contact', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['loc' => '/privacy', 'priority' => '0.4', 'changefreq' => 'yearly'],
            ['loc' => '/terms', 'priority' => '0.4', 'changefreq' => 'yearly'],
            ['loc' => '/join-as-provider', 'priority' => '0.7', 'changefreq' => 'monthly'],
        ];

        // Build XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // Add static pages
        foreach ($staticPages as $page) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($baseUrl . $page['loc']) . '</loc>' . "\n";
            $xml .= '    <changefreq>' . $page['changefreq'] . '</changefreq>' . "\n";
            $xml .= '    <priority>' . $page['priority'] . '</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        // Add dynamic content - Artisans (only active ones)
        $artisans = Artisan::where('is_active', true)->select('id', 'updated_at')->get();
        foreach ($artisans as $artisan) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/artisans/' . $artisan->id) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $artisan->updated_at->toW3cString() . '</lastmod>' . "\n";
            $xml .= '    <changefreq>weekly</changefreq>' . "\n";
            $xml .= '    <priority>0.7</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        // Add dynamic content - Hotels
        $hotels = Hotel::where('is_active', true)->select('id', 'updated_at')->get();
        foreach ($hotels as $hotel) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/hotels/' . $hotel->id) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $hotel->updated_at->toW3cString() . '</lastmod>' . "\n";
            $xml .= '    <changefreq>weekly</changefreq>' . "\n";
            $xml .= '    <priority>0.7</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        // Add dynamic content - Transport
        $transports = TransportRide::where('is_active', true)->select('id', 'updated_at')->get();
        foreach ($transports as $transport) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/transport/' . $transport->id) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $transport->updated_at->toW3cString() . '</lastmod>' . "\n";
            $xml .= '    <changefreq>weekly</changefreq>' . "\n";
            $xml .= '    <priority>0.7</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        // Add dynamic content - Rentals
        $rentals = Rental::where('is_active', true)->select('id', 'updated_at')->get();
        foreach ($rentals as $rental) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/rentals/' . $rental->id) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $rental->updated_at->toW3cString() . '</lastmod>' . "\n";
            $xml .= '    <changefreq>weekly</changefreq>' . "\n";
            $xml .= '    <priority>0.7</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        // Add dynamic content - Products
        $products = MarketplaceProduct::where('is_active', true)->select('id', 'updated_at')->get();
        foreach ($products as $product) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/marketplace/' . $product->id) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $product->updated_at->toW3cString() . '</lastmod>' . "\n";
            $xml .= '    <changefreq>weekly</changefreq>' . "\n";
            $xml .= '    <priority>0.7</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        // Add dynamic content - Jobs
        $jobs = Job::where('is_active', true)->select('id', 'updated_at')->get();
        foreach ($jobs as $job) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/jobs/' . $job->id) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $job->updated_at->toW3cString() . '</lastmod>' . "\n";
            $xml .= '    <changefreq>weekly</changefreq>' . "\n";
            $xml .= '    <priority>0.7</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
