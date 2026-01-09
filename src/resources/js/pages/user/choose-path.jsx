import { Button } from '@/components/ui/button';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { Bike, Briefcase, Check, Hammer, Home, Hotel, ShoppingBag } from 'lucide-react';

const categoryIcons = {
    artisans: Hammer,
    hotels: Hotel,
    transport: Bike,
    rentals: Home,
    marketplace: ShoppingBag,
    jobs: Briefcase,
};

const categories = [
    {
        value: 'artisans',
        label: 'Artisans',
        subtitle: 'Skilled workers',
        icon: Hammer,
        popular: false,
        benefits: ['Get instant job alerts nearby', 'Showcase your portfolio', 'Secure direct payments'],
        color: 'blue',
    },
    {
        value: 'hotels',
        label: 'Hotel',
        subtitle: 'Accommodation',
        icon: Hotel,
        popular: false,
        benefits: ['List your rooms easily', 'Manage bookings online', 'Reach more guests'],
        color: 'green',
    },
    {
        value: 'transport',
        label: 'Okada',
        subtitle: 'Motorcycle & car transport',
        icon: Bike,
        popular: false,
        benefits: ['Set your own schedule', 'Keep 100% of your earnings', 'Verified driver profile'],
        color: 'orange',
    },
    {
        value: 'rentals',
        label: 'Rentals',
        subtitle: 'Property rentals',
        icon: Home,
        popular: false,
        benefits: ['List properties easily', 'Manage tenants online', 'Secure rental agreements'],
        color: 'purple',
    },
    {
        value: 'marketplace',
        label: 'Marketplace',
        subtitle: 'Buy & sell goods',
        icon: ShoppingBag,
        popular: false,
        benefits: ['Sell to the whole region', 'Manage inventory easily', 'Digital storefront included'],
        color: 'pink',
    },
    {
        value: 'jobs',
        label: 'Jobs',
        subtitle: 'Career & Hiring',
        icon: Briefcase,
        popular: false,
        benefits: ['Find verified local talent', 'Post job listings free', 'Review applicant history'],
        color: 'gray',
    },
];

export default function ChoosePath() {
    return (
        <VisitorLayout>
            <Head title="Choose Your Path - BUAME 2R" />
            <div className="bg-[#f6f8f6] py-16 dark:bg-[#102210]">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-40">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-[#0d1b0d] md:text-5xl dark:text-white">Choose Your Path</h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                            Select the category that fits your business. Whether you're an artisan, hotel owner, driver, property owner, trader, or
                            employer, we have a place for you.
                        </p>
                    </div>

                    {/* Category Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const iconColors = {
                                blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                                green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                                orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
                                purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
                                pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
                                gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
                            };

                            return (
                                <div
                                    key={category.value}
                                    className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#13ec13] hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
                                >
                                    {/* Popular Badge */}
                                    {category.popular && (
                                        <div className="absolute top-4 right-4 rounded-full bg-[#13ec13] px-3 py-1 text-xs font-bold text-white">
                                            POPULAR
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-lg ${iconColors[category.color]}`}>
                                        <Icon className="h-8 w-8" />
                                    </div>

                                    {/* Title & Subtitle */}
                                    <h3 className="mb-1 text-xl font-bold text-[#0d1b0d] dark:text-white">{category.label}</h3>
                                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{category.subtitle}</p>

                                    {/* Benefits */}
                                    <ul className="mb-6 flex-1 space-y-2">
                                        {category.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#13ec13]" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Register Button */}
                                    <Button
                                        asChild
                                        className={`w-full font-bold transition-all ${
                                            category.popular
                                                ? 'bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]'
                                                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <Link href={`/user/register?category=${category.value}`}>Register as {category.label}</Link>
                                    </Button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link href="/user/login" className="font-semibold text-[#13ec13] hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}
