import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function RentalFilterBar({ filters, totalCount, onFilterChange, onClearFilters }) {
    const hasActiveFilters = filters?.type || (filters?.sort && filters.sort !== 'newest');

    const getTypeLabel = (type) => {
        const labels = {
            house: 'House',
            equipment: 'Equipment',
            tools: 'Tools',
            land: 'Land',
            commercial: 'Commercial',
            vehicle: 'Vehicle',
            store: 'Store',
        };
        return labels[type] || type;
    };

    return (
        <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Filter by:</span>

            {/* Rental Type Filter */}
            <select
                value={filters?.type != null ? String(filters.type) : 'all'}
                onChange={(e) => onFilterChange('type', e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
            >
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="equipment">Equipment</option>
                <option value="tools">Tools</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
                <option value="vehicle">Vehicle</option>
                <option value="store">Store</option>
            </select>

            {/* Sort Filter */}
            <select
                value={filters?.sort != null ? String(filters.sort) : 'newest'}
                onChange={(e) => onFilterChange('sort', e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
            >
                <option value="newest">Sort: Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="top_rated">Most Viewed</option>
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
                <Button onClick={onClearFilters} variant="outline" size="sm" className="gap-1 text-xs">
                    <X className="h-3 w-3" />
                    Clear Filters
                </Button>
            )}

            {/* Results Count */}
            <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold text-[var(--foreground)] dark:text-white">{totalCount}</span> rentals found
            </div>
        </div>
    );
}




