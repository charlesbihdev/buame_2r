import { Search, MapPin } from 'lucide-react';

export function ArtisansHero() {
    return (
        <div className="w-full border-b border-[#e7f3e7] bg-white dark:border-white/10 dark:bg-[#162816]">
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
                                Find Skilled Artisans in Sefwi Bekwai
                            </h1>
                            <p className="text-sm font-normal text-gray-200 md:text-base">
                                Connect with verified carpenters, masons, electricians, plumbers, and more.
                            </p>
                        </div>
                        <div className="z-10 mt-2 flex w-full max-w-[600px] flex-col">
                            <div className="flex w-full flex-col items-stretch overflow-hidden rounded-lg shadow-xl sm:flex-row">
                                <div className="flex w-full items-center border-b border-gray-200 bg-white px-4 py-3 dark:border-[#2a4e2a] dark:bg-[#162816] sm:w-1/3 sm:border-b-0 sm:border-r sm:py-0">
                                    <MapPin className="mr-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    <select className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium focus:ring-0 dark:text-white">
                                        <option>Sefwi Bekwai</option>
                                        <option>Bibiani</option>
                                        <option>Wiawso</option>
                                        <option>Juaboso</option>
                                    </select>
                                </div>
                                <div className="relative flex-1 bg-white dark:bg-[#162816]">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        className="h-12 w-full border-none bg-transparent pl-12 pr-4 text-sm placeholder:text-gray-400 focus:ring-0 dark:text-white sm:h-14"
                                        placeholder="Search for carpenters, plumbers, electricians..."
                                    />
                                </div>
                                <button className="flex items-center justify-center gap-2 bg-[#13ec13] px-8 py-3 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f] sm:py-0">
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


