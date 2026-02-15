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
        benefits: ['Customers come looking, you just show up', 'Let your work speak with a stunning portfolio'],
        color: 'blue',
    },
    {
        value: 'hotels',
        label: 'Hotel',
        subtitle: 'Accommodation',
        icon: Hotel,
        popular: false,
        benefits: ['Put your hotel on the map, literally', 'Show off your rooms with beautiful photos', 'Guests find you before they find your competition'],
        color: 'green',
    },
    {
        value: 'transport',
        label: 'Okada / Transport',
        subtitle: 'Motorcycle & car transport',
        icon: Bike,
        popular: false,
        benefits: ['Passengers find you, no middleman, no commission', 'Your profile, your number, your customers', 'Build a name people trust on the road'],
        color: 'orange',
    },
    {
        value: 'rentals',
        label: 'Rentals',
        subtitle: 'Property rentals',
        icon: Home,
        popular: false,
        benefits: ['Your property seen by hundreds of renters', 'Upload photos and fill vacancies faster', 'No agent stress, tenants contact you direct'],
        color: 'purple',
    },
    {
        value: 'marketplace',
        label: 'Marketplace',
        subtitle: 'Buy & sell goods',
        icon: ShoppingBag,
        popular: false,
        benefits: ['Showcase your products to ready buyers', 'Your own profile, like a shop that never closes', 'Buyers call you direct, no middleman'],
        color: 'pink',
    },
    {
        value: 'jobs',
        label: 'Jobs',
        subtitle: 'Career & Hiring',
        icon: Briefcase,
        popular: false,
        benefits: ['Post a job and let the right people find it', 'Tap into a pool of skilled, local workers', 'They come to you, no endless searching'],
        color: 'gray',
    },
];

export default function ChoosePath() {
    return (
        <VisitorLayout>
            <Head title="Choose Your Path - 2RBUAME" />
            <div className="bg-background py-16">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-40">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Choose Your Path</h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Select the category that fits your business. Whether you're an artisan, hotel owner, driver, property owner, trader, or
                            employer, we have a place for you.
                        </p>
                    </div>

                    {/* Category Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const iconColors = {
                                blue: 'bg-accent/10 text-accent',
                                green: 'bg-primary/10 text-primary',
                                orange: 'bg-secondary/20 text-secondary-foreground',
                                purple: 'bg-accent/10 text-accent',
                                pink: 'bg-secondary/20 text-secondary-foreground',
                                gray: 'bg-muted text-muted-foreground',
                            };

                            return (
                                <div
                                    key={category.value}
                                    className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg"
                                >
                                    {/* Popular Badge */}
                                    {category.popular && (
                                        <div className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                                            POPULAR
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-lg ${iconColors[category.color]}`}>
                                        <Icon className="h-8 w-8" />
                                    </div>

                                    {/* Title & Subtitle */}
                                    <h3 className="mb-1 text-xl font-bold text-foreground">{category.label}</h3>
                                    <p className="mb-4 text-sm text-muted-foreground">{category.subtitle}</p>

                                    {/* Benefits */}
                                    <ul className="mb-6 flex-1 space-y-2">
                                        {category.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Register Button */}
                                    <Button
                                        asChild
                                        className={`w-full font-bold transition-all ${
                                            category.popular
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                : 'border border-border bg-card text-foreground hover:bg-muted'
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
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/user/login" className="font-semibold text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}
