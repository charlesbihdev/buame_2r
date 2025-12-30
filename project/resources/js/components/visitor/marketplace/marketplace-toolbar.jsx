import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid3x3, List, Filter } from 'lucide-react';

export function MarketplaceToolbar() {
    const quickFilters = [
        { name: 'All', icon: Grid3x3, active: true },
        { name: 'Electronics', icon: Grid3x3 },
        { name: 'Furniture', icon: Grid3x3 },
        { name: 'Food', icon: Grid3x3 },
        { name: 'Agriculture', icon: Grid3x3 },
        { name: 'Clothes', icon: Grid3x3 },
    ];

    return (
        <>
            {/* Quick Filters Chips */}
            <div className="mb-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {quickFilters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                        <Button
                            key={filter.name}
                            variant={filter.active ? 'default' : 'outline'}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 text-sm font-bold shadow-sm transition-shadow ${
                                filter.active
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
                    Showing <span className="font-bold text-[#0d1b0d] dark:text-white">124</span> results in Sefwi Bekwai
                </p>
                <div className="flex w-full items-center gap-3 sm:w-auto">
                    {/* Mobile Filter Toggle */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="flex size-10 items-center justify-center rounded-lg border border-[#e7f3e7] bg-white dark:border-white/10 dark:bg-white/5 lg:hidden"
                    >
                        <Filter className="h-5 w-5" />
                    </Button>
                    {/* Sort Select */}
                    <Select defaultValue="recommended">
                        <SelectTrigger className="h-10 cursor-pointer rounded-lg border border-[#e7f3e7] bg-white pl-3 pr-8 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-white/10 dark:bg-white/5 dark:text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="newest">Newest First</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* View Toggle */}
                    <div className="flex rounded-lg border border-[#e7f3e7] bg-white p-1 dark:border-white/10 dark:bg-white/5">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 flex items-center justify-center rounded bg-[#13ec13]/20 text-[#13ec13]"
                        >
                            <Grid3x3 className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <List className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

