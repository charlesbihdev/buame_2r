import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';

export function ContactSidebar() {
    const whatsappNumber = '233241234567';
    const message = encodeURIComponent('Hello, I need help with 2RBUAME');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <div className="space-y-6 lg:col-span-5 xl:col-span-4">
            {/* Quick Contact Card */}
            <div className="flex flex-col gap-6 rounded-xl border border-[var(--buame-border-light)] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <h3 className="border-b border-[var(--buame-border-light)] pb-4 text-lg font-bold dark:border-white/10">Contact Information</h3>
                {/* Phone */}
                <div className="flex items-start gap-4">
                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[#0eb50e] dark:text-[var(--primary)]">
                        <Phone className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#4c9a4c] dark:text-gray-400">Call Us Directly</p>
                        <a
                            href="tel:+233241234567"
                            className="text-lg font-bold text-[var(--foreground)] transition-colors hover:text-[var(--primary)] dark:text-white"
                        >
                            +233 24 123 4567
                        </a>
                        <p className="mt-1 text-xs text-[#4c9a4c]">Available Mon-Fri, 8am-5pm</p>
                    </div>
                </div>
                {/* WhatsApp CTA */}
                <div className="rounded-lg border border-[#25D366]/20 bg-[#25D366]/10 p-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#25D366] text-white">
                            <MessageCircle className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">Chat on WhatsApp</span>
                    </div>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">Need a quick response? Chat with our support team instantly.</p>
                    <Button asChild className="w-full rounded bg-[#25D366] py-2 text-sm font-bold text-white transition-colors hover:bg-[#20bd5a]">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            Start Chat
                        </a>
                    </Button>
                </div>
                {/* Location */}
                <div className="flex items-start gap-4">
                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[#0eb50e] dark:text-[var(--primary)]">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#4c9a4c] dark:text-gray-400">Office Location</p>
                        <p className="mt-0.5 font-semibold text-[var(--foreground)] dark:text-white">Western North and beyond</p>
                        <p className="text-sm text-[#4c9a4c]">Ghana</p>
                    </div>
                </div>
                {/* Hours */}
                <div className="flex items-start gap-4">
                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[#0eb50e] dark:text-[var(--primary)]">
                        <Clock className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#4c9a4c] dark:text-gray-400">Business Hours</p>
                        <p className="mt-0.5 font-semibold text-[var(--foreground)] dark:text-white">Mon - Fri: 8:00 AM - 5:00 PM</p>
                        <p className="text-sm text-[#4c9a4c]">Sat: 9:00 AM - 2:00 PM</p>
                    </div>
                </div>
            </div>
            {/* Map Widget */}
            <div className="group relative h-64 cursor-pointer overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                        backgroundImage: 'url(/assets/visitors/bekwai.JPG)',
                    }}
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-lg bg-white/90 px-4 py-3 backdrop-blur dark:bg-black/80">
                    <span className="truncate pr-2 text-sm font-bold">Locate us in Western North</span>
                    <ArrowRight className="h-5 w-5 text-[var(--primary)]" />
                </div>
            </div>
        </div>
    );
}
