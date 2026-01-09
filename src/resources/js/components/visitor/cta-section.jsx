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
                            className="flex items-center gap-2 rounded-lg bg-[#13ec13] px-6 py-3 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0eb50e]"
                        >
                            <Link href="/services">
                                Find a Service <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* CTA 2: For Providers */}
                <div className="relative overflow-hidden rounded-2xl border border-[#13ec13]/20 bg-[#13ec13]/10 p-8 dark:bg-[#13ec13]/5 md:p-12">
                    <div className="relative z-10 flex h-full flex-col items-start justify-center">
                        <h3 className="mb-4 text-3xl font-bold text-[#0d1b0d] dark:text-white">Are you a Provider?</h3>
                        <p className="mb-8 max-w-md text-gray-600 dark:text-gray-300">
                            Grow your business, find new customers, and build your reputation online. It's free to join.
                        </p>
                        <Button
                            asChild
                            className="flex items-center gap-2 rounded-lg bg-[#0d1b0d] px-6 py-3 font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-[#0d1b0d] dark:hover:bg-gray-200"
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

