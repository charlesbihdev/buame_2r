import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Filter } from 'lucide-react';

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

    return (
        <>
            {/* Results Toolbar */}
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
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onFilterToggle}
                        className="flex size-10 items-center justify-center rounded-lg border border-[var(--buame-border-light)] bg-white lg:hidden dark:border-white/10 dark:bg-white/5"
                    >
                        <Filter className="h-5 w-5" />
                    </Button>
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
        </>
    );
}
