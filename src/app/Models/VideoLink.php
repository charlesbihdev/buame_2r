<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class VideoLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'linkable_type',
        'linkable_id',
        'url',
        'platform',
    ];

    protected static function booted(): void
    {
        static::saving(function (VideoLink $videoLink) {
            if ($videoLink->platform === 'tiktok') {
                $videoLink->url = static::resolveTiktokShortUrl($videoLink->url);
            }
        });
    }

    /**
     * Resolve TikTok short URLs (vt.tiktok.com, vm.tiktok.com) to full URLs.
     */
    public static function resolveTiktokShortUrl(string $url): string
    {
        // If it already has /video/ID, no resolution needed
        if (preg_match('/\/video\/(\d+)/', $url)) {
            return $url;
        }

        // Try TikTok oEmbed API (works with short URLs)
        try {
            $response = Http::timeout(5)->get('https://www.tiktok.com/oembed', [
                'url' => $url,
            ]);

            if ($response->successful()) {
                $html = $response->json('html') ?? '';
                if (preg_match('/cite="(https:\/\/www\.tiktok\.com\/@[^"]*\/video\/\d+)"/', $html, $matches)) {
                    return $matches[1];
                }
            }
        } catch (\Throwable) {
            // Fall through to redirect approach
        }

        // Fallback: follow redirects for short URLs
        $host = strtolower(parse_url($url, PHP_URL_HOST) ?? '');
        if (in_array($host, ['vt.tiktok.com', 'vm.tiktok.com'])) {
            try {
                $response = Http::timeout(5)
                    ->withHeaders(['User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'])
                    ->get($url);

                $effectiveUrl = $response->effectiveUri()?->__toString();
                if ($effectiveUrl && preg_match('/\/video\/(\d+)/', $effectiveUrl)) {
                    return $effectiveUrl;
                }
            } catch (\Throwable) {
                // Fall through
            }
        }

        return $url;
    }

    protected $appends = [
        'embed_url',
        'tiktok_video_id',
    ];

    public function linkable()
    {
        return $this->morphTo();
    }

    /**
     * Detect platform from URL.
     */
    public static function detectPlatform(string $url): string
    {
        $host = parse_url($url, PHP_URL_HOST) ?? '';
        $host = strtolower(preg_replace('/^www\./', '', $host));

        return match (true) {
            str_contains($host, 'youtube.com'), str_contains($host, 'youtu.be') => 'youtube',
            str_contains($host, 'tiktok.com') => 'tiktok',
            str_contains($host, 'instagram.com') => 'instagram',
            str_contains($host, 'facebook.com'), str_contains($host, 'fb.watch') => 'facebook',
            default => 'other',
        };
    }

    /**
     * Get the embeddable URL for supported platforms.
     */
    public function getEmbedUrlAttribute(): ?string
    {
        return match ($this->platform) {
            'youtube' => $this->getYoutubeEmbedUrl(),
            'instagram' => $this->getInstagramEmbedUrl(),
            'facebook' => $this->getFacebookEmbedUrl(),
            default => null,
        };
    }

    /**
     * Get the video ID for TikTok (used by the frontend SDK embed).
     */
    public function getTiktokVideoIdAttribute(): ?string
    {
        if ($this->platform !== 'tiktok') {
            return null;
        }

        if (preg_match('/\/video\/(\d+)/', $this->url, $matches)) {
            return $matches[1];
        }

        return null;
    }

    private function getYoutubeEmbedUrl(): ?string
    {
        $url = $this->url;

        // Handle youtu.be/ID
        if (preg_match('/youtu\.be\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }

        // Handle youtube.com/watch?v=ID
        if (preg_match('/[?&]v=([a-zA-Z0-9_-]+)/', $url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }

        // Handle youtube.com/shorts/ID
        if (preg_match('/\/shorts\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }

        return null;
    }

    private function getInstagramEmbedUrl(): ?string
    {
        $url = $this->url;

        // Handle instagram.com/reel/CODE/, /reels/CODE/, /p/CODE/, /tv/CODE/
        if (preg_match('/instagram\.com\/(reels?|p|tv)\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
            // Normalize "reels" to "reel" for the embed URL
            $type = $matches[1] === 'reels' ? 'reel' : $matches[1];
            return 'https://www.instagram.com/' . $type . '/' . $matches[2] . '/embed';
        }

        // Handle instagram.com/share/CODE/ (shared links)
        if (preg_match('/instagram\.com\/share\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
            return 'https://www.instagram.com/p/' . $matches[1] . '/embed';
        }

        return null;
    }

    private function getFacebookEmbedUrl(): ?string
    {
        return 'https://www.facebook.com/plugins/video.php?href=' . urlencode($this->url) . '&show_text=false';
    }
}
