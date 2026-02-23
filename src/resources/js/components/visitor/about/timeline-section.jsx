import { Lightbulb, Building2, Handshake, Globe } from 'lucide-react';

export function TimelineSection() {
    const timelineItems = [
        {
            year: '2021',
            title: 'The Spark',
            description:
                'Recognizing the struggle of local artisans across Western North to reach customers beyond their immediate neighborhood, the idea of a unified platform was born.',
            icon: Lightbulb,
        },
        {
            year: '2022',
            title: 'Building the Foundation',
            description:
                'Development of the 2RBUAME core infrastructure began, focusing on ease of use for non-tech-savvy users and robust local mapping.',
            icon: Building2,
        },
        {
            year: '2023',
            title: 'Community First',
            description:
                'We launched our pilot program, onboarding the first 50 transport operators and market traders, listening to their feedback to refine the platform.',
            icon: Handshake,
        },
        {
            year: '2024 & Beyond',
            title: 'Expanding Horizons',
            description:
                'Today, we are expanding services to include job listings and guest house bookings, becoming a comprehensive ecosystem for Western North and beyond, welcoming customers from all backgrounds.',
            icon: Globe,
        },
    ];

    return (
        <div className="px-6 py-16 lg:px-20">
            <div className="mx-auto max-w-[960px]">
                <h2 className="mb-10 text-center text-3xl font-bold">Our Origins</h2>
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[#cfe7cf]" />
                    {timelineItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="relative mb-12 flex gap-6 last:mb-0">
                                <div className="z-10 flex flex-col items-center">
                                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-background-light">
                                        <Icon className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                </div>
                                <div className="flex flex-col pt-1">
                                    <span className="mb-1 text-sm font-bold text-[var(--primary)]">{item.year}</span>
                                    <h3 className="mb-2 text-xl font-bold text-[var(--foreground)]">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

