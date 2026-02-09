import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { MarketplaceHero } from '@/components/visitor/marketplace/marketplace-hero';
import { MarketplaceFilters } from '@/components/visitor/marketplace/marketplace-filters';
import { MarketplaceToolbar } from '@/components/visitor/marketplace/marketplace-toolbar';
import { MarketplaceProducts } from '@/components/visitor/marketplace/marketplace-products';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Marketplace({ products = [], pagination = {}, filters = {} }) {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    return (
        <VisitorLayout>
            <Head title="Marketplace">
                <meta name="description" content="Shop the 2RBUAME marketplace for new and used products in Ghana. Find electronics, fashion, home goods, and more from trusted sellers." />
                <meta name="keywords" content="2RBUAME marketplace, buy and sell Ghana, online shopping, products Ghana, electronics, fashion, home goods" />
                <meta property="og:title" content="Marketplace - Buy & Sell on 2RBUAME" />
                <meta property="og:description" content="Discover amazing products from trusted sellers across Ghana. Shop electronics, fashion, home goods, and more." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Marketplace - Buy & Sell on 2RBUAME" />
                <meta name="twitter:description" content="Discover amazing products from trusted sellers across Ghana." />
            </Head>
            <MarketplaceHero />
            <div className="flex grow flex-col lg:flex-row">
                {/* Desktop Filters */}
                <MarketplaceFilters filters={filters} isMobile={false} />
                {/* Mobile Filters */}
                {showMobileFilters && (
                    <div className="lg:hidden">
                        <MarketplaceFilters filters={filters} isMobile={true} />
                    </div>
                )}
                <main className="flex flex-1 flex-col bg-background-light p-4 dark:bg-background-dark md:p-6 lg:p-8">
                    <MarketplaceToolbar filters={filters} pagination={pagination} onFilterToggle={() => setShowMobileFilters(!showMobileFilters)} />
                    <MarketplaceProducts products={products} />
                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <Button
                                asChild
                                variant="outline"
                                disabled={pagination.current_page === 1}
                                className="h-10 rounded-lg border border-[var(--buame-border-light)] bg-white px-4 disabled:opacity-50 dark:border-white/10 dark:bg-white/5"
                            >
                                <Link
                                    href={pagination.links?.find((link) => link.label === '&laquo; Previous')?.url || '#'}
                                    preserveState
                                    preserveScroll
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            </Button>
                            <div className="flex gap-1">
                                {pagination.links?.map((link, index) => {
                                    if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
                                        return null;
                                    }
                                    const page = link.label;
                                    const isActive = link.active;
                                    return (
                                        <Button
                                            key={index}
                                            asChild
                                            variant={isActive ? 'default' : 'outline'}
                                            className={`h-10 min-w-10 rounded-lg px-4 ${isActive
                                                ? 'bg-[var(--primary)] text-white'
                                                : 'border border-[var(--buame-border-light)] bg-white dark:border-white/10 dark:bg-white/5'
                                                }`}
                                        >
                                            <Link href={link.url || '#'} preserveState preserveScroll>
                                                {page}
                                            </Link>
                                        </Button>
                                    );
                                })}
                            </div>
                            <Button
                                asChild
                                variant="outline"
                                disabled={pagination.current_page === pagination.last_page}
                                className="h-10 rounded-lg border border-[var(--buame-border-light)] bg-white px-4 disabled:opacity-50 dark:border-white/10 dark:bg-white/5"
                            >
                                <Link
                                    href={pagination.links?.find((link) => link.label === 'Next &raquo;')?.url || '#'}
                                    preserveState
                                    preserveScroll
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </VisitorLayout>
    );
}


