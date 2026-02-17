import { Link } from '@inertiajs/react';
import { CheckCircle2, MapPin, Store, ArrowRight } from 'lucide-react';

export function MarketplaceProducts({ products = [] }) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">No products found</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <Link
                    key={product.id}
                    href={`/marketplace/${product.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
                        <div
                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${product.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute top-3 left-3 z-10 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-gray-700 uppercase shadow-sm backdrop-blur-sm dark:bg-black/70 dark:text-gray-200">
                            {product.category}
                        </div>
                        {product.verified && (
                            <div className="absolute top-3 right-3 z-10">
                                <CheckCircle2 className="h-5 w-5 text-white drop-shadow-md" fill="var(--primary)" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
                        {/* Title */}
                        <h3 className="line-clamp-1 text-sm font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)] dark:text-white">
                            {product.title}
                        </h3>

                        {/* Store */}
                        {product.store && product.store.is_active && (
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[var(--primary)]"
                            >
                                <Store className="h-3 w-3 shrink-0" />
                                <Link href={`/store/${product.store.slug}`} className="truncate hover:underline">
                                    {product.store.name}
                                </Link>
                            </div>
                        )}

                        {/* Description */}
                        {product.description && (
                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                {product.description}
                            </p>
                        )}

                        {/* Location - fills remaining space */}
                        <div className="mt-auto flex items-center gap-1 pt-2 text-[11px] text-gray-400 dark:text-gray-500">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{product.location}</span>
                        </div>

                        {/* Price + Action */}
                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-white/10">
                            <span className="text-base font-black text-[var(--foreground)] dark:text-[var(--primary)]">
                                {product.price || 'Contact for price'}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                View
                                <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
