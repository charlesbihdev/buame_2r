import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { router } from '@inertiajs/react';
import { useCallback, useState } from 'react';

export function JobsFilters({ filters = {}, baseRoute = '/jobs', routeParams = {} }) {
    const jobTypes = [
        { id: 'full_time', label: 'Full Time' },
        { id: 'part_time', label: 'Part Time' },
        { id: 'contract', label: 'Contract' },
        { id: 'internship', label: 'Internship' },
        { id: 'daily_wage', label: 'Daily Wage' },
        { id: 'apprenticeship', label: 'Apprenticeship' },
    ];

    const jobCategories = [
        { id: 'construction_trades', label: 'Construction & Trades' },
        { id: 'home_services', label: 'Home Services' },
        { id: 'auto_mechanical', label: 'Auto & Mechanical' },
        { id: 'transport_equipment', label: 'Transport & Equipment' },
        { id: 'electrical_electronics', label: 'Electrical & Electronics' },
        { id: 'ict_digital', label: 'ICT & Digital' },
        { id: 'business_office', label: 'Business & Office' },
        { id: 'education_training', label: 'Education & Training' },
        { id: 'health_care', label: 'Health & Care' },
        { id: 'hospitality_events', label: 'Hospitality & Events' },
        { id: 'fashion_beauty', label: 'Fashion & Beauty' },
        { id: 'agriculture', label: 'Agriculture' },
        { id: 'security', label: 'Security' },
        { id: 'media_creative', label: 'Media & Creative' },
        { id: 'general_jobs', label: 'General Jobs' },
    ];

    const datePostedOptions = [
        { id: '0', label: 'Any time' },
        { id: '1', label: 'Last 24 hours' },
        { id: '7', label: 'Last 7 days' },
        { id: '14', label: 'Last 2 weeks' },
        { id: '30', label: 'Last 30 days' },
    ];

    const salaryRanges = [
        { id: '0-1000', label: 'Below GH₵ 1,000' },
        { id: '1000-2000', label: 'GH₵ 1,000 - 2,000' },
        { id: '2000-3000', label: 'GH₵ 2,000 - 3,000' },
        { id: '3000-5000', label: 'GH₵ 3,000 - 5,000' },
        { id: '5000-10000', label: 'GH₵ 5,000 - 10,000' },
        { id: '10000+', label: 'Above GH₵ 10,000' },
    ];

    const [location, setLocation] = useState(filters.location || '');

    const activeSalaries = Array.isArray(filters.salary)
        ? filters.salary
        : (filters.salary && filters.salary !== ''
            ? (filters.salary.includes(',') ? filters.salary.split(',').map(s => s.trim()) : [filters.salary])
            : []);

    const updateFilter = useCallback((key, value) => {
        const params = new URLSearchParams(window.location.search);
        if (value === 'all' || value === '' || value === null) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        params.delete('page'); // Reset to first page when filter changes
        router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [baseRoute, routeParams]);

    const handleLocationFilter = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        if (location.trim()) {
            params.set('location', location.trim());
        } else {
            params.delete('location');
        }
        params.delete('page');
        router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [location, baseRoute, routeParams]);

    const activeTypes = Array.isArray(filters.type) 
        ? filters.type 
        : (filters.type && filters.type !== 'all' 
            ? (filters.type.includes(',') ? filters.type.split(',').map(t => t.trim()) : [filters.type])
            : []);
    const activeCategories = Array.isArray(filters.category) 
        ? filters.category 
        : (filters.category && filters.category !== 'all' 
            ? (filters.category.includes(',') ? filters.category.split(',').map(c => c.trim()) : [filters.category])
            : []);

    return (
        <aside className="hidden min-h-[calc(100vh-80px)] w-80 shrink-0 flex-col gap-8 border-r border-[var(--buame-border-light)] bg-white p-6 lg:flex dark:border-white/10 dark:bg-white/5">
            {/* Active Filters Summary */}
            {(activeTypes.length > 0 ||
                activeCategories.length > 0 ||
                filters.location ||
                activeSalaries.length > 0 ||
                filters.urgent ||
                (filters.date_posted && filters.date_posted !== '0')) && (
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">Active Filters</h3>
                        <button onClick={() => router.get(baseRoute, routeParams)} className="text-xs text-[var(--primary)] hover:underline">
                            Clear All
                        </button>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark grid grid-cols-1 overflow-hidden rounded-lg border border-[var(--buame-border-light)] dark:border-white/10">
                        {activeTypes.length > 0 && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
                                <span className="text-sm font-medium dark:text-white">{activeTypes.join(', ')}</span>
                            </div>
                        )}
                        {activeCategories.length > 0 && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                                <span className="text-sm font-medium capitalize dark:text-white">{activeCategories.join(', ')}</span>
                            </div>
                        )}
                        {filters.location && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                                <span className="text-sm font-medium dark:text-white">{filters.location}</span>
                            </div>
                        )}
                        {activeSalaries.length > 0 && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Salary</span>
                                <span className="text-sm font-medium dark:text-white">
                                    {activeSalaries.map(s => salaryRanges.find(r => r.id === s)?.label || s).join(', ')}
                                </span>
                            </div>
                        )}
                        {filters.date_posted && filters.date_posted !== '0' && (
                            <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Date Posted</span>
                                <span className="text-sm font-medium dark:text-white">
                                    {datePostedOptions.find((o) => o.id === filters.date_posted)?.label || filters.date_posted}
                                </span>
                            </div>
                        )}
                        {filters.urgent && (
                            <div className="flex items-center justify-between p-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Urgent</span>
                                <span className="text-sm font-medium dark:text-white">Yes</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Date Posted Filter */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Date Posted</h3>
                <RadioGroup
                    value={filters.date_posted || '0'}
                    onValueChange={(value) => updateFilter('date_posted', value === '0' ? '' : value)}
                    className="flex flex-col gap-3"
                >
                    {datePostedOptions.map((option) => (
                        <Label key={option.id} className="group flex cursor-pointer items-center gap-3">
                            <RadioGroupItem
                                value={option.id}
                                className="border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">
                                {option.label}
                            </span>
                        </Label>
                    ))}
                </RadioGroup>
            </div>

            {/* Salary Range Filter */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Salary Range</h3>
                <div className="flex flex-col gap-3">
                    {salaryRanges.map((range) => {
                        const isChecked = activeSalaries.includes(range.id);
                        return (
                            <Label key={range.id} className="group flex cursor-pointer items-center gap-3">
                                <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                        const params = new URLSearchParams(window.location.search);
                                        let newSalaries;
                                        if (checked) {
                                            newSalaries = [...activeSalaries, range.id];
                                        } else {
                                            newSalaries = activeSalaries.filter((s) => s !== range.id);
                                        }
                                        if (newSalaries.length === 0) {
                                            params.delete('salary');
                                        } else {
                                            params.set('salary', newSalaries.join(','));
                                        }
                                        params.delete('page');
                                        router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                    className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                                />
                                <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">
                                    {range.label}
                                </span>
                            </Label>
                        );
                    })}
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Category</h3>
                <div className="flex flex-col gap-3">
                    {jobCategories.map((category) => {
                        const isChecked = activeCategories.includes(category.id);
                        return (
                            <Label key={category.id} className="group flex cursor-pointer items-center gap-3">
                                <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                        const params = new URLSearchParams(window.location.search);
                                        const currentCategories = activeCategories;
                                        let newCategories;
                                        if (checked) {
                                            newCategories = [...currentCategories, category.id];
                                        } else {
                                            newCategories = currentCategories.filter((c) => c !== category.id);
                                        }
                                        if (newCategories.length === 0) {
                                            params.delete('category');
                                        } else {
                                            params.set('category', newCategories.join(','));
                                        }
                                        params.delete('page');
                                        router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                    className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                                />
                                <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">
                                    {category.label}
                                </span>
                            </Label>
                        );
                    })}
                </div>
            </div>

            {/* Job Types */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Job Type</h3>
                <div className="flex flex-col gap-3">
                    {jobTypes.map((type) => {
                        const isChecked = activeTypes.includes(type.id);
                        return (
                            <Label key={type.id} className="group flex cursor-pointer items-center gap-3">
                                <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                        const params = new URLSearchParams(window.location.search);
                                        const currentTypes = activeTypes;
                                        let newTypes;
                                        if (checked) {
                                            newTypes = [...currentTypes, type.id];
                                        } else {
                                            newTypes = currentTypes.filter((t) => t !== type.id);
                                        }
                                        if (newTypes.length === 0) {
                                            params.delete('type');
                                        } else {
                                            params.set('type', newTypes.join(','));
                                        }
                                        params.delete('page');
                                        router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                    className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                                />
                                <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">
                                    {type.label}
                                </span>
                            </Label>
                        );
                    })}
                </div>
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

            {/* Urgent Only */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Urgent Jobs</h3>
                <Label className="group flex cursor-pointer items-center gap-3">
                    <Checkbox
                        checked={filters.urgent === '1'}
                        onCheckedChange={(checked) => updateFilter('urgent', checked ? '1' : '')}
                        className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                    />
                    <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">Urgent Only</span>
                </Label>
            </div>
        </aside>
    );
}
