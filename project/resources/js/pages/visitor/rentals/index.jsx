import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Search, MapPin, Home, Wrench, Tractor, Car, Store } from 'lucide-react';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';

export default function Rentals({ rentals, filters, typeCounts, pagination }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/rentals',
            {
                search: searchQuery,
                location: location,
                type: filters?.type,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleTypeFilter = (type) => {
        router.get(
            '/rentals',
            {
                search: searchQuery,
                location: location,
                type: type === 'all' ? null : type,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleSort = (sort) => {
        router.get(
            '/rentals',
            {
                search: searchQuery,
                location: location,
                type: filters?.type,
                sort: sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const getTypeLabel = (type) => {
        const labels = {
            house: 'House',
            equipment: 'Equipment',
            tools: 'Tools',
            land: 'Land',
            commercial: 'Commercial',
            vehicle: 'Vehicle',
            store: 'Store',
        };
        return labels[type] || type;
    };

    const typeIcons = {
        house: Home,
        equipment: Tractor,
        tools: Wrench,
        land: Tractor,
        commercial: Store,
        vehicle: Car,
        store: Store,
    };

    const getPeriodLabel = (period) => {
        return period === 'day' ? '/day' : period === 'week' ? '/week' : '/month';
    };

    return (
        <VisitorLayout>
            <Head title="Rentals - House & Equipment | BUAME 2R" />

            {/* Hero Section */}
            <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0d1b0d]">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                    <h1 className="mb-8 text-center text-4xl font-black text-[#0d1b0d] dark:text-white md:text-5xl">
                        Rent Anything in Sefwi Bekwai
                    </h1>

                    {/* Search Bar */}
                    <div className="mx-auto max-w-4xl">
                        <form onSubmit={handleSearch} className="mb-4 flex flex-col gap-3 rounded-xl bg-gray-50 p-4 dark:bg-[#162816] md:flex-row">
                            <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-[#0d1b0d]">
                                <Search className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="What are you looking for?"
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

                        {/* Quick Categories */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {Object.entries(typeCounts || {}).map(([type, count]) => {
                                const Icon = typeIcons[type] || Home;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => handleTypeFilter(type)}
                                        className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-semibold transition-all ${
                                            filters?.type === type
                                                ? 'border-[#13ec13] bg-[#13ec13]/10'
                                                : 'border-[#13ec13]/30 bg-white hover:border-[#13ec13] hover:bg-[#13ec13]/10 dark:bg-[#162816]'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5 text-[#13ec13]" />
                                        <span className="text-sm dark:text-white">{getTypeLabel(type)}</span>
                                        <span className="rounded-full bg-[#13ec13]/20 px-2 py-0.5 text-xs font-bold text-[#0d1b0d] dark:text-[#13ec13]">
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                {/* Filters Row */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {['all', 'house', 'equipment', 'tools', 'vehicle', 'land', 'store', 'commercial'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => handleTypeFilter(filter)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                    (filter === 'all' && !filters?.type) || filters?.type === filter
                                        ? 'bg-[#13ec13] text-[#0d1b0d]'
                                        : 'border border-gray-300 bg-white hover:border-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white'
                                }`}
                            >
                                {filter === 'all' ? 'All' : getTypeLabel(filter)}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={filters?.sort || 'newest'}
                            onChange={(e) => handleSort(e.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white"
                        >
                            <option value="newest">Newest</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="top_rated">Most Viewed</option>
                        </select>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-bold text-[#0d1b0d] dark:text-white">{pagination?.total || 0}</span> rentals available
                        </div>
                    </div>
                </div>

                {/* Rentals Grid - 4 columns */}
                {rentals && rentals.length > 0 ? (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {rentals.map((rental) => (
                                <div
                                    key={rental.id}
                                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:border-[#13ec13]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#162816]"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden bg-gray-200">
                                        {rental.image ? (
                                            <img
                                                src={rental.image}
                                                alt={rental.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                                                <Home className="h-12 w-12" />
                                            </div>
                                        )}
                                        <div className="absolute right-3 top-3 rounded-full bg-[#13ec13] px-3 py-1 text-xs font-bold text-[#0d1b0d]">
                                            {getTypeLabel(rental.type)}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="mb-2 text-lg font-bold text-[#0d1b0d] dark:text-white">{rental.name}</h3>

                                        <div className="mb-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <MapPin className="h-4 w-4" />
                                            {rental.location}
                                        </div>

                                        {/* Features */}
                                        {rental.features && rental.features.length > 0 && (
                                            <div className="mb-4 flex flex-wrap gap-1">
                                                {rental.features.slice(0, 3).map((feature, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="rounded-md bg-[#13ec13]/10 px-2 py-0.5 text-xs font-semibold text-[#0d1b0d] dark:text-[#13ec13]"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {rental.features.length > 3 && (
                                                    <span className="rounded-md bg-[#13ec13]/10 px-2 py-0.5 text-xs font-semibold text-[#0d1b0d] dark:text-[#13ec13]">
                                                        +{rental.features.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Price & Action */}
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                            <div>
                                                <div className="text-xl font-black text-[#0d1b0d] dark:text-[#13ec13]">
                                                    ₵{parseFloat(rental.price).toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">{getPeriodLabel(rental.period)}</div>
                                            </div>
                                            <Link
                                                href={`/rentals/${rental.id}`}
                                                className="rounded-lg bg-[#13ec13] px-4 py-2 text-sm font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.last_page > 1 && (
                            <div className="mt-12">
                                <Pagination
                                    currentPage={pagination.current_page}
                                    totalPages={pagination.last_page}
                                    onPageChange={(page) => {
                                        router.get(
                                            '/rentals',
                                            {
                                                ...filters,
                                                page: page,
                                            },
                                            {
                                                preserveState: true,
                                                preserveScroll: true,
                                            }
                                        );
                                    }}
                                    mode="pagination"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-[#162816]">
                        <p className="text-lg text-gray-600 dark:text-gray-400">No rentals found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </VisitorLayout>
    );
}
