import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export function CategoriesSection() {
    const categories = [
        {
            name: 'Artisans',
            description: 'Skilled workers',
            url: '/artisans',
            image: '/assets/visitors/artisan.jpg',
        },
        {
            name: 'Hotel',
            description: 'Accommodation',
            url: '/hotels',
            image: '/assets/visitors/hotels.jpg',
        },
        {
            name: 'Okada & Cars',
            description: 'Motorcycle & car transport',
            url: '/transport',
            image: '/assets/visitors/okada2.jpg',
        },
        {
            name: 'Rentals',
            description: 'Property rentals',
            url: '/rentals',
            image: '/assets/visitors/hotels1.jpg',
        },
        {
            name: 'Marketplace',
            description: 'Buy & sell goods',
            url: '/marketplace',
            image: '/assets/visitors/marketplace.jpg',
        },
        {
            name: 'Jobs',
            description: 'Career & Hiring',
            url: '/jobs',
            image: '/assets/visitors/jobs.jpg',
        },
    ];

    return (
        <section className="bg-background px-4 py-16 md:px-8 lg:px-40">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h2 className="mb-2 text-3xl font-bold text-foreground">Browse Categories</h2>
                        <p className="text-muted-foreground">Explore diverse opportunities across Western North and beyond. We welcome customers from all backgrounds.</p>
                    </div>
                    <Link href="/services" className="flex items-center gap-1 font-bold text-primary transition-all hover:gap-2">
                        View All Categories <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.url}
                            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg"
                        >
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                                <div
                                    className="absolute inset-0 bg-cover bg-top transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">{category.name}</h3>
                                <p className="mt-1 text-xs text-muted-foreground">{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
