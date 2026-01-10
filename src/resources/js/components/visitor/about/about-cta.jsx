import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export function AboutCTA() {
    return (
        <div className="relative overflow-hidden bg-[var(--buame-background-dark)] py-20 px-6 text-white lg:px-20">
            {/* Decorative circle */}
            <div className="absolute -right-20 -top-20 size-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-[960px] text-center">
                <h2 className="mb-6 text-3xl font-black tracking-tight dark:text-white md:text-4xl">
                    Ready to be part of the Sefwi Bekwai digital revolution?
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
                    Whether you are a buyer, seller, job seeker, or employer, BUAME 2R has a place for you. Join our growing community today.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button
                        asChild
                        className="rounded-lg bg-[var(--primary)] px-8 py-3 text-lg font-bold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--buame-primary-dark)]"
                    >
                        <Link href="/register">Create Free Account</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="rounded-lg border border-white/20 bg-white/10 px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-white/20"
                    >
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

