import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Power, Shield } from 'lucide-react';
import { useState } from 'react';

export default function AdminsIndex({ admins }) {
    const { admin: currentAdmin } = usePage().props;
    const [confirmDialog, setConfirmDialog] = useState({ open: false, admin: null });
    const [processing, setProcessing] = useState(false);

    const formatDate = (date) => {
        if (!date) return 'Never';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleToggleActive = (admin) => {
        if (admin.id === currentAdmin.id) {
            return; // Can't deactivate yourself
        }
        setConfirmDialog({ open: true, admin });
    };

    const confirmAction = () => {
        if (!confirmDialog.admin) return;

        setProcessing(true);
        router.post(
            route('admin.admins.toggle-active', confirmDialog.admin.id),
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setConfirmDialog({ open: false, admin: null });
                },
            },
        );
    };

    const columns = [
        {
            key: 'name',
            label: 'Admin',
            render: (admin) => (
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                        <span className="text-primary text-sm font-bold">{admin.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <p className="text-foreground font-medium">
                            {admin.name}
                            {admin.id === currentAdmin.id && <span className="text-muted-foreground ml-2 text-xs">(You)</span>}
                        </p>
                        <p className="text-muted-foreground text-xs">{admin.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'role',
            label: 'Role',
            render: (admin) => <StatusBadge status={admin.role} type="role" />,
        },
        {
            key: 'status',
            label: 'Status',
            render: (admin) => <StatusBadge status={admin.is_active} type="user" />,
        },
        {
            key: 'last_login',
            label: 'Last Login',
            render: (admin) => <span className="text-muted-foreground text-sm">{formatDate(admin.last_login_at)}</span>,
        },
        {
            key: 'created_at',
            label: 'Created',
            render: (admin) => <span className="text-muted-foreground text-sm">{formatDate(admin.created_at)}</span>,
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (admin) => (
                <div className="flex items-center gap-2">
                    <Link href={route('admin.admins.edit', admin.id)}>
                        <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(admin)}
                        disabled={admin.id === currentAdmin.id}
                        title={admin.id === currentAdmin.id ? "You can't deactivate yourself" : ''}
                    >
                        <Power className={`h-4 w-4 ${admin.is_active ? 'text-green-500' : 'text-muted-foreground'}`} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Management" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-foreground text-2xl font-bold">Admin Management</h1>
                        <p className="text-muted-foreground">Manage administrator accounts</p>
                    </div>
                    <Link href={route('admin.admins.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Admin
                        </Button>
                    </Link>
                </div>

                {/* Data Table */}
                <DataTable columns={columns} data={admins.data} pagination={admins} emptyMessage="No administrators found" emptyIcon={Shield} />
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={confirmDialog.open}
                onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
                title={confirmDialog.admin?.is_active ? 'Deactivate Admin' : 'Activate Admin'}
                description={
                    confirmDialog.admin?.is_active
                        ? `Are you sure you want to deactivate "${confirmDialog.admin?.name}"? They will not be able to access the admin panel.`
                        : `Are you sure you want to activate "${confirmDialog.admin?.name}"? They will regain access to the admin panel.`
                }
                confirmLabel={confirmDialog.admin?.is_active ? 'Deactivate' : 'Activate'}
                variant={confirmDialog.admin?.is_active ? 'destructive' : 'default'}
                onConfirm={confirmAction}
                loading={processing}
            />
        </AdminLayout>
    );
}
