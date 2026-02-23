import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { BackToHome } from '@/components/ui/back-to-home';
import { ArrowLeft, Search, MapPin, Home, Wrench, Tractor, Car, Store, Building2, Map } from 'lucide-react';
import { Head, Link, router } from '@inertiajs/react';
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
            <Head title="Rentals - House & Equipment">
                <meta name="description" content="Find houses, equipment, tools, vehicles, and land for rent in Ghana. Browse affordable rental options across Western North and beyond on 2RBUAME." />
                <meta name="keywords" content="rentals Ghana, house rental, equipment rental, tools, vehicles, land, commercial space, rent, 2RBUAME" />
                <meta property="og:title" content="Rentals - House & Equipment - 2RBUAME" />
                <meta property="og:description" content="Find houses, equipment, tools, vehicles, and land for rent in Ghana. Browse affordable options on 2RBUAME." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Rentals - House & Equipment - 2RBUAME" />
                <meta name="twitter:description" content="Find houses, equipment, tools, vehicles, and land for rent in Ghana." />
            </Head>

            {/* Hero Section */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <BackToHome />
                    </div>
                    <h1 className="mb-8 text-center text-4xl font-black text-[var(--foreground)] md:text-5xl">
                        Rent Anything Across Western North and Beyond
                    </h1>

                    {/* Search Bar */}
                    <div className="mx-auto max-w-4xl">
                        <form onSubmit={handleSearch} className="mb-4 flex flex-col gap-3 rounded-xl bg-gray-50 p-4 md:flex-row">
                            <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
                                <Search className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="What are you looking for?"
                                    className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
                                />
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 md:w-48">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                    className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded-lg bg-[var(--primary)] px-8 py-3 font-bold text-white transition-colors hover:bg-[var(--primary)]"
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
                                        className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-semibold transition-all ${isActive
                                            ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                            : 'border-[var(--primary)]/30 bg-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/10'
                                            }`}
                                    >
                                        <cat.icon className="h-5 w-5 text-[var(--primary)]" />
                                        <span className="text-sm">{cat.label}</span>
                                        <span className="rounded-full bg-[var(--primary)]/20 px-2 py-0.5 text-xs font-bold text-white">
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
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive
                                    ? 'bg-[var(--primary)] text-white'
                                    : 'border border-gray-300 bg-white hover:border-[var(--primary)]'
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
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                        <p className="text-lg text-gray-600">No rentals found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </VisitorLayout>
    );
}
