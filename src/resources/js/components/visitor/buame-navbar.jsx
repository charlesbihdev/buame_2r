import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
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
        <header className="border-border bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3 md:px-8 lg:px-40">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src="/assets/logo/2RBUAME.png" alt="BUAME 2R Logo" className="h-18 w-auto" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.url}
                            href={item.url}
                            className={cn(
                                'text-sm font-semibold transition-colors',
                                item.active ? 'text-primary' : 'text-foreground hover:text-primary',
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
                                className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 hidden h-10 items-center justify-center rounded-lg px-4 text-sm font-bold shadow-sm transition-colors sm:flex"
                            >
                                <Link href={route('user.dashboard.index')}>Dashboard</Link>
                            </Button>
                            <div className="border-border bg-card flex h-10 items-center gap-2 rounded-lg border px-3">
                                <div className="bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full">
                                    <span className="text-primary text-xs font-bold">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                                </div>
                                <span className="text-foreground hidden text-sm font-semibold sm:inline">{user?.name}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                asChild
                                className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 hidden h-10 items-center justify-center rounded-lg px-4 text-sm font-bold shadow-sm transition-colors sm:flex"
                            >
                                <Link href="/choose-path">Join as Provider</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-border bg-card text-foreground hover:bg-muted flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-bold transition-colors"
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
                                className="border-border bg-card flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden"
                            >
                                <Menu className="text-muted-foreground h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-2">
                                    <img src="/assets/logo/2RBUAME LOGO PNG.png" alt="BUAME 2R Logo" className="h-10 w-auto" />
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
                                            item.active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted hover:text-primary',
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                                <div className="border-border flex flex-col gap-3 border-t pt-4">
                                    {user ? (
                                        <>
                                            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full font-bold">
                                                <Link href={route('user.dashboard.index')} onClick={() => setMobileMenuOpen(false)}>
                                                    Dashboard
                                                </Link>
                                            </Button>
                                            <div className="border-border bg-card flex items-center gap-3 rounded-lg border px-4 py-3">
                                                <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                                                    <span className="text-primary text-xs font-bold">
                                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-foreground truncate text-sm font-semibold">{user?.name}</p>
                                                    <p className="text-muted-foreground truncate text-xs">{user?.phone}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full font-bold">
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
