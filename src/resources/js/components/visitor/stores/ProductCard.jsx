import { Link } from '@inertiajs/react';
import { MapPin, Package, Truck } from 'lucide-react';

export function ProductCard({ product }) {
    const getCategoryLabel = (category) => {
        const labels = {
            electronics: 'Electronics',
            furniture: 'Furniture',
            food: 'Food',
            agriculture: 'Agriculture',
            clothes: 'Clothes',
            others: 'Others',
        };
        return labels[category] || category;
    };

    console.log(product);

    const getConditionLabel = (condition) => {
        const labels = {
            new: 'New',
            like_new: 'Like New',
            used: 'Used',
            refurbished: 'Refurbished',
        };
        return labels[condition] || '';
    };

    return (
        <Link
            href={route('marketplace.view', product.id)}
            className="group dark:bg-card rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-800"
        >
            <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-900">
                {product.image ? (
                    <img src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-foreground group-hover:text-primary line-clamp-2 flex-1 font-bold dark:text-white">{product.title}</h3>
                    {product.condition && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            {getConditionLabel(product.condition)}
                        </span>
                    )}
                </div>
                <p className="mb-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">{getCategoryLabel(product.category)}</p>
                {product?.price > 0 && (
                    <div className="mb-2 flex items-center gap-1">
                        <span className="text-primary text-lg font-bold">GH₵ {product?.price}</span>
                        {product?.price_type && <span className="text-sm text-gray-600 dark:text-gray-400">{product?.price_type}</span>}
                    </div>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{product.location}</span>
                    </div>
                    {product.delivery_available && (
                        <div className="text-primary flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            <span>Delivery</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
