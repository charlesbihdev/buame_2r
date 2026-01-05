import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { TransportCard } from '@/components/visitor/transport/TransportCard';
import { TransportFilterBar } from '@/components/visitor/transport/TransportFilterBar';
import { TransportPagination } from '@/components/visitor/transport/TransportPagination';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Search, Bike, Car, Truck, Bus } from 'lucide-react';
import { useState } from 'react';

// Quick category icons
const categoryIcons = {
    okada: Bike,
    car: Car,
    taxi: Car,
    bus: Bus,
    cargo: Truck,
};

export default function Transport({ rides, typeCounts, filters }) {
    const totalCount = rides?.total || 0;
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/transport',
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
            '/transport',
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
            '/transport',
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

    const handleQuickFilter = (type) => {
        router.get(
            '/transport',
            {
                search: searchQuery,
                location: location,
                type: type,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <VisitorLayout>
            <Head title="Transport Services | BUAME 2R" />

            {/* Hero with Search */}
            <div className="w-full bg-gradient-to-br from-[#13ec13]/10 via-white to-[#13ec13]/5 dark:from-[#13ec13]/5 dark:via-[#0d1b0d] dark:to-[#13ec13]/5">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
                    <div className="mb-8 text-center">
                        <h1 className="mb-3 text-4xl font-black text-[#0d1b0d] dark:text-white md:text-5xl">Find Transport Services</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">Okada, Cars, Taxis, and more in Sefwi Bekwai</p>
                    </div>

                    {/* Search Bar Component */}
                    <form onSubmit={handleSearch} className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-4 shadow-lg dark:bg-[#162816] md:flex-row">
                        <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
                            <Search className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by company name..."
                                className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700 md:w-48">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                                className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                            />
                        </div>
                        <Button type="submit" className="h-12 bg-[#13ec13] px-8 font-bold text-[#0d1b0d] hover:bg-[#0fdc0f]">
                            Search
                        </Button>
                    </form>

                    {/* Quick Categories */}
                    {typeCounts && (
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {Object.entries(typeCounts).map(([type, count]) => {
                                if (count === 0) return null;
                                const Icon = categoryIcons[type] || Car;
                                const isActive = filters?.type === type;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => handleQuickFilter(type)}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                            isActive
                                                ? 'bg-[#13ec13] text-[#0d1b0d]'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-[#162816] dark:text-white dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span className="capitalize">{type}</span>
                                        <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content - Grid Layout */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
                {/* Filter Bar Component */}
                <TransportFilterBar filters={filters} totalCount={totalCount} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

                {/* Transport Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {rides?.data && rides.data.length > 0 ? (
                        rides.data.map((ride) => <TransportCard key={ride.id} ride={ride} />)
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No transport services found. Be the first to list your service!</p>
                            <Link href="/join-as-provider" className="mt-4 inline-block text-[#13ec13] hover:underline">
                                Join as Provider →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination Component */}
                {rides && <TransportPagination rides={rides} filters={filters} />}
            </div>
        </VisitorLayout>
    );
}
