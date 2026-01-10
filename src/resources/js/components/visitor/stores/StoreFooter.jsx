import { Store, Phone, MessageCircle, MapPin, Share2 } from 'lucide-react';

export function StoreFooter({ store }) {
    const storeUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/store/${store.slug}`
        : `/store/${store.slug}`;

    const handleWhatsAppContact = () => {
        const text = `Hi! I'm interested in your products on ${store.name}`;
        const phone = store.user?.phone?.replace(/[^0-9]/g, '') || '';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleShare = async () => {
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
            navigator.clipboard.writeText(storeUrl);
        }
    };

    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-background-dark">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
                    {/* Store Info */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark">
                            <Store className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground dark:text-white">{store.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Powered by 2RBUAME</p>
                        </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {store.user?.phone && (
                            <>
                                <a
                                    href={`tel:${store.user.phone}`}
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-primary hover:bg-primary/10 dark:border-gray-700 dark:bg-card dark:text-gray-300"
                                >
                                    <Phone className="h-4 w-4" />
                                    Call Store
                                </a>
                                <button
                                    onClick={handleWhatsAppContact}
                                    className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#20bd5a]"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    WhatsApp
                                </button>
                            </>
                        )}
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary-dark"
                        >
                            <Share2 className="h-4 w-4" />
                            Share Store
                        </button>
                    </div>
                </div>

                {/* Branding */}
                <div className="mt-6 border-t border-gray-200 pt-6 text-center dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Want your own online store?{' '}
                        <a href="/" className="font-semibold text-primary hover:underline">
                            Create one on 2RBUAME
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
