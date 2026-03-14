import { Copy, Check, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';

export function VisitorShareButton({ name, url, message }) {
    const [copied, setCopied] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`
        : url;

    const shareText = message || `Check out ${name} on 2RBUAME! ${shareUrl}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleWhatsAppShare = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: name,
                    text: `Check out ${name} on 2RBUAME!`,
                    url: shareUrl,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            setShowShareMenu(!showShareMenu);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleNativeShare}
                className="flex h-9 items-center gap-2 rounded-full bg-[var(--primary)] px-4 font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--buame-primary-dark)]"
            >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
            </button>

            {showShareMenu && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <button
                        onClick={handleCopyLink}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-[var(--primary)]" />
                        ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                        )}
                        <span>{copied ? 'Copied!' : 'Copy link'}</span>
                    </button>
                    <button
                        onClick={handleWhatsAppShare}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100"
                    >
                        <MessageCircle className="h-4 w-4 text-[#25D366]" />
                        <span>Share on WhatsApp</span>
                    </button>
                </div>
            )}
        </div>
    );
}
