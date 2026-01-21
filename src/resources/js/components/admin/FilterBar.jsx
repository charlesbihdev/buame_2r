import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

export function FilterBar({ filters = [], searchPlaceholder = 'Search...', currentFilters = {}, className = '' }) {
    const [search, setSearch] = useState(currentFilters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const handleFilterChange = (key, value) => {
        applyFilters({ [key]: value === 'all' ? '' : value });
    };

    const applyFilters = (newFilters) => {
        const mergedFilters = { ...currentFilters, ...newFilters };
        // Remove empty values
        Object.keys(mergedFilters).forEach((key) => {
            if (!mergedFilters[key]) {
                delete mergedFilters[key];
            }
        });
        router.get(window.location.pathname, mergedFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get(window.location.pathname, {}, { preserveState: true });
        setSearch('');
    };

    const hasActiveFilters = Object.keys(currentFilters).some((key) => currentFilters[key]);

    return (
        <div className={`mb-6 flex flex-wrap items-center gap-4 ${className}`}>
            <form onSubmit={handleSearch} className="flex min-w-[200px] flex-1 gap-2">
                <div className="relative flex-1">
                    <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={searchPlaceholder} className="pl-9" />
                </div>
                <Button type="submit" variant="secondary">
                    Search
                </Button>
            </form>

            {filters.map((filter) => (
                <Select key={filter.key} value={currentFilters[filter.key] || 'all'} onValueChange={(value) => handleFilterChange(filter.key, value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={filter.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All {filter.label}</SelectItem>
                        {filter.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}

            {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Clear
                </Button>
            )}
        </div>
    );
}
