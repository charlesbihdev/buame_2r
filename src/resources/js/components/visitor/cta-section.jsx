import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Building2 } from 'lucide-react';

export function CTASection() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <section className="bg-white px-4 py-16 md:px-8 lg:px-40">
            <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2">
                {/* CTA 1: For Users */}
                <div className="group relative overflow-hidden rounded-2xl bg-gray-900 p-8 md:p-12">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-700 group-hover:scale-105"
                        style={{
                            backgroundImage: 'url(/assets/visitors/artisan2.jpg)',
                        }}
                    />
                    <div className="relative z-10 flex h-full flex-col items-start justify-center">
                        <h3 className="mb-4 text-3xl font-bold text-white">Find a Skilled Worker</h3>
                        <p className="mb-8 max-w-md text-gray-300">
                            Plumbers, electricians, mechanics and more. Browse and contact directly.
                        </p>
                        <Button
                            asChild
                            className="flex h-12 items-center gap-2 rounded-lg bg-primary px-8 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            <Link href="/artisans">
                                Explore Artisans <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* CTA 2: For Providers */}
                <div className="relative overflow-hidden rounded-2xl border border-[var(--secondary)]/20 bg-[var(--secondary)]/10 p-8 md:p-12">
                    <div className="relative z-10 flex h-full flex-col items-start justify-center">
                        <h3 className="mb-4 text-3xl font-bold text-foreground">Want Customers to Find You?</h3>
                        <p className="mb-8 max-w-md text-muted-foreground">
                            Create your business profile and start getting calls from people who need your service.
                        </p>
                        <Button
                            asChild
                            className="flex h-12 items-center gap-2 rounded-lg bg-[var(--secondary)] px-8 text-base font-bold text-[var(--secondary-foreground)] transition-colors hover:bg-[var(--secondary)]/90"
                        >
                            <Link href={user ? route('user.dashboard.index') : '/choose-path'}>
                                Get Started <Building2 className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
