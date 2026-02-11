import { Button } from '@/components/ui/button';
import { ReviewSection } from '@/components/ui/review-section';
import { CautionBanner } from '@/components/ui/caution-banner';
import { TransportImageGallery } from '@/components/visitor/transport/TransportImageGallery';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { buildWhatsAppUrl } from '@/utils/phoneUtils';
import { Head } from '@inertiajs/react'; // Removed Link as it's no longer directly used
import { BackToHome } from '@/components/ui/back-to-home';
import {
    ArrowLeft,
    BadgeCheck,
    Bike,
    Bus,
    Car,
    Clock,
    CreditCard,
    Eye,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Star,
    Truck,
    Users,
    Wallet,
} from 'lucide-react';

// Transport type icon mapping
const typeIcons = {
    okada: Bike,
    car: Car,
    taxi: Car,
    bus: Bus,
    cargo: Truck,
    other: Car,
};

const getTypeIcon = (type) => {
    return typeIcons[type] || Car;
};

// Format transport type for display
const formatTransportType = (type) => {
    const labels = {
        okada: 'Okada',
        car: 'Car',
        taxi: 'Taxi',
        bus: 'Bus',
        cargo: 'Cargo',
        other: 'Other',
    };
    return labels[type] || type;
};

// Payment method icons
const paymentIcons = {
    cash: Wallet,
    mobile_money: Phone,
    bank_transfer: CreditCard,
    card: CreditCard,
};

