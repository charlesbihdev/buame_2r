import { artisanSkills } from '@/config/artisan-skills';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function FilterBar({ filters, totalCount, onFilterChange, onClearFilters }) {
    const skillTypes = [
        { value: 'all', label: 'All Skills' },
        ...artisanSkills.map(skill => ({
            value: skill.id,
            label: skill.label
        })).sort((a, b) => a.label.localeCompare(b.label))
    ];
    const hasActiveFilters = filters?.skill_type || filters?.experience_level || (filters?.sort && filters.sort !== 'rating');

    return (
        <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Filter by:</span>

            {/* Skill Type Filter */}
            <select
                value={filters?.skill_type != null ? String(filters.skill_type) : 'all'}
                onChange={(e) => onFilterChange('skill_type', e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
            >
                {skillTypes.map((skill) => (
                    <option key={skill.value} value={skill.value}>
                        {skill.label}
                    </option>
                ))}
            </select>

            {/* Experience Level Filter */}
            <select
                value={filters?.experience_level != null ? String(filters.experience_level) : 'all'}
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
                value={filters?.sort != null ? String(filters.sort) : 'rating'}
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
