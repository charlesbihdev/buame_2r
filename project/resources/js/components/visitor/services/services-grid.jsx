import { ServiceCard } from './service-card';
import { Wrench, Hotel, Bike, Home, ShoppingBag, Briefcase } from 'lucide-react';

export function ServicesGrid() {
    const services = [
        {
            icon: Wrench,
            category: 'Skilled Labor',
            title: 'Artisans',
            description: 'Find skilled carpenters, masons, electricians, and plumbers nearby tailored for your construction needs.',
            image: '/assets/visitors/services/artisans.jpg',
            buttonText: 'Explore Artisans',
            buttonUrl: '/services?category=artisans',
        },
        {
            icon: Hotel,
            category: 'Accommodation',
            title: 'Hotel',
            description: 'Discover comfortable hotels and guest houses for short or long stays in the Western North Region.',
            image: '/assets/visitors/services/hotel.jpg',
            buttonText: 'Find Hotels',
            buttonUrl: '/food-stay?category=hotel',
        },
        {
            icon: Bike,
            category: 'Mobility',
            title: 'Okada',
            description: 'Book reliable motorcycle taxis (Okada) for quick and affordable transportation across town.',
            image: '/assets/visitors/services/okada.jpg',
            buttonText: 'Book Okada',
            buttonUrl: '/services?category=okada',
        },
        {
            icon: Home,
            category: 'Property',
            title: 'Rentals',
            description: 'Find houses, apartments, and commercial spaces for rent in Sefwi Bekwai and surrounding areas.',
            image: '/assets/visitors/services/rentals.jpg',
            buttonText: 'Browse Rentals',
            buttonUrl: '/services?category=rentals',
        },
        {
            icon: ShoppingBag,
            category: 'E-Commerce',
            title: 'Marketplace',
            description: 'Buy and sell electronics, furniture, food, agriculture products, clothes, and more in our general marketplace.',
            image: '/assets/visitors/services/marketplace.jpg',
            buttonText: 'Browse Marketplace',
            buttonUrl: '/marketplace',
        },
        {
            icon: Briefcase,
            category: 'Employment',
            title: 'Jobs',
            description:
                'Connect with local employers or find your next hire. Whether you need farm hands, shop assistants, or office staff, BUAME 2R bridges the gap between talent and opportunity.',
            image: '/assets/visitors/services/jobs.jpg',
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

