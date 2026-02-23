import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { BackToHome } from '@/components/ui/back-to-home';
import { TransportPagination } from '@/components/visitor/transport/TransportPagination';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Star, Users, Search, BadgeCheck } from 'lucide-react';
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
    const [location, setLocation] = useState(filters?.location || '');

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
            <Head title="Transport & Rides">
                <meta name="description" content="Find reliable transport services in Ghana - okada, taxis, cars, buses, and cargo services. Book rides from trusted drivers on 2RBUAME." />
                <meta name="keywords" content="transport Ghana, taxi, okada, car hire, bus, cargo, rides, drivers, book transport, 2RBUAME" />
                <meta property="og:title" content="Transport & Rides - 2RBUAME" />
                <meta property="og:description" content="Find reliable transport services in Ghana. Book okada, taxis, cars, buses, and cargo from trusted drivers." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Transport & Rides - 2RBUAME" />
                <meta name="twitter:description" content="Find reliable transport services in Ghana. Book from trusted drivers." />
            </Head>

            {/* Hero with Location Search */}
            <div className="bg-gradient-to-r from-[var(--primary)]/20 via-[var(--primary)]/10 to-transparent">
                <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
                    <div className="mb-6">
                        <BackToHome />
                    </div>
                    <h1 className="mb-8 text-center text-4xl font-black text-[var(--foreground)]">
                        Find Rides Near You
                    </h1>

                    {/* Location Search */}
                    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]">
                                <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
                                placeholder="Search by location..."
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <button
                                onClick={handleLocationSearch}
                                className="shrink-0 rounded-lg bg-[var(--primary)] px-6 py-3 font-bold text-white transition-colors hover:bg-[var(--primary)]/90"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                        {/* TODO: Add "Use Current Location" button once geolocation is implemented */}
                    </div>
                </div>
            </div>

            {/* Available Rides - Grid Style */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--foreground)]">Available Rides</h2>
                        <p className="text-sm text-gray-600">{totalCount} transport options found</p>
                    </div>
                    <select
                        value={filters?.sort != null ? String(filters.sort) : 'rating'}
                        onChange={handleSortChange}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)]"
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
                            className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors ${filters?.type === tab.value || (!filters?.type && tab.value === null)
                                ? 'bg-[var(--primary)] text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50#1a2e1a]'
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
                                className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:border-[var(--primary)]/50 hover:shadow-lg"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    {ride.image ? (
                                        <div
                                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${ride.image})` }}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--primary)]/10 to-[var(--primary)]/5">
                                            <span className="text-5xl" aria-hidden>
                                                {ride.type === 'okada' ? '🛺' :
                                                    ride.type === 'car' ? '🚙' :
                                                        ride.type === 'taxi' ? '🚕' :
                                                            ride.type === 'bus' ? '🚌' :
                                                                ride.type === 'cargo' ? '🚚' : '🚗'}
                                            </span>
                                            <span className="text-xs font-semibold capitalize text-[var(--primary)] opacity-90">{ride.type || 'Ride'}</span>
                                        </div>
                                    )}
                                    <div className="absolute right-3 top-3 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold capitalize text-white">
                                        {ride.type}
                                    </div>
                                    {ride.is_verified && (
                                        <div className="absolute left-3 top-3">
                                            <BadgeCheck className="h-5 w-5 fill-[var(--primary)] text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="mb-1 text-lg font-bold text-[var(--foreground)]">{ride.driver_name}</h3>

                                    <div className="mb-3 flex items-center gap-1 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>{ride.location}</span>
                                    </div>

                                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">
                                            <Users className="h-3.5 w-3.5" />
                                            {ride.seats_available != null && ride.seats_available !== '' ? ride.seats_available : '—'} seats
                                        </span>
                                        {Number(ride.reviews_count) > 0 ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-medium text-amber-800">
                                                <Star className="h-3.5 w-3.5 fill-amber-500" />
                                                {ride.rating} · {ride.reviews_count} review{ride.reviews_count !== 1 ? 's' : ''}
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-500">
                                                No reviews yet
                                            </span>
                                        )}
                                    </div>

                                    {/* Price (if set) + CTA */}
                                    <div className="border-t border-gray-100 pt-4">
                                        {Number(ride?.price_per_seat) > 0 && (
                                            <div className="mb-3">
                                                <div className="text-lg font-bold text-[var(--foreground)]">GH₵{ride.price_per_seat}</div>
                                                <div className="text-xs text-gray-500">per seat</div>
                                            </div>
                                        )}
                                        <Link
                                            href={`/transport/${ride.id}`}
                                            className="block w-full rounded-lg bg-[var(--primary)] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:opacity-95"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-lg text-gray-500">No transport services found. Be the first to list your service!</p>
                            <Link href="/join-as-provider" className="mt-4 inline-block text-[var(--primary)] hover:underline">
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
