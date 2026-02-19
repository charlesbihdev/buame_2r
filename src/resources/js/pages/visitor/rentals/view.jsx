import { Button } from '@/components/ui/button';
import { ReviewSection } from '@/components/ui/review-section';
import { CautionBanner } from '@/components/ui/caution-banner';
import { VideoEmbed } from '@/components/ui/video-embed';
import { RentalImageGallery } from '@/components/visitor/rentals/RentalImageGallery';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { BackToHome } from '@/components/ui/back-to-home';
import { ArrowLeft, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

export default function RentalView({ rental, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
    if (!rental) {
        return (
            <VisitorLayout>
                <Head title="Rental Not Found">
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-[var(--card)]">
                        <p className="text-lg text-gray-600 dark:text-gray-400">Rental not found.</p>
                        <div className="mt-6 flex justify-center">
                            <BackToHome to="/rentals" label="Back to Rentals" />
                        </div>
                    </div>
                </div>
            </VisitorLayout>
        );
    }

    const getTypeLabel = (type) => {
        const labels = {
            house: 'House',
            equipment: 'Equipment',
            tools: 'Tools',
            land: 'Land',
            commercial: 'Commercial',
            vehicle: 'Vehicle',
            store: 'Store',
        };
        return labels[type] || type;
    };

    const getPeriodLabel = (period) => {
        if (period === 'day') return '/day';
        if (period === 'week') return '/week';
        if (period === 'month') return '/month';
        if (period === 'year') return '/year';
        return '/month';
    };

    const whatsappNumber = rental.whatsapp || rental.phone;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Hello, I'm interested in renting ${rental.name}.`;
    const rentalDescription = rental.description ? rental.description.substring(0, 150) : `${getTypeLabel(rental.type)} for rent in ${rental.location}`;
    const featuresText = rental.features?.slice(0, 3)?.join(', ') || '';
    const hasPricing = !!rental.price;

    return (
        <VisitorLayout>
            <Head title={`${rental.name} - ${getTypeLabel(rental.type)} Rental`}>
                <meta name="description" content={`${rental.name} - ${getTypeLabel(rental.type)} for rent in ${rental.location}.${hasPricing ? ` ₵${parseFloat(rental.price).toLocaleString()}${getPeriodLabel(rental.period)}.` : ''} ${rentalDescription}${rentalDescription.length >= 150 ? '...' : ''}`} />
                <meta name="keywords" content={`${rental.name}, ${getTypeLabel(rental.type)} rental, ${rental.location}, rent ${getTypeLabel(rental.type).toLowerCase()}, ${featuresText}, 2RBUAME`} />
                <meta property="og:title" content={`${rental.name} - ${getTypeLabel(rental.type)} Rental | 2RBUAME`} />
                <meta property="og:description" content={`${getTypeLabel(rental.type)} for rent in ${rental.location}.${hasPricing ? ` ₵${parseFloat(rental.price).toLocaleString()}${getPeriodLabel(rental.period)}.` : ''} Contact now on 2RBUAME.`} />
                <meta property="og:type" content="website" />
                {rental.primary_image && <meta property="og:image" content={rental.primary_image} />}
                <meta name="twitter:title" content={`${rental.name} - ${getTypeLabel(rental.type)} Rental | 2RBUAME`} />
                <meta name="twitter:description" content={`${getTypeLabel(rental.type)} for rent in ${rental.location}.${hasPricing ? ` ₵${parseFloat(rental.price).toLocaleString()}${getPeriodLabel(rental.period)}.` : ''}`} />
                {rental.primary_image && <meta name="twitter:image" content={rental.primary_image} />}
            </Head>

            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                <BackToHome to="/rentals" label="Back to Rentals" />

                {/* Caution Banner */}
                <CautionBanner type="service" className="mb-8" />

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <RentalImageGallery images={rental.images} primaryImage={rental.primary_image} rentalName={rental.name} />

                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">{rental.name}</h1>
                                        <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-sm font-bold text-white">
                                            {getTypeLabel(rental.type)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5" />
                                        {rental.location}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Videos */}
                        {rental.video_links && rental.video_links.length > 0 && (() => {
                            const tallPlatforms = ['tiktok', 'instagram'];
                            const tallVideos = rental.video_links.filter((l) => tallPlatforms.includes(l.platform));
                            const wideVideos = rental.video_links.filter((l) => !tallPlatforms.includes(l.platform));
                            return (
                                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                    <h2 className="mb-4 text-xl font-bold text-[var(--foreground)] dark:text-white">Videos</h2>
                                    <div className="space-y-4">
                                        {wideVideos.length > 0 && (
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {wideVideos.map((link) => (
                                                    <VideoEmbed key={link.id} url={link.url} platform={link.platform} embedUrl={link.embed_url} tiktokVideoId={link.tiktok_video_id} title={link.title} />
                                                ))}
                                            </div>
                                        )}
                                        {tallVideos.length > 0 && (
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {tallVideos.map((link) => (
                                                    <div key={link.id} className="min-h-[480px]" style={{ height: '480px' }}>
                                                        <VideoEmbed url={link.url} platform={link.platform} embedUrl={link.embed_url} tiktokVideoId={link.tiktok_video_id} title={link.title} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Description */}
                        {rental.description && (
                            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] dark:text-white">Description</h2>
                                <p className="mb-4 text-gray-700 dark:text-gray-300">{rental.description}</p>

                                {rental.features && rental.features.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Features</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {rental.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="rounded-md bg-[var(--primary)]/10 px-3 py-1 text-sm font-semibold text-white dark:text-[var(--primary)]"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Rental Terms */}
                        {rental.rental_terms && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] dark:text-white">Rental Terms</h2>
                                <p className="text-gray-700 dark:text-gray-300">{rental.rental_terms}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing */}
                            {rental.price && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                    <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Rental Price</div>
                                    <div className="mb-4 text-3xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">
                                        ₵{parseFloat(rental.price).toLocaleString()}
                                    </div>
                                    {rental.period && <div className="text-sm text-gray-500">{getPeriodLabel(rental.period)}</div>}
                                </div>
                            )}

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Contact Owner</h3>
                                <div className="space-y-3">
                                    {rental.phone && (
                                        <a
                                            href={`tel:${rental.phone}`}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Phone className="h-5 w-5 text-[var(--primary)]" />
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">{rental.phone}</span>
                                        </a>
                                    )}
                                    {rental.phone_2 && (
                                        <a
                                            href={`tel:${rental.phone_2}`}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Phone className="h-5 w-5 text-[var(--primary)]" />
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">{rental.phone_2}</span>
                                        </a>
                                    )}
                                    {whatsappNumber && (
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <MessageCircle className="h-5 w-5 text-[var(--primary)]" />
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">WhatsApp</span>
                                        </a>
                                    )}
                                    {rental.email && (
                                        <a
                                            href={`mailto:${rental.email}`}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Mail className="h-5 w-5 text-[var(--primary)]" />
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">{rental.email}</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                {whatsappNumber && (
                                    <Button asChild className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]">
                                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="mr-2 h-5 w-5" />
                                            Contact via WhatsApp
                                        </a>
                                    </Button>
                                )}
                                {rental.phone && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                                    >
                                        <a href={`tel:${rental.phone}`}>
                                            <Phone className="mr-2 h-5 w-5" />
                                            Call Owner
                                        </a>
                                    </Button>
                                )}
                                {rental.phone_2 && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                                    >
                                        <a href={`tel:${rental.phone_2}`}>
                                            <Phone className="mr-2 h-5 w-5" />
                                            Call Line 2
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ReviewSection
                    reviewableType="rental"
                    reviewableId={rental?.id}
                    reviews={reviews}
                    averageRating={average_rating}
                    reviewsCount={reviews_count}
                    ratingBreakdown={rating_breakdown}
                />
            </div>
        </VisitorLayout>
    );
}
