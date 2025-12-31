import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RentalView({ rental }) {
    const rentalData = rental || {
        id: 1,
        name: '2-Bedroom Apartment',
        type: 'Room',
        price: 500,
        period: '/month',
        location: 'Sefwi Bekwai, Central',
        features: ['2 Bed', '1 Bath', 'Parking', 'WiFi'],
        phone: '+233 24 123 4567',
        whatsapp: '+233241234567',
        email: 'rental@example.com',
        description: 'Spacious 2-bedroom apartment in a prime location. Fully furnished with modern amenities. Perfect for families or professionals looking for comfortable accommodation.',
        details: {
            bedrooms: 2,
            bathrooms: 1,
            area: '85 sqm',
            furnished: 'Fully Furnished',
            available: 'Available Now',
        },
        terms: 'Minimum 3 months rental. Security deposit required.',
    };

    const whatsappUrl = `https://wa.me/${rentalData.whatsapp.replace(/\D/g, '')}?text=Hello, I'm interested in renting ${rentalData.name}.`;

    return (
        <VisitorLayout>
            <Head title={`${rentalData.name} - ${rentalData.type} Rental | BUAME 2R`} />
            
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                <Link
                    href="/rentals"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#13ec13] dark:text-gray-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Rentals
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Image */}
                        <div className="mb-6 h-96 overflow-hidden rounded-xl bg-gray-200">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc")',
                                }}
                            />
                        </div>

                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <h1 className="text-3xl font-bold text-[#0d1b0d] dark:text-white">{rentalData.name}</h1>
                                        <span className="rounded-full bg-[#13ec13] px-3 py-1 text-sm font-bold text-[#0d1b0d]">
                                            {rentalData.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5" />
                                        {rentalData.location}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">Description</h2>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">{rentalData.description}</p>
                            
                            <div className="mb-4">
                                <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Features</h3>
                                <div className="flex flex-wrap gap-2">
                                    {rentalData.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="rounded-md bg-[#13ec13]/10 px-3 py-1 text-sm font-semibold text-[#0d1b0d] dark:text-[#13ec13]"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-4 text-xl font-bold text-[#0d1b0d] dark:text-white">Property Details</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                                    <div className="text-lg font-semibold text-[#0d1b0d] dark:text-white">{rentalData.details.bedrooms}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                                    <div className="text-lg font-semibold text-[#0d1b0d] dark:text-white">{rentalData.details.bathrooms}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Area</div>
                                    <div className="text-lg font-semibold text-[#0d1b0d] dark:text-white">{rentalData.details.area}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Furnished</div>
                                    <div className="text-lg font-semibold text-[#0d1b0d] dark:text-white">{rentalData.details.furnished}</div>
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">Rental Terms</h2>
                            <p className="text-gray-700 dark:text-gray-300">{rentalData.terms}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Rental Price</div>
                                <div className="mb-4 text-3xl font-black text-[#0d1b0d] dark:text-[#13ec13]">₵{rentalData.price}</div>
                                <div className="text-sm text-gray-500">{rentalData.period}</div>
                            </div>

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Contact Owner</h3>
                                <div className="space-y-3">
                                    <a
                                        href={`tel:${rentalData.phone}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Phone className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{rentalData.phone}</span>
                                    </a>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <MessageCircle className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">WhatsApp</span>
                                    </a>
                                    <a
                                        href={`mailto:${rentalData.email}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Mail className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{rentalData.email}</span>
                                    </a>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    asChild
                                    className="w-full bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]"
                                >
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        Contact via WhatsApp
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full border-[#13ec13] text-[#13ec13] hover:bg-[#13ec13] hover:text-[#0d1b0d]"
                                >
                                    <a href={`tel:${rentalData.phone}`}>
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call Owner
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}


