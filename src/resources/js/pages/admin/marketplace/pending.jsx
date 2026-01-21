import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Eye, Package, X } from 'lucide-react';
import { useState } from 'react';

export default function MarketplacePending({ products }) {
    const [confirmDialog, setConfirmDialog] = useState({ open: false, product: null, action: null });
    const [processing, setProcessing] = useState(false);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: 'GHS',
        }).format(amount || 0);
    };

    const handleAction = (product, action) => {
        setConfirmDialog({ open: true, product, action });
    };

    const confirmAction = () => {
        if (!confirmDialog.product || !confirmDialog.action) return;

        setProcessing(true);
        const routeName = confirmDialog.action === 'approve' ? 'admin.marketplace.approve' : 'admin.marketplace.reject';

        router.post(
            route(routeName, confirmDialog.product.id),
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setConfirmDialog({ open: false, product: null, action: null });
                },
            },
        );
    };

    const getDialogContent = () => {
        if (!confirmDialog.product || !confirmDialog.action) return {};

        if (confirmDialog.action === 'approve') {
            return {
                title: 'Approve Product',
                description: `Are you sure you want to approve "${confirmDialog.product.title}"? It will be visible to all users.`,
                confirmLabel: 'Approve',
                variant: 'default',
            };
        }

        return {
            title: 'Reject Product',
            description: `Are you sure you want to reject "${confirmDialog.product.title}"? It will be hidden from users.`,
            confirmLabel: 'Reject',
            variant: 'destructive',
        };
    };

    const dialogContent = getDialogContent();

    return (
        <AdminLayout>
            <Head title="Pending Products" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('admin.marketplace.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-foreground text-2xl font-bold">Pending Products</h1>
                        <p className="text-muted-foreground">Products awaiting approval</p>
                    </div>
                </div>

                {/* Products Grid */}
                {products.data?.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {products.data.map((product) => (
                            <Card key={product.id} className="overflow-hidden">
                                {/* Product Image */}
                                <div className="aspect-video overflow-hidden">
                                    {product.images?.[0] ? (
                                        <img
                                            src={`/storage/${product.images[0].image_path}`}
                                            alt={product.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="bg-muted flex h-full w-full items-center justify-center">
                                            <Package className="text-muted-foreground h-12 w-12" />
                                        </div>
                                    )}
                                </div>

                                <CardHeader className="pb-2">
                                    <CardTitle className="line-clamp-1 text-lg">{product.title}</CardTitle>
                                    <CardDescription>
                                        by {product.user?.name} {product.store && `• ${product.store.name}`}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-foreground text-lg font-bold">{formatCurrency(product.price)}</span>
                                        <span className="text-muted-foreground text-sm capitalize">{product.condition?.replace('_', ' ')}</span>
                                    </div>

                                    {product.description && (
                                        <p className="text-muted-foreground line-clamp-2 text-sm">{product.description}</p>
                                    )}

                                    {product.specifications?.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {product.specifications.slice(0, 3).map((spec, idx) => (
                                                <span key={idx} className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">
                                                    {spec.specification}
                                                </span>
                                            ))}
                                            {product.specifications.length > 3 && (
                                                <span className="text-muted-foreground text-xs">+{product.specifications.length - 3} more</span>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-2">
                                        <Link href={route('admin.marketplace.show', product.id)} className="flex-1">
                                            <Button variant="outline" className="w-full">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>
                                        <Button variant="default" size="icon" onClick={() => handleAction(product, 'approve')}>
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleAction(product, 'reject')}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Package className="text-muted-foreground mb-4 h-12 w-12" />
                            <p className="text-muted-foreground text-lg">No pending products</p>
                            <p className="text-muted-foreground text-sm">All products have been reviewed</p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {products.prev_page_url ? (
                            <Link href={products.prev_page_url} preserveScroll>
                                <Button variant="outline" size="sm">
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Previous
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="outline" size="sm" disabled>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>
                        )}
                        <span className="text-muted-foreground text-sm">
                            Page {products.current_page} of {products.last_page}
                        </span>
                        {products.next_page_url ? (
                            <Link href={products.next_page_url} preserveScroll>
                                <Button variant="outline" size="sm">
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="outline" size="sm" disabled>
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={confirmDialog.open}
                onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
                title={dialogContent.title}
                description={dialogContent.description}
                confirmLabel={dialogContent.confirmLabel}
                variant={dialogContent.variant}
                onConfirm={confirmAction}
                loading={processing}
            />
        </AdminLayout>
    );
}
