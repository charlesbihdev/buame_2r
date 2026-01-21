import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { DataTable } from '@/components/admin/DataTable';
import { FilterBar } from '@/components/admin/FilterBar';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Ban, CheckCircle, Eye, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';

export default function UsersIndex({ users, filters }) {
    const [confirmDialog, setConfirmDialog] = useState({ open: false, user: null, action: null });
    const [processing, setProcessing] = useState(false);

    const handleAction = (user, action) => {
        setConfirmDialog({ open: true, user, action });
    };

    const confirmAction = () => {
        if (!confirmDialog.user || !confirmDialog.action) return;

        setProcessing(true);
        const routeName = confirmDialog.action === 'block' ? 'admin.users.toggle-block' : 'admin.users.verify';

        router.post(
            route(routeName, confirmDialog.user.id),
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setConfirmDialog({ open: false, user: null, action: null });
                },
            },
        );
    };

    const getDialogContent = () => {
        if (!confirmDialog.user || !confirmDialog.action) return {};

        if (confirmDialog.action === 'block') {
            const isBlocking = confirmDialog.user.is_active;
            return {
                title: isBlocking ? 'Block User' : 'Unblock User',
                description: isBlocking
                    ? `Are you sure you want to block "${confirmDialog.user.name}"? They will not be able to access their account.`
                    : `Are you sure you want to unblock "${confirmDialog.user.name}"? They will regain access to their account.`,
                confirmLabel: isBlocking ? 'Block User' : 'Unblock User',
                variant: isBlocking ? 'destructive' : 'default',
            };
        }

        return {
            title: 'Verify User',
            description: `Are you sure you want to manually verify "${confirmDialog.user.name}"? This will mark their phone as verified.`,
            confirmLabel: 'Verify User',
            variant: 'default',
        };
    };

    const columns = [
        {
            key: 'name',
            label: 'User',
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                        <span className="text-primary text-sm font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <p className="text-foreground font-medium">{user.name}</p>
                        <p className="text-muted-foreground text-xs">{user.email || 'No email'}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'phone',
            label: 'Phone',
            render: (user) => <span className="text-foreground">{user.phone}</span>,
        },
        {
            key: 'status',
            label: 'Status',
            render: (user) => <StatusBadge status={user.is_active} type="user" />,
        },
        {
            key: 'verified',
            label: 'Verified',
            render: (user) => <StatusBadge status={!!user.phone_verified_at} type="verification" />,
        },
        {
            key: 'categories',
            label: 'Subscriptions',
            render: (user) => (
                <span className="text-muted-foreground text-sm">
                    {user.categories?.filter((c) => c.subscription_status === 'active').length || 0} active
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Joined',
            render: (user) => <span className="text-muted-foreground text-sm">{new Date(user.created_at).toLocaleDateString()}</span>,
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (user) => (
                <div className="flex items-center gap-2">
                    <Link href={route('admin.users.show', user.id)}>
                        <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleAction(user, 'block')}>
                        {user.is_active ? <Ban className="text-destructive h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                    </Button>
                    {!user.phone_verified_at && (
                        <Button variant="ghost" size="sm" onClick={() => handleAction(user, 'verify')}>
                            <ShieldCheck className="h-4 w-4 text-blue-500" />
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
                { value: 'active', label: 'Active' },
                { value: 'blocked', label: 'Blocked' },
            ],
        },
        {
            key: 'verified',
            label: 'Verification',
            placeholder: 'Filter by verification',
            options: [
                { value: 'yes', label: 'Verified' },
                { value: 'no', label: 'Unverified' },
            ],
        },
    ];

    const dialogContent = getDialogContent();

    return (
        <AdminLayout>
            <Head title="User Management" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-foreground text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage and monitor all registered users</p>
                </div>

                {/* Filters */}
                <FilterBar filters={filterOptions} searchPlaceholder="Search by name, phone, or email..." currentFilters={filters} />

                {/* Data Table */}
                <DataTable columns={columns} data={users.data} pagination={users} emptyMessage="No users found" emptyIcon={Users} />
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
