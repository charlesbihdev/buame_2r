import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Shield,
    UserCheck,
    Users,
    Star,
    MessageSquare,
    CreditCard,
    MapPin,
    AlertTriangle,
    Lock,
    Eye,
    CheckCircle,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function SafetyHero() {
    return (
        <section className="relative w-full bg-[#1a2e1a] py-16 md:py-24">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="h-full w-full bg-cover bg-center opacity-40"
                    style={{
                        backgroundImage: 'url(/assets/visitors/bekwai.JPG)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--buame-background-dark)] via-[var(--buame-background-dark)]/80 to-transparent" />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                    <Shield className="h-10 w-10 text-white" />
                </div>
                <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">Safety Tips</h1>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-200 md:text-xl">
                    Your safety is very important to us. Follow these guidelines to ensure a secure experience on BUAME 2R.
                </p>
            </div>
        </section>
    );
}

function CustomerSafetySection() {
    const tips = [
        {
            icon: Star,
            title: 'Review Ratings & Reviews',
            description: 'Always review ratings and reviews before booking a service. Past experiences from other users help you make informed decisions.',
        },
        {
            icon: MessageSquare,
            title: 'Use In-App Communication',
            description: 'Use in-app communication where possible. This helps us protect you and provides a record of your conversations.',
        },
        {
            icon: CreditCard,
            title: 'Secure Payments',
            description: 'Avoid paying outside the platform unless agreed and verified. Platform payments offer better protection.',
        },
        {
            icon: MapPin,
            title: 'Meet in Safe Locations',
            description: 'Meet service providers in safe, public locations when necessary. Avoid isolated areas for first-time meetings.',
        },
        {
            icon: AlertTriangle,
            title: 'Report Suspicious Behavior',
            description: 'Report suspicious behavior immediately. Our team investigates all reports to keep the community safe.',
        },
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">For Customers</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Essential safety guidelines when using services on BUAME 2R
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tips.map((tip, index) => (
                        <Card key={index} className="border-border bg-card transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <tip.icon className="text-primary h-6 w-6" />
                                </div>
                                <CardTitle className="text-foreground text-lg">{tip.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed">{tip.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProviderSafetySection() {
    const tips = [
        {
            icon: UserCheck,
            title: 'Accurate Information',
            description: 'Provide accurate personal and service information. Honesty builds trust with customers.',
        },
        {
            icon: MessageSquare,
            title: 'Clear Communication',
            description: 'Communicate clearly with clients before accepting jobs. Set expectations upfront to avoid misunderstandings.',
        },
        {
            icon: CreditCard,
            title: 'Safe Payment Practices',
            description: 'Do not request unsafe or illegal payments. Use platform-approved payment methods.',
        },
        {
            icon: Users,
            title: 'Respect Customers',
            description: 'Respect customers and their property at all times. Professional conduct leads to better reviews.',
        },
    ];

    return (
        <section className="bg-muted/50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">For Service Providers</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Safety guidelines for providers offering services on BUAME 2R
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {tips.map((tip, index) => (
                        <Card key={index} className="border-border bg-card transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <tip.icon className="text-primary h-6 w-6" />
                                </div>
                                <CardTitle className="text-foreground text-lg">{tip.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed">{tip.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GeneralSafetySection() {
    const tips = [
        {
            icon: Lock,
            title: 'Protect Your Credentials',
            description: 'Do not share passwords or verification codes with anyone. BUAME 2R will never ask for your password.',
        },
        {
            icon: Eye,
            title: 'Be Vigilant',
            description: 'Be cautious of fake profiles or unrealistic offers. If something seems too good to be true, it probably is.',
        },
        {
            icon: CreditCard,
            title: 'Trusted Payment Methods',
            description: 'Use trusted payment methods supported by the platform for secure transactions.',
        },
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">General Safety</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Important safety practices for all users
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {tips.map((tip, index) => (
                            <Card key={index} className="border-border bg-card text-center transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                        <tip.icon className="text-primary h-8 w-8" />
                                    </div>
                                    <CardTitle className="text-foreground text-lg">{tip.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="leading-relaxed">{tip.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function SafetyChecklistSection() {
    const checklist = [
        'Verify the identity of service providers before booking',
        'Keep all conversations within the BUAME 2R platform',
        'Never share sensitive personal information unnecessarily',
        'Report any suspicious activity immediately',
        'Read reviews and ratings before making decisions',
        'Use secure and verified payment methods',
        'Meet in public places for in-person transactions',
        'Trust your instincts - if something feels wrong, report it',
    ];

    return (
        <section className="bg-primary/5 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Safety Checklist</h2>
                    <p className="text-muted-foreground mb-8">
                        Keep these points in mind every time you use BUAME 2R
                    </p>

                    <div className="space-y-4 text-left">
                        {checklist.map((item, index) => (
                            <div key={index} className="bg-card border-border flex items-start gap-4 rounded-lg border p-4">
                                <CheckCircle className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                                <p className="text-foreground">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link href="/help">
                            <Button size="lg" variant="outline" className="gap-2">
                                Help Center
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" className="gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                Report an Issue
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function SafetyTips() {
    return (
        <VisitorLayout>
            <Head title="Safety Tips - 2RBUAME" />
            <SafetyHero />
            <CustomerSafetySection />
            <ProviderSafetySection />
            <GeneralSafetySection />
            <SafetyChecklistSection />
        </VisitorLayout>
    );
}
