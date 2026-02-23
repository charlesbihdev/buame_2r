import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export function ServicesHeader() {
    const page = usePage();
    const currentCategory = new URLSearchParams(page.url.split('?')[1] || '').get('category') || 'all';
    const [activeCategory, setActiveCategory] = useState(currentCategory);

    const categories = [
        { id: 'all', name: 'All', url: '/services' },
        { id: 'artisans', name: 'Artisans', url: '/services?category=artisans' },
        { id: 'market', name: 'Market', url: '/marketplace' },
        { id: 'jobs', name: 'Jobs', url: '/jobs' },
    ];

    return (
        <section className="flex flex-col gap-3 pt-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl leading-tight font-bold tracking-tight text-[var(--foreground)] md:text-4xl">Our Core Services</h2>
                    <p className="text-base font-normal text-[#4c9a4c]">Explore the platform features designed for the region.</p>
                </div>
                {/* Filter/Category Tabs */}
                {/* <div className="hidden gap-2 rounded-lg border border-[var(--buame-border-light)] bg-white p-1 md:flex">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.url}
                            onClick={() => setActiveCategory(category.id)}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                activeCategory === category.id
                                    ? 'bg-[var(--primary)]/10 font-bold text-[var(--primary)]'
                                    : 'text-[#4c9a4c] hover:bg-gray-100'
                            }`}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div> */}
            </div>
        </section>
    );
}
