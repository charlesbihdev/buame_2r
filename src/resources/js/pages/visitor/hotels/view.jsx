import { HotelImageGallery } from '@/components/visitor/hotels/HotelImageGallery';
import { Button } from '@/components/ui/button';
import { ReviewSection } from '@/components/ui/review-section';
import { CautionBanner } from '@/components/ui/caution-banner';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { buildWhatsAppUrl } from '@/utils/phoneUtils';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    BadgeCheck,
    Calendar,
    Clock,
    Eye,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Star,
    Users,
    Wifi,
    Car,
    UtensilsCrossed,
    Wind,
} from 'lucide-react';

// Amenity icon mapping
const amenityIcons = {
    WiFi: Wifi,
    'Free WiFi': Wifi,
    Wifi: Wifi,
    Parking: Car,
    'Air Conditioning': Wind,
    AC: Wind,
    Restaurant: UtensilsCrossed,
    Bar: UtensilsCrossed,
    'Swimming Pool': Users,
    Gym: Users,
    Spa: Users,
    'Room Service': UtensilsCrossed,
    Laundry: Users,
    'Business Center': Users,
    'Conference Room': Users,
    '24/7 Reception': Clock,
    Security: BadgeCheck,
    'Pet Friendly': Users,
    'Airport Shuttle': Car,
    'Breakfast Included': UtensilsCrossed,
    Kitchen: UtensilsCrossed,
    TV: Users,
    'Hot Water': Wind,
};

const getAmenityIcon = (amenity) => {
    return amenityIcons[amenity] || Users;
};

