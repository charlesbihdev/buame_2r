import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { CheckCircle2, MapPin, Star, Store } from 'lucide-react';

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-[#e7f3e7] bg-white transition-all duration-300 hover:border-[#13ec13]/50 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                >
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute top-3 left-3 z-10 rounded bg-white/90 px-2 py-1 text-xs font-bold tracking-wide text-gray-800 uppercase backdrop-blur">
                            {product.category}
                        </div>
                        <div
                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                                backgroundImage: `url(${product.image})`,
                            }}
                        />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                        <div className="mb-2 flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base leading-tight font-bold text-[#0d1b0d] dark:text-white">{product.title}</h3>
                                {product.store && product.store.is_active && (
                                    <Link
                                        href={`/store/${product.store.slug}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#13ec13] transition-colors hover:text-[#0fdc0f] hover:underline"
                                    >
                                        <Store className="h-3.5 w-3.5" />
                                        <span className="truncate">{product.store.name}</span>
                                    </Link>
                                )}
                            </div>
                            {product.verified && <CheckCircle2 className="h-5 w-5 shrink-0 text-[#13ec13]" title="Verified" />}
                        </div>
                        {(product.rating > 0 || product.reviews > 0) && (
                            <div className="mb-3 flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-bold dark:text-white">{product.rating || 0}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews || 0} reviews)</span>
                            </div>
                        )}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-1.5">
                                {product.specifications.slice(0, 3).map((spec, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-[#13ec13]/10 px-2 py-0.5 text-xs font-medium text-[#13ec13] dark:bg-[#13ec13]/20"
                                    >
                                        {spec}
                                    </span>
                                ))}
                                {product.specifications.length > 3 && (
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                        +{product.specifications.length - 3} more
                                    </span>
                                )}
                            </div>
                        )}
                        <div className="mb-4 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="truncate">{product.location}</span>
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-[#e7f3e7] pt-4 dark:border-white/10">
                            <span className="text-lg font-black text-[#0d1b0d] dark:text-[#13ec13]">{product.price}</span>
                            <Button asChild variant="ghost" className="text-sm font-bold text-[#13ec13] hover:text-[#0fdc0f] hover:underline">
                                <Link href={`/marketplace/${product.id}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
