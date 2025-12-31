import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Star, BadgeCheck, Calendar, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ArtisanView({ artisan }) {
    // Sample data - in real app, this would come from props
    const artisanData = artisan || {
        id: 1,
        name: 'Kwame Mensah',
        skill: 'Master Carpenter',
        rating: 4.9,
        reviews: 42,
        experience: '12 years',
        price: '₵80/day',
        location: 'Sefwi Bekwai',
        verified: true,
        available: true,
        specialties: ['Furniture', 'Roofing', 'Doors & Windows'],
        phone: '+233 24 123 4567',
        whatsapp: '+233241234567',
        email: 'kwame.mensah@example.com',
        description: 'Experienced master carpenter with over 12 years of expertise in custom furniture making, roofing, and door/window installation. Known for quality craftsmanship and attention to detail.',
        portfolio: [
            'Custom dining tables',
            'Roofing installations',
            'Window and door frames',
        ],
        workingHours: 'Mon-Sat: 7:00 AM - 6:00 PM',
        responseTime: 'Usually responds within 2 hours',
    };

    const whatsappUrl = `https://wa.me/${artisanData.whatsapp.replace(/\D/g, '')}?text=Hello ${artisanData.name}, I'm interested in your ${artisanData.skill} services.`;

    return (
        <VisitorLayout>
            <Head title={`${artisanData.name} - ${artisanData.skill} | BUAME 2R`} />
            
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                {/* Back Button */}
                <Link
                    href="/artisans"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#13ec13] dark:text-gray-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Artisans
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <div className="mb-4 flex items-start gap-4">
                                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                                    <div
                                        className="h-full w-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcdKvB3yS0jQT1WUhFWzBEjd19Hid1nN2Y3h-voRzC4wC0wCkMCdpWo6rilbyrwVFP2Te6PuVFbHpliFhNCdUBFs6yD2FYy1nkq6D0ZJcDpNNQI7rgGVGaCV7puHJ-nDgczu6CCaMfu-wWZUg8UL4G5FuPF13SoD420HjWHSAdzKVaIJUukqeyotFzpW4Bwzx1O8pE8ElXyZTN6v34kP5YMHbJYZOetijrBGoStysWkdcECk7AuvPVbmxI6I_pzIm520HkpihYVMo")',
                                        }}
                                    />
                                    {artisanData.verified && (
                                        <div className="absolute right-1 top-1">
                                            <BadgeCheck className="h-5 w-5 fill-[#13ec13] text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center gap-2">
                                        <h1 className="text-2xl font-bold text-[#0d1b0d] dark:text-white">{artisanData.name}</h1>
                                        {artisanData.verified && (
                                            <BadgeCheck className="h-5 w-5 fill-[#13ec13] text-white" />
                                        )}
                                    </div>
                                    <p className="mb-2 text-lg font-medium text-[#13ec13]">{artisanData.skill}</p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold">{artisanData.rating}</span>
                                            <span className="text-gray-400">({artisanData.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {artisanData.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Award className="h-4 w-4" />
                                            {artisanData.experience} experience
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {artisanData.available ? (
                                <div className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    ✓ Available Now
                                </div>
                            ) : (
                                <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                    Currently Busy
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">About</h2>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">{artisanData.description}</p>
                            
                            <div className="mb-4">
                                <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Specialties</h3>
                                <div className="flex flex-wrap gap-2">
                                    {artisanData.specialties.map((spec) => (
                                        <span
                                            key={spec}
                                            className="rounded-md bg-[#13ec13]/10 px-3 py-1 text-sm font-semibold text-[#0d1b0d] dark:text-[#13ec13]"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {artisanData.portfolio && (
                                <div>
                                    <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Portfolio</h3>
                                    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                                        {artisanData.portfolio.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Working Hours */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-4 text-xl font-bold text-[#0d1b0d] dark:text-white">Working Hours</h2>
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <Clock className="h-5 w-5" />
                                <span>{artisanData.workingHours}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="h-4 w-4" />
                                <span>{artisanData.responseTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Pricing</h3>
                                <div className="text-3xl font-black text-[#0d1b0d] dark:text-[#13ec13]">{artisanData.price}</div>
                            </div>

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Contact</h3>
                                <div className="space-y-3">
                                    <a
                                        href={`tel:${artisanData.phone}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Phone className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{artisanData.phone}</span>
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
                                        href={`mailto:${artisanData.email}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Mail className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{artisanData.email}</span>
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
                                    <a href={`tel:${artisanData.phone}`}>
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call Now
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


