import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';

export function MarketplaceHero() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Sefwi Bekwai');

    const locations = ['Sefwi Bekwai', 'Bibiani', 'Wiawso', 'Humjibre'];

    const handleSearch = () => {
        if (searchQuery.trim()) {
            window.location.href = `/marketplace?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(selectedLocation)}`;
        }
    };

    return (
        <div className="w-full border-b border-[#e7f3e7] bg-white dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto max-w-[1440px]">
                <div className="p-4 @[480px]:p-6">
                    <div
                        className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-8 py-12"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url(/assets/visitors/marketplace-hero.jpg)',
                        }}
                    >
                        <div className="z-10 flex max-w-2xl flex-col gap-3 text-center">
                            <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-white md:text-5xl">
                                Find what you need in Sefwi Bekwai
                            </h1>
                            <p className="text-sm font-normal text-gray-200 md:text-base">
                                Connecting local artisans, traders, and businesses with residents.
                            </p>
                        </div>
                        <div className="z-10 mt-2 flex w-full max-w-[600px] flex-col">
                            <div className="flex w-full flex-col overflow-hidden rounded-lg shadow-xl sm:flex-row sm:items-stretch">
                                <div className="flex w-full items-center border-b border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5 sm:w-1/3 sm:border-b-0 sm:border-r sm:py-0">
                                    <MapPin className="mr-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium focus:ring-0 dark:text-white"
                                    >
                                        {locations.map((location) => (
                                            <option key={location} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative flex-1 bg-white dark:bg-white/5">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <Input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="Search for services, goods, or jobs..."
                                        className="h-12 border-none bg-transparent pl-12 pr-4 text-sm focus:ring-0 sm:h-14 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    className="flex h-12 w-full items-center justify-center gap-2 bg-[#13ec13] px-8 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f] sm:h-14 sm:w-auto"
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

