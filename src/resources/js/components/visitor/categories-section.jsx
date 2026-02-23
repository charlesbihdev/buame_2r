import { Link } from '@inertiajs/react';

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
                <div className="mb-8">
                    <h2 className="text-foreground text-2xl font-bold md:text-3xl">What Are You Looking For?</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                    {categories.map((category) => (
                        <Link key={category.name} href={category.url} className="group relative overflow-hidden rounded-2xl">
                            {/* Large image */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${category.image})` }}
                                />
                                {/* Gradient overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            </div>

                            {/* Category name overlaid at bottom */}
                            <div className="absolute right-0 bottom-0 left-0 p-4 md:p-5">
                                <h3 className="text-xl font-extrabold text-white drop-shadow-sm md:text-xl">{category.name}</h3>
                                <p className="mt-1 text-sm text-white/80">{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
