import { Button } from '@/components/ui/button';
import { navigateToSection } from '@/services/dashboardNavigation';
import { router } from '@inertiajs/react';
import { AlertCircle, ArrowUpRight, Edit, MapPin, Package, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditProductModal } from './EditProductModal';

export function MyProducts({ products, store, tiers, onAddProduct }) {
    const [deletingId, setDeletingId] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleCreate = () => {
        if (onAddProduct) {
            onAddProduct();
        } else {
            router.visit(route('user.dashboard.marketplace.create'));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setDeletingId(id);
            router.delete(route('user.dashboard.marketplace.destroy', id), {
                preserveScroll: true,
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const handleUpgrade = () => {
        const currentTierIndex = ['starter', 'professional', 'enterprise'].indexOf(store?.tier || 'starter');
        const nextTier = ['starter', 'professional', 'enterprise'][currentTierIndex + 1];
        if (nextTier && tiers?.[nextTier]) {
            router.post(route('user.dashboard.marketplace.store.upgrade'), {
                tier: nextTier,
            });
        }
    };

    const remainingSlots = store?.remaining_slots || 0;
    const productLimit = store?.product_limit || 5;
    const productsCount = products?.length || 0;
    const canAddProducts = remainingSlots > 0 && store?.is_active;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">My Products</h2>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {productsCount} / {productLimit} products
                        {remainingSlots > 0 && (
                            <span className="ml-2 text-[var(--primary)]">({remainingSlots} slots remaining)</span>
                        )}
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    disabled={!canAddProducts}
                    className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            {/* Limit Reached Warning - Gold for premium upgrade */}
            {remainingSlots === 0 && (
                <div className="rounded-xl border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 dark:border-[var(--secondary)]/20 dark:bg-[var(--secondary)]/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-[var(--secondary)] dark:text-[var(--secondary)] flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-[var(--secondary)] dark:text-[var(--secondary)]">
                                    Product Limit Reached
                                </p>
                                <p className="mt-1 text-sm text-[var(--secondary)]/80 dark:text-[var(--secondary)]/70">
                                    You've reached your limit of {productLimit} products. Upgrade to add more.
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={handleUpgrade}
                            size="sm"
                            className="bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/90 flex-shrink-0"
                        >
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Upgrade
                        </Button>
                    </div>
                </div>
            )}

            {/* Store Not Active Warning - Blue for info/action needed */}
            {store && !store.is_active && (
                <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 dark:border-[var(--accent)]/20 dark:bg-[var(--accent)]/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-[var(--accent)] dark:text-[var(--accent)] flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-[var(--accent)] dark:text-[var(--accent)]">Store Not Active</p>
                                <p className="mt-1 text-sm text-[var(--accent)]/80 dark:text-[var(--accent)]/70">
                                    Your store is hidden from visitors. Activate it to make your products visible.
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => navigateToSection('store')}
                            variant="outline"
                            size="sm"
                            className="border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/10 dark:border-[var(--accent)]/20 dark:text-[var(--accent)] dark:hover:bg-[var(--accent)]/10 flex-shrink-0"
                        >
                            Store Settings
                        </Button>
                    </div>
                </div>
            )}

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => {
                        const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
                        return (
                            <div
                                key={product.id}
                                className="rounded-xl border border-[var(--buame-border-light)] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] overflow-hidden transition-all hover:shadow-lg"
                            >
                                <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                                    {primaryImage ? (
                                        <img
                                            src={`/storage/${primaryImage.image_path}`}
                                            alt={product.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <Package className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                    {!product.is_active && (
                                        <div className="absolute top-2 right-2 rounded bg-gray-900/70 px-2 py-1 text-xs text-white">
                                            Inactive
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-[var(--foreground)] dark:text-white">{product.title}</h4>
                                    <p className="mt-1 text-sm font-semibold text-[var(--primary)]">GH₵ {product.price}</p>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-3 w-3" />
                                        <span>{product.location}</span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <Button
                                            onClick={() => handleEdit(product)}
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            <Edit className="mr-2 h-3 w-3" />
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(product.id)}
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 text-red-600 hover:text-red-700"
                                            disabled={deletingId === product.id}
                                        >
                                            <Trash2 className="mr-2 h-3 w-3" />
                                            {deletingId === product.id ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">No products yet</p>
                    <p className="mt-1 text-sm text-gray-500">Click "Add Product" above to add your first product</p>
                </div>
            )}

            {/* Edit Product Modal */}
            {editingProduct && (
                <EditProductModal isOpen={true} onClose={() => setEditingProduct(null)} product={editingProduct} />
            )}
        </div>
    );
}
