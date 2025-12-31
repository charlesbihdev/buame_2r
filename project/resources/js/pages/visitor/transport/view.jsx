import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Star, Users, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TransportView({ ride }) {
    const rideData = ride || {
        id: 1,
        company: 'VIP Transport',
        type: 'VIP Bus',
        location: 'Sefwi Bekwai',
        distance: '2.5 km away',
        price: 80,
        seats: 12,
        rating: 4.8,
        phone: '+233 24 123 4567',
        whatsapp: '+233241234567',
        email: 'vip.transport@example.com',
        description: 'Reliable VIP bus service connecting Sefwi Bekwai to major cities. Comfortable seating, air conditioning, and professional drivers.',
        routes: ['Bekwai → Kumasi', 'Bekwai → Accra', 'Bekwai → Takoradi'],
        operatingHours: 'Daily: 5:00 AM - 8:00 PM',
        paymentMethods: ['Cash', 'Mobile Money'],
    };

    const whatsappUrl = `https://wa.me/${rideData.whatsapp.replace(/\D/g, '')}?text=Hello, I'm interested in booking a ride with ${rideData.company}.`;

    return (
        <VisitorLayout>
            <Head title={`${rideData.company} - ${rideData.type} | BUAME 2R`} />
            
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                <Link
                    href="/transport"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#13ec13] dark:text-gray-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Transport
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Image */}
                        <div className="mb-6 h-96 overflow-hidden rounded-xl bg-gray-200">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA")',
                                }}
                            />
                        </div>

                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <h1 className="text-3xl font-bold text-[#0d1b0d] dark:text-white">{rideData.company}</h1>
                                        <span className="rounded-full bg-[#13ec13] px-3 py-1 text-sm font-bold text-[#0d1b0d]">
                                            {rideData.type}
                                        </span>
                                    </div>
                                    <div className="mb-3 flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold">{rideData.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                            <Users className="h-5 w-5" />
                                            <span>{rideData.seats} seats</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                            <Navigation className="h-5 w-5" />
                                            <span>{rideData.distance}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5" />
                                        {rideData.location}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">About</h2>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">{rideData.description}</p>
                            
                            <div className="mb-4">
                                <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Available Routes</h3>
                                <div className="flex flex-wrap gap-2">
                                    {rideData.routes.map((route, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded-md bg-[#13ec13]/10 px-3 py-1 text-sm font-semibold text-[#0d1b0d] dark:text-[#13ec13]"
                                        >
                                            {route}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Operating Hours</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{rideData.operatingHours}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Price per seat</div>
                                <div className="mb-4 text-3xl font-black text-[#0d1b0d] dark:text-[#13ec13]">₵{rideData.price}</div>
                            </div>

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Contact</h3>
                                <div className="space-y-3">
                                    <a
                                        href={`tel:${rideData.phone}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Phone className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{rideData.phone}</span>
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
                                        href={`mailto:${rideData.email}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Mail className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{rideData.email}</span>
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
                                        Book via WhatsApp
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full border-[#13ec13] text-[#13ec13] hover:bg-[#13ec13] hover:text-[#0d1b0d]"
                                >
                                    <a href={`tel:${rideData.phone}`}>
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call to Book
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


