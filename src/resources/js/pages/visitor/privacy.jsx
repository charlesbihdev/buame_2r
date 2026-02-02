import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Shield,
    User,
    FileText,
    Star,
    MessageSquare,
    Settings,
    Lock,
    Database,
    Bell,
    Trash2,
    Mail,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function PrivacyHero() {
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
                <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">Privacy Policy</h1>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-200 md:text-xl">
                    2RBUAME is committed to protecting your personal data. Learn how we collect, use, and safeguard your information.
                </p>
            </div>
        </section>
    );
}

function DataCollectionSection() {
    const dataTypes = [
        {
            icon: User,
            title: 'Personal Details',
            description: 'Name, phone number, location, and other information you provide during registration.',
        },
        {
            icon: FileText,
            title: 'Service Listings',
            description: 'Information about your services, products, and transaction details on the platform.',
        },
        {
            icon: Star,
            title: 'Reviews & Ratings',
            description: 'Reviews, ratings, and feedback you give or receive from other users.',
        },
        {
            icon: MessageSquare,
            title: 'Communications',
            description: 'Messages and communications between users through our platform.',
        },
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Information We Collect</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        We collect the following types of information to provide and improve our services
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {dataTypes.map((item, index) => (
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

function DataUsageSection() {
    const usages = [
        {
            icon: Settings,
            title: 'Service Provision',
            description: 'To provide, maintain, and improve our marketplace and service connection features.',
        },
        {
            icon: Lock,
            title: 'Verification & Security',
            description: 'To verify your identity, prevent fraud, and ensure the security of our platform.',
        },
        {
            icon: Bell,
            title: 'Communication',
            description: 'To send you important updates, notifications, and information about our services.',
        },
    ];

    return (
        <section className="bg-muted/50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">How We Use Your Information</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Your data helps us deliver a better experience on 2RBUAME
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {usages.map((usage, index) => (
                        <Card key={index} className="border-border bg-card text-center transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <usage.icon className="text-primary h-8 w-8" />
                                </div>
                                <CardTitle className="text-foreground text-lg">{usage.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm leading-relaxed">{usage.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function DataProtectionSection() {
    const protections = [
        {
            icon: Database,
            title: 'Secure Storage',
            description: 'Data is stored securely using industry-standard encryption and accessed only when necessary for platform operations.',
        },
        {
            icon: Shield,
            title: 'No Third-Party Sales',
            description: 'We do not sell user data to third parties. Your information is used solely for providing our services.',
        },
        {
            icon: Trash2,
            title: 'Data Control',
            description: 'Users can request account deletion or data correction at any time by contacting our support team.',
        },
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Data Protection</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        We take your privacy seriously and implement robust measures to protect your data
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="space-y-6">
                        {protections.map((item, index) => (
                            <Card key={index} className="border-border bg-card transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                            <item.icon className="text-primary h-6 w-6" />
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

function YourRightsSection() {
    const rights = [
        'Access your personal data we hold about you',
        'Request correction of inaccurate information',
        'Request deletion of your account and associated data',
        'Opt out of marketing communications',
        'Know how your data is being used',
        'File a complaint if you believe your privacy has been violated',
    ];

    return (
        <section className="bg-primary/5 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Your Rights</h2>
                    <p className="text-muted-foreground mb-8">
                        As a user of 2RBUAME, you have the following rights regarding your personal data
                    </p>

                    <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                        {rights.map((right, index) => (
                            <div key={index} className="bg-card border-border flex items-start gap-3 rounded-lg border p-4">
                                <div className="bg-primary mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    <span className="text-xs font-bold text-white">{index + 1}</span>
                                </div>
                                <p className="text-foreground text-sm">{right}</p>
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
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Questions About Your Privacy?</h2>
                    <p className="text-muted-foreground mb-8">
                        If you have any questions about this Privacy Policy or how we handle your data, please contact us.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="gap-2">
                                <Mail className="h-5 w-5" />
                                Contact Us
                            </Button>
                        </Link>
                        <Link href="/terms">
                            <Button size="lg" variant="outline" className="gap-2">
                                Terms of Service
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

export default function Privacy() {
    return (
        <VisitorLayout>
            <Head title="Privacy Policy - 2RBUAME" />
            <PrivacyHero />
            <DataCollectionSection />
            <DataUsageSection />
            <DataProtectionSection />
            <YourRightsSection />
            <ContactSection />
        </VisitorLayout>
    );
}
