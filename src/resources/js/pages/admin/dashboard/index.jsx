import { StatsCard } from '@/components/admin/StatsCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, CreditCard, Package, Shield, ShoppingBag, Users } from 'lucide-react';

export default function AdminDashboard({ admin, stats, recentUsers, pendingProducts }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: 'GHS',
        }).format(amount || 0);
    };

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-foreground text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {admin.name}!</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard title="Total Users" value={stats.total_users?.toLocaleString() || 0} description={`${stats.active_users || 0} active`} icon={Users} />
                    <StatsCard
                        title="Pending Products"
                        value={stats.pending_products || 0}
                        description={`${stats.total_products || 0} total products`}
                        icon={Package}
                    />

                    {admin.is_super_admin && (
                        <>
                            <StatsCard title="Total Revenue" value={formatCurrency(stats.total_revenue)} description="All time" icon={BarChart3} />
                            <StatsCard
                                title="Active Subscriptions"
                                value={stats.active_subscriptions || 0}
                                description={`${stats.expiring_subscriptions || 0} expiring soon`}
                                icon={CreditCard}
                            />
                        </>
                    )}

                    {!admin.is_super_admin && (
                        <>
                            <StatsCard title="Verified Users" value={stats.verified_users || 0} icon={Users} />
                            <StatsCard title="Approved Products" value={stats.approved_products || 0} icon={ShoppingBag} />
                        </>
                    )}
                </div>

                {/* Super Admin Stats */}
                {admin.is_super_admin && (
                    <div className="grid gap-4 md:grid-cols-3">
                        <StatsCard title="Monthly Revenue" value={formatCurrency(stats.monthly_revenue)} description="This month" icon={BarChart3} />
                        <StatsCard title="Blocked Users" value={stats.blocked_users || 0} icon={Users} />
                        <StatsCard title="Total Admins" value={stats.total_admins || 0} icon={Shield} />
                    </div>
                )}

                {/* Quick Actions & Recent Data */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Users */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Users</CardTitle>
                                <CardDescription>Latest user registrations</CardDescription>
                            </div>
                            <Link href={route('admin.users.index')}>
                                <Button variant="ghost" size="sm">
                                    View All
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {recentUsers?.length > 0 ? (
                                <div className="space-y-4">
                                    {recentUsers.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                                                    <span className="text-primary text-sm font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <div>
                                                    <p className="text-foreground text-sm font-medium">{user.name}</p>
                                                    <p className="text-muted-foreground text-xs">{user.phone}</p>
                                                </div>
                                            </div>
                                            <StatusBadge status={user.is_active} type="user" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground py-4 text-center text-sm">No recent users</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pending Products */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Pending Approvals</CardTitle>
                                <CardDescription>Products awaiting review</CardDescription>
                            </div>
                            <Link href={route('admin.marketplace.pending')}>
                                <Button variant="ghost" size="sm">
                                    View All
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {pendingProducts?.length > 0 ? (
                                <div className="space-y-4">
                                    {pendingProducts.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {product.images?.[0] ? (
                                                    <img
                                                        src={`/storage/${product.images[0].image_path}`}
                                                        alt={product.title}
                                                        className="h-10 w-10 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                                                        <Package className="text-muted-foreground h-5 w-5" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-foreground text-sm font-medium">{product.title}</p>
                                                    <p className="text-muted-foreground text-xs">by {product.user?.name}</p>
                                                </div>
                                            </div>
                                            <StatusBadge status={false} type="approval" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground py-4 text-center text-sm">No pending products</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Link href={route('admin.users.index')}>
                                <Button variant="outline">
                                    <Users className="mr-2 h-4 w-4" />
                                    Manage Users
                                </Button>
                            </Link>
                            <Link href={route('admin.marketplace.pending')}>
                                <Button variant="outline">
                                    <Package className="mr-2 h-4 w-4" />
                                    Review Products
                                </Button>
                            </Link>
                            {admin.is_super_admin && (
                                <>
                                    <Link href={route('admin.subscriptions.analytics')}>
                                        <Button variant="outline">
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            View Analytics
                                        </Button>
                                    </Link>
                                    <Link href={route('admin.admins.create')}>
                                        <Button variant="outline">
                                            <Shield className="mr-2 h-4 w-4" />
                                            Add Admin
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
