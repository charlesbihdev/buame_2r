import { Search, Handshake, CheckCircle, ArrowRight } from 'lucide-react';

export function HowItWorksSection() {
    const steps = [
        {
            icon: Search,
            title: '1. Search',
            description: 'Browse our local directory to find the exact service, product, or job opening you need.',
        },
        {
            icon: Handshake,
            title: '2. Connect',
            description: 'Contact providers directly via phone or WhatsApp to discuss requirements and prices.',
        },
        {
            icon: CheckCircle,
            title: '3. Transact',
            description: 'Complete your service or trade securely within your community and leave a review.',
        },
    ];

    return (
        <section className="bg-card py-16 px-4 md:px-8 lg:px-40">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-foreground">How 2RBUAME Works</h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        We've made it simple to connect with trusted local providers and find opportunities across Western North and beyond. We welcome customers from all backgrounds.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.title}
                                className="relative flex flex-col items-center rounded-2xl border border-dashed border-primary/40 bg-background p-6 text-center"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                                {index < steps.length - 1 && (
                                    <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 transform text-border md:block">
                                        <ArrowRight className="h-6 w-6" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

