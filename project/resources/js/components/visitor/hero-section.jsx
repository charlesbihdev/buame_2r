import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('marketplace');

    const categories = [
        { id: 'marketplace', name: 'Marketplace', url: '/marketplace' },
        { id: 'artisans', name: 'Artisans', url: '/artisans' },
        { id: 'hotels', name: 'Hotel', url: '/hotels' },
        { id: 'transport', name: 'Okada & Cars', url: '/transport' },
        { id: 'rentals', name: 'Rentals', url: '/rentals' },
        { id: 'jobs', name: 'Jobs', url: '/jobs' },
    ];

    const handleSearch = () => {
        const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory);
        if (!selectedCategoryData) return;

        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim());
        }
        if (location.trim()) {
            params.set('location', location.trim());
        }

        const queryString = params.toString();
        const url = `${selectedCategoryData.url}${queryString ? '?' + queryString : ''}`;
        window.location.href = url;
    };

    return (
        <section className="relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url("/assets/visitors/bekwai.JPG")',
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
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
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

                        {/* Location Input */}
                        <div className="relative flex items-center rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 md:w-48 md:border-l-0 dark:border-gray-700 dark:bg-gray-800">
                            <MapPin className="absolute left-4 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Location"
                                className="w-full border-none bg-transparent pr-4 pl-12 text-base text-[#0d1b0d] outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"
                            />
                        </div>

                        {/* Search Button */}
                        <Button
                            type="button"
                            onClick={handleSearch}
                            className="h-[52px] w-full cursor-pointer rounded-xl bg-[#13ec13] px-8 text-base font-bold text-[#0d1b0d] shadow-lg shadow-green-200/50 transition-colors hover:bg-[#0eb50e] md:w-auto md:flex-shrink-0"
                        >
                            {searchQuery.trim() || location.trim() ? 'Search' : 'Browse'}
                        </Button>
                    </div>

                    {/* Category Filters */}
                    <div className="scrollbar-hide mt-3 flex gap-4 overflow-x-auto px-2 pb-2 md:pb-0">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setSelectedCategory(category.id)}
                                className={`rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-[#13ec13]/20 text-[#0d1b0d] hover:bg-[#13ec13]/30 dark:text-white'
                                        : 'text-gray-500 hover:text-[#13ec13] dark:text-gray-400'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
