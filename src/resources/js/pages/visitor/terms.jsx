import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    FileText,
    UserCheck,
    CreditCard,
    RefreshCw,
    AlertTriangle,
    Ban,
    Scale,
    Shield,
    MessageSquare,
    ArrowRight,
    Mail,
    CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function TermsHero() {
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
                    <FileText className="h-10 w-10 text-white" />
                </div>
                <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">Terms of Service</h1>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-200 md:text-xl">
                    By using 2RBUAME, you agree to the following terms and conditions. Please read them carefully.
                </p>
            </div>
        </section>
    );
}

function UserResponsibilitiesSection() {
    const responsibilities = [
        {
            icon: UserCheck,
            title: 'Accurate Information',
            description: 'Provide accurate and truthful information when creating your account and using our services.',
        },
        {
            icon: Scale,
            title: 'Lawful Use',
            description: 'Use the platform only for lawful purposes. Do not engage in any illegal activities.',
        },
        {
            icon: Shield,
            title: 'Community Standards',
            description: 'Respect other users and adhere to community standards. Treat everyone with dignity and respect.',
        },
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">User Responsibilities</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        As a user of 2RBUAME, you agree to the following responsibilities
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {responsibilities.map((item, index) => (
                        <Card key={index} className="border-border bg-card text-center transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <item.icon className="text-primary h-8 w-8" />
                                </div>
                                <CardTitle className="text-foreground text-lg">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PaymentsSection() {
    const paymentTerms = [
        {
            icon: CreditCard,
            title: 'Subscription Fees',
            description: 'Subscription fees are non-refundable unless stated otherwise in specific promotional offers.',
        },
        {
            icon: RefreshCw,
            title: 'Renewal & Access',
            description: 'Failure to renew subscriptions may limit access to premium features and services.',
        },
        {
            icon: CheckCircle,
            title: 'Commission Fees',
            description: 'Commission fees may apply to successful bookings and transactions completed through the platform.',
        },
    ];

    return (
        <section className="bg-muted/50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Subscriptions & Payments</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Terms regarding payment, subscriptions, and fees on 2RBUAME
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {paymentTerms.map((item, index) => (
                        <Card key={index} className="border-border bg-card transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                        <item.icon className="text-primary h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-foreground text-lg">{item.title}</CardTitle>
                                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.description}</p>
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

function AccountSuspensionSection() {
    const suspensionRights = [
        'Suspend or terminate accounts that violate platform policies',
        'Remove listings that breach platform rules or community standards',
        'Resolve disputes fairly and independently based on evidence provided',
        'Take action against fraudulent or suspicious activities',
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Account Suspension</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        2RBUAME reserves the right to take the following actions to maintain platform integrity
                    </p>
                </div>

                <div className="mx-auto max-w-3xl">
                    <Card className="border-border bg-card">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {suspensionRights.map((right, index) => (
                                    <div key={index} className="flex items-start gap-4 rounded-lg bg-muted/50 p-4">
                                        <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                                            <Ban className="text-primary h-4 w-4" />
                                        </div>
                                        <p className="text-foreground">{right}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

function LimitationSection() {
    const limitations = [
        {
            icon: AlertTriangle,
            title: 'Service Quality Disputes',
            description: '2RBUAME is not directly responsible for disputes regarding service quality between users.',
        },
        {
            icon: CreditCard,
            title: 'Offline Transactions',
            description: 'Losses arising from offline transactions outside the platform are not covered by our protection.',
        },
        {
            icon: MessageSquare,
            title: 'External Agreements',
            description: 'Agreements made outside the platform are between users and not guaranteed by 2RBUAME.',
        },
    ];

    return (
        <section className="bg-destructive/5 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Limitation of Liability</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        2RBUAME acts as a connector and has the following limitations of liability
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="space-y-4">
                        {limitations.map((item, index) => (
                            <Card key={index} className="border-border bg-card transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-destructive/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                            <item.icon className="text-destructive h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-foreground text-lg">{item.title}</CardTitle>
                                            <p className="text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
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

function DisputeResolutionSection() {
    const steps = [
        'Report issues through the app or contact customer support',
        'Our admin team will investigate the complaint thoroughly',
        'Both parties will be given opportunity to provide their account',
        'Decisions will prioritize fairness, safety, and community trust',
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Complaints & Dispute Resolution</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        How we handle complaints and resolve disputes between users
                    </p>
                </div>

                <div className="mx-auto max-w-3xl">
                    <div className="relative">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
                                <div className="flex flex-col items-center">
                                    <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                                        <span className="text-sm font-bold text-white">{index + 1}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="bg-primary/20 mt-2 h-full w-0.5" />
                                    )}
                                </div>
                                <div className="bg-card border-border flex-1 rounded-lg border p-4">
                                    <p className="text-foreground">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactSection() {
    return (
        <section className="bg-muted/50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Questions About These Terms?</h2>
                    <p className="text-muted-foreground mb-8">
                        If you have any questions about these Terms of Service, please reach out to us.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="gap-2">
                                <Mail className="h-5 w-5" />
                                Contact Us
                            </Button>
                        </Link>
                        <Link href="/privacy">
                            <Button size="lg" variant="outline" className="gap-2">
                                Privacy Policy
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <p className="text-muted-foreground mt-8 text-sm">
                        Last updated: January 2025
                    </p>
                </div>
            </div>
        </section>
    );
}

export default function Terms() {
    return (
        <VisitorLayout>
            <Head title="Terms of Service">
                <meta name="description" content="Read the 2RBUAME Terms of Service. Understand your responsibilities, payment terms, and how we handle disputes on our platform." />
                <meta name="keywords" content="2RBUAME terms of service, terms and conditions, user agreement, platform rules, service terms" />
                <meta property="og:title" content="Terms of Service - 2RBUAME" />
                <meta property="og:description" content="By using 2RBUAME, you agree to these terms and conditions. Read our Terms of Service." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Terms of Service - 2RBUAME" />
                <meta name="twitter:description" content="Read the 2RBUAME Terms of Service and understand our platform rules." />
            </Head>
            <TermsHero />
            <UserResponsibilitiesSection />
            <PaymentsSection />
            <AccountSuspensionSection />
            <LimitationSection />
            <DisputeResolutionSection />
            <ContactSection />
        </VisitorLayout>
    );
}
