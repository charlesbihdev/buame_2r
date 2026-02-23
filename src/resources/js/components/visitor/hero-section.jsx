import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/use-debounce';
import { Link, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('marketplace');
    const debouncedSearch = useDebounce(searchQuery, 600);

    const categories = [
        { id: 'marketplace', name: 'Marketplace', url: '/marketplace' },
        { id: 'artisans', name: 'Artisans', url: '/artisans' },
        { id: 'hotels', name: 'Hotel', url: '/hotels' },
        { id: 'transport', name: 'Okada & Cars', url: '/transport' },
        { id: 'rentals', name: 'Rentals', url: '/rentals' },
        { id: 'jobs', name: 'Jobs', url: '/jobs' },
    ];

    const navigateToSearch = (query) => {
        const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory);
        if (!selectedCategoryData) return;

        const params = new URLSearchParams();
        if (query.trim()) {
            params.set('search', query.trim());
        }

        const queryString = params.toString();
        const url = `${selectedCategoryData.url}${queryString ? '?' + queryString : ''}`;
        router.visit(url);
    };

    // Auto-search when user stops typing
    useEffect(() => {
        if (debouncedSearch.trim()) {
            navigateToSearch(debouncedSearch);
        }
    }, [debouncedSearch]);

    return (
        <section className="relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.6)), url("/assets/visitors/bekwai.JPG")',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center md:px-8 lg:px-40 lg:py-28">
                {/* Headline */}
                <h1 className="mb-4 max-w-4xl text-4xl leading-tight font-black tracking-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
                    Connecting Local Services & Opportunities in Western North and Beyond
                </h1>

                {/* Subtitle */}
                <h2 className="mb-8 max-w-2xl text-lg font-medium text-gray-100 drop-shadow-sm md:text-xl">
                    Find artisans, transport, hotels, rentals, jobs & more. All in one place.
                </h2>

                {/* Auth Buttons */}
                {!user && (
                    <div className="mb-10 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl px-8 text-base font-bold"
                        >
                            <Link href="/choose-path">Register Account</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="h-12 rounded-xl border-white/30 bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                        >
                            <Link href={route('user.login')}>Log In</Link>
                        </Button>
                    </div>
                )}

                {/* Search Component */}
                <div className="w-full max-w-2xl rounded-2xl bg-white p-2 shadow-xl md:p-3">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        {/* Search Input */}
                        <div className="focus-within:ring-primary/50 flex flex-1 items-center rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition-all focus-within:ring-2">
                            <Search className="mr-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && navigateToSearch(searchQuery)}
                                placeholder="What are you looking for?"
                                className="text-foreground w-full border-none bg-transparent text-base outline-none placeholder:text-gray-400 focus:ring-0"
                            />
                        </div>

                        {/* Search Button */}
                        <Button
                            type="button"
                            onClick={() => navigateToSearch(searchQuery)}
                            className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 h-[52px] w-full cursor-pointer rounded-xl px-8 text-base font-bold shadow-lg transition-colors md:w-auto md:flex-shrink-0"
                        >
                            <Search className="mr-2 h-5 w-5" />
                            Search
                        </Button>
                    </div>

                    {/* Category Tabs */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2 px-2 pb-1">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setSelectedCategory(category.id)}
                                className={`rounded-full px-5 py-2.5 text-base font-semibold whitespace-nowrap transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
