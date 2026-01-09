import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StoreProductCard } from './StoreProductCard';

export function StoreProductGrid({ products, viewMode }) {
    return (
        <div>
            {/* Products Grid/List */}
            <div className={
                viewMode === 'grid'
                    ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'flex flex-col gap-4'
            }>
                {products.data.map((product) => (
                    <StoreProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
            </div>

            {/* Pagination */}
            {products.last_page > 1 && (
                <div className="mt-8 flex flex-col items-center gap-4">
                    {/* Page Info */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing <span className="font-semibold">{products.from}</span> to{' '}
                        <span className="font-semibold">{products.to}</span> of{' '}
                        <span className="font-semibold">{products.total}</span> products
                    </p>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-1">
                        {/* Previous Button */}
                        {products.prev_page_url ? (
                            <Link
                                href={products.prev_page_url}
                                className="flex h-10 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-all hover:border-[#13ec13] hover:bg-[#13ec13]/10 dark:border-gray-700 dark:bg-[#162816] dark:text-gray-300"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Prev</span>
                            </Link>
                        ) : (
                            <span className="flex h-10 cursor-not-allowed items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 px-3 text-sm font-medium text-gray-400 dark:border-gray-800 dark:bg-[#0d1b0d]">
                                <ChevronLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Prev</span>
                            </span>
                        )}

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {products.links.slice(1, -1).map((link, index) => {
                                const pageNum = index + 1;
                                const currentPage = products.current_page;
                                const totalPages = products.last_page;

                                // Show logic: first, last, current, and neighbors
                                const shouldShow =
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    Math.abs(pageNum - currentPage) <= 1;

                                // Show ellipsis
                                const showLeftEllipsis = pageNum === 2 && currentPage > 3;
                                const showRightEllipsis = pageNum === totalPages - 1 && currentPage < totalPages - 2;

                                if (!shouldShow && !showLeftEllipsis && !showRightEllipsis) {
                                    return null;
                                }

                                if ((showLeftEllipsis && pageNum === 2) || (showRightEllipsis && pageNum === totalPages - 1)) {
                                    return (
                                        <span key={index} className="px-2 text-gray-400">
                                            ...
                                        </span>
                                    );
                                }

                                if (link.url === null) {
                                    return null;
                                }

                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                                            link.active
                                                ? 'bg-[#13ec13] text-[#0d1b0d] shadow-md shadow-[#13ec13]/25'
                                                : 'border border-gray-200 bg-white text-gray-700 hover:border-[#13ec13] hover:bg-[#13ec13]/10 dark:border-gray-700 dark:bg-[#162816] dark:text-gray-300'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Next Button */}
                        {products.next_page_url ? (
                            <Link
                                href={products.next_page_url}
                                className="flex h-10 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-all hover:border-[#13ec13] hover:bg-[#13ec13]/10 dark:border-gray-700 dark:bg-[#162816] dark:text-gray-300"
                            >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        ) : (
                            <span className="flex h-10 cursor-not-allowed items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 px-3 text-sm font-medium text-gray-400 dark:border-gray-800 dark:bg-[#0d1b0d]">
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight className="h-4 w-4" />
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
