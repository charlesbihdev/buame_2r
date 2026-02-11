import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { SlidersHorizontal } from 'lucide-react';

export function JobsToolbar({ filters = {}, pagination = {}, onFilterToggle }) {
    const handleSortChange = (sort) => {
        const params = new URLSearchParams(window.location.search);
        params.set('sort', sort);
        params.delete('page');
        router.get('/jobs', Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Count active filters for badge
    const activeTypes = filters.type && filters.type !== 'all' ? (filters.type.includes(',') ? filters.type.split(',') : [filters.type]) : [];
    const activeCategories = filters.category && filters.category !== 'all' ? (filters.category.includes(',') ? filters.category.split(',') : [filters.category]) : [];
    const activeSubCategories = filters.sub_category ? (filters.sub_category.includes(',') ? filters.sub_category.split(',') : [filters.sub_category]) : [];
    const activeSalaries = filters.salary ? (filters.salary.includes(',') ? filters.salary.split(',') : [filters.salary]) : [];
    const filterCount = activeTypes.length + activeCategories.length + activeSubCategories.length +
        activeSalaries.length + (filters.location ? 1 : 0) + (filters.urgent ? 1 : 0) +
        (filters.date_posted && filters.date_posted !== '0' ? 1 : 0);

    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {pagination.total ? (
                    <>
                        Showing <span className="font-bold text-[var(--foreground)] dark:text-white">{pagination.from || 0}</span> -{' '}
                        <span className="font-bold text-[var(--foreground)] dark:text-white">{pagination.to || 0}</span> of{' '}
                        <span className="font-bold text-[var(--foreground)] dark:text-white">{pagination.total}</span> results
                    </>
                ) : (
                    'No results found'
                )}
            </p>
            <div className="flex w-full items-center gap-3 sm:w-auto">
                {/* Mobile Filter Toggle */}
                <button
                    onClick={onFilterToggle}
                    className="relative flex h-10 items-center gap-2 rounded-lg border border-[var(--buame-border-light)] bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--primary)] lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                    {filterCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1.5 text-[10px] font-bold text-white">
                            {filterCount}
                        </span>
                    )}
                </button>
                {/* Sort Select */}
                <Select value={filters.sort || 'newest'} onValueChange={handleSortChange}>
                    <SelectTrigger className="h-10 cursor-pointer rounded-lg border border-[var(--buame-border-light)] bg-white pr-8 pl-3 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-white/10 dark:bg-white/5 dark:text-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="urgent_first">Urgent First</SelectItem>
                        <SelectItem value="salary_high">Salary: High to Low</SelectItem>
                        <SelectItem value="salary_low">Salary: Low to High</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
