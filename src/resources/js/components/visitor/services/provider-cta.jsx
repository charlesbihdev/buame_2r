import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export function ProviderCTA() {
    return (
        <section className="w-full py-12">
            <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl bg-[var(--buame-background-dark)] p-8 md:flex-row md:p-12">
                {/* Decorative Abstract Background */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <div className="relative z-10 flex max-w-xl flex-col gap-3 text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Are you a service provider?</h2>
                    <p className="text-lg text-gray-300">
                        Join BUAME 2R today to reach more customers in Sefwi Bekwai and grow your business digitally.
                    </p>
                </div>
                <div className="relative z-10">
                    <Button
                        asChild
                        className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[var(--primary)] px-6 py-3 text-base font-bold text-[var(--primary-foreground)] shadow-[0_0_20px_rgba(15,107,63,0.3)] transition-all hover:shadow-[0_0_30px_rgba(15,107,63,0.5)]"
                    >
                        <Link href="/join-as-provider">Join as Provider</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

