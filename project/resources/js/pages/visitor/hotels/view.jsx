import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Star, Wifi, Car, UtensilsCrossed, Wind, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HotelView({ hotel }) {
    const hotelData = hotel || {
        id: 1,
        name: 'Peace Guest House',
        type: 'Hotel',
        rating: 4.5,
        reviews: 120,
        price: 150,
        location: 'Bibiani Road, Sefwi Bekwai',
        amenities: [
            { icon: Wifi, label: 'Free WiFi' },
            { icon: Car, label: 'Parking' },
            { icon: UtensilsCrossed, label: 'Restaurant' },
            { icon: Wind, label: 'Air Conditioning' },
        ],
        phone: '+233 24 123 4567',
        whatsapp: '+233241234567',
        email: 'peace.guesthouse@example.com',
        description: 'A comfortable and affordable guest house located in the heart of Sefwi Bekwai. Perfect for both short and long stays with modern amenities and excellent service.',
        features: ['24/7 Reception', 'Room Service', 'Laundry Service', 'Tourist Information'],
        checkIn: '2:00 PM',
        checkOut: '11:00 AM',
        rooms: 15,
    };

    const whatsappUrl = `https://wa.me/${hotelData.whatsapp.replace(/\D/g, '')}?text=Hello, I'm interested in booking at ${hotelData.name}.`;

    return (
        <VisitorLayout>
            <Head title={`${hotelData.name} | BUAME 2R`} />
            
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                <Link
                    href="/hotels"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#13ec13] dark:text-gray-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Hotels
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
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
                                        <h1 className="text-3xl font-bold text-[#0d1b0d] dark:text-white">{hotelData.name}</h1>
                                        <span className="rounded-full bg-[#13ec13] px-3 py-1 text-sm font-bold text-[#0d1b0d]">
                                            {hotelData.type}
                                        </span>
                                    </div>
                                    <div className="mb-3 flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-lg font-bold">{hotelData.rating}</span>
                                        <span className="text-gray-500">({hotelData.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5" />
                                        {hotelData.location}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">About</h2>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">{hotelData.description}</p>
                            
                            <div className="mb-4">
                                <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Features</h3>
                                <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                                    {hotelData.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-4 text-xl font-bold text-[#0d1b0d] dark:text-white">Amenities</h2>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                {hotelData.amenities.map((amenity, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                                    >
                                        <amenity.icon className="h-5 w-5 text-[#13ec13]" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{amenity.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Check-in/out */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-4 text-xl font-bold text-[#0d1b0d] dark:text-white">Check-in & Check-out</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-[#13ec13]" />
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Check-in</div>
                                        <div className="font-semibold text-[#0d1b0d] dark:text-white">{hotelData.checkIn}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-[#13ec13]" />
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Check-out</div>
                                        <div className="font-semibold text-[#0d1b0d] dark:text-white">{hotelData.checkOut}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Starting from</div>
                                <div className="mb-4 text-3xl font-black text-[#0d1b0d] dark:text-[#13ec13]">₵{hotelData.price}</div>
                                <div className="text-sm text-gray-500">per night</div>
                                <div className="mt-2 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                    <Users className="h-4 w-4" />
                                    {hotelData.rooms} rooms available
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Contact</h3>
                                <div className="space-y-3">
                                    <a
                                        href={`tel:${hotelData.phone}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Phone className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{hotelData.phone}</span>
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
                                        href={`mailto:${hotelData.email}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Mail className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{hotelData.email}</span>
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
                                    <a href={`tel:${hotelData.phone}`}>
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


