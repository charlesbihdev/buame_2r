import { AppLogo } from '@/components/visitor/app-logo';
import { navigateToSection } from '@/services/dashboardNavigation';
import { Link } from '@inertiajs/react';
import { Bell, Building2, Car, Home, Image as ImageIcon, ListChecks, LogOut, Menu, Package, Store, User, X } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({ user, children, activeCategory, activeSection, categoryData }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const getCategoryNavItems = () => {
        if (!activeCategory) return [];

        switch (activeCategory) {
            case 'artisans':
                return [
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
                ];
            case 'hotels':
                return [
                    { id: 'profile', label: 'Profile', icon: Building2 },
                    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                ];
            case 'transport':
                return [
                    { id: 'profile', label: 'Profile', icon: Car },
                    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                ];
            case 'rentals':
                return [
                    { id: 'profile', label: 'Profile', icon: Home },
                    { id: 'features', label: 'Features', icon: ListChecks },
                    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                ];
            case 'marketplace':
                return [
                    { id: 'store', label: 'Store Settings', icon: Store },
                    { id: 'products', label: 'Products', icon: Package },
                ];
            default:
                return [];
        }
    };

    const navItems = getCategoryNavItems();

    const handleNavClick = (section) => {
        navigateToSection(section);
    };

    return (
        <div className="bg-background flex h-screen w-full overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`bg-card border-border fixed inset-y-0 left-0 z-30 w-72 transform border-r transition-transform duration-300 md:relative md:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col justify-between p-5">
                    <div className="flex flex-col gap-8">
                        {/* Branding */}
                        <div className="flex flex-col gap-2 px-2">
                            <AppLogo size="lg" className="justify-start" href={route('user.dashboard.index')} />
                        </div>

                        {/* Category Navigation */}
                        {navItems.length > 0 && (
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeSection === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavClick(item.id)}
                                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                                                isActive ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-muted'
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        )}
                    </div>

                    {/* User Profile & Logout */}
                    <div className="border-border flex flex-col gap-2 border-t pt-4">
                        <div className="hover:bg-muted flex items-center gap-3 rounded-lg px-2 py-2 transition-colors">
                            <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                                <span className="text-primary text-sm font-bold">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-foreground truncate text-sm font-bold">{user?.name}</p>
                                <p className="text-muted-foreground truncate text-xs">{user?.phone}</p>
                            </div>
                        </div>
                        <Link
                            href={route('user.logout')}
                            method="post"
                            className="text-destructive hover:bg-destructive/10 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Log Out</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="border-border bg-card flex h-16 items-center justify-between border-b px-4 md:hidden">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground">
                        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                    <span className="text-foreground text-lg font-bold">2RBUAME</span>
                    <div className="flex items-center gap-2">
                        <button className="hover:bg-muted relative rounded-full p-2 transition-colors">
                            <Bell className="text-muted-foreground h-5 w-5" />
                            <span className="bg-destructive border-card absolute top-1 right-1 h-2 w-2 rounded-full border-2" />
                        </button>
                    </div>
                </header>

                {/* Desktop Header */}
                <header className="border-border bg-card hidden h-16 items-center justify-between border-b px-6 md:flex">
                    <div className="flex items-center gap-4">
                        <h2 className="text-foreground text-xl font-bold">
                            {activeCategory ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) : 'Dashboard'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hover:bg-muted relative rounded-full p-2 transition-colors">
                            <Bell className="text-muted-foreground h-5 w-5" />
                            <span className="bg-destructive border-card absolute top-1 right-1 h-2 w-2 rounded-full border-2" />
                        </button>
                        <div className="border-border bg-card flex items-center gap-3 rounded-full border px-4 py-2">
                            <span className="text-foreground text-sm font-bold">{user?.name}</span>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}
        </div>
    );
}
