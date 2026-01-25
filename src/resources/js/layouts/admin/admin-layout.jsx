import { AppLogo } from '@/components/visitor/app-logo';
import ToastProvider from '@/components/ui/toast-provider';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    CreditCard,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Package,
    Shield,
    Star,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const { admin } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isSuperAdmin = admin?.is_super_admin;

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: route('admin.dashboard'), pattern: 'admin.dashboard' },
        { id: 'users', label: 'Users', icon: Users, href: route('admin.users.index'), pattern: 'admin.users.*' },
        { id: 'marketplace', label: 'Marketplace', icon: Package, href: route('admin.marketplace.index'), pattern: 'admin.marketplace.*' },
        { id: 'reviews', label: 'Reviews', icon: Star, href: route('admin.reviews.index'), pattern: 'admin.reviews.*' },
        // Super Admin only items
        ...(isSuperAdmin
            ? [
                  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, href: route('admin.subscriptions.index'), pattern: 'admin.subscriptions.*' },
                  { id: 'revenue', label: 'Revenue', icon: BarChart3, href: route('admin.revenue.index'), pattern: 'admin.revenue.*' },
                  { id: 'admins', label: 'Admin Management', icon: Shield, href: route('admin.admins.index'), pattern: 'admin.admins.*' },
              ]
            : []),
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, href: route('admin.testimonials.index'), pattern: 'admin.testimonials.*' },
    ];

    const isActive = (pattern) => {
        return route().current(pattern);
    };

    return (
        <ToastProvider>
            <div className="bg-background flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`bg-card border-border fixed inset-y-0 left-0 z-30 w-64 transform border-r transition-transform duration-300 md:relative md:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex h-full flex-col justify-between p-4">
                        <div className="flex flex-col gap-6">
                            {/* Logo */}
                            <div className="px-2 py-4">
                                <AppLogo size="lg" className="justify-start" />
                                <span className="text-muted-foreground mt-1 block text-xs">Admin Panel</span>
                            </div>

                            {/* Navigation */}
                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.pattern);
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* User Profile & Logout */}
                        <div className="border-border flex flex-col gap-2 border-t pt-4">
                            <div className="flex items-center gap-3 px-2 py-2">
                                <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                                    <span className="text-primary text-sm font-bold">{admin?.name?.charAt(0).toUpperCase() || 'A'}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-foreground truncate text-sm font-bold">{admin?.name}</p>
                                    <p className="text-muted-foreground truncate text-xs">{admin?.role_label}</p>
                                </div>
                            </div>
                            <Link
                                href={route('admin.logout')}
                                method="post"
                                className="text-destructive hover:bg-destructive/10 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Log Out</span>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Header */}
                    <header className="border-border bg-card flex h-16 items-center justify-between border-b px-4 md:px-6">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground md:hidden">
                            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                        <div className="flex items-center gap-4">
                            <span className="text-foreground hidden font-semibold md:block">Admin Dashboard</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="border-border bg-card hidden items-center gap-2 rounded-full border px-4 py-2 md:flex">
                                <span className="text-foreground text-sm font-medium">{admin?.name}</span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                        isSuperAdmin ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                    }`}
                                >
                                    {admin?.role_label}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
                </div>

                {/* Mobile Overlay */}
                {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}
            </div>
        </ToastProvider>
    );
}
