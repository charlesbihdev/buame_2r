import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { DataTable } from '@/components/admin/DataTable';
import { FilterBar } from '@/components/admin/FilterBar';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Check, Eye, Package, Power, X } from 'lucide-react';
import { useState } from 'react';

export default function MarketplaceIndex({ products, filters, productCategories }) {
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

        switch (confirmDialog.action) {
            case 'approve':
                return {
                    title: 'Approve Product',
                    description: `Are you sure you want to approve "${confirmDialog.product.title}"? It will be visible to all users.`,
                    confirmLabel: 'Approve',
                    variant: 'default',
                };
            case 'reject':
                return {
                    title: 'Reject Product',
                    description: `Are you sure you want to reject "${confirmDialog.product.title}"? It will be hidden from users.`,
                    confirmLabel: 'Reject',
                    variant: 'destructive',
                };
            case 'toggle':
                const isActive = confirmDialog.product.is_active;
                return {
                    title: isActive ? 'Deactivate Product' : 'Activate Product',
                    description: isActive
                        ? `Are you sure you want to deactivate "${confirmDialog.product.title}"?`
                        : `Are you sure you want to activate "${confirmDialog.product.title}"?`,
                    confirmLabel: isActive ? 'Deactivate' : 'Activate',
                    variant: isActive ? 'destructive' : 'default',
                };
            default:
                return {};
        }
    };

    const columns = [
        {
            key: 'product',
            label: 'Product',
            render: (product) => (
                <div className="flex items-center gap-3">
                    {product.images?.[0] ? (
                        <img src={`/storage/${product.images[0].image_path}`} alt={product.title} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-lg">
                            <Package className="text-muted-foreground h-6 w-6" />
                        </div>
                    )}
                    <div>
                        <p className="text-foreground max-w-[200px] truncate font-medium">{product.title}</p>
                        <p className="text-muted-foreground text-xs capitalize">{productCategories[product.category] || product.category}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'seller',
            label: 'Seller',
            render: (product) => (
                <div>
                    <p className="text-foreground text-sm">{product.user?.name}</p>
                    <p className="text-muted-foreground text-xs">{product.store?.name || 'No store'}</p>
                </div>
            ),
        },
        {
            key: 'price',
            label: 'Price',
            render: (product) => <span className="text-foreground font-medium">{formatCurrency(product.price)}</span>,
        },
        {
            key: 'status',
            label: 'Approval',
            render: (product) => <StatusBadge status={product.is_approved} type="approval" />,
        },
        {
            key: 'active',
            label: 'Active',
            render: (product) => <StatusBadge status={product.is_active} type="user" />,
        },
        {
            key: 'created_at',
            label: 'Created',
            render: (product) => <span className="text-muted-foreground text-sm">{new Date(product.created_at).toLocaleDateString()}</span>,
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (product) => (
                <div className="flex items-center gap-1">
                    <Link href={route('admin.marketplace.show', product.id)}>
                        <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    {!product.is_approved && (
                        <>
                            <Button variant="ghost" size="sm" onClick={() => handleAction(product, 'approve')}>
                                <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleAction(product, 'reject')}>
                                <X className="text-destructive h-4 w-4" />
                            </Button>
                        </>
                    )}
                    {product.is_approved && (
                        <Button variant="ghost" size="sm" onClick={() => handleAction(product, 'toggle')}>
                            <Power className={`h-4 w-4 ${product.is_active ? 'text-green-500' : 'text-muted-foreground'}`} />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    const filterOptions = [
        {
            key: 'status',
            label: 'Status',
            placeholder: 'Filter by status',
            options: [
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approved' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
            ],
        },
        {
            key: 'category',
            label: 'Category',
            placeholder: 'Filter by category',
            options: Object.entries(productCategories).map(([value, label]) => ({ value, label })),
        },
    ];

    const dialogContent = getDialogContent();

    return (
        <AdminLayout>
            <Head title="Marketplace Moderation" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-foreground text-2xl font-bold">Marketplace Moderation</h1>
                        <p className="text-muted-foreground">Review and manage marketplace products</p>
                    </div>
                    <Link href={route('admin.marketplace.pending')}>
                        <Button>View Pending Only</Button>
                    </Link>
                </div>

                {/* Filters */}
                <FilterBar filters={filterOptions} searchPlaceholder="Search by product title or seller..." currentFilters={filters} />

                {/* Data Table */}
                <DataTable columns={columns} data={products.data} pagination={products} emptyMessage="No products found" emptyIcon={Package} />
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