export default function HotelView({ hotel, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
    if (!hotel) {
        return (
            <VisitorLayout>
                <Head title="Hotel Not Found | 2RBUAME" />
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    <p className="text-center text-gray-600 dark:text-gray-400">Hotel not found</p>
                </div>
            </VisitorLayout>
        );
    }

    const whatsappUrl = buildWhatsAppUrl(hotel?.whatsapp, `Hello, I'm interested in booking at ${hotel?.name}.`);

    // Format hotel type
    const formatHotelType = (type) => {
        return type
            ?.replace('_', ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <VisitorLayout>
            <Head title={`${hotel?.name} | 2RBUAME`} />

            {/* Hero Section */}
            <div className="w-full bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--primary)]/5 dark:from-[var(--primary)]/5 dark:via-[var(--foreground)] dark:to-[var(--primary)]/5">
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    {/* Back Button */}
                    <Link
                        href="/hotels"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[var(--primary)] dark:text-gray-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Hotels
                    </Link>

                    {/* Caution Banner */}
                    <CautionBanner type="service" className="mb-8" />

                    {/* Profile Header */}
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[var(--card)] md:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start">
                            {/* Hotel Info */}
                            <div className="flex-1">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <h1 className="text-3xl font-black text-[var(--foreground)] dark:text-white md:text-4xl">{hotel?.name}</h1>
                                    {hotel?.is_verified && <BadgeCheck className="h-6 w-6 fill-[var(--primary)] text-white" />}
                                    <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-sm font-bold text-white">
                                        {formatHotelType(hotel?.type)}
                                    </span>
                                </div>

                                {/* Quick Stats */}
                                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span>{hotel?.rating}</span>
                                        <span className="text-xs opacity-75">({hotel?.reviews_count} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        <Users className="h-4 w-4" />
                                        <span>{hotel?.rooms_count} rooms</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        <Eye className="h-4 w-4" />
                                        <span>{hotel?.views_count} views</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm font-medium">{hotel?.location}</span>
                                    </div>
                                    {hotel?.is_active ? (
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            ● Available
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                            ● Currently Unavailable
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Pricing Card - Desktop */}
                            <div className="hidden shrink-0 rounded-xl border border-gray-200 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 p-4 dark:border-gray-700 dark:from-[var(--primary)]/10 dark:to-[var(--primary)]/5 md:block">
                                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Starting from</p>
                                <p className="text-3xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">GH₵{hotel?.price_per_night}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">per night</p>
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
                            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">Property Images</h2>
                            <HotelImageGallery images={hotel?.images || []} />
                        </div>

                        {/* About Section */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">About {hotel?.name.split(' ')[0]}</h2>
                            <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                                {hotel?.description || 'No description available.'}
                            </p>

                            {/* Features */}
                            {hotel?.features && hotel.features.length > 0 && (
                                <div>
                                    <h3 className="mb-3 text-lg font-bold text-[var(--foreground)] dark:text-white">Features & Services</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {hotel.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="rounded-lg bg-[var(--primary)]/10 px-4 py-2 text-sm font-semibold text-white dark:text-[var(--primary)]"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Amenities */}
                        {hotel?.amenities && hotel.amenities.length > 0 && (
                            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">Amenities</h2>
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                    {hotel.amenities.map((amenity, idx) => {
                                        const Icon = getAmenityIcon(amenity);
                                        return (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                                            >
                                                <Icon className="h-5 w-5 text-[var(--primary)]" />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{amenity}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Check-in/Check-out */}
                        {(hotel?.check_in_time || hotel?.check_out_time) && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] dark:text-white">Check-in & Check-out</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {hotel.check_in_time && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                                            <Calendar className="h-5 w-5 text-[var(--primary)]" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Check-in</div>
                                                <div className="font-semibold text-[var(--foreground)] dark:text-white">{hotel.check_in_time}</div>
                                            </div>
                                        </div>
                                    )}
                                    {hotel.check_out_time && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                                            <Calendar className="h-5 w-5 text-[var(--primary)]" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Check-out</div>
                                                <div className="font-semibold text-[var(--foreground)] dark:text-white">{hotel.check_out_time}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing Card - Mobile */}
                            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 p-6 dark:border-gray-700 dark:from-[var(--primary)]/10 dark:to-[var(--primary)]/5 md:hidden">
                                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Starting from</p>
                                <p className="text-4xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">GH₵{hotel?.price_per_night}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">per night</p>
                            </div>

                            {/* Contact Actions */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Get in Touch</h3>
                                <div className="space-y-3">
                                    {whatsappUrl && (
                                        <Button asChild className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]">
                                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                                <MessageCircle className="mr-2 h-5 w-5" />
                                                Book via WhatsApp
                                            </a>
                                        </Button>
                                    )}
                                    {hotel?.phone && (
                                        <Button asChild variant="outline" className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white">
                                            <a href={`tel:${hotel.phone}`}>
                                                <Phone className="mr-2 h-5 w-5" />
                                                Call to Book
                                            </a>
                                        </Button>
                                    )}
                                    {hotel?.email && (
                                        <Button asChild variant="outline" className="w-full">
                                            <a href={`mailto:${hotel.email}`}>
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
                                    {hotel?.phone && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{hotel.phone}</span>
                                        </div>
                                    )}
                                    {hotel?.email && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <Mail className="h-4 w-4 text-[var(--primary)]" />
                                            <span className="break-all font-medium text-gray-700 dark:text-gray-300">{hotel.email}</span>
                                        </div>
                                    )}
                                    {hotel?.address && (
                                        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{hotel.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Why Choose {hotel?.name.split(' ')[0]}?</h3>
                                <div className="space-y-3 text-sm">
                                    {hotel?.is_verified && (
                                        <div className="flex items-start gap-3">
                                            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 fill-[var(--primary)] text-white" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Verified Property</p>
                                                <p className="text-gray-600 dark:text-gray-400">Verified by 2RBUAME</p>
                                            </div>
                                        </div>
                                    )}
                                    {hotel?.rating && (
                                        <div className="flex items-start gap-3">
                                            <Star className="mt-0.5 h-5 w-5 shrink-0 fill-yellow-400 text-yellow-400" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Highly Rated</p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {hotel.rating}/5.0 from {hotel.reviews_count} reviews
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {hotel?.rooms_count && (
                                        <div className="flex items-start gap-3">
                                            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" />
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] dark:text-white">Spacious Accommodation</p>
                                                <p className="text-gray-600 dark:text-gray-400">{hotel.rooms_count} rooms available</p>
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
                    reviewableType="hotel"
                    reviewableId={hotel?.id}
                    reviews={reviews}
                    averageRating={average_rating}
                    reviewsCount={reviews_count}
                    ratingBreakdown={rating_breakdown}
                />
            </div>
        </VisitorLayout>
    );
}
