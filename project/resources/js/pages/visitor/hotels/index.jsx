import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Search, MapPin, Star, Wifi, Car, UtensilsCrossed, Wind, Calendar, Users } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';

export default function Hotels() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalItems = 23;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Sample data - in real app, this would come from props/API
    const allHotels = [
        {
            name: 'Peace Guest House',
            type: 'Hotel',
            rating: 4.5,
            reviews: 120,
            price: 150,
            location: 'Bibiani Road',
            amenities: [
                { icon: Wifi, label: 'WiFi' },
                { icon: Car, label: 'Parking' },
                { icon: UtensilsCrossed, label: 'Restaurant' },
            ],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        {
            name: 'Royal Palace Hotel',
            type: 'Hotel',
            rating: 4.8,
            reviews: 164,
            price: 250,
            location: 'Sefwi Bekwai',
            amenities: [
                { icon: Wind, label: 'AC' },
                { icon: Wifi, label: 'WiFi' },
                { icon: UtensilsCrossed, label: 'Restaurant' },
            ],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        {
            name: 'Cozy Lodge Wiawso',
            type: 'Lodge',
            rating: 4.7,
            reviews: 85,
            price: 200,
            location: 'Wiawso Center',
            amenities: [
                { icon: Wind, label: 'AC' },
                { icon: Wifi, label: 'WiFi' },
            ],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        {
            name: 'Comfort Inn Bekwai',
            type: 'Guest House',
            rating: 4.3,
            reviews: 56,
            price: 120,
            location: 'Sefwi Bekwai',
            amenities: [{ icon: Car, label: 'Parking' }],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        {
            name: 'Sunrise Lodge',
            type: 'Lodge',
            rating: 4.6,
            reviews: 78,
            price: 180,
            location: 'Juaboso',
            amenities: [
                { icon: Wifi, label: 'WiFi' },
                { icon: UtensilsCrossed, label: 'Breakfast' },
            ],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        {
            name: 'Traveller Rest House',
            type: 'Short Stay',
            rating: 4.2,
            reviews: 42,
            price: 90,
            location: 'Bibiani',
            amenities: [{ icon: Wifi, label: 'WiFi' }],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        },
        // Add more hotels to reach 23 total
        ...Array.from({ length: 17 }, (_, i) => ({
            name: `Hotel ${i + 7}`,
            type: ['Hotel', 'Guest House', 'Lodge'][i % 3],
            rating: 4.0 + (i % 5) * 0.2,
            reviews: 20 + i * 5,
            price: 100 + i * 10,
            location: ['Sefwi Bekwai', 'Bibiani', 'Wiawso'][i % 3],
            amenities: [
                { icon: Wifi, label: 'WiFi' },
                { icon: Car, label: 'Parking' },
            ],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA',
        })),
    ];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHotels = allHotels.slice(startIndex, endIndex);

    return (
        <VisitorLayout>
            <Head title="Hotels & Guest Houses | BUAME 2R" />

            {/* Compact Hero */}
            <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0d1b0d]">
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    <h1 className="mb-6 text-center text-3xl font-black text-[#0d1b0d] dark:text-white md:text-4xl">
                        Find Your Perfect Stay
                    </h1>

                    {/* Inline Search */}
                    <div className="mx-auto grid max-w-5xl gap-3 rounded-xl bg-gray-50 p-4 dark:bg-[#162816] md:grid-cols-4">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-[#0d1b0d]">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <select className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white">
                                <option>Sefwi Bekwai</option>
                                <option>Bibiani</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-[#0d1b0d]">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-[#0d1b0d]">
                            <Users className="h-5 w-5 text-gray-400" />
                            <input
                                type="number"
                                placeholder="Guests"
                                defaultValue="1"
                                className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                            />
                        </div>
                        <button className="rounded-lg bg-[#13ec13] py-2 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]">
                            <Search className="mx-auto h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content - Gallery Style */}
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                {/* Filters Row */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Hotels', 'Guest House', 'Lodge', 'Budget Friendly'].map((filter) => (
                            <button
                                key={filter}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                    filter === 'All'
                                        ? 'bg-[#13ec13] text-[#0d1b0d]'
                                        : 'border border-gray-300 bg-white hover:border-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold">{totalItems}</span> properties available
                    </div>
                </div>

                {/* Properties Grid - 4 columns */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentHotels.map((hotel, idx) => (
                        <div
                            key={idx}
                            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-[#162816]"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden bg-gray-200">
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${hotel.image})` }}
                                />
                                <div className="absolute bottom-3 left-3 rounded-full bg-[#13ec13] px-3 py-1 text-sm font-bold text-[#0d1b0d]">
                                    {hotel.type}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">{hotel.name}</h3>
                                    <div className="flex items-center gap-1 rounded-md bg-[#13ec13]/10 px-2 py-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-bold">{hotel.rating}</span>
                                    </div>
                                </div>

                                <div className="mb-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-4 w-4" />
                                    {hotel.location}
                                </div>

                                {/* Amenities */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {hotel.amenities.map((amenity, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-800"
                                        >
                                            <amenity.icon className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">{amenity.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                    <div>
                                        <div className="text-2xl font-black text-[#0d1b0d] dark:text-[#13ec13]">₵{hotel.price}</div>
                                        <div className="text-xs text-gray-500">per night</div>
                                    </div>
                                    <Link
                                        href={`/hotels/${idx + 1}`}
                                        className="rounded-lg bg-[#13ec13] px-6 py-2 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]"
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


