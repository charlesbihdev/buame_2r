import { PortfolioGallery } from '@/components/visitor/artisans/PortfolioGallery';
import { Button } from '@/components/ui/button';
import { ReviewSection } from '@/components/ui/review-section';
import { CautionBanner } from '@/components/ui/caution-banner';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { buildWhatsAppUrl } from '@/utils/phoneUtils';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Award, BadgeCheck, Calendar, Clock, Eye, Mail, MapPin, MessageCircle, Phone, Star, TrendingUp } from 'lucide-react';

export default function ArtisanView({ artisan, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
    const whatsappUrl = buildWhatsAppUrl(artisan?.whatsapp, `Hello ${artisan?.name}, I'm interested in your ${artisan?.company_name || 'services'}.`);
    const artisanDescription = artisan?.description ? artisan.description.substring(0, 150) : `Professional artisan with ${artisan?.experience_years || 'years of'} experience`;
    const specialtiesText = artisan?.specialties?.slice(0, 3)?.join(', ') || 'various services';

    return (
        <VisitorLayout>
            <Head title={`${artisan?.name} - ${artisan?.company_name || 'Artisan'}`}>
                <meta name="description" content={`${artisan?.name} - ${artisan?.company_name || 'Professional Artisan'} in ${artisan?.location}. Specializing in ${specialtiesText}. ${artisanDescription}${artisanDescription.length >= 150 ? '...' : ''}`} />
                <meta name="keywords" content={`${artisan?.name}, ${artisan?.company_name || 'artisan'}, ${artisan?.location}, ${specialtiesText}, hire artisan Ghana, 2RBUAME`} />
                <meta property="og:title" content={`${artisan?.name} - ${artisan?.company_name || 'Artisan'} | 2RBUAME`} />
                <meta property="og:description" content={`Professional artisan in ${artisan?.location}. ${artisan?.experience_years} years experience. Contact now on 2RBUAME.`} />
                <meta property="og:type" content="profile" />
                {artisan?.profile_image && <meta property="og:image" content={artisan.profile_image} />}
                <meta name="twitter:title" content={`${artisan?.name} - ${artisan?.company_name || 'Artisan'} | 2RBUAME`} />
                <meta name="twitter:description" content={`Professional artisan in ${artisan?.location}. Contact now on 2RBUAME.`} />
                {artisan?.profile_image && <meta name="twitter:image" content={artisan.profile_image} />}
            </Head>

            {/* Hero Section */}
            <div className="w-full bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--primary)]/5 dark:from-[var(--primary)]/5 dark:via-[var(--foreground)] dark:to-[var(--primary)]/5">
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    {/* Back Button */}
                    <Link
                        href="/artisans"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[var(--primary)] dark:text-gray-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Artisans
                    </Link>

                    {/* Caution Banner */}
                    <CautionBanner type="service" className="mb-8" />

                    {/* Profile Header */}
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[var(--card)] md:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start">
                            {/* Profile Image */}
                            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 md:h-40 md:w-40">
                                {artisan?.profile_image ? (
                                    <img src={artisan.profile_image} alt={artisan.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5">
                                        <span className="text-5xl font-bold text-[var(--primary)]">{artisan?.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                )}
                                {artisan?.is_verified && (
                                    <div className="absolute right-2 top-2">
                                        <BadgeCheck className="h-6 w-6 fill-[var(--primary)] text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <h1 className="text-3xl font-black text-[var(--foreground)] dark:text-white md:text-4xl">{artisan?.name}</h1>
                                    {artisan?.is_verified && <BadgeCheck className="h-6 w-6 fill-[var(--primary)] text-white" />}
                                </div>
                                {artisan?.company_name && <p className="mb-4 text-xl font-semibold text-[var(--primary)]">{artisan.company_name}</p>}

                                {/* Quick Stats */}
                                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span>{artisan?.rating}</span>
                                        <span className="text-xs opacity-75">({artisan?.reviews_count} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        <Award className="h-4 w-4" />
                                        <span>{artisan?.experience_years} years experience</span>
                                    </div>
                                    {artisan?.experience_level && (
                                        <div className="flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1.5 font-semibold capitalize text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                            <TrendingUp className="h-4 w-4" />
                                            <span>{artisan.experience_level}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        <Eye className="h-4 w-4" />
                                        <span>{artisan?.views_count} views</span>
                                    </div>
                                </div>

                                {/* Location & Availability */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm font-medium">{artisan?.location}</span>
                                    </div>
                                    {artisan?.is_available ? (
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            ● Available Now
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                            ● Currently Busy
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Pricing Card - Desktop */}
                            {artisan?.show_price && artisan?.price_per_day && (
                                <div className="hidden shrink-0 rounded-xl border border-gray-200 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 p-4 dark:border-gray-700 dark:from-[var(--primary)]/10 dark:to-[var(--primary)]/5 md:block">
                                    <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Starting from</p>
                                    <p className="text-3xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">GH₵{artisan.price_per_day}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">per day</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        {/* About Section */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">About {artisan?.name.split(' ')[0]}</h2>
                            <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                                {artisan?.description || 'No description available.'}
                            </p>

                            {/* Specialties */}
                            {artisan?.specialties && artisan.specialties.length > 0 && (
                                <div>
                                    <h3 className="mb-3 text-lg font-bold text-[var(--foreground)] dark:text-white">Specialties</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {artisan.specialties.map((spec, index) => (
                                            <span
                                                key={index}
                                                className="rounded-lg bg-[var(--primary)]/10 px-4 py-2 text-sm font-semibold text-white dark:text-[var(--primary)]"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Portfolio Section */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">Portfolio & Past Work</h2>
                            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">View examples of {artisan?.name.split(' ')[0]}'s previous projects</p>
                            <PortfolioGallery portfolio={artisan?.portfolio || []} />
                        </div>

                        {/* Working Hours */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">Working Hours</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                                    <Clock className="h-5 w-5 text-[var(--primary)]" />
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        {artisan?.working_hours || 'Contact for availability'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                                    <Calendar className="h-5 w-5 text-[var(--primary)]" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Usually responds within 2 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing Card - Mobile */}
                            {artisan?.show_price && artisan?.price_per_day && (
                                <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 p-6 dark:border-gray-700 dark:from-[var(--primary)]/10 dark:to-[var(--primary)]/5 md:hidden">
                                    <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Starting from</p>
                                    <p className="text-4xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">GH₵{artisan.price_per_day}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">per day</p>
                                </div>
                            )}

                            {/* Contact Actions */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Get in Touch</h3>
                                <div className="space-y-3">
                                    {whatsappUrl && (
                                        <Button asChild className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]">
                                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                                <MessageCircle className="mr-2 h-5 w-5" />
                                                WhatsApp
                                            </a>
                                        </Button>
                                    )}
                                    {artisan?.phone && (
                                        <Button asChild variant="outline" className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white">
                                            <a href={`tel:${artisan.phone}`}>
                                                <Phone className="mr-2 h-5 w-5" />
                                                Call Now
                                            </a>
                                        </Button>
                                    )}
                                    {artisan?.email && (
                                        <Button asChild variant="outline" className="w-full">
                                            <a href={`mailto:${artisan.email}`}>
                                                <Mail className="mr-2 h-5 w-5" />
                                                Email
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Contact Information</h3>
                                <div className="space-y-3 text-sm">
                                    {artisan?.phone && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{artisan.phone}</span>
                                        </div>
                                    )}
                                    {artisan?.email && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <Mail className="h-4 w-4 text-[var(--primary)]" />
                                            <span className="break-all font-medium text-gray-700 dark:text-gray-300">{artisan.email}</span>
                                        </div>
                                    )}
                                    {artisan?.address && (
                                        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{artisan.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Why Choose {artisan?.name.split(' ')[0]}?</h3>
                                <div className="space-y-3 text-sm">
                                    {artisan?.is_verified && (
                                        <div className="flex items-start gap-3">
                                            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 fill-[var(--primary)] text-white" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Verified Profile</p>
                                                <p className="text-gray-600 dark:text-gray-400">Identity confirmed by 2RBUAME</p>
                                            </div>
                                        </div>
                                    )}
                                    {artisan?.experience_years && (
                                        <div className="flex items-start gap-3">
                                            <Award className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Experienced Professional</p>
                                                <p className="text-gray-600 dark:text-gray-400">{artisan.experience_years}+ years in the field</p>
                                            </div>
                                        </div>
                                    )}
                                    {artisan?.rating && (
                                        <div className="flex items-start gap-3">
                                            <Star className="mt-0.5 h-5 w-5 shrink-0 fill-yellow-400 text-yellow-400" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Highly Rated</p>
                                                <p className="text-gray-600 dark:text-gray-400">{artisan.rating}/5.0 from {artisan.reviews_count} reviews</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ReviewSection
                    reviewableType="artisan"
                    reviewableId={artisan?.id}
                    reviews={reviews}
                    averageRating={average_rating}
                    reviewsCount={reviews_count}
                    ratingBreakdown={rating_breakdown}
                />
            </div>
        </VisitorLayout>
    );
}
