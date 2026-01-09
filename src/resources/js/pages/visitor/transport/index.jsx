import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { TransportPagination } from '@/components/visitor/transport/TransportPagination';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Star, Users, Search, Navigation, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

// Transport type tabs with emojis - Okada (tricycle) separate from Car
const transportTabs = [
    { value: null, label: 'All', emoji: '🚗' },
    { value: 'okada', label: 'Okada', emoji: '🛺' },
    { value: 'car', label: 'Car', emoji: '🚙' },
    { value: 'taxi', label: 'Taxi', emoji: '🚕' },
    { value: 'bus', label: 'Bus', emoji: '🚌' },
    { value: 'cargo', label: 'Cargo', emoji: '🚚' },
];

export default function Transport({ rides, typeCounts, filters }) {
    const totalCount = rides?.total || 0;
    const [location, setLocation] = useState(filters?.location || 'Sefwi Bekwai');

    const handleLocationSearch = () => {
        router.get(
            '/transport',
            {
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
            '/transport',
            {
                location: filters?.location,
                type: type,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleSortChange = (e) => {
        router.get(
            '/transport',
            {
                location: filters?.location,
                type: filters?.type,
                sort: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <VisitorLayout>
            <Head title="Transport & Rides | BUAME 2R" />

            {/* Hero with Location Search */}
            <div className="bg-gradient-to-r from-[#13ec13]/20 via-[#13ec13]/10 to-transparent dark:from-[#13ec13]/10 dark:via-[#13ec13]/5">
                <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
                    <h1 className="mb-8 text-center text-4xl font-black text-[#0d1b0d] dark:text-white">
                        Find Rides Near You
                    </h1>

                    {/* Location Search */}
                    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-xl dark:bg-[#162816]">
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#13ec13]">
                                <Navigation className="h-5 w-5 text-[#0d1b0d]" />
                            </div>
                            <div className="flex-1">
                                <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
                                    Your Location
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter your location"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#0d1b0d] dark:text-white"
                                />
                            </div>
                            <button
                                onClick={handleLocationSearch}
                                className="mt-6 rounded-lg bg-[#13ec13] px-6 py-3 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]"
                            >
                                <MapPin className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setLocation('Sefwi Bekwai')}
                                className="flex-1 rounded-lg border-2 border-[#13ec13] bg-[#13ec13]/10 px-4 py-2 text-sm font-semibold text-[#0d1b0d] transition-colors hover:bg-[#13ec13]/20 dark:text-white"
                            >
                                Use Current Location
                            </button>
                            <button
                                onClick={handleLocationSearch}
                                className="flex-1 rounded-lg bg-[#13ec13] px-4 py-2 text-sm font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]"
                            >
                                <Search className="mx-auto h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Rides - Grid Style */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#0d1b0d] dark:text-white">Available Rides</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{totalCount} transport options found</p>
                    </div>
                    <select
                        value={filters?.sort || 'rating'}
                        onChange={handleSortChange}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white"
                    >
                        <option value="rating">Sort: Top Rated</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>

                {/* Transport Type Tabs - Emoji Style */}
                <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                    {transportTabs.map((tab) => (
                        <button
                            key={tab.label}
                            onClick={() => handleTypeFilter(tab.value)}
                            className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors ${
                                filters?.type === tab.value || (!filters?.type && tab.value === null)
                                    ? 'bg-[#13ec13] text-[#0d1b0d]'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-[#162816] dark:text-white dark:hover:bg-[#1a2e1a]'
                            }`}
                        >
                            <span className="text-lg">{tab.emoji}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Ride Cards - Grid Layout (4 columns) */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {rides?.data && rides.data.length > 0 ? (
                        rides.data.map((ride) => (
                            <div
                                key={ride.id}
                                className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:border-[#13ec13]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#162816]"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                                    {ride.image ? (
                                        <div
                                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${ride.image})` }}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#13ec13]/10 to-[#13ec13]/5">
                                            <span className="text-5xl">
                                                {ride.type === 'okada' ? '🛺' :
                                                 ride.type === 'car' ? '🚙' :
                                                 ride.type === 'taxi' ? '🚕' :
                                                 ride.type === 'bus' ? '🚌' :
                                                 ride.type === 'cargo' ? '🚚' : '🚗'}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute right-3 top-3 rounded-full bg-[#13ec13] px-3 py-1 text-xs font-bold capitalize text-[#0d1b0d]">
                                        {ride.type}
                                    </div>
                                    {ride.is_verified && (
                                        <div className="absolute left-3 top-3">
                                            <BadgeCheck className="h-5 w-5 fill-[#13ec13] text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="mb-1 text-lg font-bold text-[#0d1b0d] dark:text-white">{ride.company_name}</h3>

                                    <div className="mb-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                        <span>{ride.location}</span>
                                    </div>

                                    <div className="mb-4 flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4 text-gray-400" />
                                            <span className="font-semibold dark:text-white">{ride.seats_available}</span>
                                            <span className="text-gray-500">seats</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold dark:text-white">{ride.rating}</span>
                                            <span className="text-gray-400">({ride.reviews_count})</span>
                                        </div>
                                    </div>

                                    {/* Price & Book */}
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <div>
                                            <div className="text-xl font-black text-[#0d1b0d] dark:text-[#13ec13]">GH₵{ride.price_per_seat}</div>
                                            <div className="text-xs text-gray-500">per seat</div>
                                        </div>
                                        <Link
                                            href={`/transport/${ride.id}`}
                                            className="rounded-lg bg-[#13ec13] px-4 py-2 text-sm font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No transport services found. Be the first to list your service!</p>
                            <Link href="/join-as-provider" className="mt-4 inline-block text-[#13ec13] hover:underline">
                                Join as Provider →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {rides && <TransportPagination rides={rides} filters={filters} />}
            </div>
        </VisitorLayout>
    );
}
