import { CategoriesSection } from '@/components/visitor/categories-section';
import { CTASection } from '@/components/visitor/cta-section';
import { HeroSection } from '@/components/visitor/hero-section';
import { HowItWorksSection } from '@/components/visitor/how-it-works-section';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <VisitorLayout>
            <Head title="Home">
                <meta name="description" content="Welcome to 2RBUAME - Ghana's trusted platform for finding jobs, marketplace products, skilled artisans, hotels, transport services, and rentals. Connect with professionals and discover opportunities." />
                <meta name="keywords" content="2RBUAME, Ghana services, jobs Ghana, marketplace, artisans, hotels, transport, rentals, find services, hire professionals" />
                <meta property="og:title" content="2RBUAME - Your Gateway to Services in Ghana" />
                <meta property="og:description" content="Find jobs, marketplace products, skilled artisans, hotels, transport services, and rentals all in one place. Connect with trusted professionals across Ghana." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="2RBUAME - Your Gateway to Services in Ghana" />
                <meta name="twitter:description" content="Find jobs, marketplace products, skilled artisans, hotels, transport services, and rentals all in one place." />
            </Head>
            <HeroSection />
            <CategoriesSection />
            <HowItWorksSection />
            {/* <FeaturedProvidersSection /> */}
            <CTASection />
            {/* <TestimonialsSection /> */}
        </VisitorLayout>
    );
}
