import { StatsCard } from '@/components/admin/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, Calendar, CheckCircle, Clock, CreditCard, TrendingUp, XCircle } from 'lucide-react';

export default function SubscriptionsAnalytics({ analytics, dateRange }) {
    const handleDateRangeChange = (value) => {
        router.get(route('admin.subscriptions.analytics'), { range: value }, { preserveState: true });
    };

    const categoryColors = {
        artisans: 'bg-blue-500',
        hotels: 'bg-purple-500',
        transport: 'bg-green-500',
        rentals: 'bg-yellow-500',
        marketplace: 'bg-pink-500',
        jobs: 'bg-orange-500',
    };

    const statusColors = {
        Active: 'bg-green-500',
        'Grace Period': 'bg-yellow-500',
        Expired: 'bg-red-500',
        Cancelled: 'bg-gray-500',
    };

    const totalByCategory = Object.values(analytics.byCategory || {}).reduce((a, b) => a + b, 0);
    const totalByStatus = Object.values(analytics.byStatus || {}).reduce((a, b) => a + b, 0);

    return (
        <AdminLayout>
            <Head title="Subscription Analytics" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.subscriptions.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-foreground text-2xl font-bold">Subscription Analytics</h1>
                            <p className="text-muted-foreground">Overview of subscription metrics</p>
                        </div>
                    </div>
                    <Select value={String(dateRange)} onValueChange={handleDateRangeChange}>
                        <SelectTrigger className="w-[180px]">
                            <Calendar className="mr-2 h-4 w-4" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                            <SelectItem value="90">Last 90 days</SelectItem>
                            <SelectItem value="365">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard title="Total Active" value={analytics.totalActive?.toLocaleString() || 0} description="Active subscriptions" icon={CheckCircle} />
                    <StatsCard
                        title="New Subscriptions"
                        value={analytics.newSubscriptions?.toLocaleString() || 0}
                        description={`Last ${dateRange} days`}
                        icon={TrendingUp}
                    />
                    <StatsCard title="Expiring Soon" value={analytics.expiringSoon?.toLocaleString() || 0} description="Within 7 days" icon={AlertTriangle} />
                    <StatsCard title="Recently Expired" value={analytics.recentlyExpired?.toLocaleString() || 0} description="Last 30 days" icon={XCircle} />
                </div>

                {/* Charts Row */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* By Category */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Active by Category</CardTitle>
                            <CardDescription>Distribution of active subscriptions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {Object.keys(analytics.byCategory || {}).length > 0 ? (
                                <div className="space-y-4">
                                    {Object.entries(analytics.byCategory).map(([category, count]) => (
                                        <div key={category} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground text-sm font-medium capitalize">{category}</span>
                                                <span className="text-muted-foreground text-sm">
                                                    {count} ({totalByCategory > 0 ? Math.round((count / totalByCategory) * 100) : 0}%)
                                                </span>
                                            </div>
                                            <div className="bg-muted h-2 overflow-hidden rounded-full">
                                                <div
                                                    className={`h-full rounded-full ${categoryColors[category] || 'bg-primary'}`}
                                                    style={{ width: `${totalByCategory > 0 ? (count / totalByCategory) * 100 : 0}%` }}
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

                    {/* By Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>By Status</CardTitle>
                            <CardDescription>All subscriptions by status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {Object.keys(analytics.byStatus || {}).length > 0 ? (
                                <div className="space-y-4">
                                    {Object.entries(analytics.byStatus).map(([status, count]) => (
                                        <div key={status} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground text-sm font-medium">{status}</span>
                                                <span className="text-muted-foreground text-sm">
                                                    {count} ({totalByStatus > 0 ? Math.round((count / totalByStatus) * 100) : 0}%)
                                                </span>
                                            </div>
                                            <div className="bg-muted h-2 overflow-hidden rounded-full">
                                                <div
                                                    className={`h-full rounded-full ${statusColors[status] || 'bg-primary'}`}
                                                    style={{ width: `${totalByStatus > 0 ? (count / totalByStatus) * 100 : 0}%` }}
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
                </div>

                {/* Billing Cycle Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Billing Cycle Distribution</CardTitle>
                        <CardDescription>Active subscriptions by billing cycle</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {Object.keys(analytics.byBillingCycle || {}).length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-3">
                                {Object.entries(analytics.byBillingCycle).map(([cycle, count]) => (
                                    <div key={cycle} className="border-border rounded-lg border p-4 text-center">
                                        <div className="bg-primary/10 text-primary mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <p className="text-foreground text-2xl font-bold">{count}</p>
                                        <p className="text-muted-foreground text-sm">{cycle}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground py-8 text-center">No data available</p>
                        )}
                    </CardContent>
                </Card>

                {/* Subscription Trend */}
                {analytics.trend?.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>New Subscriptions Trend</CardTitle>
                            <CardDescription>Daily new subscriptions over the selected period</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[200px] items-end gap-1">
                                {analytics.trend.map((item, idx) => {
                                    const maxCount = Math.max(...analytics.trend.map((t) => t.count));
                                    const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                                    return (
                                        <div key={idx} className="group relative flex-1" title={`${item.date}: ${item.count} subscriptions`}>
                                            <div className="bg-primary/20 hover:bg-primary/40 absolute bottom-0 w-full rounded-t transition-colors" style={{ height: `${Math.max(height, 4)}%` }} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                                <span>{analytics.trend[0]?.date}</span>
                                <span>{analytics.trend[analytics.trend.length - 1]?.date}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
