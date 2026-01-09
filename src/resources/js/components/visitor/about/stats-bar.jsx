export function StatsBar() {
    const stats = [
        { value: '500+', label: 'Local Artisans' },
        { value: '50+', label: 'Guest Houses' },
        { value: '2k+', label: 'Successful Jobs' },
        { value: '100%', label: 'Sefwi Bekwai Focused' },
    ];

    return (
        <div className="w-full border-y border-[#e7f3e7] bg-background-light py-8 dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
                <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <span className="text-3xl font-black text-[#13ec13]">{stat.value}</span>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

