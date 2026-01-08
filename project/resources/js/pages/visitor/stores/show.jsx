import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Search, MapPin, Store, Filter, X, Package } from 'lucide-react';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { ProductCard } from '@/components/visitor/stores/ProductCard';

export default function StoreShow({ store, products, filters, categoryCounts }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('store.show', store.slug),
            {
                search: searchQuery,
                location: location,
                category: filters?.category,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleFilterChange = (filterName, value) => {
        router.get(
            route('store.show', store.slug),
            {
                search: searchQuery,
                location: location,
                [filterName]: value === 'all' ? null : value,
                ...(filterName !== 'category' && filters?.category && { category: filters.category }),
                ...(filterName !== 'sort' && filters?.sort && { sort: filters.sort }),
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClearFilters = () => {
        router.get(
            route('store.show', store.slug),
            {
                search: searchQuery,
                location: location,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const categories = [
        { value: 'electronics', label: 'Electronics' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'food', label: 'Food' },
        { value: 'agriculture', label: 'Agriculture' },
        { value: 'clothes', label: 'Clothes' },
        { value: 'others', label: 'Others' },
    ];

    const hasActiveFilters = filters?.category || filters?.sort;

    return (
        <VisitorLayout>
            <Head title={`${store.name} - Store | BUAME 2R`} />

            {/* Store Header */}
            <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0d1b0d]">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#13ec13]/20">
                            <Store className="h-8 w-8 text-[#13ec13]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-[#0d1b0d] dark:text-white md:text-4xl">
                                {store.name}
                            </h1>
                            {store.description && (
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{store.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mx-auto max-w-4xl">
                        <form onSubmit={handleSearch} className="mb-4 flex flex-col gap-3 rounded-xl bg-gray-50 p-4 dark:bg-[#162816] md:flex-row">
                            <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-[#0d1b0d]">
                                <Search className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-[#0d1b0d] md:w-48">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                    className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded-lg bg-[#13ec13] px-8 py-3 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]"
                            >
                                Search
                            </button>
                        </form>

                        {/* Quick Category Filters */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((cat) => {
                                const count = categoryCounts?.[cat.value] || 0;
                                const isActive = filters?.category === cat.value;
                                return (
                                    <button
                                        key={cat.value}
                                        onClick={() => handleFilterChange('category', isActive ? null : cat.value)}
                                        className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-semibold transition-all ${
                                            isActive
                                                ? 'border-[#13ec13] bg-[#13ec13]/10'
                                                : 'border-[#13ec13]/30 bg-white hover:border-[#13ec13] hover:bg-[#13ec13]/10 dark:bg-[#162816]'
                                        }`}
                                    >
                                        <span className="text-sm dark:text-white">{cat.label}</span>
                                        {count > 0 && (
                                            <span className="rounded-full bg-[#13ec13]/20 px-2 py-0.5 text-xs font-bold text-[#0d1b0d] dark:text-[#13ec13]">
                                                {count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                {/* Filter Bar */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {products?.total || 0} {products?.total === 1 ? 'product' : 'products'}
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={handleClearFilters}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#162816] dark:text-gray-300"
                            >
                                <X className="h-4 w-4" />
                                Clear Filters
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <select
                            value={filters?.sort || 'newest'}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {products && products.data && products.data.length > 0 ? (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                {products.links.map((link, index) => {
                                    if (link.url === null) {
                                        return (
                                            <span
                                                key={index}
                                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-400 dark:border-gray-700 dark:bg-[#162816]"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                                                link.active
                                                    ? 'border-[#13ec13] bg-[#13ec13] text-[#0d1b0d]'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#162816] dark:text-gray-300'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-[#162816]">
                        <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            No products found. {hasActiveFilters && 'Try adjusting your filters.'}
                        </p>
                    </div>
                )}
            </div>
        </VisitorLayout>
    );
}

