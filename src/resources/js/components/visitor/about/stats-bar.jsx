export function StatsBar() {
    const stats = [
        { value: '500+', label: 'Local Artisans' },
        { value: '50+', label: 'Guest Houses' },
        { value: '2k+', label: 'Successful Jobs' },
        { value: '100%', label: 'Western North & Beyond' },
    ];

    return (
        <div className="w-full border-y border-[var(--buame-border-light)] bg-background-light py-8">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
                <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                    {stats.map((stat, index) => {
                        // Strategic color variation for visual interest
                        const colorVariants = [
                            'text-[var(--primary)]', // Green - Local Artisans
                            'text-[var(--secondary)]', // Gold - Guest Houses (premium)
                            'text-[var(--accent)]', // Blue - Successful Jobs (trust/achievement)
                            'text-[var(--primary)]', // Green - Coverage
                        ];
                        return (
                            <div key={index} className="flex flex-col gap-1">
                                <span className={`text-3xl font-black ${colorVariants[index] || colorVariants[0]}`}>{stat.value}</span>
                                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

