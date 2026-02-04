import { ReviewSection } from '@/components/ui/review-section';
import { CautionBanner } from '@/components/ui/caution-banner';
import { StoreEmptyState } from '@/components/visitor/stores/StoreEmptyState';
import { StoreFooter } from '@/components/visitor/stores/StoreFooter';
import { StoreHeader } from '@/components/visitor/stores/StoreHeader';
import { StoreHero } from '@/components/visitor/stores/StoreHero';
import { StoreProductGrid } from '@/components/visitor/stores/StoreProductGrid';
import { StoreSearch } from '@/components/visitor/stores/StoreSearch';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function StoreShow({ store, products, filters, categoryCounts, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
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

    const storeDescription = store.description ? store.description.substring(0, 150) : `Shop at ${store.name} - Browse ${productCount} products`;

    return (
        <div className="min-h-screen bg-[var(--background)] dark:bg-[var(--buame-background-dark)]">
            <Head title={store.name}>
                <meta name="description" content={`${store.name} - ${storeDescription}${storeDescription.length >= 150 ? '...' : ''} Shop ${productCount} products on 2RBUAME marketplace.`} />
                <meta name="keywords" content={`${store.name}, marketplace, shop, products, buy, Ghana, 2RBUAME`} />
                <meta property="og:title" content={`${store.name} | 2RBUAME Marketplace`} />
                <meta property="og:description" content={`Shop at ${store.name}. Browse ${productCount} products on 2RBUAME.`} />
                <meta property="og:type" content="website" />
                {store.logo && <meta property="og:image" content={store.logo} />}
                <meta name="twitter:title" content={`${store.name} | 2RBUAME Marketplace`} />
                <meta name="twitter:description" content={`Shop at ${store.name}. Browse ${productCount} products on 2RBUAME.`} />
                {store.logo && <meta name="twitter:image" content={store.logo} />}
            </Head>

            {/* Sticky Header with Store Branding & Share */}
            <StoreHeader store={store} />

            {/* Hero Section with Store Info */}
            <StoreHero store={store} productCount={productCount} />

            {/* Caution Banner */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                <CautionBanner type="product" />
            </div>

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
                    <h2 className="text-lg font-bold text-[var(--foreground)] dark:text-white">
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

                {/* Reviews Section */}
                <ReviewSection
                    reviewableType="store"
                    reviewableId={store?.id}
                    reviews={reviews}
                    averageRating={average_rating}
                    reviewsCount={reviews_count}
                    ratingBreakdown={rating_breakdown}
                />
            </main>

            {/* Store Footer */}
            <StoreFooter store={store} />
        </div>
    );
}
