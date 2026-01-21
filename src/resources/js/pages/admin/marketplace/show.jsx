import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Check, MapPin, Package, Power, Store, Truck, X } from 'lucide-react';
import { useState } from 'react';

export default function MarketplaceShow({ product }) {
    const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null });
    const [processing, setProcessing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: 'GHS',
        }).format(amount || 0);
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleAction = (action) => {
        setConfirmDialog({ open: true, action });
    };

    const confirmAction = () => {
        setProcessing(true);
        let routeName;
        switch (confirmDialog.action) {
            case 'approve':
                routeName = 'admin.marketplace.approve';
                break;
            case 'reject':
                routeName = 'admin.marketplace.reject';
                break;
            case 'toggle':
                routeName = 'admin.marketplace.toggle-active';
                break;
        }

        router.post(
            route(routeName, product.id),
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setConfirmDialog({ open: false, action: null });
                },
            },
        );
    };

    const getDialogContent = () => {
        switch (confirmDialog.action) {
            case 'approve':
                return {
                    title: 'Approve Product',
                    description: `Are you sure you want to approve "${product.title}"? It will be visible to all users.`,
                    confirmLabel: 'Approve',
                    variant: 'default',
                };
            case 'reject':
                return {
                    title: 'Reject Product',
                    description: `Are you sure you want to reject "${product.title}"? It will be hidden from users.`,
                    confirmLabel: 'Reject',
                    variant: 'destructive',
                };
            case 'toggle':
                const isActive = product.is_active;
                return {
                    title: isActive ? 'Deactivate Product' : 'Activate Product',
                    description: isActive
                        ? `Are you sure you want to deactivate "${product.title}"?`
                        : `Are you sure you want to activate "${product.title}"?`,
                    confirmLabel: isActive ? 'Deactivate' : 'Activate',
                    variant: isActive ? 'destructive' : 'default',
                };
            default:
                return {};
        }
    };

    const dialogContent = getDialogContent();

    return (
        <AdminLayout>
            <Head title={`Product: ${product.title}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.marketplace.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-foreground text-2xl font-bold">{product.title}</h1>
                            <p className="text-muted-foreground">Product Details</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {!product.is_approved && (
                            <>
                                <Button onClick={() => handleAction('approve')}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve
                                </Button>
                                <Button variant="destructive" onClick={() => handleAction('reject')}>
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                </Button>
                            </>
                        )}
                        {product.is_approved && (
                            <Button variant={product.is_active ? 'destructive' : 'default'} onClick={() => handleAction('toggle')}>
                                <Power className="mr-2 h-4 w-4" />
                                {product.is_active ? 'Deactivate' : 'Activate'}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Images */}
                    <Card className="lg:col-span-2">
                        <CardContent className="p-4">
                            {/* Main Image */}
                            <div className="bg-muted mb-4 aspect-video overflow-hidden rounded-lg">
                                {product.images?.length > 0 ? (
                                    <img
                                        src={`/storage/${product.images[selectedImage]?.image_path}`}
                                        alt={product.title}
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <Package className="text-muted-foreground h-16 w-16" />
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {product.images?.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto">
                                    {product.images.map((image, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                                                selectedImage === idx ? 'border-primary' : 'border-transparent'
                                            }`}
                                        >
                                            <img
                                                src={`/storage/${image.image_path}`}
                                                alt={`${product.title} ${idx + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Product Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <div className="flex gap-2">
                                    <StatusBadge status={product.is_approved} type="approval" />
                                    <StatusBadge status={product.is_active} type="user" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Price</span>
                                <span className="text-foreground text-xl font-bold">{formatCurrency(product.price)}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Condition</span>
                                <span className="text-foreground capitalize">{product.condition?.replace('_', ' ')}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Category</span>
                                <span className="text-foreground capitalize">{product.category?.replace('_', ' ')}</span>
                            </div>

                            {product.location && (
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Location</span>
                                    <span className="text-foreground flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {product.location}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Delivery</span>
                                <span className="text-foreground flex items-center gap-1">
                                    <Truck className="h-4 w-4" />
                                    {product.delivery_available ? 'Available' : 'Not Available'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Views</span>
                                <span className="text-foreground">{product.views_count || 0}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Created</span>
                                <span className="text-foreground">{formatDate(product.created_at)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Description & Specifications */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground whitespace-pre-wrap">{product.description || 'No description provided'}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Specifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {product.specifications?.length > 0 ? (
                                <ul className="space-y-2">
                                    {product.specifications.map((spec, idx) => (
                                        <li key={idx} className="text-foreground flex items-start gap-2">
                                            <span className="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                                            {spec.specification}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground">No specifications provided</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Seller Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Seller Information</CardTitle>
                        <CardDescription>Details about the product seller</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                                    <span className="text-primary text-lg font-bold">{product.user?.name?.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <p className="text-foreground font-medium">{product.user?.name}</p>
                                    <p className="text-muted-foreground text-sm">{product.user?.phone}</p>
                                </div>
                            </div>

                            {product.store && (
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-lg">
                                        <Store className="text-muted-foreground h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-foreground font-medium">{product.store.name}</p>
                                        <p className="text-muted-foreground text-sm capitalize">
                                            {product.store.tier} tier • {product.store.is_active ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                            <Link href={route('admin.users.show', product.user?.id)}>
                                <Button variant="outline">View User Profile</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
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
