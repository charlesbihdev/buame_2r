import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, router } from '@inertiajs/react';
import { BackToHome } from '@/components/ui/back-to-home';
import { ReviewSection } from '@/components/ui/review-section';
import { JobsGrid } from '@/components/visitor/jobs/jobs-grid';
import { JobsFilters } from '@/components/visitor/jobs/jobs-filters';
import { EmployerProfileHero } from '@/components/visitor/jobs/employer-profile-hero';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Filter, Briefcase } from 'lucide-react';

export default function JobPosterPage({ poster, jobs, filters = {}, typeCounts = {}, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${poster.name} - Jobs`,
                text: `Check out jobs posted by ${poster.name}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleSortChange = (sort) => {
        router.get(
            route('jobs.employer', poster.slug),
            {
                ...filters,
                sort: sort === 'newest' ? undefined : sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleClearFilters = () => {
        router.get(
            route('jobs.employer', poster.slug),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const hasActiveFilters = filters?.type || filters?.category || filters?.location || filters?.urgent || filters?.search || filters?.salary;
    const jobCount = jobs?.total || 0;
    const hasJobs = jobs?.data && jobs.data.length > 0;

    const posterDescription = poster.description ? poster.description.substring(0, 150) : `View all job opportunities from ${poster.name} `;

    return (
        <VisitorLayout>
            <Head title={`${poster.name} - Jobs`}>
                <meta name="description" content={`Explore job opportunities from ${poster.name}. ${posterDescription}${posterDescription.length >= 150 ? '...' : ''} Browse ${jobCount} available positions.`} />
                <meta name="keywords" content={`${poster.name}, jobs, employment, careers, job openings, Ghana jobs, 2RBUAME`} />
                <meta property="og:title" content={`${poster.name} - Job Openings | 2RBUAME`} />
                <meta property="og:description" content={`Browse ${jobCount} job opportunities from ${poster.name} on 2RBUAME.`} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={`${poster.name} - Job Openings | 2RBUAME`} />
                <meta name="twitter:description" content={`Browse ${jobCount} job opportunities from ${poster.name} on 2RBUAME.`} />
            </Head>

            <div className="min-h-screen bg-[var(--background)]">
                {/* Back Navigation */}
                <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
                        <BackToHome to="/jobs" label="Back to All Jobs" />
                    </div>
                </div>

                {/* Hero Section */}
                <EmployerProfileHero
                    poster={poster}
                    jobCount={jobCount}
                    averageRating={average_rating}
                    reviewsCount={reviews_count}
                    onShare={handleShare}
                />

                {/* Jobs Section */}
                <div className="border-t border-gray-200 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
                        {/* Section Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                                    <Briefcase className="h-6 w-6 text-[var(--primary)]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-[var(--foreground)] md:text-3xl">
                                        Available Positions
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {jobCount} {jobCount === 1 ? 'job opening' : 'job openings'} from {poster.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 lg:flex-row">
                            {/* Desktop Filters */}
                            <div className="hidden lg:block">
                                <div className="sticky top-24">
                                    <JobsFilters
                                        filters={filters}
                                        baseRoute={route('jobs.employer', poster.slug)}
                                        routeParams={{}}
                                    />
                                </div>
                            </div>

                            {/* Mobile Filters */}
                            {showMobileFilters && (
                                <div className="lg:hidden">
                                    <JobsFilters
                                        filters={filters}
                                        baseRoute={route('jobs.employer', poster.slug)}
                                        routeParams={{}}
                                    />
                                </div>
                            )}

                            {/* Jobs Content */}
                            <div className="flex-1">
                                {/* Toolbar */}
                                <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm font-medium text-gray-600">
                                        {hasActiveFilters ? (
                                            <>
                                                Showing <span className="font-bold text-[var(--foreground)]">{jobs?.from || 0}</span>-
                                                <span className="font-bold text-[var(--foreground)]">{jobs?.to || 0}</span> of{' '}
                                                <span className="font-bold text-[var(--foreground)]">{jobCount}</span> filtered results
                                                <button
                                                    onClick={handleClearFilters}
                                                    className="ml-2 text-[var(--primary)] hover:underline"
                                                >
                                                    Clear filters
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                Showing all <span className="font-bold text-[var(--foreground)]">{jobCount}</span> {jobCount === 1 ? 'job' : 'jobs'}
                                            </>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Mobile Filter Toggle */}
                                        <Button
                                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                                            variant="outline"
                                            size="sm"
                                            className="lg:hidden"
                                        >
                                            <Filter className="mr-2 h-4 w-4" />
                                            {showMobileFilters ? 'Hide' : 'Show'} Filters
                                        </Button>

                                        {/* Sort Dropdown */}
                                        <Select value={filters.sort || 'newest'} onValueChange={handleSortChange}>
                                            <SelectTrigger className="h-10 w-[180px] rounded-lg border border-gray-200 bg-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="newest">Newest First</SelectItem>
                                                <SelectItem value="urgent_first">Urgent First</SelectItem>
                                                <SelectItem value="salary_high">Salary: High to Low</SelectItem>
                                                <SelectItem value="salary_low">Salary: Low to High</SelectItem>
                                                <SelectItem value="oldest">Oldest First</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Jobs Grid or Empty State */}
                                {hasJobs ? (
                                    <>
                                        <JobsGrid jobs={jobs.data} />

                                        {/* Pagination */}
                                        {jobs.last_page > 1 && (
                                            <div className="mt-8 flex items-center justify-center gap-2">
                                                {jobs.links?.map((link, index) => {
                                                    if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
                                                        return (
                                                            <Button
                                                                key={index}
                                                                asChild
                                                                variant="outline"
                                                                disabled={!link.url}
                                                                className="h-10 rounded-lg border border-gray-200 bg-white px-4 disabled:opacity-50"
                                                            >
                                                                <Link href={link.url || '#'} preserveState preserveScroll>
                                                                    {link.label === '&laquo; Previous' ? 'Previous' : 'Next'}
                                                                </Link>
                                                            </Button>
                                                        );
                                                    }
                                                    if (link.label.includes('...')) {
                                                        return <span key={index} className="px-2 text-gray-500">...</span>;
                                                    }
                                                    return (
                                                        <Button
                                                            key={index}
                                                            asChild
                                                            variant={link.active ? 'default' : 'outline'}
                                                            className={`h - 10 rounded - lg px - 4 ${link.active ? 'bg-[var(--primary)] text-white' : 'border border-gray-200 bg-white'} `}
                                                        >
                                                            <Link href={link.url || '#'} preserveState preserveScroll>
                                                                {link.label}
                                                            </Link>
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                            <Briefcase className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            {hasActiveFilters ? 'No jobs match your filters' : 'No jobs posted yet'}
                                        </h3>
                                        <p className="mb-4 text-gray-600">
                                            {hasActiveFilters
                                                ? 'Try adjusting your filters to see more results'
                                                : `${poster.name} hasn't posted any job openings yet`}
                                        </p >
                                        {hasActiveFilters && (
                                            <Button onClick={handleClearFilters} variant="outline">
                                                Clear All Filters
                                            </Button>
                                        )}
                                    </div >
                                )}
                            </div >
                        </div >

                        {/* Reviews Section */}
                        < div className="mt-16" >
                            <ReviewSection
                                reviewableType="job_poster"
                                reviewableId={poster?.id}
                                reviews={reviews}
                                averageRating={average_rating}
                                reviewsCount={reviews_count}
                                ratingBreakdown={rating_breakdown}
                            />
                        </div >
                    </div >
                </div >
            </div >
        </VisitorLayout >
    );
}
