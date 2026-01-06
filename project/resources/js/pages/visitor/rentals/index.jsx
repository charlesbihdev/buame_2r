import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Search, MapPin, Home, Wrench, Tractor, Car, Store, Building2, Map } from 'lucide-react';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { RentalCard } from '@/components/visitor/rentals/RentalCard';
import { RentalFilterBar } from '@/components/visitor/rentals/RentalFilterBar';
import { RentalPagination } from '@/components/visitor/rentals/RentalPagination';

export default function Rentals({ rentals, filters, typeCounts }) {
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

    const handleFilterChange = (filterName, value) => {
        router.get(
            '/rentals',
            {
                search: searchQuery,
                location: location,
                [filterName]: value === 'all' ? null : value,
                ...(filterName !== 'type' && filters?.type && { type: filters.type }),
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
            '/rentals',
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

    const handleTypeFilter = (type) => {
        router.get(
            '/rentals',
            {
                search: searchQuery,
                location: location,
                type: type === 'all' || type === null ? null : type,
                sort: filters?.sort,
                page: null,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Quick category buttons with real counts
    const quickCategories = [
        { type: 'house', icon: Home, label: 'House' },
        { type: 'tools', icon: Wrench, label: 'Tools' },
        { type: 'equipment', icon: Tractor, label: 'Equipment' },
        { type: 'vehicle', icon: Car, label: 'Vehicles' },
        { type: 'store', icon: Store, label: 'Store' },
        { type: 'land', icon: Map, label: 'Land' },
        { type: 'commercial', icon: Building2, label: 'Commercial' },
    ].map((cat) => ({
        ...cat,
        count: typeCounts?.[cat.type] || 0,
    }));

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
                            {quickCategories.map((cat) => {
                                const isActive = filters?.type === cat.type;
                                return (
                                    <button
                                        key={cat.type}
                                        onClick={() => handleTypeFilter(isActive ? null : cat.type)}
                                        className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-semibold transition-all ${
                                            isActive
                                                ? 'border-[#13ec13] bg-[#13ec13]/10'
                                                : 'border-[#13ec13]/30 bg-white hover:border-[#13ec13] hover:bg-[#13ec13]/10 dark:bg-[#162816]'
                                        }`}
                                    >
                                        <cat.icon className="h-5 w-5 text-[#13ec13]" />
                                        <span className="text-sm dark:text-white">{cat.label}</span>
                                        <span className="rounded-full bg-[#13ec13]/20 px-2 py-0.5 text-xs font-bold text-[#0d1b0d] dark:text-[#13ec13]">
                                            {cat.count}
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
                {/* Filter Bar Component */}
                <RentalFilterBar
                    filters={filters}
                    totalCount={rentals?.total || 0}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />

                {/* Type Filter Buttons */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {['All', 'House', 'Equipment', 'Tools', 'Vehicles', 'Land', 'Store', 'Commercial'].map((filter) => {
                        const filterType = filter === 'All' ? null : filter.toLowerCase() === 'vehicles' ? 'vehicle' : filter.toLowerCase();
                        const isActive = filter === 'All' ? !filters?.type : filters?.type === filterType;
                        return (
                            <button
                                key={filter}
                                onClick={() => handleTypeFilter(filterType)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                    isActive
                                        ? 'bg-[#13ec13] text-[#0d1b0d]'
                                        : 'border border-gray-300 bg-white hover:border-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </div>

                {/* Rentals Grid */}
                {rentals && rentals.data && rentals.data.length > 0 ? (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {rentals.data.map((rental) => (
                                <RentalCard key={rental.id} rental={rental} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <RentalPagination rentals={rentals} filters={filters} />
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
