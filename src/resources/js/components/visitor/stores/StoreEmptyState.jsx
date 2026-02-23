import { Package, Search, RefreshCw } from 'lucide-react';

export function StoreEmptyState({ hasFilters, onClearFilters, storeName }) {
    if (hasFilters) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                    <Search className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[var(--foreground)]">No products match your search</h3>
                <p className="mb-6 max-w-md text-gray-600">
                    We couldn't find any products matching your current filters. Try adjusting your search criteria or browse all products.
                </p>
                <button
                    onClick={onClearFilters}
                    className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-[var(--primary-foreground)] transition-all hover:bg-[var(--buame-primary-dark)] hover:shadow-lg hover:shadow-[var(--primary)]/25"
                >
                    <RefreshCw className="h-4 w-4" />
                    Clear all filters
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[var(--foreground)]">No products yet</h3>
            <p className="max-w-md text-gray-600">
                {storeName} hasn't added any products yet. Check back later for new arrivals!
            </p>
        </div>
    );
}
