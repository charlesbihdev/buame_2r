import { TransportImageGallery } from '@/components/visitor/transport/TransportImageGallery';
import { Button } from '@/components/ui/button';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { buildWhatsAppUrl } from '@/utils/phoneUtils';
import { Head, Link } from '@inertiajs/react';
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

export default function TransportView({ ride }) {
    if (!ride) {
        return (
            <VisitorLayout>
                <Head title="Transport Not Found | BUAME 2R" />
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    <p className="text-center text-gray-600 dark:text-gray-400">Transport service not found</p>
                </div>
            </VisitorLayout>
        );
    }

    const whatsappUrl = buildWhatsAppUrl(ride?.whatsapp, `Hello, I'm interested in booking a ride with ${ride?.company_name}.`);
    const TypeIcon = getTypeIcon(ride?.type);

    return (
        <VisitorLayout>
            <Head title={`${ride?.company_name} | BUAME 2R`} />

            {/* Hero Section */}
            <div className="w-full bg-gradient-to-br from-[#13ec13]/10 via-white to-[#13ec13]/5 dark:from-[#13ec13]/5 dark:via-[#0d1b0d] dark:to-[#13ec13]/5">
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    {/* Back Button */}
                    <Link
                        href="/transport"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#13ec13] dark:text-gray-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Transport
                    </Link>

                    {/* Profile Header */}
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#162816] md:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start">
                            {/* Transport Info */}
                            <div className="flex-1">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <h1 className="text-3xl font-black text-[#0d1b0d] dark:text-white md:text-4xl">{ride?.company_name}</h1>
                                    {ride?.is_verified && <BadgeCheck className="h-6 w-6 fill-[#13ec13] text-white" />}
                                    <span className="flex items-center gap-1 rounded-full bg-[#13ec13] px-3 py-1 text-sm font-bold text-[#0d1b0d]">
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
                                    <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        <Users className="h-4 w-4" />
                                        <span>{ride?.seats_available} seats</span>
                                    </div>
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
                            <div className="hidden shrink-0 rounded-xl border border-gray-200 bg-gradient-to-br from-[#13ec13]/5 to-[#13ec13]/10 p-4 dark:border-gray-700 dark:from-[#13ec13]/10 dark:to-[#13ec13]/5 md:block">
                                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Starting from</p>
                                <p className="text-3xl font-black text-[#0d1b0d] dark:text-[#13ec13]">GH₵{ride?.price_per_seat}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">per seat</p>
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
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-4 text-2xl font-bold text-[#0d1b0d] dark:text-white">Vehicle Images</h2>
                            <TransportImageGallery images={ride?.images || []} />
                        </div>

                        {/* About Section */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-4 text-2xl font-bold text-[#0d1b0d] dark:text-white">About {ride?.company_name}</h2>
                            <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                                {ride?.description || 'No description available.'}
                            </p>

                            {/* Operating Hours */}
                            {ride?.operating_hours && (
                                <div className="mb-4">
                                    <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-[#0d1b0d] dark:text-white">
                                        <Clock className="h-5 w-5 text-[#13ec13]" />
                                        Operating Hours
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{ride.operating_hours}</p>
                                </div>
                            )}

                            {/* Operating Locations */}
                            {ride?.operating_locations && (
                                <div>
                                    <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-[#0d1b0d] dark:text-white">
                                        <MapPin className="h-5 w-5 text-[#13ec13]" />
                                        Service Areas
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{ride.operating_locations}</p>
                                </div>
                            )}
                        </div>

                        {/* Payment Methods */}
                        {ride?.payment_methods && ride.payment_methods.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h2 className="mb-4 text-2xl font-bold text-[#0d1b0d] dark:text-white">Payment Methods</h2>
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                    {ride.payment_methods.map((method, idx) => {
                                        const Icon = paymentIcons[method.toLowerCase().replace(' ', '_')] || Wallet;
                                        return (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                                            >
                                                <Icon className="h-5 w-5 text-[#13ec13]" />
                                                <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">{method}</span>
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
                            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#13ec13]/5 to-[#13ec13]/10 p-6 dark:border-gray-700 dark:from-[#13ec13]/10 dark:to-[#13ec13]/5 md:hidden">
                                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Starting from</p>
                                <p className="text-4xl font-black text-[#0d1b0d] dark:text-[#13ec13]">GH₵{ride?.price_per_seat}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">per seat</p>
                            </div>

                            {/* Contact Actions */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Book a Ride</h3>
                                <div className="space-y-3">
                                    {whatsappUrl && (
                                        <Button asChild className="w-full bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]">
                                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                                <MessageCircle className="mr-2 h-5 w-5" />
                                                Book via WhatsApp
                                            </a>
                                        </Button>
                                    )}
                                    {ride?.phone && (
                                        <Button asChild variant="outline" className="w-full border-[#13ec13] text-[#13ec13] hover:bg-[#13ec13] hover:text-[#0d1b0d]">
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
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Contact Information</h3>
                                <div className="space-y-3 text-sm">
                                    {ride?.phone && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <Phone className="h-4 w-4 text-[#13ec13]" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{ride.phone}</span>
                                        </div>
                                    )}
                                    {ride?.email && (
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <Mail className="h-4 w-4 text-[#13ec13]" />
                                            <span className="break-all font-medium text-gray-700 dark:text-gray-300">{ride.email}</span>
                                        </div>
                                    )}
                                    {ride?.address && (
                                        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#13ec13]" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{ride.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Why Choose Us?</h3>
                                <div className="space-y-3 text-sm">
                                    {ride?.is_verified && (
                                        <div className="flex items-start gap-3">
                                            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 fill-[#13ec13] text-white" />
                                            <div>
                                                <p className="font-semibold text-[#0d1b0d] dark:text-white">Verified Service</p>
                                                <p className="text-gray-600 dark:text-gray-400">Verified by BUAME 2R</p>
                                            </div>
                                        </div>
                                    )}
                                    {ride?.rating && (
                                        <div className="flex items-start gap-3">
                                            <Star className="mt-0.5 h-5 w-5 shrink-0 fill-yellow-400 text-yellow-400" />
                                            <div>
                                                <p className="font-semibold text-[#0d1b0d] dark:text-white">Highly Rated</p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {ride.rating}/5.0 from {ride.reviews_count} reviews
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {ride?.seats_available && (
                                        <div className="flex items-start gap-3">
                                            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#13ec13]" />
                                            <div>
                                                <p className="font-semibold text-[#0d1b0d] dark:text-white">Available Capacity</p>
                                                <p className="text-gray-600 dark:text-gray-400">{ride.seats_available} seats available</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}
