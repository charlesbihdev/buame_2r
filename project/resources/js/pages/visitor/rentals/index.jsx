import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Search, MapPin, Home, Wrench, Tractor, Car, Store } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';

export default function Rentals() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalItems = 63;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Sample data - in real app, this would come from props/API
    const allRentals = [
        {
            name: '2-Bedroom Apartment',
            type: 'Room',
            price: 500,
            period: '/month',
            location: 'Sefwi Bekwai, Central',
            features: ['2 Bed', '1 Bath', 'Parking', 'WiFi'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc',
        },
        {
            name: 'Power Generator - 10KVA',
            type: 'Equipment',
            price: 150,
            period: '/day',
            location: 'Bibiani',
            features: ['Good Condition', 'Delivery Available'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc',
        },
        {
            name: 'Construction Tools Set',
            type: 'Tools',
            price: 50,
            period: '/day',
            location: 'Wiawso',
            features: ['Complete Set', 'Insured'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc',
        },
        {
            name: 'Farmland - 5 Acres',
            type: 'Land',
            price: 200,
            period: '/month',
            location: 'Bibiani Outskirts',
            features: ['Fertile', 'Water Access'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc',
        },
        {
            name: 'Shop Space - Main Market',
            type: 'Commercial',
            price: 800,
            period: '/month',
            location: 'Market Area',
            features: ['Prime Location', '24/7 Security'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc',
        },
        {
            name: 'Pickup Truck',
            type: 'Vehicle',
            price: 300,
            period: '/day',
            location: 'Sefwi Bekwai',
            features: ['Good Condition', 'Driver Available'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc',
        },
        {
            name: 'Retail Store Space',
            type: 'Store',
            price: 600,
            period: '/month',
            location: 'Main Market, Sefwi Bekwai',
            features: ['Prime Location', 'High Traffic', 'Parking'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc',
        },
        // Add more rentals
        ...Array.from({ length: 57 }, (_, i) => {
            const types = ['Room', 'Equipment', 'Tools', 'Land', 'Commercial', 'Vehicle', 'Store'];
            const periods = ['/day', '/week', '/month'];
            const locations = ['Sefwi Bekwai', 'Bibiani', 'Wiawso', 'Juaboso'];
            const type = types[i % types.length];

            return {
                name: `${type} Rental ${i + 7}`,
                type: type,
                price: 50 + (i % 20) * 25,
                period: periods[i % periods.length],
                location: locations[i % locations.length],
                features: ['Available Now', 'Verified'],
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZn0317PyHJ6i15ZidfB4XvE9yk2k5ithwfNkt6aHdTIraYBQjgiEqiFqbVkpiprnt-pUPZRMZG4Fc41w_yleyCcPOTaD0nEzIcliFquQJo1Dsq43Do2HWFYY0JMFdHly6YJN2b6D3-BBnrv9hfLQC24mtzwLCuEp6O87w0H7RjoLIrZ9SyJHdZCpvgNsPjYO_cD8IxN0M9wVqdst4lxi7iQz5y4BCZSUVyCkeF4G8x8VkC6uwVOEu8gy_hAJVGXzWRtMRFZRLc',
            };
        }),
    ];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRentals = allRentals.slice(startIndex, endIndex);

    return (
        <VisitorLayout>
            <Head title="Rentals - Room & Equipment | BUAME 2R" />

            {/* Hero Section */}
            <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0d1b0d]">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                    <h1 className="mb-8 text-center text-4xl font-black text-[#0d1b0d] dark:text-white md:text-5xl">
                        Rent Anything in Sefwi Bekwai
                    </h1>

                    {/* Search Bar */}
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-4 flex flex-col gap-3 rounded-xl bg-gray-50 p-4 dark:bg-[#162816] md:flex-row">
                            <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-[#0d1b0d]">
                                <Search className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="What are you looking for?"
                                    className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-[#0d1b0d] md:w-48">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <select className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-white">
                                    <option>Location</option>
                                    <option>Sefwi Bekwai</option>
                                    <option>Bibiani</option>
                                    <option>Wiawso</option>
                                </select>
                            </div>
                            <button className="rounded-lg bg-[#13ec13] px-8 py-3 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]">
                                Search
                            </button>
                        </div>

                        {/* Quick Categories */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                { icon: Home, label: 'Room', count: 15 },
                                { icon: Wrench, label: 'Tools', count: 28 },
                                { icon: Tractor, label: 'Equipment', count: 12 },
                                { icon: Car, label: 'Vehicles', count: 8 },
                                { icon: Store, label: 'Store', count: 10 },
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
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                {/* Filters Row */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Room', 'Equipment', 'Tools', 'Vehicles', 'Land', 'Store'].map((filter) => (
                            <button
                                key={filter}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                    filter === 'All'
                                        ? 'bg-[#13ec13] text-[#0d1b0d]'
                                        : 'border border-gray-300 bg-white hover:border-[#13ec13] dark:border-gray-700 dark:bg-[#162816] dark:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-[#0d1b0d] dark:text-white">{totalItems}</span> rentals available
                    </div>
                </div>

                {/* Rentals Grid - 4 columns */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentRentals.map((rental, idx) => (
                        <div
                            key={idx}
                            className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:border-[#13ec13]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#162816]"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden bg-gray-200">
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${rental.image})` }}
                                />
                                <div className="absolute right-3 top-3 rounded-full bg-[#13ec13] px-3 py-1 text-xs font-bold text-[#0d1b0d]">
                                    {rental.type}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="mb-2 text-lg font-bold text-[#0d1b0d] dark:text-white">{rental.name}</h3>

                                <div className="mb-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-4 w-4" />
                                    {rental.location}
                                </div>

                                {/* Features */}
                                <div className="mb-4 flex flex-wrap gap-1">
                                    {rental.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="rounded-md bg-[#13ec13]/10 px-2 py-0.5 text-xs font-semibold text-[#0d1b0d] dark:text-[#13ec13]"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Price & Action */}
                                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                    <div>
                                        <div className="text-xl font-black text-[#0d1b0d] dark:text-[#13ec13]">₵{rental.price}</div>
                                        <div className="text-xs text-gray-500">{rental.period}</div>
                                    </div>
                                    <Link
                                        href={`/rentals/${idx + 1}`}
                                        className="rounded-lg bg-[#13ec13] px-4 py-2 text-sm font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        mode="pagination"
                    />
                </div>
            </div>
        </VisitorLayout>
    );
}


