import { jobCategories } from '@/config/job-categories';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { router } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import {
    Briefcase,
    MapPin,
    Wallet,
    Clock,
    Zap,
    ChevronDown,
    X,
    Layers,
    SlidersHorizontal,
} from 'lucide-react';

export function JobsFilters({ filters = {}, baseRoute = '/jobs', routeParams = {}, isMobile = false, onClose }) {
    const jobTypes = [
        { id: 'full_time', label: 'Full Time', color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
        { id: 'part_time', label: 'Part Time', color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
        { id: 'contract', label: 'Contract', color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
        { id: 'internship', label: 'Internship', color: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
        { id: 'daily_wage', label: 'Daily Wage', color: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
        { id: 'apprenticeship', label: 'Apprenticeship', color: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
    ];

    const [expandedCategories, setExpandedCategories] = useState(() => {
        const activeSubCats = filters.sub_category ? (filters.sub_category.includes(',') ? filters.sub_category.split(',') : [filters.sub_category]) : [];
        const initialState = {};
        jobCategories.forEach(cat => {
            if (cat.subRoles && cat.subRoles.some(role => activeSubCats.includes(role.id))) {
                initialState[cat.id] = true;
            }
        });
        return initialState;
    });

    // Track which filter sections are open (all open by default on desktop, collapsed on mobile)
    const [openSections, setOpenSections] = useState({
        category: true,
        location: true,
        salary: !isMobile,
        type: !isMobile,
        date: !isMobile,
        urgent: !isMobile,
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

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
        params.delete('page');
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

    const activeSubCategories = Array.isArray(filters.sub_category)
        ? filters.sub_category
        : (filters.sub_category && filters.sub_category !== ''
            ? (filters.sub_category.includes(',') ? filters.sub_category.split(',').map(c => c.trim()) : [filters.sub_category])
            : []);

    // Remove a specific filter chip
    const removeFilter = useCallback((key, valueToRemove) => {
        const params = new URLSearchParams(window.location.search);

        if (key === 'category') {
            const newCategories = activeCategories.filter(c => c !== valueToRemove);
            if (newCategories.length === 0) {
                params.delete('category');
            } else {
                params.set('category', newCategories.join(','));
            }
            // Also remove sub-categories of this category
            const cat = jobCategories.find(c => c.id === valueToRemove);
            if (cat?.subRoles) {
                const subIds = cat.subRoles.map(r => r.id);
                const newSubs = activeSubCategories.filter(id => !subIds.includes(id));
                if (newSubs.length === 0) params.delete('sub_category');
                else params.set('sub_category', newSubs.join(','));
            }
        } else if (key === 'sub_category') {
            const newSubs = activeSubCategories.filter(s => s !== valueToRemove);
            if (newSubs.length === 0) params.delete('sub_category');
            else params.set('sub_category', newSubs.join(','));
        } else if (key === 'type') {
            const newTypes = activeTypes.filter(t => t !== valueToRemove);
            if (newTypes.length === 0) params.delete('type');
            else params.set('type', newTypes.join(','));
        } else if (key === 'salary') {
            const newSalaries = activeSalaries.filter(s => s !== valueToRemove);
            if (newSalaries.length === 0) params.delete('salary');
            else params.set('salary', newSalaries.join(','));
        } else {
            params.delete(key);
        }

        params.delete('page');
        router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [activeCategories, activeSubCategories, activeTypes, activeSalaries, baseRoute, routeParams]);

    // Get label helpers
    const getCategoryLabel = (id) => jobCategories.find(c => c.id === id)?.label || id;
    const getSubCategoryLabel = (id) => {
        for (const cat of jobCategories) {
            const sub = cat.subRoles?.find(r => r.id === id);
            if (sub) return sub.label;
        }
        return id;
    };
    const getTypeLabel = (id) => jobTypes.find(t => t.id === id)?.label || id;
    const getSalaryLabel = (id) => salaryRanges.find(r => r.id === id)?.label || id;

    const hasActiveFilters = activeTypes.length > 0 ||
        activeCategories.length > 0 ||
        activeSubCategories.length > 0 ||
        filters.location ||
        activeSalaries.length > 0 ||
        filters.urgent ||
        (filters.date_posted && filters.date_posted !== '0');

    const activeFilterCount = activeTypes.length + activeCategories.length + activeSubCategories.length +
        (filters.location ? 1 : 0) + activeSalaries.length + (filters.urgent ? 1 : 0) +
        (filters.date_posted && filters.date_posted !== '0' ? 1 : 0);

    // Section header component
    const SectionHeader = ({ icon: Icon, title, section, count = 0 }) => (
        <button
            onClick={() => toggleSection(section)}
            className="group flex w-full items-center justify-between py-2"
        >
            <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] dark:bg-white/10 dark:text-gray-400">
                    <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</span>
                {count > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1.5 text-[10px] font-bold text-white">
                        {count}
                    </span>
                )}
            </div>
            <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${openSections[section] ? 'rotate-180' : ''}`}
            />
        </button>
    );

    return (
        <aside className={`w-full shrink-0 flex-col bg-white dark:bg-white/5 ${isMobile ? 'flex h-full' : 'hidden lg:flex lg:w-80 lg:min-h-[calc(100vh-80px)] lg:border-r lg:border-[var(--buame-border-light)] dark:lg:border-white/10'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/10 ${isMobile ? '' : ''}`}>
                <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="h-4.5 w-4.5 text-[var(--primary)]" />
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">Filters</h2>
                    {activeFilterCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1.5 text-[10px] font-bold text-white">
                            {activeFilterCount}
                        </span>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={() => router.get(baseRoute, routeParams)}
                        className="rounded-md px-2.5 py-1 text-xs font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/10"
                    >
                        Clear all
                    </button>
                )}
                {isMobile && onClose && (
                    <button onClick={onClose} className="ml-2 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10">
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            <div className={`flex-1 overflow-y-auto ${isMobile ? 'pb-24' : ''}`}>
                {/* Active Filter Chips */}
                {hasActiveFilters && (
                    <div className="border-b border-gray-100 px-5 py-3 dark:border-white/10">
                        <div className="flex flex-wrap gap-1.5">
                            {activeCategories.map(id => (
                                <button
                                    key={`cat-${id}`}
                                    onClick={() => removeFilter('category', id)}
                                    className="group inline-flex items-center gap-1 rounded-full bg-[var(--primary)]/10 py-1 pr-2 pl-2.5 text-xs font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/20"
                                >
                                    <span className="max-w-[120px] truncate">{getCategoryLabel(id)}</span>
                                    <X className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
                                </button>
                            ))}
                            {activeSubCategories.map(id => (
                                <button
                                    key={`sub-${id}`}
                                    onClick={() => removeFilter('sub_category', id)}
                                    className="group inline-flex items-center gap-1 rounded-full bg-indigo-50 py-1 pr-2 pl-2.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                                >
                                    <span className="max-w-[120px] truncate">{getSubCategoryLabel(id)}</span>
                                    <X className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
                                </button>
                            ))}
                            {activeTypes.map(id => (
                                <button
                                    key={`type-${id}`}
                                    onClick={() => removeFilter('type', id)}
                                    className="group inline-flex items-center gap-1 rounded-full bg-blue-50 py-1 pr-2 pl-2.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-100/50"
                                >
                                    <span>{getTypeLabel(id)}</span>
                                    <X className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
                                </button>
                            ))}
                            {activeSalaries.map(id => (
                                <button
                                    key={`sal-${id}`}
                                    onClick={() => removeFilter('salary', id)}
                                    className="group inline-flex items-center gap-1 rounded-full bg-emerald-50 py-1 pr-2 pl-2.5 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
                                >
                                    <span>{getSalaryLabel(id)}</span>
                                    <X className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
                                </button>
                            ))}
                            {filters.location && (
                                <button
                                    onClick={() => { setLocation(''); removeFilter('location'); }}
                                    className="group inline-flex items-center gap-1 rounded-full bg-amber-50 py-1 pr-2 pl-2.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                                >
                                    <MapPin className="h-3 w-3" />
                                    <span>{filters.location}</span>
                                    <X className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
                                </button>
                            )}
                            {filters.date_posted && filters.date_posted !== '0' && (
                                <button
                                    onClick={() => removeFilter('date_posted')}
                                    className="group inline-flex items-center gap-1 rounded-full bg-violet-50 py-1 pr-2 pl-2.5 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-900/50"
                                >
                                    <span>{datePostedOptions.find(o => o.id === filters.date_posted)?.label}</span>
                                    <X className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
                                </button>
                            )}
                            {filters.urgent && (
                                <button
                                    onClick={() => removeFilter('urgent')}
                                    className="group inline-flex items-center gap-1 rounded-full bg-red-50 py-1 pr-2 pl-2.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                                >
                                    <Zap className="h-3 w-3" />
                                    <span>Urgent</span>
                                    <X className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Categories Section */}
                <div className="border-b border-gray-100 px-5 py-3 dark:border-white/10">
                    <SectionHeader icon={Layers} title="Category" section="category" count={activeCategories.length + activeSubCategories.length} />
                    {openSections.category && (
                        <div className="mt-1 space-y-0.5 pb-1">
                            {jobCategories.map((category) => {
                                const isCategoryChecked = activeCategories.includes(category.id);
                                const isExpanded = expandedCategories[category.id];
                                const hasSubRoles = category.subRoles && category.subRoles.length > 0;
                                const activeSubCount = hasSubRoles
                                    ? category.subRoles.filter(r => activeSubCategories.includes(r.id)).length
                                    : 0;

                                return (
                                    <div key={category.id}>
                                        <div className="flex items-center gap-1 rounded-lg px-1 py-1.5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                            <Label className="group flex flex-1 cursor-pointer items-center gap-2.5">
                                                <Checkbox
                                                    checked={isCategoryChecked}
                                                    onCheckedChange={(checked) => {
                                                        const params = new URLSearchParams(window.location.search);
                                                        let newCategories;
                                                        if (checked) {
                                                            newCategories = [...activeCategories, category.id];
                                                            if (hasSubRoles) {
                                                                setExpandedCategories(prev => ({ ...prev, [category.id]: true }));
                                                            }
                                                        } else {
                                                            newCategories = activeCategories.filter((c) => c !== category.id);
                                                            if (hasSubRoles) {
                                                                const subRoleIds = category.subRoles.map(r => r.id);
                                                                const newSubCats = activeSubCategories.filter(id => !subRoleIds.includes(id));
                                                                if (newSubCats.length === 0) params.delete('sub_category');
                                                                else params.set('sub_category', newSubCats.join(','));
                                                            }
                                                        }
                                                        if (newCategories.length === 0) params.delete('category');
                                                        else params.set('category', newCategories.join(','));
                                                        params.delete('page');
                                                        router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                        });
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                                                />
                                                <span className={`text-[13px] leading-tight transition-colors group-hover:text-[var(--primary)] ${isCategoryChecked ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-300'}`}>
                                                    {category.label}
                                                </span>
                                            </Label>
                                            {hasSubRoles && (
                                                <div className="flex items-center gap-1">
                                                    {activeSubCount > 0 && (
                                                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary)]/15 px-1 text-[9px] font-bold text-[var(--primary)]">
                                                            {activeSubCount}
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={() => toggleCategory(category.id)}
                                                        className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-[var(--primary)] dark:hover:bg-white/10"
                                                    >
                                                        <ChevronDown
                                                            className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Sub-roles */}
                                        {hasSubRoles && isExpanded && (
                                            <div className="ml-5 border-l-2 border-gray-100 pl-3 dark:border-white/10">
                                                {category.subRoles.map((subRole) => {
                                                    const isSubChecked = activeSubCategories.includes(subRole.id);
                                                    return (
                                                        <div key={subRole.id} className="rounded-md px-1 py-1 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                                            <Label className="group flex cursor-pointer items-center gap-2">
                                                                <Checkbox
                                                                    checked={isSubChecked}
                                                                    onCheckedChange={(checked) => {
                                                                        const params = new URLSearchParams(window.location.search);
                                                                        let newSubCats;
                                                                        if (checked) {
                                                                            newSubCats = [...activeSubCategories, subRole.id];
                                                                            if (!activeCategories.includes(category.id)) {
                                                                                params.set('category', [...activeCategories, category.id].join(','));
                                                                            }
                                                                        } else {
                                                                            newSubCats = activeSubCategories.filter(id => id !== subRole.id);
                                                                        }
                                                                        if (newSubCats.length === 0) params.delete('sub_category');
                                                                        else params.set('sub_category', newSubCats.join(','));
                                                                        params.delete('page');
                                                                        router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
                                                                            preserveState: true,
                                                                            preserveScroll: true,
                                                                        });
                                                                    }}
                                                                    className="h-3.5 w-3.5 rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                                                                />
                                                                <span className={`text-xs transition-colors group-hover:text-[var(--primary)] ${isSubChecked ? 'font-medium text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                                                                    {subRole.label}
                                                                </span>
                                                            </Label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Job Type Section - Pill Style */}
                <div className="border-b border-gray-100 px-5 py-3 dark:border-white/10">
                    <SectionHeader icon={Briefcase} title="Job Type" section="type" count={activeTypes.length} />
                    {openSections.type && (
                        <div className="mt-2 flex flex-wrap gap-2 pb-1">
                            {jobTypes.map((type) => {
                                const isChecked = activeTypes.includes(type.id);
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            const params = new URLSearchParams(window.location.search);
                                            let newTypes;
                                            if (isChecked) {
                                                newTypes = activeTypes.filter((t) => t !== type.id);
                                            } else {
                                                newTypes = [...activeTypes, type.id];
                                            }
                                            if (newTypes.length === 0) params.delete('type');
                                            else params.set('type', newTypes.join(','));
                                            params.delete('page');
                                            router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
                                        }}
                                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                                            isChecked
                                                ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-[var(--primary)]/40'
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Location Section */}
                <div className="border-b border-gray-100 px-5 py-3 dark:border-white/10">
                    <SectionHeader icon={MapPin} title="Location" section="location" count={filters.location ? 1 : 0} />
                    {openSections.location && (
                        <div className="mt-2 pb-1">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="e.g., Western North, Bibiani"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onBlur={handleLocationFilter}
                                    onKeyDown={(e) => e.key === 'Enter' && handleLocationFilter()}
                                    className="h-9 rounded-lg border-gray-200 pl-9 text-sm dark:border-white/10"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Salary Range Section */}
                <div className="border-b border-gray-100 px-5 py-3 dark:border-white/10">
                    <SectionHeader icon={Wallet} title="Salary Range" section="salary" count={activeSalaries.length} />
                    {openSections.salary && (
                        <div className="mt-1 space-y-0.5 pb-1">
                            {salaryRanges.map((range) => {
                                const isChecked = activeSalaries.includes(range.id);
                                return (
                                    <div key={range.id} className="rounded-lg px-1 py-1.5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                        <Label className="group flex cursor-pointer items-center gap-2.5">
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
                                                    if (newSalaries.length === 0) params.delete('salary');
                                                    else params.set('salary', newSalaries.join(','));
                                                    params.delete('page');
                                                    router.get(baseRoute, { ...routeParams, ...Object.fromEntries(params) }, {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    });
                                                }}
                                                className="h-4 w-4 rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                                            />
                                            <span className={`text-[13px] transition-colors group-hover:text-[var(--primary)] ${isChecked ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-300'}`}>
                                                {range.label}
                                            </span>
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Date Posted Section */}
                <div className="border-b border-gray-100 px-5 py-3 dark:border-white/10">
                    <SectionHeader icon={Clock} title="Date Posted" section="date" count={filters.date_posted && filters.date_posted !== '0' ? 1 : 0} />
                    {openSections.date && (
                        <div className="mt-2 pb-1">
                            <RadioGroup
                                value={filters.date_posted || '0'}
                                onValueChange={(value) => updateFilter('date_posted', value === '0' ? '' : value)}
                                className="space-y-0.5"
                            >
                                {datePostedOptions.map((option) => (
                                    <div key={option.id} className="rounded-lg px-1 py-1.5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                        <Label className="group flex cursor-pointer items-center gap-2.5">
                                            <RadioGroupItem
                                                value={option.id}
                                                className="h-4 w-4 border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                                            />
                                            <span className={`text-[13px] transition-colors group-hover:text-[var(--primary)] ${
                                                (filters.date_posted || '0') === option.id
                                                    ? 'font-semibold text-gray-900 dark:text-white'
                                                    : 'font-medium text-gray-600 dark:text-gray-300'
                                            }`}>
                                                {option.label}
                                            </span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}
                </div>

                {/* Urgent Jobs Section */}
                <div className="px-5 py-3">
                    <SectionHeader icon={Zap} title="Urgent Jobs" section="urgent" count={filters.urgent ? 1 : 0} />
                    {openSections.urgent && (
                        <div className="mt-2 pb-1">
                            <button
                                onClick={() => updateFilter('urgent', filters.urgent === '1' ? '' : '1')}
                                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 transition-all ${
                                    filters.urgent === '1'
                                        ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                                        : 'border-gray-200 bg-white hover:border-red-200 hover:bg-red-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-red-800'
                                }`}
                            >
                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                    filters.urgent === '1'
                                        ? 'bg-red-100 dark:bg-red-900/40'
                                        : 'bg-gray-100 dark:bg-white/10'
                                }`}>
                                    <Zap className={`h-4 w-4 ${filters.urgent === '1' ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className={`text-sm font-medium ${filters.urgent === '1' ? 'text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                        Urgent Only
                                    </p>
                                    <p className="text-[11px] text-gray-400 dark:text-gray-500">Show jobs marked as urgent</p>
                                </div>
                                <div className={`h-5 w-9 rounded-full transition-colors ${filters.urgent === '1' ? 'bg-red-500' : 'bg-gray-200 dark:bg-white/20'}`}>
                                    <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${filters.urgent === '1' ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile: Fixed bottom action bar */}
            {isMobile && (
                <div className="sticky bottom-0 border-t border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-gray-900">
                    <button
                        onClick={onClose}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[var(--buame-primary-dark)]"
                    >
                        Show Results
                        {activeFilterCount > 0 && (
                            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{activeFilterCount} filters</span>
                        )}
                    </button>
                </div>
            )}
        </aside>
    );
}
