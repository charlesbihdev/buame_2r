import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    HelpCircle,
    UserCheck,
    CreditCard,
    Calendar,
    AlertTriangle,
    UserCog,
    Phone,
    Mail,
    MapPin,
    MessageCircle,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function HelpHero() {
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
                <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">Help Center</h1>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-200 md:text-xl">
                    Welcome to 2RBUAME, your trusted local digital services and marketplace platform for the Western North Region of Ghana.
                </p>
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">About 2RBUAME</h2>
                    <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                        2RBUAME is a community-centered digital platform connecting people who need services with trusted local service providers.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { title: 'Artisans', description: 'Connect with skilled artisans like carpenters, masons, electricians, and plumbers' },
                        { title: 'Marketplace', description: 'Buy and sell products including electronics, furniture, clothes, and more' },
                        { title: 'Hotels', description: 'Find and book hotels and guest houses for your accommodation needs' },
                        { title: 'Transport', description: 'Okada and car services for your travel and mobility needs' },
                        { title: 'Rentals', description: 'List and find properties for rent including houses, apartments, and commercial spaces' },
                        { title: 'Jobs', description: 'Post job listings or find employment opportunities in your area' },
                    ].map((service, index) => (
                        <Card key={index} className="border-border bg-card transition-shadow hover:shadow-md">
                            <CardHeader>
                                <CardTitle className="text-foreground text-lg">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{service.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SupportTopicsSection() {
    const topics = [
        {
            icon: UserCheck,
            title: 'Account Registration & Verification',
            description: 'Learn how to create and verify your account on 2RBUAME',
        },
        {
            icon: CreditCard,
            title: 'Subscription & Payments',
            description: 'Information about subscription plans and payment methods',
        },
        {
            icon: Calendar,
            title: 'Booking & Order Issues',
            description: 'Get help with booking services and resolving order problems',
        },
        {
            icon: AlertTriangle,
            title: 'Reporting Misconduct or Fraud',
            description: 'Report suspicious activities or fraudulent behavior',
        },
        {
            icon: UserCog,
            title: 'Profile Updates & Service Listings',
            description: 'Manage your profile and update your service listings',
        },
        {
            icon: HelpCircle,
            title: 'General Support',
            description: 'Other questions and general platform assistance',
        },
    ];

    return (
        <section className="bg-muted/50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Common Support Topics</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Find answers to frequently asked questions and common issues
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {topics.map((topic, index) => (
                        <Card key={index} className="border-border bg-card transition-all hover:shadow-md">
                            <CardHeader>
                                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <topic.icon className="text-primary h-6 w-6" />
                                </div>
                                <CardTitle className="text-foreground text-lg">{topic.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{topic.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ContactSupportSection() {
    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Customer Support</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Need assistance? Our team is here to help you
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <Card className="border-border bg-card text-center">
                        <CardHeader>
                            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                <Phone className="text-primary h-8 w-8" />
                            </div>
                            <CardTitle className="text-foreground">Phone & WhatsApp</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">Contact our support team via phone or WhatsApp</p>
                            <p className="text-foreground font-semibold">+233 54 092 9012 / +233 53 809 0998</p>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card text-center">
                        <CardHeader>
                            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                <MapPin className="text-primary h-8 w-8" />
                            </div>
                            <CardTitle className="text-foreground">Visit Our Office</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">Come see us in person for direct assistance</p>
                            <p className="text-foreground font-semibold">Sefwi Bekwai, Western North</p>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card text-center">
                        <CardHeader>
                            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                <MessageCircle className="text-primary h-8 w-8" />
                            </div>
                            <CardTitle className="text-foreground">In-App Support</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">Use the in-app help and complaint features</p>
                            <p className="text-foreground font-semibold">Available 24/7</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

function QuickLinksSection() {
    const links = [
        { title: 'Safety Tips', description: 'Stay safe while using our platform', href: '/safety' },
        { title: 'Provider Guidelines', description: 'Rules and best practices for service providers', href: '/provider-guidelines' },
        { title: 'Privacy Policy', description: 'How we protect your personal data', href: '/privacy' },
        { title: 'Terms of Service', description: 'Our terms and conditions', href: '/terms' },
    ];

    return (
        <section className="bg-muted/50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Quick Links</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Explore other helpful resources
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {links.map((link, index) => (
                        <Link key={index} href={link.href} className="group">
                            <Card className="border-border bg-card h-full transition-all hover:shadow-md group-hover:border-primary/50">
                                <CardHeader>
                                    <CardTitle className="text-foreground flex items-center justify-between text-lg">
                                        {link.title}
                                        <ArrowRight className="text-muted-foreground h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{link.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/contact">
                        <Button size="lg" className="gap-2">
                            <Mail className="h-5 w-5" />
                            Contact Us Directly
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function HelpCenter() {
    return (
        <VisitorLayout>
            <Head title="Help Center">
                <meta name="description" content="Welcome to 2RBUAME Help Center. Get support for account registration, subscriptions, bookings, and more. Find answers to frequently asked questions." />
                <meta name="keywords" content="2RBUAME help, customer support, FAQ, help center, account help, booking issues, payment support" />
                <meta property="og:title" content="Help Center - 2RBUAME" />
                <meta property="og:description" content="Get support and find answers to your questions about using 2RBUAME services." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Help Center - 2RBUAME" />
                <meta name="twitter:description" content="Get support and find answers to your questions about using 2RBUAME services." />
            </Head>
            <HelpHero />
            <AboutSection />
            <SupportTopicsSection />
            <ContactSupportSection />
            <QuickLinksSection />
        </VisitorLayout>
    );
}
