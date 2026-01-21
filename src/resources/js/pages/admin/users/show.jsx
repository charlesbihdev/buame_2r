import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Ban, Building2, Car, CheckCircle, Home, Package, ShieldCheck, Briefcase } from 'lucide-react';
import { useState } from 'react';

export default function UserShow({ user }) {
    const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null });
    const [processing, setProcessing] = useState(false);

    const handleAction = (action) => {
        setConfirmDialog({ open: true, action });
    };

    const confirmAction = () => {
        setProcessing(true);
        const routeName = confirmDialog.action === 'block' ? 'admin.users.toggle-block' : 'admin.users.verify';

        router.post(
            route(routeName, user.id),
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
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'hotels':
                return Building2;
            case 'transport':
                return Car;
            case 'rentals':
                return Home;
            case 'marketplace':
                return Package;
            case 'jobs':
                return Briefcase;
            default:
                return Package;
        }
    };

    const getDialogContent = () => {
        if (confirmDialog.action === 'block') {
            const isBlocking = user.is_active;
            return {
                title: isBlocking ? 'Block User' : 'Unblock User',
                description: isBlocking
                    ? `Are you sure you want to block "${user.name}"? They will not be able to access their account.`
                    : `Are you sure you want to unblock "${user.name}"? They will regain access to their account.`,
                confirmLabel: isBlocking ? 'Block User' : 'Unblock User',
                variant: isBlocking ? 'destructive' : 'default',
            };
        }

        return {
            title: 'Verify User',
            description: `Are you sure you want to manually verify "${user.name}"? This will mark their phone as verified.`,
            confirmLabel: 'Verify User',
            variant: 'default',
        };
    };

    const dialogContent = getDialogContent();

    return (
        <AdminLayout>
            <Head title={`User: ${user.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.users.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-foreground text-2xl font-bold">{user.name}</h1>
                            <p className="text-muted-foreground">User Details</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant={user.is_active ? 'destructive' : 'default'} onClick={() => handleAction('block')}>
                            {user.is_active ? (
                                <>
                                    <Ban className="mr-2 h-4 w-4" />
                                    Block User
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Unblock User
                                </>
                            )}
                        </Button>
                        {!user.phone_verified_at && (
                            <Button variant="outline" onClick={() => handleAction('verify')}>
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Verify Manually
                            </Button>
                        )}
                    </div>
                </div>

                {/* User Info */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Basic Info */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>User Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-primary text-2xl font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <p className="text-foreground text-lg font-semibold">{user.name}</p>
                                    <div className="flex gap-2">
                                        <StatusBadge status={user.is_active} type="user" />
                                        <StatusBadge status={!!user.phone_verified_at} type="verification" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Phone</p>
                                    <p className="text-foreground font-medium">{user.phone}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Email</p>
                                    <p className="text-foreground font-medium">{user.email || 'Not provided'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Joined</p>
                                    <p className="text-foreground font-medium">{formatDate(user.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Last Login</p>
                                    <p className="text-foreground font-medium">{formatDate(user.last_login_at)}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Phone Verified</p>
                                    <p className="text-foreground font-medium">{formatDate(user.phone_verified_at)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subscriptions */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Subscriptions</CardTitle>
                            <CardDescription>Active category subscriptions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user.categories?.length > 0 ? (
                                <div className="space-y-4">
                                    {user.categories.map((cat) => {
                                        const Icon = getCategoryIcon(cat.category);
                                        return (
                                            <div key={cat.id} className="border-border flex items-center justify-between rounded-lg border p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                                                        <Icon className="text-muted-foreground h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-foreground font-medium capitalize">{cat.category}</p>
                                                        <p className="text-muted-foreground text-xs">
                                                            {cat.billing_cycle?.replace('_', ' ')} - Expires: {formatDate(cat.expires_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <StatusBadge status={cat.subscription_status} type="subscription" />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-muted-foreground py-4 text-center">No subscriptions</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Store Info (if marketplace user) */}
                {user.store && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Information</CardTitle>
                            <CardDescription>Marketplace store details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-4">
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Store Name</p>
                                    <p className="text-foreground font-medium">{user.store.name || 'Not set'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Tier</p>
                                    <p className="text-foreground font-medium capitalize">{user.store.tier}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Status</p>
                                    <StatusBadge status={user.store.is_active} type="user" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase">Products</p>
                                    <p className="text-foreground font-medium">{user.marketplace_products?.length || 0} products</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Recent Payments */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Payments</CardTitle>
                        <CardDescription>Payment history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.payments?.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th className="text-muted-foreground px-4 py-2 text-left text-sm font-medium">Category</th>
                                            <th className="text-muted-foreground px-4 py-2 text-left text-sm font-medium">Amount</th>
                                            <th className="text-muted-foreground px-4 py-2 text-left text-sm font-medium">Status</th>
                                            <th className="text-muted-foreground px-4 py-2 text-left text-sm font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.payments.map((payment) => (
                                            <tr key={payment.id} className="border-border border-t">
                                                <td className="text-foreground px-4 py-2 text-sm capitalize">{payment.category}</td>
                                                <td className="text-foreground px-4 py-2 text-sm">{formatCurrency(payment.amount)}</td>
                                                <td className="px-4 py-2">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            payment.status === 'completed'
                                                                ? 'bg-green-100 text-green-700'
                                                                : payment.status === 'pending'
                                                                  ? 'bg-yellow-100 text-yellow-700'
                                                                  : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {payment.status}
                                                    </span>
                                                </td>
                                                <td className="text-muted-foreground px-4 py-2 text-sm">{formatDate(payment.paid_at || payment.created_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-muted-foreground py-4 text-center">No payment history</p>
                        )}
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
