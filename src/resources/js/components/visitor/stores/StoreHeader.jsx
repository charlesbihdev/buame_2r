import { Link } from '@inertiajs/react';
import { Copy, Check, Phone, MessageCircle, Share2, Store, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export function StoreHeader({ store }) {
    const [copied, setCopied] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const storeUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/store/${store.slug}`
        : `/store/${store.slug}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(storeUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleWhatsAppShare = () => {
        const text = `Check out ${store.name} on 2RBUAME! ${storeUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: store.name,
                    text: `Check out ${store.name} on 2RBUAME!`,
                    url: storeUrl,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            setShowShareMenu(!showShareMenu);
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-[var(--buame-background-dark)]/95">
            <div className="mx-auto max-w-7xl px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left - Back & Store Name */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('marketplace')}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--buame-primary-dark)]">
                                <Store className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-[var(--foreground)] dark:text-white">{store.name}</span>
                        </div>
                    </div>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-2">
                        {/* Contact Store Owner */}
                        {store.user?.phone && (
                            <a
                                href={`tel:${store.user.phone}`}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] dark:bg-gray-800 dark:text-gray-400"
                                title="Call store"
                            >
                                <Phone className="h-4 w-4" />
                            </a>
                        )}

                        {/* WhatsApp */}
                        {store.user?.phone && (
                            <a
                                href={`https://wa.me/${store.user.phone.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in your products on ${store.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                                title="Chat on WhatsApp"
                            >
                                <MessageCircle className="h-4 w-4" />
                            </a>
                        )}

                        {/* Share Button */}
                        <div className="relative">
                            <button
                                onClick={handleNativeShare}
                                className="flex h-9 items-center gap-2 rounded-full bg-[var(--primary)] px-4 font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--buame-primary-dark)]"
                            >
                                <Share2 className="h-4 w-4" />
                                <span className="hidden sm:inline">Share</span>
                            </button>

                            {/* Share Dropdown */}
                            {showShareMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-[var(--card)]">
                                    <button
                                        onClick={handleCopyLink}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-[var(--primary)]" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-gray-500" />
                                        )}
                                        <span className="dark:text-white">{copied ? 'Copied!' : 'Copy link'}</span>
                                    </button>
                                    <button
                                        onClick={handleWhatsAppShare}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <MessageCircle className="h-4 w-4 text-[#25D366]" />
                                        <span className="dark:text-white">Share on WhatsApp</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
