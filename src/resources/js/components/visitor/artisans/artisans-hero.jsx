import { Search, MapPin } from 'lucide-react';

export function ArtisansHero() {
    return (
        <div className="w-full border-b border-border bg-card">
            <div className="mx-auto max-w-[1440px]">
                <div className="p-4 @container @[480px]:p-6">
                    <div
                        className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-8 py-12"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOT8P0j5iq0-JCK2ABVLh1WDjQxfVJUnFbXqYGS16cYi5e-8wFaAkfkfRaTyh6a6u8OPFT0Aqgsxq36UZENyKRPCp2skZqxkO4aVf6xF8Q0c6LbmtCg9Rgd2ZHMObuqeOhEO5M8zrxp6-hbBqNP5OHCZLAy4EsCA7J5QKEzKUNxgJTA7iFq091VwmiYsUQx5ZhYj_xKBDdh67UANIa32lMdNNXTiTm24xHUp6D2snFV2--LXqhXl8BDYQ-5asciqpgVjzq7GoGP5Y")',
                        }}
                    >
                        <div className="z-10 flex max-w-2xl flex-col gap-3 text-center">
                            <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-white md:text-5xl">
                                Find Skilled Artisans Across Western North and Beyond
                            </h1>
                            <p className="text-sm font-normal text-white/80 md:text-base">
                                Connect with verified carpenters, masons, electricians, plumbers, and more.
                            </p>
                        </div>
                        <div className="z-10 mt-2 flex w-full max-w-[600px] flex-col">
                            <div className="flex w-full flex-col items-stretch overflow-hidden rounded-lg shadow-xl sm:flex-row">
                                <div className="flex w-full items-center border-b border-border bg-card px-4 py-3 sm:w-1/3 sm:border-b-0 sm:border-r sm:py-0">
                                    <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                                    <select className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-foreground focus:ring-0">
                                        <option>Western North</option>
                                        <option>Bibiani</option>
                                        <option>Wiawso</option>
                                        <option>Juaboso</option>
                                        <option>Other Locations</option>
                                    </select>
                                </div>
                                <div className="relative flex-1 bg-card">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Search className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <input
                                        className="h-12 w-full border-none bg-transparent pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 sm:h-14"
                                        placeholder="Search for carpenters, plumbers, electricians..."
                                    />
                                </div>
                                <button className="flex items-center justify-center gap-2 bg-primary px-8 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90 sm:py-0">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


