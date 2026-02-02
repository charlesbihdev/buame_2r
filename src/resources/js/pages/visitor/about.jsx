import { AboutCTA } from '@/components/visitor/about/about-cta';
import { AboutHero } from '@/components/visitor/about/about-hero';
import { EcosystemGrid } from '@/components/visitor/about/ecosystem-grid';
import { MissionVision } from '@/components/visitor/about/mission-vision';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <VisitorLayout>
            <Head title="About Us - 2RBUAME" />
            <AboutHero />
            <MissionVision />
            <EcosystemGrid />
            <AboutCTA />
        </VisitorLayout>
    );
}
