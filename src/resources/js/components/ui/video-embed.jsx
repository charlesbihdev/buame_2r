import { ExternalLink, Play } from 'lucide-react';
import { useEffect, useRef } from 'react';

const platformLabels = {
    youtube: 'YouTube',
    tiktok: 'TikTok',
    instagram: 'Instagram',
    facebook: 'Facebook',
    other: 'Video',
};

const platformColors = {
    youtube: 'bg-red-600',
    tiktok: 'bg-black',
    instagram: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
    facebook: 'bg-blue-600',
    other: 'bg-gray-600',
};

function YouTubeEmbed({ embedUrl, title }) {
    return (
        <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
                src={embedUrl}
                title={title || 'YouTube video'}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}

function TikTokEmbed({ url, tiktokVideoId }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!tiktokVideoId) return;

        // Load TikTok embed script if not already loaded
        const existingScript = document.querySelector('script[src*="tiktok.com/embed.js"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // Re-trigger TikTok embed processing for dynamically added content
            if (window.tiktokEmbed) {
                window.tiktokEmbed.lib.render();
            }
        }
    }, [tiktokVideoId]);

    if (!tiktokVideoId) {
        return <LinkCard url={url} platform="tiktok" />;
    }

    return (
        <div ref={containerRef} className="flex h-full w-full justify-center overflow-hidden rounded-xl">
            <blockquote
                className="tiktok-embed"
                cite={url}
                data-video-id={tiktokVideoId}
                style={{ maxWidth: '100%', minWidth: '280px', margin: 0 }}
            >
                <section>
                    <a target="_blank" rel="noopener noreferrer" href={url}>
                        Watch on TikTok
                    </a>
                </section>
            </blockquote>
        </div>
    );
}

function InstagramEmbed({ embedUrl, url }) {
    useEffect(() => {
        if (!embedUrl) return;

        // Load Instagram embed script if not already loaded
        const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        } else if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }, [embedUrl]);

    if (!embedUrl) {
        return <LinkCard url={url} platform="instagram" />;
    }

    return (
        <div className="flex h-full w-full justify-center overflow-hidden rounded-xl">
            <iframe
                src={embedUrl}
                className="h-full w-full border-0"
                style={{ maxWidth: '540px' }}
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}

function FacebookEmbed({ embedUrl, title }) {
    return (
        <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
                src={embedUrl}
                title={title || 'Facebook video'}
                className="h-full w-full"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}

function LinkCard({ url, platform }) {
    const label = platformLabels[platform] || 'Video';
    const colorClass = platformColors[platform] || platformColors.other;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[var(--primary)] hover:shadow-md"
        >
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                <Play className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="font-semibold text-[var(--foreground)]">Watch on {label}</p>
                <p className="truncate text-sm text-gray-500">{url}</p>
            </div>
            <ExternalLink className="h-5 w-5 flex-shrink-0 text-gray-400 transition-colors group-hover:text-[var(--primary)]" />
        </a>
    );
}

export function VideoEmbed({ url, platform, embedUrl, tiktokVideoId, title }) {
    if (platform === 'youtube' && embedUrl) {
        return <YouTubeEmbed embedUrl={embedUrl} title={title} />;
    }

    if (platform === 'tiktok') {
        return <TikTokEmbed url={url} tiktokVideoId={tiktokVideoId} />;
    }

    if (platform === 'instagram') {
        return <InstagramEmbed embedUrl={embedUrl} url={url} />;
    }

    if (platform === 'facebook' && embedUrl) {
        return <FacebookEmbed embedUrl={embedUrl} title={title} />;
    }

    // Other platforms: show link card
    return <LinkCard url={url} platform={platform} />;
}
