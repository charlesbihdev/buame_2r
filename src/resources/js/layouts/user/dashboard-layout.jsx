import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X, Bell, LogOut, User, Image as ImageIcon, Building2, Car, Home, ListChecks, Package, Store } from 'lucide-react';
import { navigateToSection } from '@/services/dashboardNavigation';

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
        <div className="flex h-screen w-full overflow-hidden bg-[#f6f8f6] dark:bg-[#102210]">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-white dark:bg-[#1a331a] border-r border-[#e7f3e7] dark:border-[#2a4d2a] transition-transform duration-300 md:relative md:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col justify-between p-5">
                    <div className="flex flex-col gap-8">
                        {/* Branding */}
                        <div className="flex items-center gap-3 px-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#13ec13]/20">
                                <span className="text-xl font-bold text-[#13ec13]">B2R</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold text-[#0d1b0d] dark:text-white">BUAME 2R</h1>
                                <p className="text-sm font-medium text-[#4c9a4c] dark:text-[#8fcc8f]">Dashboard</p>
                            </div>
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
                                                isActive
                                                    ? 'bg-[#e7f3e7] dark:bg-[#254225] text-[#0d1b0d] dark:text-white'
                                                    : 'text-[#4c9a4c] dark:text-[#8fcc8f] hover:bg-[#f6f8f6] dark:hover:bg-[#1f3d1f]'
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
                    <div className="flex flex-col gap-2 border-t border-[#e7f3e7] dark:border-[#2a4d2a] pt-4">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#f6f8f6] dark:hover:bg-[#1f3d1f] transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#13ec13]/20">
                                <span className="text-sm font-bold text-[#13ec13]">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate text-[#0d1b0d] dark:text-white">{user?.name}</p>
                                <p className="text-xs truncate text-[#4c9a4c] dark:text-[#8fcc8f]">{user?.phone}</p>
                            </div>
                        </div>
                        <Link
                            href={route('user.logout')}
                            method="post"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
                <header className="flex h-16 items-center justify-between border-b border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] px-4 md:hidden">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#0d1b0d] dark:text-white">
                        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                    <span className="text-lg font-bold text-[#0d1b0d] dark:text-white">BUAME 2R</span>
                    <div className="flex items-center gap-2">
                        <button className="relative rounded-full p-2 hover:bg-[#f6f8f6] dark:hover:bg-[#1f3d1f] transition-colors">
                            <Bell className="h-5 w-5 text-[#4c9a4c] dark:text-[#8fcc8f]" />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-[#1a331a]" />
                        </button>
                    </div>
                </header>

                {/* Desktop Header */}
                <header className="hidden h-16 items-center justify-between border-b border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] px-6 md:flex">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-[#0d1b0d] dark:text-white">
                            {activeCategory ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) : 'Dashboard'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative rounded-full p-2 hover:bg-[#f6f8f6] dark:hover:bg-[#1f3d1f] transition-colors">
                            <Bell className="h-5 w-5 text-[#4c9a4c] dark:text-[#8fcc8f]" />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-[#1a331a]" />
                        </button>
                        <div className="flex items-center gap-3 rounded-full border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] px-4 py-2">
                            <span className="text-sm font-bold text-[#0d1b0d] dark:text-white">{user?.name}</span>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}

