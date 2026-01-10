import { Link } from '@inertiajs/react';
import { MapPin, Package, Truck, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useState } from 'react';

export function StoreProductCard({ product, viewMode = 'grid' }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const getCategoryLabel = (category) => {
        const labels = {
            electronics: 'Electronics',
            furniture: 'Furniture',
            food: 'Food',
            agriculture: 'Agriculture',
            clothes: 'Clothes',
            others: 'Others',
        };
        return labels[category] || category;
    };

    const getConditionStyle = (condition) => {
        const styles = {
            new: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            like_new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            used: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            refurbished: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
        };
        return styles[condition] || 'bg-gray-100 text-gray-700';
    };

    const getConditionLabel = (condition) => {
        const labels = {
            new: 'New',
            like_new: 'Like New',
            used: 'Used',
            refurbished: 'Refurbished',
        };
        return labels[condition] || '';
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-GH', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(price);
    };

    if (viewMode === 'list') {
        return (
            <Link
                href={route('marketplace.view', product.id)}
                className="group flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[var(--primary)]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[var(--card)] dark:hover:border-[var(--primary)]/50"
            >
                {/* Image */}
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900">
                    {product.image ? (
                        <>
                            {!imageLoaded && (
                                <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
                            )}
                            <img
                                src={product.image}
                                alt={product.title}
                                className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
                                    imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Package className="h-10 w-10 text-gray-400" />
                        </div>
                    )}
                    {product.condition && (
                        <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-semibold ${getConditionStyle(product.condition)}`}>
                            {getConditionLabel(product.condition)}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <div className="mb-1 flex items-start justify-between gap-2">
                            <h3 className="font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)] dark:text-white">
                                {product.title}
                            </h3>
                        </div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {getCategoryLabel(product.category)}
                        </p>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-[var(--primary)]">GH₵ {formatPrice(product.price)}</span>
                                {product.price_type && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400">/{product.price_type}</span>
                                )}
                            </div>
                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {product.location}
                                </span>
                                {product.delivery_available && (
                                    <span className="flex items-center gap-1 text-[var(--primary)]">
                                        <Truck className="h-3 w-3" />
                                        Delivery
                                    </span>
                                )}
                            </div>
                        </div>
                        <span className="rounded-lg bg-[var(--primary)]/10 px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] transition-colors group-hover:bg-[var(--primary)] dark:text-white">
                            View Details
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    // Grid View
    return (
        <Link
            href={route('marketplace.view', product.id)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-[var(--primary)]/50 hover:shadow-xl dark:border-gray-800 dark:bg-[var(--card)] dark:hover:border-[var(--primary)]/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
                {product.image ? (
                    <>
                        {!imageLoaded && (
                            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
                        )}
                        <img
                            src={product.image}
                            alt={product.title}
                            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-110 ${
                                imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Package className="h-16 w-16 text-gray-400" />
                    </div>
                )}

                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.condition && (
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${getConditionStyle(product.condition)}`}>
                            {getConditionLabel(product.condition)}
                        </span>
                    )}
                    {product.delivery_available && (
                        <span className="flex items-center gap-1 rounded-full bg-[var(--primary)] px-2.5 py-1 text-xs font-semibold text-[var(--primary-foreground)] shadow-sm">
                            <Truck className="h-3 w-3" />
                            Delivery
                        </span>
                    )}
                </div>

                {/* Quick View Button */}
                <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 font-semibold text-[var(--foreground)] shadow-lg transition-colors hover:bg-[var(--primary)]">
                        <Eye className="h-4 w-4" />
                        Quick View
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                        {getCategoryLabel(product.category)}
                    </p>
                    <h3 className="line-clamp-2 font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)] dark:text-white">
                        {product.title}
                    </h3>
                </div>

                <div className="mt-auto">
                    <div className="mb-2 flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[var(--foreground)] dark:text-white">GH₵ {formatPrice(product.price)}</span>
                        {product.price_type && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">/{product.price_type}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{product.location}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
