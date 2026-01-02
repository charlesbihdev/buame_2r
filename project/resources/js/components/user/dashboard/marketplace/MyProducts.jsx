import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Package, MapPin } from 'lucide-react';

export function MyProducts({ products }) {
    const handleCreate = () => {
        router.visit(route('user.dashboard.marketplace.create'));
    };

    const handleEdit = (id) => {
        router.visit(route('user.dashboard.marketplace.edit', id));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">My Products</h3>
                <Button onClick={handleCreate} className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] overflow-hidden transition-all hover:shadow-lg"
                        >
                            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800" />
                            <div className="p-4">
                                <h4 className="font-bold text-[#0d1b0d] dark:text-white">{product.title}</h4>
                                <p className="mt-1 text-sm font-semibold text-[#13ec13]">GH₵ {product.price}</p>
                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-3 w-3" />
                                    <span>{product.location}</span>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <Button
                                        onClick={() => handleEdit(product.id)}
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        <Edit className="mr-2 h-3 w-3" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Package className="mr-2 h-3 w-3" />
                                        View
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600 dark:text-gray-400">No products yet</p>
                    <Button onClick={handleCreate} className="mt-4 bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Product
                    </Button>
                </div>
            )}
        </div>
    );
}

