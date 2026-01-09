import { StoreEmptyState } from '@/components/visitor/stores/StoreEmptyState';
import { StoreFooter } from '@/components/visitor/stores/StoreFooter';
import { StoreHeader } from '@/components/visitor/stores/StoreHeader';
import { StoreHero } from '@/components/visitor/stores/StoreHero';
import { StoreProductGrid } from '@/components/visitor/stores/StoreProductGrid';
import { StoreSearch } from '@/components/visitor/stores/StoreSearch';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function StoreShow({ store, products, filters, categoryCounts }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');
    const [viewMode, setViewMode] = useState('grid');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('store.show', store.slug),
            {
                search: searchQuery || undefined,
                location: location || undefined,
                category: filters?.category,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleFilterChange = (filterName, value) => {
        router.get(
            route('store.show', store.slug),
            {
                search: searchQuery || undefined,
                location: location || undefined,
                [filterName]: value === 'all' || value === 'newest' ? undefined : value,
                ...(filterName !== 'category' && filters?.category && { category: filters.category }),
                ...(filterName !== 'sort' && filters?.sort && filters.sort !== 'newest' && { sort: filters.sort }),
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setLocation('');
        router.get(
            route('store.show', store.slug),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const hasActiveFilters = filters?.category || filters?.sort || searchQuery || location;
    const productCount = products?.total || 0;
    const hasProducts = products?.data && products.data.length > 0;

    return (
        <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#102210]">
            <Head title={`${store.name} | BUAME 2R`} />

            {/* Sticky Header with Store Branding & Share */}
            <StoreHeader store={store} />

            {/* Hero Section with Store Info */}
            <StoreHero store={store} productCount={productCount} />

            {/* Search & Filters */}
            <StoreSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                location={location}
                setLocation={setLocation}
                filters={filters}
                categoryCounts={categoryCounts}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8">
                {/* Results Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#0d1b0d] dark:text-white">
                        {hasActiveFilters ? 'Search Results' : 'All Products'}
                        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                            ({productCount} {productCount === 1 ? 'item' : 'items'})
                        </span>
                    </h2>
                </div>

                {/* Products or Empty State */}
                {hasProducts ? (
                    <StoreProductGrid products={products} viewMode={viewMode} />
                ) : (
                    <StoreEmptyState
                        hasFilters={hasActiveFilters}
                        onClearFilters={handleClearFilters}
                        storeName={store.name}
                    />
                )}
            </main>

            {/* Store Footer */}
            <StoreFooter store={store} />
        </div>
    );
}
