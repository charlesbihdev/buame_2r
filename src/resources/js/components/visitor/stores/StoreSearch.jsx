import { Search, SlidersHorizontal, X, Grid3X3, LayoutList, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';
import { usePage } from '@inertiajs/react';

export function StoreSearch({
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    filters,
    categoryCounts,
    onSearch,
    onFilterChange,
    onClearFilters,
    viewMode,
    setViewMode,
}) {
    const { marketplaceCategories = {} } = usePage().props;
    const [showFilters, setShowFilters] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');

    // Convert marketplaceCategories object to array
    const allCategories = useMemo(() => {
        return Object.entries(marketplaceCategories).map(([value, label]) => ({
            value,
            label,
        }));
    }, [marketplaceCategories]);

    // Filter categories based on search
    const filteredCategories = useMemo(() => {
        if (!categorySearch) return allCategories;
        return allCategories.filter(cat =>
            cat.label.toLowerCase().includes(categorySearch.toLowerCase())
        );
    }, [allCategories, categorySearch]);

    // Sorted categories for Quick Pills (by count desc)
    const quickCategories = useMemo(() => {
        return [...allCategories]
            .filter(cat => (categoryCounts?.[cat.value] || 0) > 0)
            .sort((a, b) => (categoryCounts?.[b.value] || 0) - (categoryCounts?.[a.value] || 0));
    }, [allCategories, categoryCounts]);

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'price_low', label: 'Price: Low to High' },
        { value: 'price_high', label: 'Price: High to Low' },
        { value: 'name', label: 'Name: A to Z' },
    ];

    const hasActiveFilters = filters?.category || filters?.sort || searchQuery || location;

    const handleCategorySelect = (value) => {
        onFilterChange('category', value);
        setShowFilters(false);
    };

    return (
        <div className="sticky top-[57px] z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-[var(--background-dark)]/95">
            <div className="mx-auto max-w-7xl px-4 py-4">
                {/* Search Bar */}
                <form onSubmit={onSearch} className="flex flex-col gap-3 md:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products in this store..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm transition-colors focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none dark:border-gray-700 dark:bg-[var(--card)] dark:text-white dark:focus:bg-[var(--card)]"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="relative flex-1 md:w-40 md:flex-none">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none dark:border-gray-700 dark:bg-[var(--card)] dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-[var(--primary-foreground)] transition-all hover:bg-[var(--buame-primary-dark)] hover:shadow-lg hover:shadow-[var(--primary)]/25"
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-all ${showFilters || hasActiveFilters
                                ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-white dark:text-white'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:bg-[var(--card)] dark:text-gray-400'
                                }`}
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="hidden sm:inline">Filters</span>
                            {hasActiveFilters && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-[var(--primary-foreground)]">
                                    !
                                </span>
                            )}
                        </button>
                    </div>
                </form>

                {/* Expandable Filters */}
                {showFilters && (
                    <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[var(--card)]">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                            {/* Categories */}
                            <div className="flex-1">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Categories</h3>
                                    <div className="relative w-48">
                                        <input
                                            type="text"
                                            placeholder="Find category..."
                                            value={categorySearch}
                                            onChange={(e) => setCategorySearch(e.target.value)}
                                            className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-8 pr-3 text-xs focus:border-[var(--primary)] focus:outline-none dark:border-gray-600 dark:bg-[var(--background-dark)] dark:text-gray-200"
                                        />
                                        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:border-gray-700 dark:bg-[var(--background-dark)] dark:scrollbar-thumb-gray-700">
                                    {filteredCategories.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
                                            {filteredCategories.map((cat) => {
                                                const count = categoryCounts?.[cat.value] || 0;
                                                const isActive = filters?.category === cat.value;
                                                return (
                                                    <button
                                                        key={cat.value}
                                                        onClick={() => handleCategorySelect(isActive ? null : cat.value)}
                                                        className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-all ${isActive
                                                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                                            }`}
                                                    >
                                                        <span className="truncate mr-2 flex items-center gap-2">
                                                            <span className="truncate">{cat.label}</span>
                                                        </span>
                                                        {count > 0 && (
                                                            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-xs ${isActive
                                                                ? 'bg-[var(--foreground)]/20 text-[var(--foreground)]'
                                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                                                }`}>
                                                                {count}
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No categories found matching "{categorySearch}"
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sort & View */}
                            <div className="flex flex-col gap-4 lg:w-64">
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Sort By</h3>
                                    <select
                                        value={filters?.sort != null ? String(filters.sort) : 'newest'}
                                        onChange={(e) => onFilterChange('sort', e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none dark:border-gray-700 dark:bg-[var(--background-dark)] dark:text-white"
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">View</h3>
                                    <div className="flex rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-[var(--background-dark)]">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${viewMode === 'grid'
                                                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            <Grid3X3 className="h-4 w-4" />
                                            Grid
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${viewMode === 'list'
                                                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            <LayoutList className="h-4 w-4" />
                                            List
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                                <button
                                    onClick={() => {
                                        onClearFilters();
                                        setShowFilters(false);
                                    }}
                                    className="flex items-center gap-2 text-sm font-medium text-red-600 transition-colors hover:text-red-700"
                                >
                                    <X className="h-4 w-4" />
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Quick Category Pills (shown when filters are closed) */}
                {!showFilters && (
                    <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        <span className="shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">Quick:</span>
                        {quickCategories.slice(0, 10).map((cat) => {
                            const count = categoryCounts?.[cat.value] || 0;
                            const isActive = filters?.category === cat.value;
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => onFilterChange('category', isActive ? null : cat.value)}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${isActive
                                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <span>{cat.label}</span>
                                    <span className="opacity-60">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
