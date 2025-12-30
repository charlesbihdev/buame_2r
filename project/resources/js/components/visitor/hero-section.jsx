import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Sefwi Bekwai');

    const locations = ['Sefwi Bekwai', 'Bibiani', 'Wiawso', 'Juaboso'];

    const categories = [
        { name: 'All Categories', url: '/services', active: true },
        { name: 'Artisans', url: '/services?category=artisans' },
        { name: 'Hotel', url: '/food-stay?category=hotel' },
        { name: 'Okada', url: '/services?category=okada' },
        { name: 'Rentals', url: '/services?category=rentals' },
        { name: 'Marketplace', url: '/marketplace' },
        { name: 'Jobs', url: '/jobs' },
    ];

    const handleSearch = () => {
        if (searchQuery.trim()) {
            window.location.href = `/services?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(selectedLocation)}`;
        }
    };

    return (
        <section className="relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url("/assets/visitors/hero-image.png")',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center md:px-8 lg:px-40 lg:py-32">
                {/* Headline */}
                <h1 className="mb-4 max-w-4xl text-4xl leading-tight font-black tracking-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
                    Connecting Local Services & Opportunities in Western North Ghana
                </h1>

                {/* Subtitle */}
                <h2 className="mb-10 max-w-2xl text-lg font-medium text-gray-100 drop-shadow-sm md:text-xl">
                    From artisans in Sefwi Bekwai to transport across the region—find what you need in seconds.
                </h2>

                {/* Search Component */}
                <div className="w-full max-w-3xl rounded-2xl bg-white p-2 shadow-xl md:p-3 dark:bg-gray-900">
                    <div className="flex flex-col gap-2 md:flex-row">
                        {/* Search Input */}
                        <div className="focus-within:ring-primary/50 flex flex-1 items-center rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition-all focus-within:ring-2 dark:border-gray-700 dark:bg-gray-800">
                            <Search className="mr-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="What are you looking for? (e.g., Plumber, Taxi)"
                                className="w-full border-none bg-transparent text-base text-[#0d1b0d] outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"
                            />
                        </div>

                        {/* Location Select */}
                        <div className="flex items-center rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 md:w-48 md:border-l-0 dark:border-gray-700 dark:bg-gray-800">
                            <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full cursor-pointer border-none bg-transparent text-base text-[#0d1b0d] outline-none focus:ring-0 dark:text-white"
                            >
                                {locations.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search Button */}
                        <Button
                            onClick={handleSearch}
                            className="w-full rounded-xl bg-[#13ec13] px-8 py-3 text-base font-bold text-[#0d1b0d] shadow-lg shadow-green-200/50 transition-colors hover:bg-[#0eb50e] md:w-auto"
                        >
                            Search
                        </Button>
                    </div>

                    {/* Category Filters */}
                    <div className="scrollbar-hide mt-3 flex gap-4 overflow-x-auto px-2 pb-2 md:pb-0">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={category.url}
                                className={`rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors ${
                                    category.active
                                        ? 'bg-[#13ec13]/20 text-[#0d1b0d] hover:bg-[#13ec13]/30'
                                        : 'text-gray-500 hover:text-[#13ec13] dark:text-gray-400'
                                }`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
