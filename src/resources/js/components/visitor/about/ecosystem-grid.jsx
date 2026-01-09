import { Link } from '@inertiajs/react';
import { Store, Bus, Wrench, Briefcase, ArrowRight } from 'lucide-react';

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
        <div className="bg-white px-6 py-20 dark:bg-background-dark lg:px-20">
            <div className="mx-auto max-w-[1280px]">
                <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div className="max-w-xl">
                        <h2 className="mb-4 text-3xl font-bold dark:text-white">Our Connected Ecosystem</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            BUAME 2R isn't just a website; it's a network of real people and businesses working together.
                        </p>
                    </div>
                    <Link href="/marketplace" className="flex items-center gap-1 font-bold text-[#13ec13] transition-all hover:underline">
                        View Marketplace <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {ecosystemItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border border-transparent bg-background-light p-6 text-center transition-all hover:border-[#13ec13]/20 hover:shadow-lg dark:bg-white/5"
                            >
                                <div className="flex size-16 items-center justify-center rounded-full bg-[#e3fbe3] text-[#13ec13] dark:bg-[#13ec13]/20">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="font-bold dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

