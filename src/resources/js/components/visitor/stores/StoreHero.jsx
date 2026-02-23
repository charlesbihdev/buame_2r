import { Package } from 'lucide-react';
import { useState } from 'react';

export function StoreHero({ store, productCount }) {
    const [imageError, setImageError] = useState(false);

    // Generate initials from store name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    // Generate a consistent color based on store name
    const getColorFromName = (name) => {
        const colors = [
            { bg: 'bg-emerald-600', text: 'text-emerald-600' },
            { bg: 'bg-teal-600', text: 'text-teal-600' },
            { bg: 'bg-green-600', text: 'text-green-600' },
            { bg: 'bg-cyan-600', text: 'text-cyan-600' },
            { bg: 'bg-lime-600', text: 'text-lime-600' },
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const storeColor = getColorFromName(store.name);
    const hasThumbnail = store.thumbnail && !imageError;

    return (
        <div className="relative border-b border-gray-200 bg-white">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
                    {/* Store Thumbnail/Avatar */}
                    <div className="shrink-0">
                        {hasThumbnail ? (
                            <div className="h-28 w-28 overflow-hidden rounded-2xl border-4 border-white shadow-lg md:h-36 md:w-36">
                                <img
                                    src={store.thumbnail}
                                    alt={store.name}
                                    className="h-full w-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            </div>
                        ) : (
                            <div
                                className={`flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white shadow-lg md:h-36 md:w-36 ${storeColor.bg}`}
                            >
                                <span className="text-4xl font-black text-white md:text-5xl">{getInitials(store.name)}</span>
                            </div>
                        )}
                    </div>

                    {/* Store Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-1 flex items-center justify-center gap-2 md:justify-start">
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                Open
                            </span>
                        </div>

                        <h1 className="text-foreground mb-2 text-2xl font-black md:text-3xl lg:text-4xl">{store.name}</h1>

                        {store.description && <p className="mb-4 max-w-xl text-gray-600">{store.description}</p>}

                        {/* Store Meta */}
                        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                <Package className="h-4 w-4" />
                                <span className="font-medium">
                                    {productCount} {productCount === 1 ? 'product' : 'products'}
                                </span>
                            </div>
                            {store.user?.name && (
                                <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-sm text-gray-600">
                                        Sold by <span className="text-foreground font-medium">{store.user.name}</span>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
