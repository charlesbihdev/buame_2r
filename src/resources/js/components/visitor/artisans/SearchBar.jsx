import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

export function SearchBar({ searchQuery, setSearchQuery, location, setLocation, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-4 shadow-lg dark:bg-[#162816] md:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for carpenters, electricians..."
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
    );
}
