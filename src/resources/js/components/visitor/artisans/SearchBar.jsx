import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

export function SearchBar({ searchQuery, setSearchQuery, location, setLocation, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-4 shadow-lg md:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 px-4 py-3">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for carpenters, electricians..."
                    className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
                />
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 md:w-48">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
                />
            </div>
            <Button type="submit" className="h-12 bg-[var(--primary)] px-8 font-bold text-white hover:bg-[var(--primary)]">
                Search
            </Button>
        </form>
    );
}
