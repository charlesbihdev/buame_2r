import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { JobsHero } from '@/components/visitor/jobs/jobs-hero';
import { JobsFilters } from '@/components/visitor/jobs/jobs-filters';
import { JobsToolbar } from '@/components/visitor/jobs/jobs-toolbar';
import { JobsGrid } from '@/components/visitor/jobs/jobs-grid';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Jobs({ jobs = [], pagination = {}, filters = {} }) {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    return (
        <VisitorLayout>
            <Head title="Jobs - 2RBUAME" />
            <JobsHero />
            <div className="flex grow flex-col lg:flex-row">
                {/* Desktop Filters */}
                <div className="hidden lg:block">
                    <JobsFilters filters={filters} />
                </div>
                {/* Mobile Filters */}
                {showMobileFilters && (
                    <div className="lg:hidden">
                        <JobsFilters filters={filters} />
                    </div>
                )}
                <main className="flex flex-1 flex-col bg-background-light p-4 dark:bg-background-dark md:p-6 lg:p-8">
                    <JobsToolbar filters={filters} pagination={pagination} onFilterToggle={() => setShowMobileFilters(!showMobileFilters)} />
                    <JobsGrid jobs={jobs} />
                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <Button
                                asChild
                                variant="outline"
                                disabled={pagination.current_page === 1}
                                className="h-10 rounded-lg border border-[var(--buame-border-light)] bg-white px-4 disabled:opacity-50 dark:border-white/10 dark:bg-white/5"
                            >
                                <Link
                                    href={pagination.links?.find((link) => link.label === '&laquo; Previous')?.url || '#'}
                                    preserveState
                                    preserveScroll
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            </Button>
                            <div className="flex gap-1">
                                {pagination.links?.map((link, index) => {
                                    if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
                                        return null;
                                    }
                                    const page = link.label;
                                    const isActive = link.active;
                                    return (
                                        <Button
                                            key={index}
                                            asChild
                                            variant={isActive ? 'default' : 'outline'}
                                            className={`h-10 min-w-10 rounded-lg px-4 ${
                                                isActive
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : 'border border-[var(--buame-border-light)] bg-white dark:border-white/10 dark:bg-white/5'
                                            }`}
                                        >
                                            <Link href={link.url || '#'} preserveState preserveScroll>
                                                {page}
                                            </Link>
                                        </Button>
                                    );
                                })}
                            </div>
                            <Button
                                asChild
                                variant="outline"
                                disabled={pagination.current_page === pagination.last_page}
                                className="h-10 rounded-lg border border-[var(--buame-border-light)] bg-white px-4 disabled:opacity-50 dark:border-white/10 dark:bg-white/5"
                            >
                                <Link
                                    href={pagination.links?.find((link) => link.label === 'Next &raquo;')?.url || '#'}
                                    preserveState
                                    preserveScroll
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </VisitorLayout>
    );
}
