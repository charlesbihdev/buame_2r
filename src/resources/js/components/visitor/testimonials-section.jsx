import { Quote } from 'lucide-react';

export function TestimonialsSection() {
    const testimonials = [
        {
            quote: '"I found a carpenter to fix my shop roof within 2 hours. Very convenient for us busy traders."',
            author: 'Emmanuel K.',
            role: 'Shop Owner, Bekwai',
        },
        {
            quote: '"As a taxi driver, 2RBUAME helps me get bookings even when I am parked. It has increased my income."',
            author: 'Samuel O.',
            role: 'Driver, Bibiani',
        },
        {
            quote: '"Finding a guesthouse for my visitors was so easy. I could see the pictures and prices before calling."',
            author: 'Grace A.',
            role: 'Resident, Wiawso',
        },
    ];

    return (
        <section className="border-b border-border bg-background py-16 px-4 md:px-8 lg:px-40">
            <div className="mx-auto max-w-[1200px] text-center">
                <h2 className="mb-12 text-2xl font-bold text-foreground md:text-3xl">
                    Trusted Across Western North and Beyond
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => {
                        // Use blue (accent) for trust elements - testimonials build trust
                        const isTrustCard = index === 1; // Middle card gets blue accent
                        return (
                            <div
                                key={index}
                                className={`rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md ${
                                    isTrustCard
                                        ? 'border-[var(--accent)]/30 bg-[var(--accent)]/5'
                                        : 'border-border'
                                }`}
                            >
                                <div className={`mb-4 flex justify-center ${isTrustCard ? 'text-[var(--accent)]' : 'text-[var(--primary)]'}`}>
                                    <Quote className="h-6 w-6" />
                                </div>
                                <p className="mb-6 italic text-muted-foreground">{testimonial.quote}</p>
                                <div className="font-bold text-foreground">{testimonial.author}</div>
                                <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

