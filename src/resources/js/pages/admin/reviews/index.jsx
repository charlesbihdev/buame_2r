import { BulkActionsBar } from '@/components/admin/BulkActionsBar';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { FilterBar } from '@/components/admin/FilterBar';
import { ImageGalleryModal } from '@/components/admin/ImageGalleryModal';
import { SelectableDataTable } from '@/components/admin/SelectableDataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, router } from '@inertiajs/react';
import { Check, Image as ImageIcon, MessageSquare, Star, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export default function ReviewsIndex({ reviews, filters, counts }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, review: null });
    const [imageModal, setImageModal] = useState({ open: false, images: [] });

    const currentTab = filters.status || 'all';

    const handleTabChange = (value) => {
        router.get(
            route('admin.reviews.index'),
            { ...filters, status: value === 'all' ? undefined : value },
            { preserveState: true, preserveScroll: true },
        );
        setSelectedIds([]);
    };

    const handleSingleAction = (review, action) => {
        setConfirmDialog({ open: true, action, review });
    };

    const handleBulkAction = (action) => {
        setConfirmDialog({ open: true, action, review: null });
    };

    const confirmAction = () => {
        setProcessing(true);

        const isBulk = !confirmDialog.review;
        let routeName;
        let data = {};

        if (isBulk) {
            switch (confirmDialog.action) {
                case 'approve':
                    routeName = 'admin.reviews.bulk-approve';
                    break;
                case 'disapprove':
                    routeName = 'admin.reviews.bulk-disapprove';
                    break;
                case 'delete':
                    routeName = 'admin.reviews.bulk-delete';
                    break;
            }
            data = { ids: selectedIds };

            router.post(route(routeName), data, {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setConfirmDialog({ open: false, action: null, review: null });
                    setSelectedIds([]);
                },
            });
        } else {
            switch (confirmDialog.action) {
                case 'approve':
                    routeName = 'admin.reviews.approve';
                    break;
                case 'disapprove':
                    routeName = 'admin.reviews.disapprove';
                    break;
                case 'delete':
                    routeName = 'admin.reviews.destroy';
                    break;
            }

            const method = confirmDialog.action === 'delete' ? 'delete' : 'post';

            router[method](route(routeName, confirmDialog.review.id), data, {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setConfirmDialog({ open: false, action: null, review: null });
                },
            });
        }
    };

    const getDialogContent = () => {
        const isBulk = !confirmDialog.review;
        const count = isBulk ? selectedIds.length : 1;

        switch (confirmDialog.action) {
            case 'approve':
                return {
                    title: `Approve ${count} Review${count > 1 ? 's' : ''}`,
                    description: isBulk
                        ? `Are you sure you want to approve ${count} selected reviews? They will be visible to users.`
                        : `Are you sure you want to approve this review from "${confirmDialog.review?.reviewer_name}"?`,
                    confirmLabel: 'Approve',
                    variant: 'default',
                };
            case 'disapprove':
                return {
                    title: `Disapprove ${count} Review${count > 1 ? 's' : ''}`,
                    description: isBulk
                        ? `Are you sure you want to disapprove ${count} selected reviews? They will be hidden from users.`
                        : `Are you sure you want to disapprove this review from "${confirmDialog.review?.reviewer_name}"?`,
                    confirmLabel: 'Disapprove',
                    variant: 'destructive',
                };
            case 'delete':
                return {
                    title: `Delete ${count} Review${count > 1 ? 's' : ''}`,
                    description: isBulk
                        ? `Are you sure you want to permanently delete ${count} selected reviews? This action cannot be undone.`
                        : `Are you sure you want to permanently delete this review? This action cannot be undone.`,
                    confirmLabel: 'Delete',
                    variant: 'destructive',
                };
            default:
                return {};
        }
    };

    // Helper to get reviewable name
    const getReviewableName = (review) => {
        return (
            review.artisan?.name ||
            review.hotel?.name ||
            review.transport_ride?.vehicle_name ||
            review.marketplace_product?.title ||
            review.rental?.name ||
            review.job?.title ||
            review.store?.name ||
            'Unknown'
        );
    };

    const getReviewableType = (review) => {
        if (review.artisan_id) return 'Artisan';
        if (review.hotel_id) return 'Hotel';
        if (review.transport_ride_id) return 'Transport';
        if (review.marketplace_product_id) return 'Product';
        if (review.rental_id) return 'Rental';
        if (review.job_id) return 'Job';
        if (review.store_id) return 'Store';
        return 'Unknown';
    };

    const columns = [
        {
            key: 'reviewer',
            label: 'Reviewer',
            render: (review) => (
                <div>
                    <p className="text-foreground font-medium">{review.reviewer_name}</p>
                    <p className="text-muted-foreground text-xs">{review.reviewer_phone}</p>
                </div>
            ),
        },
        {
            key: 'rating',
            label: 'Rating',
            render: (review) => (
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
            ),
        },
        {
            key: 'comment',
            label: 'Comment',
            render: (review) => (
                <p className="text-foreground max-w-[300px] truncate text-sm">
                    {review.comment || <span className="text-muted-foreground italic">No comment</span>}
                </p>
            ),
        },
        {
            key: 'reviewable',
            label: 'For',
            render: (review) => (
                <div>
                    <p className="text-foreground text-sm">{getReviewableName(review)}</p>
                    <p className="text-muted-foreground text-xs">{getReviewableType(review)}</p>
                </div>
            ),
        },
        {
            key: 'images',
            label: 'Images',
            render: (review) =>
                review.images?.length > 0 ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setImageModal({ open: true, images: review.images })}
                        className="gap-1"
                    >
                        <ImageIcon className="h-4 w-4" />
                        {review.images.length}
                    </Button>
                ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (review) => <StatusBadge status={review.status} type="review" />,
        },
        {
            key: 'created_at',
            label: 'Date',
            render: (review) => <span className="text-muted-foreground text-sm">{new Date(review.created_at).toLocaleDateString()}</span>,
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (review) => (
                <div className="flex items-center gap-1">
                    {review.status !== 'approved' && (
                        <Button variant="ghost" size="sm" onClick={() => handleSingleAction(review, 'approve')}>
                            <Check className="h-4 w-4 text-green-500" />
                        </Button>
                    )}
                    {review.status !== 'disapproved' && (
                        <Button variant="ghost" size="sm" onClick={() => handleSingleAction(review, 'disapprove')}>
                            <X className="h-4 w-4 text-orange-500" />
                        </Button>
                    )}
                    {review.status === 'disapproved' && (
                        <Button variant="ghost" size="sm" onClick={() => handleSingleAction(review, 'delete')}>
                            <Trash2 className="text-destructive h-4 w-4" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    const filterOptions = [
        {
            key: 'rating',
            label: 'Rating',
            placeholder: 'Filter by rating',
            options: [
                { value: '5', label: '5 Stars' },
                { value: '4', label: '4 Stars' },
                { value: '3', label: '3 Stars' },
                { value: '2', label: '2 Stars' },
                { value: '1', label: '1 Star' },
            ],
        },
        {
            key: 'type',
            label: 'Type',
            placeholder: 'Filter by type',
            options: [
                { value: 'artisan', label: 'Artisan' },
                { value: 'hotel', label: 'Hotel' },
                { value: 'transport', label: 'Transport' },
                { value: 'marketplace', label: 'Marketplace' },
                { value: 'rental', label: 'Rental' },
                { value: 'job', label: 'Job' },
                { value: 'store', label: 'Store' },
            ],
        },
    ];

    const dialogContent = getDialogContent();

    return (
        <AdminLayout>
            <Head title="Review Management" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-foreground text-2xl font-bold">Review Management</h1>
                    <p className="text-muted-foreground">Moderate and manage user reviews</p>
                </div>

                {/* Tabs */}
                <Tabs value={currentTab} onValueChange={handleTabChange}>
                    <TabsList>
                        <TabsTrigger value="all" activeValue={currentTab}>
                            All ({counts.all})
                        </TabsTrigger>
                        <TabsTrigger value="pending" activeValue={currentTab}>
                            Pending ({counts.pending})
                        </TabsTrigger>
                        <TabsTrigger value="approved" activeValue={currentTab}>
                            Approved ({counts.approved})
                        </TabsTrigger>
                        <TabsTrigger value="disapproved" activeValue={currentTab}>
                            Disapproved ({counts.disapproved})
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Filters */}
                <FilterBar filters={filterOptions} searchPlaceholder="Search by name, phone, or comment..." currentFilters={filters} />

                {/* Bulk Actions Bar */}
                <BulkActionsBar
                    selectedCount={selectedIds.length}
                    onApprove={currentTab !== 'approved' ? () => handleBulkAction('approve') : null}
                    onDisapprove={currentTab !== 'disapproved' ? () => handleBulkAction('disapprove') : null}
                    onDelete={currentTab === 'disapproved' ? () => handleBulkAction('delete') : null}
                    showDelete={currentTab === 'disapproved'}
                    onClear={() => setSelectedIds([])}
                    processing={processing}
                />

                {/* Data Table */}
                <SelectableDataTable
                    columns={columns}
                    data={reviews.data}
                    pagination={reviews}
                    emptyMessage="No reviews found"
                    emptyIcon={MessageSquare}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                />
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

            {/* Image Gallery Modal */}
            <ImageGalleryModal
                open={imageModal.open}
                onOpenChange={(open) => setImageModal({ ...imageModal, open })}
                images={imageModal.images}
                title="Review Images"
            />
        </AdminLayout>
    );
}
