import { DataTable } from '@/components/admin/DataTable';
import { StatsCard } from '@/components/admin/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, router } from '@inertiajs/react';
import { BarChart3, Calendar, DollarSign, Download, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function RevenueIndex({ payments, stats, byCategory, byBillingCycle, monthlyTrend, filters, categories, billingCycles }) {
    const [dateFilters, setDateFilters] = useState({
        from: filters.from || '',
        to: filters.to || '',
    });

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

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value === 'all' ? '' : value };
        Object.keys(newFilters).forEach((k) => {
            if (!newFilters[k]) delete newFilters[k];
        });
        router.get(route('admin.revenue.index'), newFilters, { preserveState: true, preserveScroll: true });
    };

    const handleDateFilter = () => {
        const newFilters = { ...filters, ...dateFilters };
        Object.keys(newFilters).forEach((k) => {
            if (!newFilters[k]) delete newFilters[k];
        });
        router.get(route('admin.revenue.index'), newFilters, { preserveState: true, preserveScroll: true });
    };

    const handleExport = () => {
        const params = new URLSearchParams(filters);
        window.location.href = route('admin.revenue.export') + '?' + params.toString();
    };

    const clearFilters = () => {
        setDateFilters({ from: '', to: '' });
        router.get(route('admin.revenue.index'), {}, { preserveState: true });
    };

    const columns = [
        {
            key: 'user',
            label: 'User',
            render: (payment) => (
                <div>
                    <p className="text-foreground font-medium">{payment.user?.name || 'N/A'}</p>
                    <p className="text-muted-foreground text-xs">{payment.user?.phone || 'N/A'}</p>
                </div>
            ),
        },
        {
            key: 'category',
            label: 'Category',
            render: (payment) => <span className="text-foreground capitalize">{payment.category}</span>,
        },
        {
            key: 'billing_cycle',
            label: 'Billing',
            render: (payment) => <span className="text-foreground capitalize">{payment.billing_cycle?.replace('_', ' ')}</span>,
        },
        {
            key: 'amount',
            label: 'Amount',
            render: (payment) => <span className="text-foreground font-bold">{formatCurrency(payment.amount)}</span>,
        },
        {
            key: 'payment_type',
            label: 'Type',
            render: (payment) => (
                <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${payment.payment_type === 'renewal' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {payment.payment_type || 'initial'}
                </span>
            ),
        },
        {
            key: 'paid_at',
            label: 'Date',
            render: (payment) => <span className="text-muted-foreground text-sm">{formatDate(payment.paid_at)}</span>,
        },
    ];

    const categoryColors = {
        artisans: 'bg-blue-500',
        hotels: 'bg-purple-500',
        transport: 'bg-green-500',
        rentals: 'bg-yellow-500',
        marketplace: 'bg-pink-500',
        jobs: 'bg-orange-500',
    };

    const totalByCategory = byCategory?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;

    return (
        <AdminLayout>
            <Head title="Revenue" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-foreground text-2xl font-bold">Revenue</h1>
                        <p className="text-muted-foreground">Track and analyze payment data</p>
                    </div>
                    <Button onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard title="Total Revenue" value={formatCurrency(stats.total)} description="All time" icon={DollarSign} />
                    <StatsCard title="This Month" value={formatCurrency(stats.this_month)} description="Current month" icon={TrendingUp} />
                    <StatsCard title="This Week" value={formatCurrency(stats.this_week)} description="Current week" icon={BarChart3} />
                    <StatsCard title="Today" value={formatCurrency(stats.today)} description="Today's revenue" icon={Calendar} />
                </div>

                {/* Revenue by Category & Billing Cycle */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* By Category */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue by Category</CardTitle>
                            <CardDescription>Breakdown of revenue per category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {byCategory?.length > 0 ? (
                                <div className="space-y-4">
                                    {byCategory.map((item) => (
                                        <div key={item.category} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground text-sm font-medium capitalize">{item.category}</span>
                                                <div className="text-right">
                                                    <span className="text-foreground font-medium">{formatCurrency(item.total)}</span>
                                                    <span className="text-muted-foreground ml-2 text-xs">({item.count} payments)</span>
                                                </div>
                                            </div>
                                            <div className="bg-muted h-2 overflow-hidden rounded-full">
                                                <div
                                                    className={`h-full rounded-full ${categoryColors[item.category] || 'bg-primary'}`}
                                                    style={{ width: `${totalByCategory > 0 ? (item.total / totalByCategory) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground py-8 text-center">No data available</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* By Billing Cycle */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue by Billing Cycle</CardTitle>
                            <CardDescription>Distribution across billing cycles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {byBillingCycle?.length > 0 ? (
                                <div className="grid gap-4">
                                    {byBillingCycle.map((item) => (
                                        <div key={item.billing_cycle} className="border-border flex items-center justify-between rounded-lg border p-4">
                                            <div>
                                                <p className="text-foreground font-medium capitalize">{item.billing_cycle?.replace('_', ' ')}</p>
                                                <p className="text-muted-foreground text-sm">{item.count} payments</p>
                                            </div>
                                            <p className="text-foreground text-lg font-bold">{formatCurrency(item.total)}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground py-8 text-center">No data available</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment History</CardTitle>
                        <CardDescription>Filter and browse payment records</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 flex flex-wrap items-end gap-4">
                            <div>
                                <label className="text-muted-foreground mb-1 block text-sm">Category</label>
                                <Select value={filters.category || 'all'} onValueChange={(value) => handleFilterChange('category', value)}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="capitalize">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-muted-foreground mb-1 block text-sm">Billing Cycle</label>
                                <Select value={filters.billing_cycle || 'all'} onValueChange={(value) => handleFilterChange('billing_cycle', value)}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Cycles</SelectItem>
                                        {billingCycles.map((cycle) => (
                                            <SelectItem key={cycle.value} value={cycle.value}>
                                                {cycle.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-muted-foreground mb-1 block text-sm">From Date</label>
                                <Input type="date" value={dateFilters.from} onChange={(e) => setDateFilters({ ...dateFilters, from: e.target.value })} className="w-[150px]" />
                            </div>

                            <div>
                                <label className="text-muted-foreground mb-1 block text-sm">To Date</label>
                                <Input type="date" value={dateFilters.to} onChange={(e) => setDateFilters({ ...dateFilters, to: e.target.value })} className="w-[150px]" />
                            </div>

                            <Button onClick={handleDateFilter}>Apply</Button>
                            <Button variant="outline" onClick={clearFilters}>
                                Clear
                            </Button>
                        </div>

                        <DataTable columns={columns} data={payments.data} pagination={payments} emptyMessage="No payments found" emptyIcon={DollarSign} />
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
