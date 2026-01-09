import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function ServicesHero() {
    return (
        <section className="@container w-full overflow-hidden rounded-2xl shadow-lg">
            <div
                className="relative flex min-h-[400px] flex-col items-center justify-center gap-6 bg-cover bg-center p-8 text-center md:p-12"
                style={{
                    backgroundImage: 'linear-gradient(rgba(16, 34, 16, 0.7), rgba(16, 34, 16, 0.8)), url(/assets/visitors/bekwai.JPG)',
                }}
            >
                <div className="z-10 flex max-w-2xl flex-col gap-4">
                    <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] text-white md:text-5xl lg:text-6xl">
                        Connecting Sefwi Bekwai to You
                    </h1>
                    <h2 className="text-base leading-relaxed font-normal text-gray-200 md:text-lg">
                        The centralized digital hub for local artisans, marketplaces, transport, and jobs in the Western North Region.
                    </h2>
                </div>
                <div className="z-10 mt-2 flex flex-wrap gap-4">
                    <Button
                        asChild
                        className="flex h-12 items-center justify-center rounded-lg bg-[#13ec13] px-6 text-base font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fd60f]"
                    >
                        <Link href="/join-as-provider">Get Started</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                        <Link href="/about">Learn More</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
