import { Link } from '@inertiajs/react';
import { MapPin, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MarketplaceProducts() {
    const products = [
        {
            id: 1,
            category: 'Electronics',
            title: 'Phone Screen Repair',
            rating: 4.7,
            reviews: 22,
            location: 'Opposite Post Office',
            price: 'From ₵60',
            image: '/assets/visitors/marketplace/electronics.jpg',
            verified: false,
        },
        {
            id: 2,
            category: 'Food',
            title: 'Fresh Plantain Bulk',
            rating: 5.0,
            reviews: 8,
            location: 'Local Market',
            price: '₵40 / bunch',
            image: '/assets/visitors/marketplace/food.jpg',
            verified: true,
        },
        {
            id: 3,
            category: 'Furniture',
            title: 'Wooden Dining Table Set',
            rating: 4.5,
            reviews: 15,
            location: 'Sefwi Bekwai, Central Market',
            price: '₵800',
            image: '/assets/visitors/marketplace/furniture.jpg',
            verified: true,
        },
        {
            id: 4,
            category: 'Clothes',
            title: 'Traditional Kente Cloth',
            rating: 4.8,
            reviews: 35,
            location: 'Bibiani Road, Bekwai',
            price: '₵250',
            image: '/assets/visitors/marketplace/clothes.jpg',
            verified: true,
        },
        {
            id: 5,
            category: 'Agriculture',
            title: 'Fresh Cocoa Beans',
            rating: 4.9,
            reviews: 12,
            location: 'Wiawso & Surroundings',
            price: '₵120 / kg',
            image: '/assets/visitors/marketplace/agriculture.jpg',
            verified: true,
        },
        {
            id: 6,
            category: 'Electronics',
            title: 'Used Laptop - Good Condition',
            rating: 4.3,
            reviews: 5,
            location: 'Sefwi Bekwai',
            price: '₵1,500',
            image: '/assets/visitors/marketplace/laptop.jpg',
            verified: false,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-[#e7f3e7] bg-white transition-all duration-300 hover:border-[#13ec13]/50 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                >
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute left-3 top-3 z-10 rounded bg-white/90 px-2 py-1 text-xs font-bold uppercase tracking-wide text-gray-800 backdrop-blur">
                            {product.category}
                        </div>
                        <div
                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                                backgroundImage: `url(${product.image})`,
                            }}
                        />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                        <div className="mb-2 flex items-start justify-between">
                            <h3 className="text-base font-bold leading-tight text-[#0d1b0d] dark:text-white">{product.title}</h3>
                            {product.verified && (
                                <CheckCircle2 className="h-5 w-5 text-[#13ec13]" title="Verified" />
                            )}
                        </div>
                        <div className="mb-3 flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold dark:text-white">{product.rating}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
                        </div>
                        <div className="mb-4 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="h-4 w-4" />
                            <span>{product.location}</span>
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-[#e7f3e7] pt-4 dark:border-white/10">
                            <span className="text-lg font-black text-[#0d1b0d] dark:text-[#13ec13]">{product.price}</span>
                            <Button
                                asChild
                                variant="ghost"
                                className="text-sm font-bold text-[#13ec13] hover:text-[#0fdc0f] hover:underline"
                            >
                                <Link href={`/marketplace/${product.id}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

