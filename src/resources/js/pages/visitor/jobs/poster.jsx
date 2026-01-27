import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ReviewSection } from '@/components/ui/review-section';
import { JobsGrid } from '@/components/visitor/jobs/jobs-grid';
import { JobsFilters } from '@/components/visitor/jobs/jobs-filters';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ArrowLeft, Phone, Mail, MessageCircle, Globe, MapPin, CheckCircle, Share2 } from 'lucide-react';

export default function JobPosterPage({ poster, jobs, filters = {}, typeCounts = {}, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const handleFilterChange = (filterName, value) => {
        router.get(
            route('jobs.employer', poster.slug),
            {
                ...filters,
                [filterName]: value === 'all' || value === 'newest' ? undefined : value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('jobs.employer', poster.slug),
            {
                ...filters,
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

    const whatsappUrl = poster.whatsapp
        ? `https://wa.me/${poster.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello, I'm interested in jobs posted by ${poster.name}.`)}`
        : poster.phone
          ? `https://wa.me/${poster.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello, I'm interested in jobs posted by ${poster.name}.`)}`
          : null;

    const hasActiveFilters = filters?.type || filters?.category || filters?.location || filters?.urgent || filters?.search;
    const jobCount = jobs?.total || 0;
    const hasJobs = jobs?.data && jobs.data.length > 0;

    return (
        <VisitorLayout>
            <Head title={`${poster.name} - Jobs | 2RBUAME`} />

            <div className="min-h-screen bg-[var(--background)] dark:bg-[var(--buame-background-dark)]">
                {/* Header */}
                <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-[var(--card)]/95">
                    <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/jobs"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[var(--primary)] dark:text-gray-400"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Jobs
                            </Link>
                            <Button onClick={handleShare} variant="outline" size="sm">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="border-b border-gray-200 bg-gradient-to-b from-white to-gray-50 dark:border-gray-800 dark:from-[var(--card)] dark:to-[var(--buame-background-dark)]">
                    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start">
                            {/* Logo */}
                            {poster.logo && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={poster.logo}
                                        alt={poster.name}
                                        className="h-24 w-24 rounded-xl object-cover shadow-lg md:h-32 md:w-32"
                                    />
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex-1">
                                <div className="mb-2 flex items-center gap-2">
                                    <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">{poster.name}</h1>
                                    {poster.is_verified && (
                                        <CheckCircle className="h-6 w-6 text-[var(--primary)]" title="Verified Employer" />
                                    )}
                                </div>

                                {poster.description && (
                                    <p className="mb-4 text-gray-600 dark:text-gray-400">{poster.description}</p>
                                )}

                                {/* Contact Info */}
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    {poster.location && (
                                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                            <MapPin className="h-4 w-4" />
                                            <span>{poster.location}</span>
                                        </div>
                                    )}
                                    {poster.phone && (
                                        <a
                                            href={`tel:${poster.phone}`}
                                            className="flex items-center gap-1.5 text-[var(--primary)] hover:underline"
                                        >
                                            <Phone className="h-4 w-4" />
                                            <span>{poster.phone}</span>
                                        </a>
                                    )}
                                    {poster.email && (
                                        <a
                                            href={`mailto:${poster.email}`}
                                            className="flex items-center gap-1.5 text-[var(--primary)] hover:underline"
                                        >
                                            <Mail className="h-4 w-4" />
                                            <span>{poster.email}</span>
                                        </a>
                                    )}
                                    {poster.website && (
                                        <a
                                            href={poster.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-[var(--primary)] hover:underline"
                                        >
                                            <Globe className="h-4 w-4" />
                                            <span>Website</span>
                                        </a>
                                    )}
                                    {whatsappUrl && (
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-[var(--primary)] hover:underline"
                                        >
                                            <MessageCircle className="h-4 w-4" />
                                            <span>WhatsApp</span>
                                        </a>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="mt-4 flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                    <span>
                                        <strong className="text-[var(--foreground)] dark:text-white">{jobCount}</strong> {jobCount === 1 ? 'job' : 'jobs'}
                                    </span>
                                    {reviews_count > 0 && (
                                        <span>
                                            <strong className="text-[var(--foreground)] dark:text-white">{average_rating.toFixed(1)}</strong> rating ({reviews_count} {reviews_count === 1 ? 'review' : 'reviews'})
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/* Desktop Filters */}
                        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
                            <JobsFilters filters={filters} />
                        </div>

                        {/* Mobile Filters */}
                        {showMobileFilters && (
                            <div className="lg:hidden">
                                <JobsFilters filters={filters} />
                            </div>
                        )}

                        {/* Jobs Section */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-[var(--foreground)] dark:text-white">
                                    {hasActiveFilters ? 'Search Results' : 'All Jobs'}
                                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        ({jobCount} {jobCount === 1 ? 'job' : 'jobs'})
                                    </span>
                                </h2>
                                <Button
                                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                                    variant="outline"
                                    size="sm"
                                    className="lg:hidden"
                                >
                                    {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                                </Button>
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
                                                            className="h-10 rounded-lg border border-[var(--buame-border-light)] bg-white px-4 disabled:opacity-50 dark:border-white/10 dark:bg-white/5"
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
                                                        className={`h-10 rounded-lg px-4 ${link.active ? 'bg-[var(--primary)] text-white' : 'border border-[var(--buame-border-light)] bg-white dark:border-white/10 dark:bg-white/5'}`}
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
                                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-[var(--card)]">
                                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                                        {hasActiveFilters ? 'No jobs match your filters' : 'No jobs posted yet'}
                                    </p>
                                    {hasActiveFilters && (
                                        <Button onClick={handleClearFilters} variant="outline" className="mt-4">
                                            Clear Filters
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* Reviews Section */}
                            <div className="mt-12">
                                <ReviewSection
                                    reviewableType="job_poster"
                                    reviewableId={poster?.id}
                                    reviews={reviews}
                                    averageRating={average_rating}
                                    reviewsCount={reviews_count}
                                    ratingBreakdown={rating_breakdown}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}
