import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Star, Phone, Hammer, Wrench, Zap, Home, ChevronRight, BadgeCheck, Paintbrush, Scissors } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

export default function Artisans() {
    return (
        <VisitorLayout>
            <Head title="Skilled Artisans | BUAME 2R" />

            {/* Hero with Search */}
            <div className="w-full bg-gradient-to-br from-[#13ec13]/10 via-white to-[#13ec13]/5 dark:from-[#13ec13]/5 dark:via-[#0d1b0d] dark:to-[#13ec13]/5">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
                    <div className="mb-8 text-center">
                        <h1 className="mb-3 text-4xl font-black text-[#0d1b0d] dark:text-white md:text-5xl">
                            Find Expert Artisans
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Connect with verified skilled workers in Sefwi Bekwai
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-4 shadow-lg dark:bg-[#162816] md:flex-row">
                        <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
                            <Search className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for carpenters, electricians..."
                                className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700 md:w-48">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <select className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white">
                                <option>Sefwi Bekwai</option>
                                <option>Bibiani</option>
                                <option>Wiawso</option>
                            </select>
                        </div>
                        <Button className="h-12 bg-[#13ec13] px-8 font-bold text-[#0d1b0d] hover:bg-[#0fdc0f]">Search</Button>
                    </div>

                    {/* Quick Categories */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {[
                            { icon: Hammer, label: 'Carpenter', count: 24 },
                            { icon: Home, label: 'Mason', count: 18 },
                            { icon: Zap, label: 'Electrician', count: 15 },
                            { icon: Wrench, label: 'Plumber', count: 12 },
                            { icon: Paintbrush, label: 'Tiler', count: 9 },
                            { icon: Scissors, label: 'Tailor', count: 7 },
                        ].map((cat) => (
                            <button
                                key={cat.label}
                                className="flex items-center gap-2 rounded-full border-2 border-[#13ec13]/30 bg-white px-5 py-2.5 font-semibold transition-all hover:border-[#13ec13] hover:bg-[#13ec13]/10 dark:bg-[#162816]"
                            >
                                <cat.icon className="h-5 w-5 text-[#13ec13]" />
                                <span className="text-sm dark:text-white">{cat.label}</span>
                                <span className="rounded-full bg-[#13ec13]/20 px-2 py-0.5 text-xs font-bold text-[#0d1b0d] dark:text-[#13ec13]">
                                    {cat.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content - Grid Layout */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
                {/* Filter Bar */}
                <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Filter by:</span>
                    <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white">
                        <option>All Skills</option>
                        <option>Carpenter</option>
                        <option>Mason</option>
                        <option>Electrician</option>
                        <option>Plumber</option>
                        <option>Tiler</option>
                        <option>Tailor</option>
                    </select>
                    <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white">
                        <option>Experience Level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Expert</option>
                    </select>
                    <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white">
                        <option>Rating</option>
                        <option>5 Stars</option>
                        <option>4+ Stars</option>
                    </select>
                    <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#13ec13] focus:ring-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white">
                        <option>Sort: Top Rated</option>
                        <option>Most Experienced</option>
                        <option>Price: Low to High</option>
                    </select>
                    <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-[#0d1b0d] dark:text-white">47</span> artisans found
                    </div>
                </div>

                {/* Artisan Cards - Grid Layout (3-4 per row) */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[
                        {
                            name: 'Kwame Mensah',
                            skill: 'Master Carpenter',
                            rating: 4.9,
                            reviews: 42,
                            experience: '12 years',
                            price: '₵80',
                            location: 'Sefwi Bekwai',
                            verified: true,
                            specialties: ['Furniture', 'Roofing'],
                            available: true,
                        },
                        {
                            name: 'Kofi Agyeman',
                            skill: 'Expert Mason',
                            rating: 4.8,
                            reviews: 38,
                            experience: '10 years',
                            price: '₵90',
                            location: 'Bibiani',
                            verified: true,
                            specialties: ['Building', 'Tiling'],
                            available: true,
                        },
                        {
                            name: 'Emmanuel Osei',
                            skill: 'Professional Electrician',
                            rating: 4.7,
                            reviews: 29,
                            experience: '8 years',
                            price: '₵120',
                            location: 'Sefwi Bekwai',
                            verified: true,
                            specialties: ['Wiring', 'Installation'],
                            available: false,
                        },
                        {
                            name: 'Yaw Boateng',
                            skill: 'Experienced Plumber',
                            rating: 4.9,
                            reviews: 51,
                            experience: '15 years',
                            price: '₵100',
                            location: 'Wiawso',
                            verified: true,
                            specialties: ['Pipe Fitting', 'Drainage'],
                            available: true,
                        },
                        {
                            name: 'Ama Asante',
                            skill: 'Expert Tiler',
                            rating: 4.6,
                            reviews: 33,
                            experience: '9 years',
                            price: '₵70',
                            location: 'Sefwi Bekwai',
                            verified: true,
                            specialties: ['Floor Tiles', 'Wall Tiles'],
                            available: true,
                        },
                        {
                            name: 'Kofi Darko',
                            skill: 'Master Tailor',
                            rating: 4.8,
                            reviews: 45,
                            experience: '11 years',
                            price: '₵60',
                            location: 'Bibiani',
                            verified: true,
                            specialties: ['Clothing', 'Alterations'],
                            available: true,
                        },
                        {
                            name: 'Yaw Mensah',
                            skill: 'Skilled Welder',
                            rating: 4.7,
                            reviews: 28,
                            experience: '7 years',
                            price: '₵85',
                            location: 'Sefwi Bekwai',
                            verified: true,
                            specialties: ['Metal Work', 'Repairs'],
                            available: false,
                        },
                        {
                            name: 'Akosua Osei',
                            skill: 'Professional Painter',
                            rating: 4.5,
                            reviews: 22,
                            experience: '6 years',
                            price: '₵65',
                            location: 'Wiawso',
                            verified: true,
                            specialties: ['Interior', 'Exterior'],
                            available: true,
                        },
                    ].map((artisan, idx) => (
                        <Link
                            key={idx}
                            href={`/artisans/${idx + 1}`}
                            className="group flex flex-col rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-[#13ec13]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#162816]"
                        >
                            {/* Profile Image */}
                            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcdKvB3yS0jQT1WUhFWzBEjd19Hid1nN2Y3h-voRzC4wC0wCkMCdpWo6rilbyrwVFP2Te6PuVFbHpliFhNCdUBFs6yD2FYy1nkq6D0ZJcDpNNQI7rgGVGaCV7puHJ-nDgczu6CCaMfu-wWZUg8UL4G5FuPF13SoD420HjWHSAdzKVaIJUukqeyotFzpW4Bwzx1O8pE8ElXyZTN6v34kP5YMHbJYZOetijrBGoStysWkdcECk7AuvPVbmxI6I_pzIm520HkpihYVMo")',
                                    }}
                                />
                                {artisan.verified && (
                                    <div className="absolute right-2 top-2">
                                        <BadgeCheck className="h-5 w-5 fill-[#13ec13] text-white" />
                                    </div>
                                )}
                                {artisan.available && (
                                    <div className="absolute left-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
                                        Available
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex flex-1 flex-col">
                                <div className="mb-2">
                                    <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">{artisan.name}</h3>
                                    <p className="text-sm font-medium text-[#13ec13]">{artisan.skill}</p>
                                </div>

                                <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold">{artisan.rating}</span>
                                        <span className="text-gray-400">({artisan.reviews})</span>
                                    </div>
                                </div>

                                <div className="mb-3 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-3 w-3" />
                                    {artisan.location}
                                </div>

                                <div className="mb-3 flex flex-wrap gap-1">
                                    {artisan.specialties.map((spec) => (
                                        <span
                                            key={spec}
                                            className="rounded-md bg-[#13ec13]/10 px-2 py-0.5 text-xs font-semibold text-[#0d1b0d] dark:text-[#13ec13]"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xl font-black text-[#0d1b0d] dark:text-[#13ec13]">{artisan.price}</div>
                                            <div className="text-xs text-gray-500">/day</div>
                                        </div>
                                        <div className="text-xs text-gray-500">{artisan.experience}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="flex-1 border-[#13ec13] text-xs text-[#13ec13] hover:bg-[#13ec13] hover:text-[#0d1b0d]"
                                        >
                                            <Link href={`/artisans/${idx + 1}`}>View</Link>
                                        </Button>
                                        <Button className="bg-[#13ec13] text-xs text-[#0d1b0d] hover:bg-[#0fdc0f]">
                                            <Phone className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-12 text-center">
                    <Button variant="outline" className="px-8">
                        Load More Artisans
                    </Button>
                </div>
            </div>
        </VisitorLayout>
    );
}


