import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

export function FeaturedProvidersSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const providers = [
        {
            id: 1,
            name: 'Kwame A.',
            title: 'Master Carpenter',
            rating: 4.8,
            description: 'Specializing in custom furniture and home repairs for over 10 years in Bibiani.',
            image: '/assets/visitors/providers/kwame.jpg',
            profileUrl: '/artisan/kwame',
        },
        {
            id: 2,
            name: 'Adwoa B.',
            title: 'Transport Operator',
            rating: 4.9,
            description: 'Reliable taxi service and small goods delivery across Western North and beyond.',
            image: '/assets/visitors/providers/adwoa.jpg',
            profileUrl: '/artisan/adwoa',
        },
        {
            id: 3,
            name: 'Kofi M.',
            title: 'Guesthouse Manager',
            rating: 4.7,
            description: 'Offering clean, affordable rooms at Peace Lodge. Breakfast included.',
            image: '/assets/visitors/providers/kofi.jpg',
            profileUrl: '/artisan/kofi',
        },
        {
            id: 4,
            name: 'Ama S.',
            title: 'Produce Trader',
            rating: 5.0,
            description: 'Wholesale plantain and yam supplier. Fresh from the farm every Tuesday.',
            image: '/assets/visitors/providers/ama.jpg',
            profileUrl: '/artisan/ama',
        },
    ];

    const scrollLeft = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const scrollRight = () => {
        setCurrentIndex((prev) => Math.min(providers.length - 1, prev + 1));
    };

    return (
        <section className="bg-background px-4 py-16 md:px-8 lg:px-40">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-10 flex items-end justify-between">
                    <h2 className="text-3xl font-bold text-foreground">Featured Local Providers</h2>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollLeft}
                            disabled={currentIndex === 0}
                            className="h-10 w-10 rounded-full border border-border hover:bg-muted"
                        >
                            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button
                            size="icon"
                            onClick={scrollRight}
                            disabled={currentIndex >= providers.length - 3}
                            className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="scrollbar-hide -mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-8 md:mx-0 md:px-0">
                    {providers.map((provider) => (
                        <div
                            key={provider.id}
                            className="min-w-[280px] snap-center rounded-xl border border-border bg-card p-4 shadow-sm md:min-w-[300px]"
                        >
                            <div
                                className="mb-4 aspect-[4/3] w-full rounded-lg bg-muted bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${provider.image})`,
                                }}
                            />
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-foreground">{provider.name}</h4>
                                    <p className="text-sm text-muted-foreground">{provider.title}</p>
                                </div>
                                <div className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                                    <Star className="h-[14px] w-[14px]" />
                                    {provider.rating}
                                </div>
                            </div>
                            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{provider.description}</p>
                            <Link
                                href={provider.profileUrl}
                                className="block w-full rounded-lg border border-primary py-2 text-center text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
