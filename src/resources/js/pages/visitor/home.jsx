import { CategoriesSection } from '@/components/visitor/categories-section';
import { CTASection } from '@/components/visitor/cta-section';
import { HeroSection } from '@/components/visitor/hero-section';
import { HowItWorksSection } from '@/components/visitor/how-it-works-section';
import { TestimonialsSection } from '@/components/visitor/testimonials-section';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <VisitorLayout>
            <Head title="Home - 2RBUAME" />
            <HeroSection />
            <CategoriesSection />
            <HowItWorksSection />
            {/* <FeaturedProvidersSection /> */}
            <CTASection />
            <TestimonialsSection />
        </VisitorLayout>
    );
}
