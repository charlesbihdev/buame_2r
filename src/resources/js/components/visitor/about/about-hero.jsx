import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function AboutHero() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-20 lg:py-20">
            <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 lg:flex-row">
                <div className="flex flex-col gap-6 text-left lg:w-1/2">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] lg:text-5xl">
                            Empowering Western North and Beyond through <span className="text-[var(--primary)]">Digital Connection</span>
                        </h1>
                        <h2 className="text-lg leading-relaxed font-medium text-gray-700">
                            2RBUAME is the digital heartbeat connecting artisans, traders, and visitors across Western North and beyond in a
                            single trusted marketplace. We bridge the gap between tradition and technology, welcoming customers from all backgrounds.
                        </h2>
                    </div>
                    <div className="flex gap-4 pt-2">
                        <Button
                            asChild
                            className="flex h-12 items-center justify-center rounded-lg bg-[var(--primary)] px-6 text-base font-bold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:bg-[var(--primary)]/90"
                        >
                            <Link href="/services">Explore Our Story</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="flex h-12 items-center justify-center rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-6 text-base font-medium text-[var(--accent)] transition-all hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/50"
                        >
                            <Link href="/services">View Services</Link>
                        </Button>
                    </div>
                </div>
                <div className="aspect-video max-h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-square lg:w-1/2">
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                        style={{
                            backgroundImage: 'url(/assets/visitors/about-hero.png)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
