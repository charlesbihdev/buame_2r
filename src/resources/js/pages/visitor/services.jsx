import { ProviderCTA } from '@/components/visitor/services/provider-cta';
import { ServicesGrid } from '@/components/visitor/services/services-grid';
import { ServicesHeader } from '@/components/visitor/services/services-header';
import { ServicesHero } from '@/components/visitor/services/services-hero';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function Services() {
    return (
        <VisitorLayout>
            <Head title="Services">
                <meta name="description" content="Explore all services available on 2RBUAME - from skilled artisans, marketplace products, hotels, transport to rentals. Find the right service provider for your needs in Ghana." />
                <meta name="keywords" content="2RBUAME services, Ghana services, artisans, marketplace, hotels, transport, rentals, service providers, professional services" />
                <meta property="og:title" content="Our Services - 2RBUAME" />
                <meta property="og:description" content="Discover the wide range of services on 2RBUAME - artisans, marketplace, hotels, transport, and rentals. Find trusted service providers across Ghana." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Our Services - 2RBUAME" />
                <meta name="twitter:description" content="Discover the wide range of services on 2RBUAME - artisans, marketplace, hotels, transport, and rentals." />
            </Head>
            <main className="flex w-full flex-1 flex-col items-center px-4 py-6 md:px-10 lg:px-20 xl:px-40">
                <div className="layout-content-container flex w-full max-w-[1200px] flex-col gap-8 md:gap-12">
                    <ServicesHero />
                    <ServicesHeader />
                    <ServicesGrid />
                    <ProviderCTA />
                </div>
            </main>
        </VisitorLayout>
    );
}
