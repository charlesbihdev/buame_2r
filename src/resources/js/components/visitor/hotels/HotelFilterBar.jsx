import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function HotelFilterBar({ filters, totalCount, onFilterChange, onClearFilters }) {
    const hasActiveFilters = filters?.type || (filters?.sort && filters.sort !== 'rating');

    return (
        <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="font-semibold text-foreground">Filter by:</span>

            {/* Hotel Type Filter */}
            <select
                value={filters?.type || 'all'}
                onChange={(e) => onFilterChange('type', e.target.value)}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground focus:border-primary focus:ring-primary"
            >
                <option value="all">All Types</option>
                <option value="hotel">Hotel</option>
                <option value="guest_house">Guest House</option>
                <option value="lodge">Lodge</option>
                <option value="short_stay">Short Stay</option>
            </select>

            {/* Sort Filter */}
            <select
                value={filters?.sort || 'rating'}
                onChange={(e) => onFilterChange('sort', e.target.value)}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground focus:border-primary focus:ring-primary"
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
            <div className="ml-auto text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{totalCount}</span> hotels found
            </div>
        </div>
    );
}











