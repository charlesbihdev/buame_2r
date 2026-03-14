import { Link } from '@inertiajs/react';
import { Phone, MessageCircle, Store, ChevronLeft } from 'lucide-react';
import { VisitorShareButton } from '@/components/visitor/VisitorShareButton';

export function StoreHeader({ store }) {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left - Back & Store Name */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('marketplace')}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--buame-primary-dark)]">
                                <Store className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-[var(--foreground)]">{store.name}</span>
                        </div>
                    </div>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-2">
                        {/* Contact Store Owner */}
                        {store.user?.phone && (
                            <a
                                href={`tel:${store.user.phone}`}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
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
                        <VisitorShareButton name={store.name} url={`/store/${store.slug}`} />
                    </div>
                </div>
            </div>
        </header>
    );
}
