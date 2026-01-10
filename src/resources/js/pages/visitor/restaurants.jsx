import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, MapPin, Star, Phone, UtensilsCrossed } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function Restaurants() {
    return (
        <VisitorLayout>
            <Head title="Restaurants & Food | 2RBUAME" />
            
            {/* Hero Section */}
            <RestaurantsHero />
            
            {/* Toggle Section */}
            <div className="border-b border-[var(--buame-border-light)] bg-background-light px-4 py-4 dark:border-white/10 dark:bg-background-dark md:px-40">
                <div className="mx-auto flex h-12 w-full max-w-md items-center justify-center rounded-xl bg-[var(--buame-border-light)] p-1 dark:bg-[#1a2e1a]">
                    <label className="flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-[#4c9a4c] transition-all has-[:checked]:bg-white has-[:checked]:text-[var(--foreground)] has-[:checked]:shadow-sm dark:has-[:checked]:bg-background-dark dark:has-[:checked]:text-[var(--primary)]">
                        <UtensilsCrossed className="mr-2 h-5 w-5" />
                        <span className="truncate text-sm font-bold">Eat & Drink</span>
                        <input checked className="invisible absolute w-0" name="view-toggle" type="radio" value="Eat & Drink" />
                    </label>
                    <label className="flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-[#4c9a4c] transition-all has-[:checked]:bg-white has-[:checked]:text-[var(--foreground)] has-[:checked]:shadow-sm dark:has-[:checked]:bg-background-dark dark:has-[:checked]:text-[var(--primary)]">
                        <span className="mr-2 text-lg">🛏️</span>
                        <span className="truncate text-sm font-bold">Stay & Sleep</span>
                        <input className="invisible absolute w-0" name="view-toggle" type="radio" value="Stay & Sleep" />
                    </label>
                </div>
            </div>
            
            <div className="flex grow flex-col lg:flex-row">
                {/* Sidebar Filters */}
                <RestaurantsFilters />
                
                {/* Main Content */}
                <main className="flex flex-1 flex-col bg-background-light p-4 dark:bg-background-dark md:p-6 lg:p-8">
                    <RestaurantsToolbar />
                    <RestaurantsGrid />
                    
                    {/* Load More */}
                    <div className="mt-12 flex justify-center">
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2 rounded-lg border border-[var(--buame-border-light)] bg-white px-6 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                        >
                            Load More Restaurants
                            <ChevronDown className="h-5 w-5" />
                        </Button>
                    </div>
                </main>
            </div>
        </VisitorLayout>
    );
}

