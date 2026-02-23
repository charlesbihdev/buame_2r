import { CategoriesSection } from '@/components/visitor/categories-section';
import { CTASection } from '@/components/visitor/cta-section';
import { HeroSection } from '@/components/visitor/hero-section';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <VisitorLayout>
            <Head title="Home">
                <meta name="description" content="Find local services in Western North Ghana. Artisans, transport, hotels, rentals, marketplace, and jobs." />
                <meta name="keywords" content="2RBUAME, Ghana services, artisans, hotels, transport, rentals, marketplace, jobs" />
                <meta property="og:title" content="2RBUAME - Find Services Near You" />
                <meta property="og:description" content="Find artisans, transport, hotels, rentals, and more in Western North Ghana." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="2RBUAME - Find Services Near You" />
                <meta name="twitter:description" content="Find artisans, transport, hotels, rentals, and more in Western North Ghana." />
            </Head>
            <HeroSection />
            <CategoriesSection />
            <CTASection />
        </VisitorLayout>
    );
}
