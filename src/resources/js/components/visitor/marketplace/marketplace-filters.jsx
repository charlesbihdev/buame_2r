import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';

export function MarketplaceFilters({ filters = {}, isMobile = false }) {
    const { marketplaceCategories = {} } = usePage().props;
    const categories = [
        { id: 'all', label: 'All Categories' },
        ...Object.entries(marketplaceCategories).map(([id, label]) => ({ id, label })),
    ];

    const conditions = [
        { id: 'all', label: 'All Conditions' },
        { id: 'new', label: 'New' },
        { id: 'like_new', label: 'Like New' },
        { id: 'used', label: 'Used' },
        { id: 'refurbished', label: 'Refurbished' },
    ];

    const [priceMin, setPriceMin] = useState(filters.price_min || '');
    const [priceMax, setPriceMax] = useState(filters.price_max || '');
    const [location, setLocation] = useState(filters.location || '');

    const updateFilter = useCallback((key, value) => {
        const params = new URLSearchParams(window.location.search);
        if (value === 'all' || value === '' || value === null) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        params.delete('page'); // Reset to first page when filter changes
        router.get('/marketplace', Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    const handlePriceFilter = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        if (priceMin) {
            params.set('price_min', priceMin);
        } else {
            params.delete('price_min');
        }
        if (priceMax) {
            params.set('price_max', priceMax);
        } else {
            params.delete('price_max');
        }
        params.delete('page');
        router.get('/marketplace', Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    }, [priceMin, priceMax]);

    const handleLocationFilter = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        if (location.trim()) {
            params.set('location', location.trim());
        } else {
            params.delete('location');
        }
        params.delete('page');
        router.get('/marketplace', Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    }, [location]);

    return (
        <aside className={`min-h-[calc(100vh-80px)] w-full shrink-0 flex-col gap-8 border-r border-[var(--buame-border-light)] bg-white p-6 dark:border-white/10 dark:bg-white/5 ${isMobile ? 'flex' : 'hidden lg:flex lg:w-80'}`}>
            {/* Active Filters Summary */}
            {(filters.category && filters.category !== 'all') ||
                filters.location ||
                filters.price_min ||
                filters.price_max ||
                (filters.condition && filters.condition !== 'all') ||
                filters.delivery_available ? (
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">Active Filters</h3>
                        <button onClick={() => router.get('/marketplace')} className="text-xs text-[var(--primary)] hover:underline">
                            Clear All
                        </button>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark grid grid-cols-1 overflow-hidden rounded-lg border border-[var(--buame-border-light)] dark:border-white/10">
                        {filters.category && filters.category !== 'all' && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                                <span className="text-sm font-medium capitalize dark:text-white">{filters.category}</span>
                            </div>
                        )}
                        {filters.location && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                                <span className="text-sm font-medium dark:text-white">{filters.location}</span>
                            </div>
                        )}
                        {(filters.price_min || filters.price_max) && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                                <span className="text-sm font-medium dark:text-white">
                                    ₵{filters.price_min || 0} - ₵{filters.price_max || '∞'}
                                </span>
                            </div>
                        )}
                        {filters.condition && filters.condition !== 'all' && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Condition</span>
                                <span className="text-sm font-medium capitalize dark:text-white">{filters.condition.replace('_', ' ')}</span>
                            </div>
                        )}
                        {filters.delivery_available && (
                            <div className="flex items-center justify-between p-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Delivery</span>
                                <span className="text-sm font-medium dark:text-white">Available</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            {/* Categories */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Categories</h3>
                <div className="flex flex-col gap-3">
                    {categories.map((category) => (
                        <Label key={category.id} className="group flex cursor-pointer items-center gap-3">
                            <Checkbox
                                checked={filters.category === category.id || (!filters.category && category.id === 'all')}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        updateFilter('category', category.id);
                                    }
                                }}
                                className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">
                                {category.label}
                            </span>
                        </Label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Price Range (₵)</h3>
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            onBlur={handlePriceFilter}
                            onKeyDown={(e) => e.key === 'Enter' && handlePriceFilter()}
                            className="h-9"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            onBlur={handlePriceFilter}
                            onKeyDown={(e) => e.key === 'Enter' && handlePriceFilter()}
                            className="h-9"
                        />
                    </div>
                </div>
            </div>

            {/* Condition Filter */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Condition</h3>
                <Select value={filters.condition || 'all'} onValueChange={(value) => updateFilter('condition', value)}>
                    <SelectTrigger className="h-10">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {conditions.map((condition) => (
                            <SelectItem key={condition.id} value={condition.id}>
                                {condition.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Location Filter */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Location</h3>
                <Input
                    type="text"
                    placeholder="e.g., Western North, Bibiani"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onBlur={handleLocationFilter}
                    onKeyDown={(e) => e.key === 'Enter' && handleLocationFilter()}
                    className="h-10"
                />
            </div>

            {/* Delivery Available */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Delivery</h3>
                <Label className="group flex cursor-pointer items-center gap-3">
                    <Checkbox
                        checked={filters.delivery_available === '1'}
                        onCheckedChange={(checked) => updateFilter('delivery_available', checked ? '1' : '')}
                        className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                    />
                    <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">Delivery Available</span>
                </Label>
            </div>
        </aside>
    );
}
