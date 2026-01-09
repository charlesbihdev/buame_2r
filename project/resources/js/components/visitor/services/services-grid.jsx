import { Bike, Briefcase, Home, Hotel, ShoppingBag, Wrench } from 'lucide-react';
import { ServiceCard } from './service-card';

export function ServicesGrid() {
    const services = [
        {
            icon: Wrench,
            category: 'Skilled Labor',
            title: 'Artisans',
            description: 'Find skilled carpenters, masons, electricians, and plumbers nearby tailored for your construction needs.',
            image: '/assets/visitors/artisan.jpg',
            buttonText: 'Explore Artisans',
            buttonUrl: '/artisans',
        },
        {
            icon: Hotel,
            category: 'Accommodation',
            title: 'Hotel',
            description: 'Discover comfortable hotels and guest houses for short or long stays in the Western North Region.',
            image: '/assets/visitors/hotels.jpg',
            buttonText: 'Find Hotels',
            buttonUrl: '/hotels',
        },
        {
            icon: Bike,
            category: 'Mobility',
            title: 'Okada & Cars',
            description: 'Book reliable motorcycle taxis (Okada) and cars for quick and affordable transportation across town.',
            image: '/assets/visitors/okada2.jpg',
            buttonText: 'Book Ride',
            buttonUrl: '/transport',
        },
        {
            icon: Home,
            category: 'Property',
            title: 'Rentals',
            description: 'Find houses, apartments, and commercial spaces for rent in Sefwi Bekwai and surrounding areas.',
            image: '/assets/visitors/hotels1.jpg',
            buttonText: 'Browse Rentals',
            buttonUrl: '/rentals',
        },
        {
            icon: ShoppingBag,
            category: 'E-Commerce',
            title: 'Marketplace',
            description: 'Buy and sell electronics, furniture, food, agriculture products, clothes, and more in our general marketplace.',
            image: '/assets/visitors/marketplace.jpg',
            buttonText: 'Browse Marketplace',
            buttonUrl: '/marketplace',
        },
        {
            icon: Briefcase,
            category: 'Employment',
            title: 'Jobs',
            description:
                'Connect with local employers or find your next hire. Whether you need farm hands, shop assistants, or office staff, BUAME 2R bridges the gap between talent and opportunity.',
            image: '/assets/visitors/jobs.jpg',
            buttonText: 'Find a Job',
            buttonUrl: '/jobs',
            secondaryButtonText: 'Post a Job',
            secondaryButtonUrl: '/jobs',
            fullWidth: true,
        },
    ];

    return (
        <section className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
            ))}
        </section>
    );
}
