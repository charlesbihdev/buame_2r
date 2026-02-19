<?php

namespace App\Http\Traits;

use App\Models\VideoLink;
use Illuminate\Http\Request;

trait HasVideoLinks
{
    public function storeVideoLink(Request $request)
    {
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

        $model->videoLinks()->create([
            'url' => $validated['url'],
            'platform' => VideoLink::detectPlatform($validated['url']),
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
