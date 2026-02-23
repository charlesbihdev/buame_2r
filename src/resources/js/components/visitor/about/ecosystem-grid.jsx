import { Link } from '@inertiajs/react';
import { Store, Bus, Wrench, Briefcase, ArrowRight, Home, Hotel } from 'lucide-react';

export function EcosystemGrid() {
    const ecosystemItems = [
        {
            icon: Store,
            title: 'Local Traders',
            description: 'Connecting market sellers with wider buyers.',
        },
        {
            icon: Bus,
            title: 'Transport',
            description: 'Reliable links for goods and passengers.',
        },
        {
            icon: Home,
            title: 'Rentals',
            description: 'Helping people find and list rooms, houses, and spaces.',
        },
        {
            icon: Hotel,
            title: 'Hotels',
            description: 'Discover and book guest houses and hotels with ease.',
        },
        {
            icon: Wrench,
            title: 'Artisans',
            description: 'Showcasing skilled craftsmanship digitally.',
        },
        {
            icon: Briefcase,
            title: 'Employment',
            description: 'Local jobs for local talent.',
        },
    ];

    return (
        <div className="bg-white px-6 py-20 lg:px-20">
            <div className="mx-auto max-w-[1280px]">
                <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div className="max-w-xl">
                        <h2 className="mb-4 text-3xl font-bold">Our Connected Ecosystem</h2>
                        <p className="text-gray-600">
                            2RBUAME isn't just a website; it's a network of real people and businesses working together.
                        </p>
                    </div>
                    <Link href="/marketplace" className="flex items-center gap-1 font-bold text-[var(--primary)] transition-all hover:underline">
                        View Marketplace <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {ecosystemItems.map((item, index) => {
                        const Icon = item.icon;
                        // Strategic color variation (cycles)
                        const colorVariants = [
                            { bg: 'bg-[var(--primary)]/10', text: 'text-[var(--primary)]', border: 'hover:border-[var(--primary)]/20' }, // Local Traders - Green
                            { bg: 'bg-[var(--secondary)]/10', text: 'text-[var(--secondary)]', border: 'hover:border-[var(--secondary)]/20' }, // Transport - Gold
                            { bg: 'bg-[var(--accent)]/10', text: 'text-[var(--accent)]', border: 'hover:border-[var(--accent)]/20' }, // Rentals - Blue (trust)
                            { bg: 'bg-[var(--primary)]/10', text: 'text-[var(--primary)]', border: 'hover:border-[var(--primary)]/20' }, // Hotels - Green
                            { bg: 'bg-[var(--secondary)]/10', text: 'text-[var(--secondary)]', border: 'hover:border-[var(--secondary)]/20' }, // Artisans - Gold
                            { bg: 'bg-[var(--accent)]/10', text: 'text-[var(--accent)]', border: 'hover:border-[var(--accent)]/20' }, // Employment - Blue (trust)
                        ];
                        const colors = colorVariants[index % colorVariants.length];
                        return (
                            <div
                                key={item.title}
                                className={`group flex cursor-pointer flex-col items-center gap-4 rounded-xl border border-transparent bg-background-light p-6 text-center transition-all ${colors.border} hover:shadow-lg`}
                            >
                                <div className={`flex size-16 items-center justify-center rounded-full ${colors.bg} ${colors.text}`}>
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

