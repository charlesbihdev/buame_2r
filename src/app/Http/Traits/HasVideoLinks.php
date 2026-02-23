<?php

namespace App\Http\Traits;

use App\Models\VideoLink;
use Illuminate\Http\Request;

trait HasVideoLinks
{
    public function storeVideoLink(Request $request)
    {
        // Normalize URL: add https:// if no scheme provided
        $url = trim($request->input('url', ''));
        if ($url && !preg_match('#^https?://#i', $url)) {
            $url = 'https://' . $url;
            $request->merge(['url' => $url]);
        }

        $validated = $request->validate([
            'url' => ['required', 'url', 'max:500'],
        ]);

        $model = $this->getVideoLinkableModel($request);

        if (!$model) {
            return back()->with('error', 'Entity not found.');
        }

        if ($model->videoLinks()->count() >= 5) {
            return back()->with('error', 'Maximum of 5 video links allowed.');
        }

        $platform = VideoLink::detectPlatform($validated['url']);

        // For TikTok, pre-resolve and check before saving
        if ($platform === 'tiktok') {
            $resolvedUrl = VideoLink::resolveTiktokShortUrl($validated['url']);
            if (!preg_match('/\/video\/(\d+)/', $resolvedUrl)) {
                return back()->with('error', 'Could not process this TikTok link. Please use the full URL (e.g. tiktok.com/@user/video/123...).');
            }
        }

        $model->videoLinks()->create([
            'url' => $validated['url'],
            'platform' => $platform,
        ]);

        return back()->with('success', 'Video link added successfully.');
    }

    public function destroyVideoLink(Request $request, $videoLinkId)
    {
        $model = $this->getVideoLinkableModel($request);

        if (!$model) {
            return back()->with('error', 'Entity not found.');
        }

        $model->videoLinks()->where('id', $videoLinkId)->delete();

        return back()->with('success', 'Video link deleted successfully.');
    }
}
