import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function AboutHero() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-20 lg:py-20">
            <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 lg:flex-row">
                <div className="flex flex-col gap-6 text-left lg:w-1/2">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] lg:text-5xl dark:text-white">
                            Empowering Sefwi Bekwai through <span className="text-[#13ec13]">Digital Connection</span>
                        </h1>
                        <h2 className="text-lg leading-relaxed font-medium text-gray-700 dark:text-gray-300">
                            BUAME 2R is the digital heartbeat of the Western North Region, connecting local artisans, traders, and visitors in a
                            single trusted marketplace. We bridge the gap between tradition and technology.
                        </h2>
                    </div>
                    <div className="flex gap-4 pt-2">
                        <Button
                            asChild
                            className="flex h-12 items-center justify-center rounded-lg bg-[#13ec13] px-6 text-base font-bold text-[#0d1b0d] shadow-lg shadow-[#13ec13]/20 transition-all hover:bg-[#13ec13]/90"
                        >
                            <Link href="/services">Explore Our Story</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="flex h-12 items-center justify-center rounded-lg border border-gray-200 px-6 text-base font-medium transition-all hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-white/5"
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
