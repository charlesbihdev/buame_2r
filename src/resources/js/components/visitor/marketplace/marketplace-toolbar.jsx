import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Filter, Grid3x3, List } from 'lucide-react';

export function MarketplaceToolbar({ filters = {}, pagination = {}, onFilterToggle }) {
    const quickFilters = [
        { name: 'All', category: 'all', icon: Grid3x3 },
        { name: 'Phones', category: 'mobile_phones', icon: Grid3x3 },
        { name: 'Computers', category: 'computers', icon: Grid3x3 },
        { name: 'Electronics', category: 'electronics', icon: Grid3x3 },
        { name: 'Furniture', category: 'home_living', icon: Grid3x3 },
        { name: 'Fashion', category: 'fashion', icon: Grid3x3 },
        { name: 'Automotive', category: 'automotive', icon: Grid3x3 },
        { name: 'Others', category: 'others', icon: Grid3x3 },
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
                                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:shadow-md'
                                    : 'border border-[var(--buame-border-light)] bg-white hover:border-[var(--primary)]/50'
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
                <p className="text-sm font-medium text-gray-500">
                    {pagination.total ? (
                        <>
                            Showing <span className="font-bold text-[var(--foreground)]">{pagination.from || 0}</span> -{' '}
                            <span className="font-bold text-[var(--foreground)]">{pagination.to || 0}</span> of{' '}
                            <span className="font-bold text-[var(--foreground)]">{pagination.total}</span> results
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
                        className="flex size-10 items-center justify-center rounded-lg border border-[var(--buame-border-light)] bg-white lg:hidden"
                    >
                        <Filter className="h-5 w-5" />
                    </Button>
                    {/* Sort Select */}
                    <Select value={filters.sort || 'recommended'} onValueChange={handleSortChange}>
                        <SelectTrigger className="h-10 cursor-pointer rounded-lg border border-[var(--buame-border-light)] bg-white pr-8 pl-3 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)]">
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
                    <div className="flex rounded-lg border border-[var(--buame-border-light)] bg-white p-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="flex size-8 items-center justify-center rounded bg-[var(--primary)]/20 text-[var(--primary)]"
                        >
                            <Grid3x3 className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="flex size-8 items-center justify-center rounded text-gray-400 hover:text-gray-600"
                        >
                            <List className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
