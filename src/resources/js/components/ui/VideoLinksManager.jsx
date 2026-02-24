import { Button } from '@/components/ui/button';
import { VideoEmbed } from '@/components/ui/video-embed';
import { router, usePage } from '@inertiajs/react';
import { Link2, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export function VideoLinksManager({ videoLinks = [], storeRouteName, destroyRouteName, routeParams = {} }) {
    const [showInput, setShowInput] = useState(false);
    const [url, setUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleAdd = () => {
        if (!url.trim()) return;

        setSubmitting(true);
        router.post(
            route(storeRouteName, routeParams),
            { url: url.trim() },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setSubmitting(false);
                    // Only clear input if there's no error flash
                    if (page.props.flash?.error) {
                        return;
                    }
                    setUrl('');
                    setShowInput(false);
                },
                onError: () => {
                    setSubmitting(false);
                },
            },
        );
    };

    const handleDelete = (videoLinkId) => {
        if (confirm('Are you sure you want to delete this video link?')) {
            router.delete(route(destroyRouteName, { ...routeParams, videoLink: videoLinkId }), {
                preserveScroll: true,
            });
        }
    };

    const tallPlatforms = ['tiktok', 'instagram'];
    const tallVideos = videoLinks.filter((l) => tallPlatforms.includes(l.platform));
    const wideVideos = videoLinks.filter((l) => !tallPlatforms.includes(l.platform));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">Video Links</h3>
                    <p className="text-sm text-gray-600">
                        Add video links to showcase your listing ({videoLinks.length}/5)
                    </p>
                </div>
                {videoLinks.length < 5 && (
                    <Button
                        onClick={() => setShowInput(true)}
                        className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Video
                    </Button>
                )}
            </div>

            {/* Add Video Input */}
            {showInput && (
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex-1">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="e.g., https://youtube.com/watch?v=... or https://tiktok.com/@user/video/..."
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[var(--foreground)] placeholder-gray-400 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        />
                    </div>
                    <Button
                        onClick={handleAdd}
                        disabled={submitting || !url.trim()}
                        className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                    >
                        {submitting ? 'Adding...' : 'Add'}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setShowInput(false);
                            setUrl('');
                        }}
                        className="cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Video Links Display */}
            {videoLinks.length > 0 ? (
                <div className="space-y-4">
                    {wideVideos.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {wideVideos.map((link) => (
                                <div
                                    key={link.id}
                                    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white"
                                >
                                    <VideoEmbed
                                        url={link.url}
                                        platform={link.platform}
                                        embedUrl={link.embed_url}
                                        tiktokVideoId={link.tiktok_video_id}
                                        title={link.title}
                                    />
                                    <button
                                        onClick={() => handleDelete(link.id)}
                                        className="absolute top-2 right-2 rounded-lg bg-red-500 p-2 text-white shadow-md transition-colors hover:bg-red-600"
                                        title="Delete video link"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {tallVideos.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {tallVideos.map((link) => (
                                <div
                                    key={link.id}
                                    className="relative min-h-[480px] overflow-hidden rounded-xl border border-gray-200 bg-white"
                                    style={{ height: '480px' }}
                                >
                                    <VideoEmbed
                                        url={link.url}
                                        platform={link.platform}
                                        embedUrl={link.embed_url}
                                        tiktokVideoId={link.tiktok_video_id}
                                        title={link.title}
                                    />
                                    <button
                                        onClick={() => handleDelete(link.id)}
                                        className="absolute top-2 right-2 z-10 rounded-lg bg-red-500 p-2 text-white shadow-md transition-colors hover:bg-red-600"
                                        title="Delete video link"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                !showInput && (
                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
                        <Link2 className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="mt-3 text-sm text-gray-600">
                            No video links yet. Add YouTube, TikTok, or Instagram links to showcase your listing.
                        </p>
                    </div>
                )
            )}
        </div>
    );
}
