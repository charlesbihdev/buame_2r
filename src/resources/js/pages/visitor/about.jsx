import { AboutCTA } from '@/components/visitor/about/about-cta';
import { AboutHero } from '@/components/visitor/about/about-hero';
import { EcosystemGrid } from '@/components/visitor/about/ecosystem-grid';
import { MissionVision } from '@/components/visitor/about/mission-vision';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <VisitorLayout>
            <Head title="About Us">
                <meta name="description" content="Learn about 2RBUAME - our mission, vision, and commitment to connecting people with services across Ghana. Discover how we're building a trusted ecosystem for jobs, marketplace, and services." />
                <meta name="keywords" content="about 2RBUAME, our mission, our vision, Ghana services platform, trusted marketplace, service ecosystem" />
                <meta property="og:title" content="About Us - 2RBUAME" />
                <meta property="og:description" content="Learn about 2RBUAME's mission to connect people with trusted services across Ghana. Building a reliable ecosystem for jobs, marketplace, and professional services." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="About Us - 2RBUAME" />
                <meta name="twitter:description" content="Learn about 2RBUAME's mission to connect people with trusted services across Ghana." />
            </Head>
            <AboutHero />
            <MissionVision />
            <EcosystemGrid />
            <AboutCTA />
        </VisitorLayout>
    );
}