function RestaurantsHero() {
    return (
        <div className="w-full border-b border-[var(--buame-border-light)] bg-white dark:border-white/10 dark:bg-[var(--card)]">
            <div className="mx-auto max-w-[1440px]">
                <div className="p-4 @container @[480px]:p-6">
                    <div
                        className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-8 py-12"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKC613VL79SJvimuI7g-mUFYtrZVbSGbmPrVr4lzCK9x_X_n1JZ6aeVhTXLf_dI9MMJkAPIEzssozivadw0gP_0Kzm4NYH6-2cOCHReCFHq-Ev8Awdtvvlrdrv3MsO4qrwPtLEnql3bV_2_7nYIbF83iGUcAewhO1P_Fnb5LUDNiN2VdIEg1Au-FLk2uxYUyvjopH7duEV0t-oYHZLLJa3f0AXaf9wjrNuVyO5KsL3Kj0yn5c8HluvcN3g_YvAY7ddedI8KssGBfQ")',
                        }}
                    >
                        <div className="z-10 flex max-w-2xl flex-col gap-3 text-center">
                            <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-white md:text-5xl">
                                Experience Best Flavors Across Western North and Beyond
                            </h1>
                            <p className="text-sm font-normal text-gray-200 md:text-base">
                                Find the best local food joints, chop bars, and restaurants across Western North and beyond. We welcome customers from all backgrounds.
                            </p>
                        </div>
                        <div className="z-10 mt-2 flex w-full max-w-[600px] flex-col">
                            <div className="flex w-full flex-col items-stretch overflow-hidden rounded-lg shadow-xl sm:flex-row">
                                <div className="flex w-full items-center border-b border-gray-200 bg-white px-4 py-3 dark:border-[#2a4e2a] dark:bg-[var(--card)] sm:w-1/3 sm:border-b-0 sm:border-r sm:py-0">
                                    <MapPin className="mr-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    <select className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium focus:ring-0 dark:text-white">
                                        <option>Western North</option>
                                        <option>Bibiani</option>
                                        <option>Wiawso</option>
                                        <option>Juaboso</option>
                                        <option>Other Locations</option>
                                    </select>
                                </div>
                                <div className="relative flex-1 bg-white dark:bg-[var(--card)]">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        className="h-12 w-full border-none bg-transparent pl-12 pr-4 text-sm placeholder:text-gray-400 focus:ring-0 dark:text-white sm:h-14"
                                        placeholder="Search for 'Fufu', 'Jollof', 'Chop Bar'..."
                                    />
                                </div>
                                <button className="flex items-center justify-center gap-2 bg-[var(--primary)] px-8 py-3 font-bold text-white transition-colors hover:bg-[var(--primary)] sm:py-0">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RestaurantsFilters() {
    return (
        <aside className="hidden min-h-[calc(100vh-80px)] w-80 shrink-0 flex-col gap-8 border-r border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4e2a] dark:bg-[var(--card)] lg:flex">
            {/* Active Filters Summary */}
            <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Active Filters</h3>
                <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-[var(--buame-border-light)] bg-[var(--background)] dark:border-[#2a4e2a] dark:bg-[var(--foreground)]">
                    <div className="flex items-center justify-between border-b border-[var(--buame-border-light)] p-3 dark:border-[#2a4e2a]">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                        <span className="text-sm font-medium dark:text-white">Western North</span>
                    </div>
                    <div className="flex items-center justify-between p-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Open Now</span>
                        <span className="text-sm font-medium text-[var(--primary)]">Yes</span>
                    </div>
                </div>
            </div>

            {/* Cuisine Type */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Cuisine Type</h3>
                <div className="flex flex-col gap-3">
                    {['All Cuisines', 'Local Ghanaian', 'Fufu & Soup', 'Jollof & Rice', 'Street Food', 'Continental', 'Fast Food'].map(
                        (type) => (
                            <label key={type} className="group flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    defaultChecked={type === 'All Cuisines'}
                                    className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                                />
                                <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">
                                    {type}
                                </span>
                            </label>
                        ),
                    )}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Price Range</h3>
                <div className="flex flex-col gap-3">
                    {['₵ - Budget', '₵₵ - Moderate', '₵₵₵ - Expensive'].map((price) => (
                        <label key={price} className="group flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">
                                {price}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Meal Type */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Meal Type</h3>
                <div className="flex flex-col gap-3">
                    {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
                        <label key={meal} className="group flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <span className="text-sm font-medium transition-colors group-hover:text-[var(--primary)] dark:text-gray-200">{meal}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Rating</h3>
                <div className="flex flex-col gap-2">
                    <label className="flex cursor-pointer items-center gap-2">
                        <input type="radio" name="rating" className="border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]" />
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                        </div>
                        <span className="text-sm dark:text-gray-300">5.0 only</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="radio"
                            name="rating"
                            defaultChecked
                            className="border-gray-300 bg-transparent text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <div className="flex text-yellow-400">
                            {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                            <Star className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                        </div>
                        <span className="text-sm dark:text-gray-300">4.0 & up</span>
                    </label>
                </div>
            </div>
        </aside>
    );
}

function RestaurantsToolbar() {
    return (
        <>
            {/* Quick Filter Chips */}
            <div className="mb-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[var(--primary)] px-4 text-white shadow-sm transition-shadow hover:shadow-md">
                    <span className="text-[20px]">🍽️</span>
                    <span className="text-sm font-bold">All</span>
                </button>
                {[
                    { icon: '🍲', label: 'Local Food' },
                    { icon: '🍚', label: 'Jollof' },
                    { icon: '🥘', label: 'Fufu' },
                    { icon: '🍗', label: 'Fast Food' },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-[var(--buame-border-light)] bg-white px-4 transition-colors hover:border-[var(--primary)]/50 dark:border-[#2a4e2a] dark:bg-[var(--card)]"
                    >
                        <span className="text-[20px]">{item.icon}</span>
                        <span className="text-sm font-medium dark:text-white">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Results Toolbar */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Showing <span className="font-bold text-[var(--foreground)] dark:text-white">28</span> restaurants across Western North and beyond
                </p>
                <div className="flex w-full items-center gap-3 sm:w-auto">
                    {/* Mobile Filter Toggle */}
                    <button className="flex size-10 items-center justify-center rounded-lg border border-[var(--buame-border-light)] bg-white text-gray-700 dark:border-[#2a4e2a] dark:bg-[var(--card)] dark:text-white lg:hidden">
                        <span className="text-lg">⚙️</span>
                    </button>
                    <div className="relative ml-auto sm:ml-0">
                        <select className="h-10 cursor-pointer rounded-lg border-[var(--buame-border-light)] bg-white pl-3 pr-8 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-[#2a4e2a] dark:bg-[var(--card)] dark:text-white">
                            <option>Top Rated</option>
                            <option>Most Popular</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                    <div className="flex rounded-lg border border-[var(--buame-border-light)] bg-white p-1 dark:border-[#2a4e2a] dark:bg-[var(--card)]">
                        <button className="flex size-8 items-center justify-center rounded bg-[var(--primary)]/20 text-[var(--primary)]">
                            <span className="text-lg">⊞</span>
                        </button>
                        <button className="flex size-8 items-center justify-center rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <span className="text-lg">☰</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function RestaurantsGrid() {
    const restaurants = [
        {
            name: "Mama Adwoa's Chop Bar",
            type: 'Local, Fufu & Soup',
            rating: 4.8,
            reviews: 156,
            location: 'Western North, Market Area',
            price: '₵₵',
            verified: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1MdX3kyGjEhEE0Zes-7DKGpsbzP7T5L_d6pO_4pQgcbXPrP3jS59JFCTaonrVMao4dT1wUZz66zwmXTxy1NCaD7tUel33GO4olseHURYz-WGG_IcQDuBATihfydkUtXC8okSLu15xMj4v8Yces0UL9AIYQ3SPjW2BhvTjkVgOGKId9_MrANkf4asabNbFwX0txzFyPQGUVFo1OtMp8qK9KpqPuAtgB-G1xpAs7TP5SLsk1jWRoBQo4aFpf-OX1zbn3Ve7iWARWKY',
        },
        {
            name: 'Sefwi Delight Spot',
            type: 'Continental & Local',
            rating: 4.5,
            reviews: 89,
            location: 'Bibiani Road',
            price: '₵₵₵',
            verified: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmb85I8nWkUkGorsnYqLjgOJgrklcVMzRpHo1E_IL_nfLKcOvro89MyDLVuh_WObk8NgemCIO6ZDKufWCfzrECTNt0kIMDrOXK47fOGDPJCkJNJnmvcXdlzU20tEtDkfLld2zP5UXpbVGwHDNjm5isCAoC9s37FX173IH9GhUxYEiGaXy_9nAdXILyMI5kXKCYFZ5q3Z_RD4irh_QIZDrhr37SbyXZr24eZxoGuIhq_lb-LpXOEnpkx97W0UuRgsho3XmYw_dqeUA',
        },
        {
            name: 'Bekwai Junction Kebab',
            type: 'Street Food, Grill',
            rating: 4.2,
            reviews: 67,
            location: 'Junction Area',
            price: '₵',
            verified: false,
            badge: 'Fast Food',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC92paKIfnJ3yk2hiieaJY8jg8k-DNfhC_UgUfqVJHbEGhnihKe3ujU97JZiCKhE26_Kb7LsmWog079odIkTZtYnfB5NWjzqqWHGPIVath_aRv1ixNZPty2ZsjIug6ikUdce3BBGZlrPwZARFkAFELUB8RrBvT6zKZ7sxgLENrCqsZeLltbdl9_0ZFQvl1cxLgGiGZyiQWr_99Oy0K2oU0gNaaDq9HJqIOXINcwizUBPbM5cNvi2aqjGZ1D862Sd3F7hLAzfhmCWZA',
        },
        {
            name: 'Auntie Ama Kitchen',
            type: 'Breakfast, Lunch',
            rating: 4.9,
            reviews: 203,
            location: 'Wiawso',
            price: '₵₵',
            verified: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1MdX3kyGjEhEE0Zes-7DKGpsbzP7T5L_d6pO_4pQgcbXPrP3jS59JFCTaonrVMao4dT1wUZz66zwmXTxy1NCaD7tUel33GO4olseHURYz-WGG_IcQDuBATihfydkUtXC8okSLu15xMj4v8Yces0UL9AIYQ3SPjW2BhvTjkVgOGKId9_MrANkf4asabNbFwX0txzFyPQGUVFo1OtMp8qK9KpqPuAtgB-G1xpAs7TP5SLsk1jWRoBQo4aFpf-OX1zbn3Ve7iWARWKY',
        },
        {
            name: 'Golden Spoon Restaurant',
            type: 'Chinese, Local',
            rating: 4.6,
            reviews: 124,
            location: 'Western North Center',
            price: '₵₵₵',
            verified: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmb85I8nWkUkGorsnYqLjgOJgrklcVMzRpHo1E_IL_nfLKcOvro89MyDLVuh_WObk8NgemCIO6ZDKufWCfzrECTNt0kIMDrOXK47fOGDPJCkJNJnmvcXdlzU20tEtDkfLld2zP5UXpbVGwHDNjm5isCAoC9s37FX173IH9GhUxYEiGaXy_9nAdXILyMI5kXKCYFZ5q3Z_RD4irh_QIZDrhr37SbyXZr24eZxoGuIhq_lb-LpXOEnpkx97W0UuRgsho3XmYw_dqeUA',
        },
        {
            name: 'Roadside Waakye Spot',
            type: 'Traditional, Waakye',
            rating: 4.4,
            reviews: 92,
            location: 'Juaboso Road',
            price: '₵',
            verified: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1MdX3kyGjEhEE0Zes-7DKGpsbzP7T5L_d6pO_4pQgcbXPrP3jS59JFCTaonrVMao4dT1wUZz66zwmXTxy1NCaD7tUel33GO4olseHURYz-WGG_IcQDuBATihfydkUtXC8okSLu15xMj4v8Yces0UL9AIYQ3SPjW2BhvTjkVgOGKId9_MrANkf4asabNbFwX0txzFyPQGUVFo1OtMp8qK9KpqPuAtgB-G1xpAs7TP5SLsk1jWRoBQo4aFpf-OX1zbn3Ve7iWARWKY',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant, index) => (
                <div
                    key={index}
                    className="group flex flex-col overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white transition-shadow hover:shadow-md dark:border-[#2a4e2a] dark:bg-[var(--card)]"
                >
                    <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-[var(--foreground)] backdrop-blur-sm">
                            <Star className="h-3 w-3 fill-orange-500 text-orange-500" /> {restaurant.rating}
                        </div>
                        {restaurant.badge && (
                            <div className="absolute right-3 top-3 z-10 rounded-md bg-[var(--primary)] px-2 py-1 text-xs font-bold text-white">
                                {restaurant.badge}
                            </div>
                        )}
                        <div
                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${restaurant.image})` }}
                        />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                        <div className="mb-2 flex items-start justify-between">
                            <h4 className="line-clamp-1 text-lg font-bold text-[var(--foreground)] dark:text-white">{restaurant.name}</h4>
                            <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                {restaurant.price}
                            </span>
                        </div>
                        <p className="mb-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                            <UtensilsCrossed className="h-4 w-4 text-gray-400" /> {restaurant.type}
                        </p>
                        <div className="mt-auto flex gap-2">
                            <button className="flex-1 rounded-lg bg-[var(--buame-border-light)] py-2.5 text-sm font-bold text-[var(--foreground)] transition-colors hover:bg-[#d6ebd6] dark:bg-[#1a2e1a] dark:text-white dark:hover:bg-[#233d23]">
                                View Menu
                            </button>
                            <button className="flex w-10 items-center justify-center rounded-lg bg-[var(--primary)] text-white transition-colors hover:bg-green-400">
                                <Phone className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


