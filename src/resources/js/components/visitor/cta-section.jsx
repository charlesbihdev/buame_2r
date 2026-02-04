import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2 } from 'lucide-react';

export function CTASection() {
    return (
        <section className="bg-white py-16 px-4 dark:bg-gray-900/50 md:px-8 lg:px-40">
            <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2">
                {/* CTA 1: For Users */}
                <div className="group relative overflow-hidden rounded-2xl bg-gray-900 p-8 dark:bg-gray-800 md:p-12">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-700 group-hover:scale-105"
                        style={{
                            backgroundImage: 'url(/assets/visitors/cta-users-bg.jpg)',
                        }}
                    />
                    <div className="relative z-10 flex h-full flex-col items-start justify-center">
                        <h3 className="mb-4 text-3xl font-bold text-white">Looking for a Service?</h3>
                        <p className="mb-8 max-w-md text-gray-300">
                            Don't waste time asking around. Find rated plumbers, electricians, and more in minutes.
                        </p>
                        <Button
                            asChild
                            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            <Link href="/services">
                                Find a Service <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* CTA 2: For Providers - Premium/Secondary Action (Gold) */}
                <div className="relative overflow-hidden rounded-2xl border border-[var(--secondary)]/20 bg-[var(--secondary)]/10 p-8 dark:bg-[var(--secondary)]/5 md:p-12">
                    <div className="relative z-10 flex h-full flex-col items-start justify-center">
                        <h3 className="mb-4 text-3xl font-bold text-foreground">Are you a Provider?</h3>
                        <p className="mb-8 max-w-md text-muted-foreground">
                            Grow your business, find new customers, and build your reputation online. Join our platform today!
                        </p>
                        <Button
                            asChild
                            className="flex items-center gap-2 rounded-lg bg-[var(--secondary)] px-6 py-3 font-bold text-[var(--secondary-foreground)] transition-colors hover:bg-[var(--secondary)]/90"
                        >
                            <Link href="/join-as-provider">
                                Join as Provider <Building2 className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

