import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Filter, Grid3x3, List } from 'lucide-react';

export function MarketplaceToolbar({ filters = {}, pagination = {}, onFilterToggle }) {
    const quickFilters = [
        { name: 'All', category: 'all', icon: Grid3x3 },
        { name: 'Electronics', category: 'electronics', icon: Grid3x3 },
        { name: 'Furniture', category: 'furniture', icon: Grid3x3 },
        { name: 'Food', category: 'food', icon: Grid3x3 },
        { name: 'Agriculture', category: 'agriculture', icon: Grid3x3 },
        { name: 'Clothes', category: 'clothes', icon: Grid3x3 },
    ];

    const handleCategoryClick = (category) => {
        const params = new URLSearchParams(window.location.search);
        if (category === 'all') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        params.delete('page');
        router.get('/marketplace', Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSortChange = (sort) => {
        const params = new URLSearchParams(window.location.search);
        params.set('sort', sort);
        params.delete('page');
        router.get('/marketplace', Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const activeCategory = filters.category || 'all';

    return (
        <>
            {/* Quick Filters Chips */}
            <div className="scrollbar-hide mb-6 flex gap-3 overflow-x-auto pb-2">
                {quickFilters.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = activeCategory === filter.category;
                    return (
                        <Button
                            key={filter.name}
                            variant={isActive ? 'default' : 'outline'}
                            onClick={() => handleCategoryClick(filter.category)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 text-sm font-bold shadow-sm transition-shadow ${
                                isActive
                                    ? 'bg-[#13ec13] text-[#0d1b0d] hover:shadow-md'
                                    : 'border border-[#e7f3e7] bg-white hover:border-[#13ec13]/50 dark:border-white/20 dark:bg-white/5 dark:text-white'
                            }`}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{filter.name}</span>
                        </Button>
                    );
                })}
            </div>

            {/* Results Toolbar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {pagination.total ? (
                        <>
                            Showing <span className="font-bold text-[#0d1b0d] dark:text-white">{pagination.from || 0}</span> -{' '}
                            <span className="font-bold text-[#0d1b0d] dark:text-white">{pagination.to || 0}</span> of{' '}
                            <span className="font-bold text-[#0d1b0d] dark:text-white">{pagination.total}</span> results
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
                        className="flex size-10 items-center justify-center rounded-lg border border-[#e7f3e7] bg-white lg:hidden dark:border-white/10 dark:bg-white/5"
                    >
                        <Filter className="h-5 w-5" />
                    </Button>
                    {/* Sort Select */}
                    <Select value={filters.sort || 'recommended'} onValueChange={handleSortChange}>
                        <SelectTrigger className="h-10 cursor-pointer rounded-lg border border-[#e7f3e7] bg-white pr-8 pl-3 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-white/10 dark:bg-white/5 dark:text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* View Toggle */}
                    <div className="flex rounded-lg border border-[#e7f3e7] bg-white p-1 dark:border-white/10 dark:bg-white/5">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="flex size-8 items-center justify-center rounded bg-[#13ec13]/20 text-[#13ec13]"
                        >
                            <Grid3x3 className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="flex size-8 items-center justify-center rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <List className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
