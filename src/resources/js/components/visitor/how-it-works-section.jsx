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
        <section className="bg-white py-16 px-4 dark:bg-gray-900/50 md:px-8 lg:px-40">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-[#0d1b0d] dark:text-white">How BUAME 2R Works</h2>
                    <p className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">
                        We've made it simple to connect with trusted local providers and find opportunities right here in Sefwi Bekwai.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.title}
                                className="relative flex flex-col items-center rounded-2xl border border-dashed border-[#13ec13]/40 bg-background-light p-6 text-center dark:bg-gray-800"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#13ec13]/10 text-[#13ec13]">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-[#0d1b0d] dark:text-white">{step.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                                {index < steps.length - 1 && (
                                    <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 transform text-gray-300 dark:text-gray-600 md:block">
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

