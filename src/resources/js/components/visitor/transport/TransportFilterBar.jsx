import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function TransportFilterBar({ filters, totalCount, onFilterChange, onClearFilters }) {
    const hasActiveFilters = filters?.type || (filters?.sort && filters.sort !== 'rating');

    return (
        <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Filter by:</span>

            {/* Transport Type Filter */}
            <select
                value={filters?.type || 'all'}
                onChange={(e) => onFilterChange('type', e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
            >
                <option value="all">All Types</option>
                <option value="okada">Okada</option>
                <option value="car">Car</option>
                <option value="taxi">Taxi</option>
                <option value="bus">Bus</option>
                <option value="cargo">Cargo</option>
                <option value="other">Other</option>
            </select>

            {/* Sort Filter */}
            <select
                value={filters?.sort || 'rating'}
                onChange={(e) => onFilterChange('sort', e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
            >
                <option value="rating">Sort: Top Rated</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
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
                <span className="font-bold text-[var(--foreground)] dark:text-white">{totalCount}</span> rides found
            </div>
        </div>
    );
}