export default function TransportView({ ride, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
    if (!ride) {
        return (
            <VisitorLayout>
                <Head title="Transport Not Found">
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    <p className="text-center text-gray-600 dark:text-gray-400">Transport service not found</p>
                </div>
            </VisitorLayout>
        );
    }

    const whatsappUrl = buildWhatsAppUrl(ride?.whatsapp, `Hello, I'm interested in booking a ride with ${ride?.driver_name}.`);
    const TypeIcon = getTypeIcon(ride?.type);
    const rideDescription = ride?.description ? ride.description.substring(0, 150) : `${formatTransportType(ride?.type)} service in ${ride?.location}`;
    const hasPricing = !!ride?.price_per_seat;

    return (
        <VisitorLayout>
            <Head title={`${ride?.driver_name} - ${formatTransportType(ride?.type)}`}>
                <meta name="description" content={`${ride?.driver_name} - ${formatTransportType(ride?.type)} service in ${ride?.location}.${hasPricing ? ` ${ride?.seats_available} seats available at GH₵${ride?.price_per_seat}/seat.` : ''} ${rideDescription}${rideDescription.length >= 150 ? '...' : ''}`} />
                <meta name="keywords" content={`${ride?.driver_name}, ${formatTransportType(ride?.type)}, ${ride?.location}, transport, rides, book ride, Ghana transport, 2RBUAME`} />
                <meta property="og:title" content={`${ride?.driver_name} - ${formatTransportType(ride?.type)} | 2RBUAME Transport`} />
                <meta property="og:description" content={`Book a ${formatTransportType(ride?.type)} ride with ${ride?.driver_name} in ${ride?.location}.${hasPricing ? ` GH₵${ride?.price_per_seat}/seat.` : ''}`} />
                <meta property="og:type" content="website" />
                {ride?.image && <meta property="og:image" content={ride.image} />}
                <meta name="twitter:title" content={`${ride?.driver_name} - ${formatTransportType(ride?.type)} | 2RBUAME`} />
                <meta name="twitter:description" content={`Book a ${formatTransportType(ride?.type)} ride with ${ride?.driver_name} in ${ride?.location}.`} />
                {ride?.image && <meta name="twitter:image" content={ride.image} />}
            </Head>

            {/* Hero Section */}
            <div className="w-full bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--primary)]/5 dark:from-[var(--primary)]/5 dark:via-[var(--foreground)] dark:to-[var(--primary)]/5">
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    {/* Back Button */}
                    <BackToHome to="/transport" label="Back to Transport" />

                    {/* Caution Banner */}
                    <CautionBanner type="service" className="mb-8" />

                    {/* Profile Header */}
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 dark:border-gray-800 dark:bg-[var(--card)]">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start">
                            {/* Transport Info */}
                            <div className="flex-1">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <h1 className="text-3xl font-black text-[var(--foreground)] md:text-4xl dark:text-white">{ride?.driver_name}</h1>
                                    {ride?.is_verified && <BadgeCheck className="h-6 w-6 fill-[var(--primary)] text-white" />}
                                    <span className="flex items-center gap-1 rounded-full bg-[var(--primary)] px-3 py-1 text-sm font-bold text-white">
                                        <TypeIcon className="h-4 w-4" />
                                        {formatTransportType(ride?.type)}
                                    </span>
                                </div>

                                {/* Quick Stats */}
                                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span>{ride?.rating}</span>
                                        <span className="text-xs opacity-75">({ride?.reviews_count} reviews)</span>
                                    </div>
                                    {ride?.seats_available > 0 && (
                                        <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                            <Users className="h-4 w-4" />
                                            <span>{ride?.seats_available} seats</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        <Eye className="h-4 w-4" />
                                        <span>{ride?.views_count} views</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm font-medium">{ride?.location}</span>
                                    </div>
                                    {ride?.is_active ? (
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                            Currently Unavailable
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Pricing Card - Desktop */}
                            <div className="hidden shrink-0 rounded-xl border border-gray-200 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 p-4 md:block dark:border-gray-700 dark:from-[var(--primary)]/10 dark:to-[var(--primary)]/5">
                                {ride?.price_per_seat ? (
                                    <>
                                        <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Starting from</p>
                                        <p className="text-3xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">GH₵{ride?.price_per_seat}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">per seat</p>
                                    </>
                                ) : (
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Charged based on distance</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">Vehicle Images</h2>
                            <TransportImageGallery images={ride?.images || []} />
                        </div>

                        {/* About Section */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">About {ride?.driver_name}</h2>
                            <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                                {ride?.description || 'No description available.'}
                            </p>

                            {/* Operating Hours */}
                            {ride?.operating_hours && (
                                <div className="mb-4">
                                    <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-[var(--foreground)] dark:text-white">
                                        <Clock className="h-5 w-5 text-[var(--primary)]" />
                                        Operating Hours
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{ride.operating_hours}</p>
                                </div>
                            )}

                            {/* Operating Locations */}
                            {ride?.operating_locations && (
                                <div>
                                    <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-[var(--foreground)] dark:text-white">
                                        <MapPin className="h-5 w-5 text-[var(--primary)]" />
                                        Service Areas
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{ride.operating_locations}</p>
                                </div>
                            )}
                        </div>

                        {/* Payment Methods */}
                        {ride?.payment_methods && ride.payment_methods.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">Payment Methods</h2>
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                    {ride.payment_methods.map((method, idx) => {
                                        const Icon = paymentIcons[method.toLowerCase().replace(' ', '_')] || Wallet;
                                        return (
                                            <div key={idx} className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                                                <Icon className="h-5 w-5 text-[var(--primary)]" />
                                                <span className="text-sm font-medium text-gray-700 capitalize dark:text-gray-300">{method}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing Card - Mobile */}
                            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 p-6 md:hidden dark:border-gray-700 dark:from-[var(--primary)]/10 dark:to-[var(--primary)]/5">
                                {ride?.price_per_seat ? (
                                    <>
                                        <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Starting from</p>
                                        <p className="text-4xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">GH₵{ride?.price_per_seat}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">per seat</p>
                                    </>
                                ) : (
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Charged based on distance</p>
                                )}
                            </div>

                            {/* Contact Actions */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Book a Ride</h3>
                                <div className="space-y-3">
                                    {whatsappUrl && (
                                        <Button asChild className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]">
                                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                                <MessageCircle className="mr-2 h-5 w-5" />
                                                Book via WhatsApp
                                            </a>
                                        </Button>
                                    )}
                                    {ride?.phone && (
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                                        >
                                            <a href={`tel:${ride.phone}`}>
                                                <Phone className="mr-2 h-5 w-5" />
                                                Call to Book
                                            </a>
                                        </Button>
                                    )}
                                    {ride?.email && (
                                        <Button asChild variant="outline" className="w-full">
                                            <a href={`mailto:${ride.email}`}>
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
                                    {ride?.phone && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{ride.phone}</span>
                                        </div>
                                    )}
                                    {ride?.email && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <Mail className="h-4 w-4 text-[var(--primary)]" />
                                            <span className="font-medium break-all text-gray-700 dark:text-gray-300">{ride.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Why Choose Us?</h3>
                                <div className="space-y-3 text-sm">
                                    {ride?.is_verified && (
                                        <div className="flex items-start gap-3">
                                            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 fill-[var(--primary)] text-white" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Verified Service</p>
                                                <p className="text-gray-600 dark:text-gray-400">Verified by 2RBUAME</p>
                                            </div>
                                        </div>
                                    )}
                                    {ride?.rating > 0 && (
                                        <div className="flex items-start gap-3">
                                            <Star className="mt-0.5 h-5 w-5 shrink-0 fill-yellow-400 text-yellow-400" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Highly Rated</p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {ride.rating}/5.0 from {ride.reviews_count} reviews
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {ride?.seats_available > 0 && (
                                        <div className="flex items-start gap-3">
                                            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Available Capacity</p>
                                                <p className="text-gray-600 dark:text-gray-400">{ride.seats_available} seats available</p>
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
                    reviewableType="transport"
                    reviewableId={ride?.id}
                    reviews={reviews}
                    averageRating={average_rating}
                    reviewsCount={reviews_count}
                    ratingBreakdown={rating_breakdown}
                />
            </div>
        </VisitorLayout>
    );
}
