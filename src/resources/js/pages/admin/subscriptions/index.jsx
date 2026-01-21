import { DataTable } from '@/components/admin/DataTable';
import { FilterBar } from '@/components/admin/FilterBar';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, CreditCard } from 'lucide-react';

export default function SubscriptionsIndex({ subscriptions, filters, categories, statuses, billingCycles }) {
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

    const columns = [
        {
            key: 'user',
            label: 'User',
            render: (sub) => (
                <div>
                    <p className="text-foreground font-medium">{sub.user?.name}</p>
                    <p className="text-muted-foreground text-xs">{sub.user?.phone}</p>
                </div>
            ),
        },
        {
            key: 'category',
            label: 'Category',
            render: (sub) => <span className="text-foreground capitalize">{sub.category}</span>,
        },
        {
            key: 'billing_cycle',
            label: 'Billing',
            render: (sub) => <span className="text-foreground capitalize">{sub.billing_cycle?.replace('_', ' ')}</span>,
        },
        {
            key: 'status',
            label: 'Status',
            render: (sub) => <StatusBadge status={sub.subscription_status} type="subscription" />,
        },
        {
            key: 'amount',
            label: 'Amount',
            render: (sub) => <span className="text-foreground font-medium">{formatCurrency(sub.payment?.amount)}</span>,
        },
        {
            key: 'expires_at',
            label: 'Expires',
            render: (sub) => {
                const isExpiringSoon = sub.expires_at && new Date(sub.expires_at) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                const isExpired = sub.expires_at && new Date(sub.expires_at) < new Date();
                return (
                    <span className={`text-sm ${isExpired ? 'text-destructive' : isExpiringSoon ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                        {formatDate(sub.expires_at)}
                    </span>
                );
            },
        },
        {
            key: 'created_at',
            label: 'Started',
            render: (sub) => <span className="text-muted-foreground text-sm">{formatDate(sub.created_at)}</span>,
        },
    ];

    const filterOptions = [
        {
            key: 'category',
            label: 'Category',
            placeholder: 'Filter by category',
            options: categories.map((cat) => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) })),
        },
        {
            key: 'status',
            label: 'Status',
            placeholder: 'Filter by status',
            options: statuses,
        },
        {
            key: 'billing_cycle',
            label: 'Billing Cycle',
            placeholder: 'Filter by billing',
            options: billingCycles,
        },
    ];

    return (
        <AdminLayout>
            <Head title="Subscriptions" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-foreground text-2xl font-bold">Subscriptions</h1>
                        <p className="text-muted-foreground">Manage user subscriptions</p>
                    </div>
                    <Link href={route('admin.subscriptions.analytics')}>
                        <Button>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Analytics
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <FilterBar filters={filterOptions} searchPlaceholder="Search by user name or phone..." currentFilters={filters} />

                {/* Data Table */}
                <DataTable columns={columns} data={subscriptions.data} pagination={subscriptions} emptyMessage="No subscriptions found" emptyIcon={CreditCard} />
            </div>
        </AdminLayout>
    );
}
