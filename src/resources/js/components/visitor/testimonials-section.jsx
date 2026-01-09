import { Quote } from 'lucide-react';

export function TestimonialsSection() {
    const testimonials = [
        {
            quote: '"I found a carpenter to fix my shop roof within 2 hours. Very convenient for us busy traders."',
            author: 'Emmanuel K.',
            role: 'Shop Owner, Bekwai',
        },
        {
            quote: '"As a taxi driver, BUAME 2R helps me get bookings even when I am parked. It has increased my income."',
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
        <section className="border-b border-[#e7f3e7] bg-background-light py-16 px-4 dark:border-gray-800 dark:bg-background-dark md:px-8 lg:px-40">
            <div className="mx-auto max-w-[1200px] text-center">
                <h2 className="mb-12 text-2xl font-bold text-[#0d1b0d] dark:text-white md:text-3xl">
                    Trusted by Locals in Sefwi Bekwai
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                        >
                            <div className="mb-4 flex justify-center text-[#13ec13]">
                                <Quote className="h-6 w-6" />
                            </div>
                            <p className="mb-6 italic text-gray-600 dark:text-gray-300">{testimonial.quote}</p>
                            <div className="font-bold text-[#0d1b0d] dark:text-white">{testimonial.author}</div>
                            <div className="text-xs text-gray-400">{testimonial.role}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

