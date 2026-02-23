import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { JobsHero } from '@/components/visitor/jobs/jobs-hero';
import { JobsFilters } from '@/components/visitor/jobs/jobs-filters';
import { JobsToolbar } from '@/components/visitor/jobs/jobs-toolbar';
import { JobsGrid } from '@/components/visitor/jobs/jobs-grid';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Jobs({ jobs = [], pagination = {}, filters = {} }) {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Lock body scroll when mobile filters are open
    useEffect(() => {
        if (showMobileFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showMobileFilters]);

    return (
        <VisitorLayout>
            <Head title="Jobs">
                <meta name="description" content="Browse the latest job opportunities in Ghana on 2RBUAME. Find full-time, part-time, and contract positions across various industries. Start your career journey today." />
                <meta name="keywords" content="jobs Ghana, job vacancies, employment opportunities, career, full-time jobs, part-time jobs, contract work, 2RBUAME jobs" />
                <meta property="og:title" content="Job Opportunities in Ghana - 2RBUAME" />
                <meta property="og:description" content="Find your next career opportunity on 2RBUAME. Browse job listings across various industries in Ghana." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Job Opportunities in Ghana - 2RBUAME" />
                <meta name="twitter:description" content="Find your next career opportunity on 2RBUAME. Browse job listings across various industries in Ghana." />
            </Head>
            <JobsHero />
            <div className="flex grow flex-col lg:flex-row">
                {/* Desktop Filters */}
                <JobsFilters filters={filters} isMobile={false} />

                {/* Mobile Filters - Slide-over Drawer */}
                <div className={`fixed inset-0 z-50 lg:hidden ${showMobileFilters ? 'visible' : 'invisible'}`}>
                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${showMobileFilters ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setShowMobileFilters(false)}
                    />
                    {/* Drawer Panel */}
                    <div
                        className={`absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <JobsFilters
                            filters={filters}
                            isMobile={true}
                            onClose={() => setShowMobileFilters(false)}
                        />
                    </div>
                </div>

                <main className="flex flex-1 flex-col bg-background-light p-4 md:p-6 lg:p-8">
                    <JobsToolbar filters={filters} pagination={pagination} onFilterToggle={() => setShowMobileFilters(!showMobileFilters)} />
                    <JobsGrid jobs={jobs} />
                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <Button
                                asChild
                                variant="outline"
                                disabled={pagination.current_page === 1}
                                className="h-10 rounded-lg border border-[var(--buame-border-light)] bg-white px-4 disabled:opacity-50"
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
                                            className={`h-10 min-w-10 rounded-lg px-4 ${isActive
                                                ? 'bg-[var(--primary)] text-white'
                                                : 'border border-[var(--buame-border-light)] bg-white'
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
                                className="h-10 rounded-lg border border-[var(--buame-border-light)] bg-white px-4 disabled:opacity-50"
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
