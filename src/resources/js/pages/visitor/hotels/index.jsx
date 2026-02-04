import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { HotelCard } from '@/components/visitor/hotels/HotelCard';
import { HotelFilterBar } from '@/components/visitor/hotels/HotelFilterBar';
import { HotelPagination } from '@/components/visitor/hotels/HotelPagination';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export default function Hotels({ hotels, filters }) {
    const totalCount = hotels.total || 0;
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/hotels',
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
            '/hotels',
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
            '/hotels',
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

    return (
        <VisitorLayout>
            <Head title="Hotels & Guest Houses">
                <meta name="description" content="Find comfortable hotels and guest houses in Ghana. Browse and book accommodation across Western North and beyond on 2RBUAME." />
                <meta name="keywords" content="hotels Ghana, guest houses, accommodation, lodging, book hotel, places to stay, 2RBUAME hotels" />
                <meta property="og:title" content="Hotels & Guest Houses - 2RBUAME" />
                <meta property="og:description" content="Discover and book comfortable hotels and guest houses across Ghana. Find your perfect stay on 2RBUAME." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Hotels & Guest Houses - 2RBUAME" />
                <meta name="twitter:description" content="Discover and book comfortable hotels and guest houses across Ghana." />
            </Head>

            {/* Hero with Search */}
            <div className="w-full bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--primary)]/5 dark:from-[var(--primary)]/5 dark:via-[var(--foreground)] dark:to-[var(--primary)]/5">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
                    <div className="mb-8 text-center">
                        <h1 className="mb-3 text-4xl font-black text-[var(--foreground)] dark:text-white md:text-5xl">Find Your Perfect Stay</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">Discover comfortable hotels and guest houses across Western North and beyond</p>
                    </div>

                    {/* Search Bar Component */}
                    <form onSubmit={handleSearch} className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-4 shadow-lg dark:bg-[var(--card)] md:flex-row">
                        <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
                            <Search className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search hotels by name..."
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
                        <Button type="submit" className="h-12 bg-[var(--primary)] px-8 font-bold text-white hover:bg-[var(--primary)]">
                            Search
                        </Button>
                    </form>
                </div>
            </div>

            {/* Main Content - Grid Layout */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
                {/* Filter Bar Component */}
                <HotelFilterBar filters={filters} totalCount={totalCount} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

                {/* Hotel Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {hotels.data && hotels.data.length > 0 ? (
                        hotels.data.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No hotels found. Be the first to list your property!</p>
                            <Link href="/join-as-provider" className="mt-4 inline-block text-[var(--primary)] hover:underline">
                                Join as Provider →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination Component */}
                <HotelPagination hotels={hotels} filters={filters} />
            </div>
        </VisitorLayout>
    );
}
