import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { MapPin, Star, Users, Search, Navigation } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';

export default function Transport() {
    const [currentPage, setCurrentPage] = useState(1);
    const [location, setLocation] = useState('Sefwi Bekwai');
    const itemsPerPage = 12;
    const totalItems = 36;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Sample data - in real app, this would come from props/API
    const allRides = [
        {
            company: 'VIP Transport',
            type: 'VIP Bus',
            location: 'Sefwi Bekwai',
            distance: '2.5 km away',
            price: 80,
            seats: 12,
            rating: 4.8,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        {
            company: 'Express Taxi Service',
            type: 'Taxi',
            location: 'Bibiani',
            distance: '5.2 km away',
            price: 50,
            seats: 3,
            rating: 4.9,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        {
            company: 'Fast Okada & Car Riders',
            type: 'Okada & Cars',
            location: 'Sefwi Bekwai',
            distance: '0.8 km away',
            price: 15,
            seats: 1,
            rating: 4.5,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        {
            company: 'Cargo Express',
            type: 'Cargo Truck',
            location: 'Wiawso',
            distance: '8.1 km away',
            price: 200,
            seats: 2,
            rating: 4.6,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        // Add more rides
        ...Array.from({ length: 32 }, (_, i) => ({
            company: `Transport Service ${i + 5}`,
            type: ['Taxi', 'Bus', 'Okada & Cars', 'Cargo'][i % 4],
            location: ['Sefwi Bekwai', 'Bibiani', 'Wiawso'][i % 3],
            distance: `${(Math.random() * 10).toFixed(1)} km away`,
            price: 20 + (i % 10) * 10,
            seats: [1, 3, 12, 2][i % 4],
            rating: 4.0 + (i % 5) * 0.2,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        })),
    ];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRides = allRides.slice(startIndex, endIndex);

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
                                    placeholder="Enter your location or use current location"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#0d1b0d] dark:text-white"
                                />
                            </div>
                            <button className="mt-6 rounded-lg bg-[#13ec13] px-6 py-3 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]">
                                <MapPin className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 rounded-lg border-2 border-[#13ec13] bg-[#13ec13]/10 px-4 py-2 text-sm font-semibold text-[#0d1b0d] transition-colors hover:bg-[#13ec13]/20 dark:text-white">
                                Use Current Location
                            </button>
                            <button className="flex-1 rounded-lg bg-[#13ec13] px-4 py-2 text-sm font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]">
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">{totalItems} transport options found near you</p>
                    </div>
                    <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white">
                        <option>Sort by: Distance</option>
                        <option>Price: Low to High</option>
                        <option>Top Rated</option>
                    </select>
                </div>

                {/* Transport Type Tabs */}
                <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                    {[
                        { label: 'All', icon: '🚗', active: true },
                        { label: 'Taxi', icon: '🚕' },
                        { label: 'Bus', icon: '🚌' },
                        { label: 'Okada & Cars', icon: '🏍️' },
                        { label: 'Cargo', icon: '🚚' },
                    ].map((tab) => (
                        <button
                            key={tab.label}
                            className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors ${
                                tab.active
                                    ? 'bg-[#13ec13] text-[#0d1b0d]'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-[#162816] dark:text-white dark:hover:bg-[#1a2e1a]'
                            }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Ride Cards - Grid Layout (4 columns) */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentRides.map((ride, idx) => (
                        <div
                            key={idx}
                            className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:border-[#13ec13]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#162816]"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden bg-gray-200">
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${ride.image})` }}
                                />
                                <div className="absolute right-3 top-3 rounded-full bg-[#13ec13] px-3 py-1 text-xs font-bold text-[#0d1b0d]">
                                    {ride.type}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="mb-1 text-lg font-bold text-[#0d1b0d] dark:text-white">{ride.company}</h3>

                                <div className="mb-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-4 w-4" />
                                    <span>{ride.location}</span>
                                </div>

                                <div className="mb-3 text-xs text-[#13ec13] font-semibold">{ride.distance}</div>

                                <div className="mb-4 flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 text-gray-400" />
                                        <span className="font-semibold dark:text-white">{ride.seats}</span>
                                        <span className="text-gray-500">seats</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold dark:text-white">{ride.rating}</span>
                                    </div>
                                </div>

                                {/* Price & Book */}
                                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                    <div>
                                        <div className="text-xl font-black text-[#0d1b0d] dark:text-[#13ec13]">₵{ride.price}</div>
                                        <div className="text-xs text-gray-500">per seat</div>
                                    </div>
                                    <Link
                                        href={`/transport/${idx + 1}`}
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
                <div className="mt-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        mode="pagination"
                    />
                </div>
            </div>
        </VisitorLayout>
    );
}


