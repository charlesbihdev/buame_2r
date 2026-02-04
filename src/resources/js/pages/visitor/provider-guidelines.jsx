import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BadgeCheck,
    FileText,
    Clock,
    DollarSign,
    Shield,
    Star,
    ThumbsUp,
    Ban,
    AlertTriangle,
    UserX,
    Scale,
    ArrowRight,
    UserCheck,
    Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function ProviderHero() {
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
                    <BadgeCheck className="h-10 w-10 text-white" />
                </div>
                <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">Provider Guidelines</h1>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-200 md:text-xl">
                    All service providers on 2RBUAME must follow these rules to ensure a safe, professional, and trustworthy marketplace.
                </p>
            </div>
        </section>
    );
}

function RegistrationSection() {
    const requirements = [
        {
            icon: FileText,
            title: 'True & Complete Information',
            description: 'Provide true and complete personal information when registering your account.',
        },
        {
            icon: UserCheck,
            title: 'Valid Contact Details',
            description: 'Ensure your phone number and other contact details are valid so customers can reach you.',
        },
        {
            icon: Image,
            title: 'Professional Profile',
            description: 'Add a clear profile photo and detailed description of your services to attract customers.',
        },
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Registration Requirements</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        What you need to become a service provider on 2RBUAME
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {requirements.map((req, index) => (
                        <Card key={index} className="border-border bg-card text-center transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <req.icon className="text-primary h-8 w-8" />
                                </div>
                                <CardTitle className="text-foreground text-lg">{req.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed">{req.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceDeliverySection() {
    const guidelines = [
        {
            icon: ThumbsUp,
            title: 'Professional Delivery',
            description: 'Deliver services professionally and on time. Quality service builds your reputation and attracts more customers.',
        },
        {
            icon: DollarSign,
            title: 'Transparent Pricing',
            description: 'Clearly state prices, availability, and service scope. No hidden fees or unexpected charges.',
        },
        {
            icon: Shield,
            title: 'Respect Privacy & Safety',
            description: "Respect customers' privacy and safety at all times. Handle personal information with care.",
        },
        {
            icon: Clock,
            title: 'Timely Communication',
            description: 'Respond to inquiries promptly and keep customers informed about service status.',
        },
    ];

    return (
        <section className="bg-muted/50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Service Delivery</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Standards for delivering quality services to customers
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {guidelines.map((guideline, index) => (
                        <Card key={index} className="border-border bg-card transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                        <guideline.icon className="text-primary h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-foreground text-lg">{guideline.title}</CardTitle>
                                        <CardDescription className="mt-2 leading-relaxed">{guideline.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function RatingsSection() {
    const points = [
        {
            icon: Star,
            title: 'Authentic Reviews',
            description: 'Ratings must reflect actual service delivery. Authentic feedback helps build a trustworthy marketplace.',
        },
        {
            icon: Scale,
            title: 'No Manipulation',
            description: 'Providers must not manipulate or force reviews. Artificially boosting ratings violates our policies.',
        },
        {
            icon: AlertTriangle,
            title: 'Consequences',
            description: 'Poor conduct may result in suspension or removal from the platform. Maintain high standards.',
        },
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ratings & Reviews</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Guidelines for maintaining honest and fair review practices
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {points.map((point, index) => (
                        <Card key={index} className="border-border bg-card text-center transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <point.icon className="text-primary h-8 w-8" />
                                </div>
                                <CardTitle className="text-foreground text-lg">{point.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed">{point.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProhibitedSection() {
    const prohibitions = [
        {
            icon: Ban,
            title: 'Fraud & Impersonation',
            description: 'Fraud, impersonation, or false advertising is strictly prohibited and will result in immediate account termination.',
        },
        {
            icon: UserX,
            title: 'Harassment & Abuse',
            description: 'Harassment, abuse, or discrimination against any user will not be tolerated.',
        },
        {
            icon: AlertTriangle,
            title: 'Illegal Activities',
            description: 'Offering illegal activities or services is prohibited. All services must comply with local laws.',
        },
    ];

    return (
        <section className="bg-destructive/5 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Prohibited Activities</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Activities that are strictly forbidden on 2RBUAME
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="space-y-4">
                        {prohibitions.map((item, index) => (
                            <Card key={index} className="border-destructive/20 bg-card transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-destructive/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                            <item.icon className="text-destructive h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-foreground text-lg">{item.title}</CardTitle>
                                            <CardDescription className="mt-2 leading-relaxed">{item.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="bg-primary rounded-2xl px-8 py-12 text-center md:px-12">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">Ready to Become a Provider?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                        Join our community of trusted service providers and reach customers across Western North Ghana.
                    </p>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link href="/join-as-provider">
                            <Button size="lg" variant="secondary" className="gap-2">
                                Join as Provider
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/help">
                            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function ProviderGuidelines() {
    return (
        <VisitorLayout>
            <Head title="Provider Guidelines">
                <meta name="description" content="Guidelines for service providers on 2RBUAME. Learn about registration requirements, service delivery standards, ratings policies, and prohibited activities." />
                <meta name="keywords" content="2RBUAME provider guidelines, service provider rules, seller guidelines, platform policies, provider requirements" />
                <meta property="og:title" content="Provider Guidelines - 2RBUAME" />
                <meta property="og:description" content="All service providers on 2RBUAME must follow these rules to ensure a safe, professional, and trustworthy marketplace." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Provider Guidelines - 2RBUAME" />
                <meta name="twitter:description" content="Rules and guidelines for service providers on 2RBUAME." />
            </Head>
            <ProviderHero />
            <RegistrationSection />
            <ServiceDeliverySection />
            <RatingsSection />
            <ProhibitedSection />
            <CTASection />
        </VisitorLayout>
    );
}
