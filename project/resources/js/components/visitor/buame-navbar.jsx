import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Network } from 'lucide-react';
import { useState } from 'react';

export function BuameNavbar() {
    const page = usePage();
    const currentUrl = page.url;
    const { auth } = page.props;
    const user = auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { title: 'Home', url: '/', active: currentUrl === '/' },
        { title: 'Services', url: '/services', active: currentUrl.startsWith('/services') },
        { title: 'About', url: '/about', active: currentUrl.startsWith('/about') },
        { title: 'Contact', url: '/contact', active: currentUrl.startsWith('/contact') },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#e7f3e7] bg-[#f8fcf8]/95 backdrop-blur-sm dark:border-gray-800 dark:bg-[#102210]/95">
            <div className="flex items-center justify-between px-4 py-3 md:px-8 lg:px-40">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 text-[#0d1b0d] dark:text-white">
                    <div className="flex size-8 items-center justify-center text-[#13ec13]">
                        <Network className="h-8 w-8" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-[#0d1b0d] dark:text-white">BUAME 2R</h2>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.url}
                            href={item.url}
                            className={cn(
                                'text-sm font-semibold transition-colors',
                                item.active ? 'text-[#13ec13]' : 'text-[#0d1b0d] hover:text-[#13ec13] dark:text-gray-300',
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {user ? (
                        <>
                            <Button
                                asChild
                                className="hidden h-10 items-center justify-center rounded-lg bg-[#13ec13] px-4 text-sm font-bold text-[#0d1b0d] shadow-sm shadow-green-200/50 transition-colors hover:bg-[#0eb50e] sm:flex"
                            >
                                <Link href={route('user.dashboard.index')}>Dashboard</Link>
                            </Button>
                            <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#13ec13]/20">
                                    <span className="text-xs font-bold text-[#13ec13]">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                                </div>
                                <span className="hidden text-sm font-semibold text-[#0d1b0d] sm:inline dark:text-white">{user?.name}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                asChild
                                className="hidden h-10 items-center justify-center rounded-lg bg-[#13ec13] px-4 text-sm font-bold text-[#0d1b0d] shadow-sm shadow-green-200/50 transition-colors hover:bg-[#0eb50e] sm:flex"
                            >
                                <Link href="/choose-path">Join as Provider</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-bold text-[#0d1b0d] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            >
                                <Link href={route('user.login')}>Log In</Link>
                            </Button>
                        </>
                    )}

                    {/* Mobile Menu Button */}
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white lg:hidden dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Menu className="h-5 w-5 text-gray-600 dark:text-white" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-4 text-[#0d1b0d] dark:text-white">
                                    <div className="flex size-8 items-center justify-center text-[#13ec13]">
                                        <Network className="h-8 w-8" />
                                    </div>
                                    <h2 className="text-xl font-bold">BUAME 2R</h2>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="mt-8 flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.url}
                                        href={item.url}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            'rounded-lg px-4 py-2 text-base font-semibold transition-colors',
                                            item.active
                                                ? 'bg-[#13ec13]/10 text-[#13ec13]'
                                                : 'text-[#0d1b0d] hover:bg-gray-50 hover:text-[#13ec13] dark:text-gray-300 dark:hover:bg-gray-800',
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                                <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                                    {user ? (
                                        <>
                                            <Button asChild className="h-10 w-full bg-[#13ec13] font-bold text-[#0d1b0d] hover:bg-[#0eb50e]">
                                                <Link href={route('user.dashboard.index')} onClick={() => setMobileMenuOpen(false)}>
                                                    Dashboard
                                                </Link>
                                            </Button>
                                            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#13ec13]/20">
                                                    <span className="text-xs font-bold text-[#13ec13]">
                                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold text-[#0d1b0d] dark:text-white">{user?.name}</p>
                                                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.phone}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Button asChild className="h-10 w-full bg-[#13ec13] font-bold text-[#0d1b0d] hover:bg-[#0eb50e]">
                                                <Link href="/choose-path" onClick={() => setMobileMenuOpen(false)}>
                                                    Join as Provider
                                                </Link>
                                            </Button>
                                            <Button asChild variant="outline" className="h-10 w-full">
                                                <Link href={route('user.login')} onClick={() => setMobileMenuOpen(false)}>
                                                    Log In
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
