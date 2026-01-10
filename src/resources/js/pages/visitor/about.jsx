import { AboutCTA } from '@/components/visitor/about/about-cta';
import { AboutHero } from '@/components/visitor/about/about-hero';
import { EcosystemGrid } from '@/components/visitor/about/ecosystem-grid';
import { MissionVision } from '@/components/visitor/about/mission-vision';
import { StatsBar } from '@/components/visitor/about/stats-bar';
import { TeamSection } from '@/components/visitor/about/team-section';
import { TimelineSection } from '@/components/visitor/about/timeline-section';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <VisitorLayout>
            <Head title="About Us - 2RBUAME" />
            <AboutHero />
            <StatsBar />
            <MissionVision />
            <TimelineSection />
            <EcosystemGrid />
            <TeamSection />
            <AboutCTA />
        </VisitorLayout>
    );
}
