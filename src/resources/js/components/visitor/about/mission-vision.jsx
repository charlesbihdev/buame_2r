import { Flag, Eye } from 'lucide-react';

export function MissionVision() {
    return (
        <div className="bg-white px-6 py-16 dark:bg-background-dark lg:px-20">
            <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mb-4 text-3xl font-bold dark:text-white">Driven by Purpose</h2>
                    <p className="text-gray-600 dark:text-gray-400">Our core values are rooted in uplifting Western North and beyond, welcoming customers from all backgrounds.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Mission Card */}
                    <div className="group rounded-2xl border border-[var(--buame-border-light)] bg-background-light p-8 transition-colors hover:border-[var(--primary)]/50 dark:border-white/10 dark:bg-white/5">
                        <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[var(--primary)] transition-transform group-hover:scale-110">
                            <Flag className="h-6 w-6" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold dark:text-white">Our Mission</h3>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                            To bridge the gap between local service providers and the community through accessible technology, fostering economic growth and simplifying daily life across Western North and beyond. We welcome customers from all backgrounds.
                        </p>
                    </div>
                    {/* Vision Card - Blue for future/trust */}
                    <div className="group rounded-2xl border border-[var(--buame-border-light)] bg-background-light p-8 transition-colors hover:border-[var(--accent)]/50 dark:border-white/10 dark:bg-white/5">
                        <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)] transition-transform group-hover:scale-110">
                            <Eye className="h-6 w-6" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold dark:text-white">Our Vision</h3>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                            To become the premier digital marketplace for Western North and beyond, where every artisan, trader, and business owner has the tools to thrive in the digital economy, serving customers from all backgrounds.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

