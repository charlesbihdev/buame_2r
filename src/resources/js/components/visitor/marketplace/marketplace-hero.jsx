import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export function MarketplaceHero() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim());
        }
        if (location.trim()) {
            params.set('location', location.trim());
        }
        const queryString = params.toString();
        if (queryString) {
            window.location.href = `/marketplace?${queryString}`;
        } else {
            window.location.href = '/marketplace';
        }
    };

    return (
        <div className="w-full border-b border-[var(--buame-border-light)] bg-white dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto max-w-[1440px]">
                <div className="p-4 @[480px]:p-6">
                    <div
                        className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-8 py-12"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url(/assets/visitors/bekwai.jpg)',
                        }}
                    >
                        <div className="z-10 flex max-w-2xl flex-col gap-3 text-center">
                            <h1 className="text-3xl leading-tight font-black tracking-[-0.033em] text-white md:text-5xl">Find what you need</h1>
                            <p className="text-sm font-normal text-gray-200 md:text-base">
                                Connecting local artisans, traders, and businesses with residents.
                            </p>
                        </div>
                        <div className="z-10 mt-2 flex w-full max-w-[600px] flex-col">
                            <div className="flex w-full flex-col overflow-hidden rounded-lg shadow-xl sm:flex-row sm:items-stretch">
                                <div className="relative flex w-full items-center border-b border-gray-200 bg-white px-4 py-3 sm:w-1/3 sm:border-r sm:border-b-0 sm:py-0 dark:border-white/10 dark:bg-white/5">
                                    <MapPin className="absolute left-4 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="Location (e.g., Western North)"
                                        className="h-12 border-none bg-transparent pr-4 pl-12 text-sm placeholder:text-gray-400 focus:ring-0 sm:h-14 dark:text-white"
                                    />
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
                                        className="h-12 border-none bg-transparent pr-4 pl-12 text-sm placeholder:text-gray-400 focus:ring-0 sm:h-14 dark:text-white"
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    className="flex h-12 w-full items-center justify-center gap-2 bg-[var(--primary)] px-8 font-bold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--buame-primary-dark)] sm:h-14 sm:w-auto"
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
