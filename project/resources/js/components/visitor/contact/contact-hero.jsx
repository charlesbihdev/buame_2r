export function ContactHero() {
    return (
        <section className="relative w-full bg-[#1a2e1a] py-16 md:py-24">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="h-full w-full bg-cover bg-center opacity-40"
                    style={{
                        backgroundImage: 'url(/assets/visitors/bekwai.JPG)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102210] via-[#102210]/80 to-transparent" />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">Get in Touch with BUAME 2R</h1>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-200 md:text-xl">
                    Connecting Sefwi Bekwai. Have a question about finding a local artisan or listing your business? We are here to help you navigate
                    the marketplace.
                </p>
            </div>
        </section>
    );
}
