import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { ArtisanCard } from '@/components/visitor/artisans/ArtisanCard';
import { FilterBar } from '@/components/visitor/artisans/FilterBar';
import { Pagination } from '@/components/visitor/artisans/Pagination';
import { QuickCategories } from '@/components/visitor/artisans/QuickCategories';
import { SearchBar } from '@/components/visitor/artisans/SearchBar';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Artisans({ artisans, categoryCounts, filters }) {
    const totalCount = artisans.total || 0;
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/artisans',
            {
                search: searchQuery,
                location: location,
                skill_type: filters?.skill_type,
                experience_level: filters?.experience_level,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleFilterChange = (filterName, value) => {
        router.get(
            '/artisans',
            {
                search: searchQuery,
                location: location,
                [filterName]: value === 'all' ? null : value,
                ...(filterName !== 'skill_type' && filters?.skill_type && { skill_type: filters.skill_type }),
                ...(filterName !== 'experience_level' && filters?.experience_level && { experience_level: filters.experience_level }),
                ...(filterName !== 'sort' && filters?.sort && { sort: filters.sort }),
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleCategoryClick = (skillType) => {
        router.get(
            '/artisans',
            {
                skill_type: skillType,
                search: searchQuery,
                location: location,
                experience_level: filters?.experience_level,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: false,
            }
        );
    };

    const handleClearFilters = () => {
        router.get(
            '/artisans',
            {
                search: searchQuery,
                location: location,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <VisitorLayout>
            <Head title="Skilled Artisans | 2RBUAME" />

            {/* Hero with Search */}
            <div className="w-full bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--primary)]/5 dark:from-[var(--primary)]/5 dark:via-[var(--foreground)] dark:to-[var(--primary)]/5">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
                    <div className="mb-8 text-center">
                        <h1 className="mb-3 text-4xl font-black text-[var(--foreground)] dark:text-white md:text-5xl">Find Expert Artisans</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">Connect with verified skilled workers across Western North and beyond. We welcome customers from all backgrounds.</p>
                    </div>

                    {/* Search Bar Component */}
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        location={location}
                        setLocation={setLocation}
                        onSubmit={handleSearch}
                    />

                    {/* Quick Categories Component */}
                    <QuickCategories categoryCounts={categoryCounts} activeSkillType={filters?.skill_type} onCategoryClick={handleCategoryClick} />
                </div>
            </div>

            {/* Main Content - Grid Layout */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
                {/* Filter Bar Component */}
                <FilterBar filters={filters} totalCount={totalCount} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

                {/* Artisan Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {artisans.data && artisans.data.length > 0 ? (
                        artisans.data.map((artisan) => <ArtisanCard key={artisan.id} artisan={artisan} />)
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No artisans found. Be the first to join!</p>
                            <Link href="/join-as-provider" className="mt-4 inline-block text-[var(--primary)] hover:underline">
                                Join as Provider →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination Component */}
                <Pagination artisans={artisans} filters={filters} />
            </div>
        </VisitorLayout>
    );
}
