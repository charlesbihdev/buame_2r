import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export function CategoriesSection() {
    const categories = [
        {
            name: 'Artisans',
            description: 'Skilled workers',
            url: '/artisans',
            image: '/assets/visitors/categories/artisans.jpg',
        },
        {
            name: 'Hotel',
            description: 'Accommodation',
            url: '/hotels',
            image: '/assets/visitors/categories/hotel.jpg',
        },
        {
            name: 'Okada & Cars',
            description: 'Motorcycle & car transport',
            url: '/transport',
            image: '/assets/visitors/categories/okada.jpg',
        },
        {
            name: 'Rentals',
            description: 'Property rentals',
            url: '/rentals',
            image: '/assets/visitors/categories/rentals.jpg',
        },
        {
            name: 'Marketplace',
            description: 'Buy & sell goods',
            url: '/marketplace',
            image: '/assets/visitors/categories/marketplace.jpg',
        },
        {
            name: 'Jobs',
            description: 'Career & Hiring',
            url: '/jobs',
            image: '/assets/visitors/categories/jobs.jpg',
        },
    ];

    return (
        <section className="bg-background-light dark:bg-background-dark px-4 py-16 md:px-8 lg:px-40">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h2 className="mb-2 text-3xl font-bold text-[#0d1b0d] dark:text-white">Browse Categories</h2>
                        <p className="text-gray-500 dark:text-gray-400">Explore diverse opportunities in the Western North Region.</p>
                    </div>
                    <Link href="/services" className="flex items-center gap-1 font-bold text-[#13ec13] transition-all hover:gap-2">
                        View All Categories <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.url}
                            className="group flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-[#13ec13]/30 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        >
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0d1b0d] dark:text-white">{category.name}</h3>
                                <p className="mt-1 text-xs text-[#4c9a4c]">{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
