import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function FilterBar({ filters, totalCount, onFilterChange, onClearFilters }) {
    const hasActiveFilters = filters?.skill_type || filters?.experience_level || (filters?.sort && filters.sort !== 'rating');

    return (
        <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Filter by:</span>

            {/* Skill Type Filter */}
            <select
                value={filters?.skill_type || 'all'}
                onChange={(e) => onFilterChange('skill_type', e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
            >
                <option value="all">All Skills</option>
                <option value="carpenter">Carpenter</option>
                <option value="mason">Mason</option>
                <option value="electrician">Electrician</option>
                <option value="plumber">Plumber</option>
                <option value="tiler">Tiler</option>
                <option value="tailor">Tailor</option>
                <option value="welder">Welder</option>
                <option value="painter">Painter</option>
                <option value="hairdressing">Hairdressing</option>
                <option value="mechanic">Mechanic</option>
                <option value="bakery">Bakery</option>
                <option value="decoration">Decoration</option>
                <option value="makeup_artistry">Makeup Artistry</option>
                <option value="bead_making">Bead Making</option>
                <option value="shoe_making">Shoe Making</option>
                <option value="event_mc">Event MC</option>
                <option value="event_planners">Event Planners</option>
                <option value="graphics_designer">Graphics Designer</option>
                <option value="radio_presenter">Radio Presenter</option>
                <option value="drivers">Drivers</option>
                <option value="borehole_drillers">Borehole Drillers</option>
                <option value="printer_repairers">Printer Repairers</option>
                <option value="tv_decoder_repairers">TV & Decoder Repairers</option>
                <option value="air_conditioning_installers">Air-Conditioning Installers</option>
                <option value="multi_tv_dstv_installers">Multi TV, DStv Installers</option>
                <option value="phone_repairers">Phone Repairers</option>
                <option value="other">Other</option>
            </select>

            {/* Experience Level Filter */}
            <select
                value={filters?.experience_level || 'all'}
                onChange={(e) => onFilterChange('experience_level', e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
            >
                <option value="all">All Experience Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
            </select>

            {/* Sort Filter */}
            <select
                value={filters?.sort || 'rating'}
                onChange={(e) => onFilterChange('sort', e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
            >
                <option value="rating">Sort: Top Rated</option>
                <option value="experience">Most Experienced</option>
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
                <span className="font-bold text-[var(--foreground)] dark:text-white">{totalCount}</span> artisans found
            </div>
        </div>
    );
}
