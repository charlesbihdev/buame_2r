import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';

export function ContactSidebar() {
    const whatsappNumber = '233540929012';
    const message = encodeURIComponent('Hello, I need help with 2RBUAME');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <div className="space-y-6 lg:col-span-5 xl:col-span-4">
            {/* Quick Contact Card */}
            <div className="flex flex-col gap-6 rounded-xl border border-[var(--buame-border-light)] bg-white p-6 shadow-sm">
                <h3 className="border-b border-[var(--buame-border-light)] pb-4 text-lg font-bold">Contact Information</h3>
                {/* Phone */}
                <div className="flex items-start gap-4">
                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[#0eb50e]">
                        <Phone className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#4c9a4c]">Call Us Directly</p>
                        <div className="flex flex-col gap-1">
                            <a
                                href="tel:+233540929012"
                                className="text-lg font-bold text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                            >
                                +233 54 092 9012
                            </a>
                            <a
                                href="tel:+233538090998"
                                className="text-lg font-bold text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                            >
                                +233 53 809 0998
                            </a>
                        </div>
                        <p className="mt-1 text-xs text-[#4c9a4c]">Available Monday to Friday, 8:30am-5pm</p>
                    </div>
                </div>
                {/* WhatsApp CTA */}
                <div className="rounded-lg border border-[#25D366]/20 bg-[#25D366]/10 p-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#25D366] text-white">
                            <MessageCircle className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-gray-900">Chat on WhatsApp</span>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">Need a quick response? Chat with our support team instantly.</p>
                    <Button asChild className="w-full rounded bg-[#25D366] py-2 text-sm font-bold text-white transition-colors hover:bg-[#20bd5a]">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            Start Chat
                        </a>
                    </Button>
                </div>
                {/* Location */}
                <div className="flex items-start gap-4">
                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[#0eb50e]">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#4c9a4c]">Office Location</p>
                        <p className="mt-0.5 font-semibold text-[var(--foreground)]">Sefwi Bekwai, Western North</p>
                        <p className="text-sm text-[#4c9a4c]">Ghana</p>
                    </div>
                </div>
                {/* Hours */}
                <div className="flex items-start gap-4">
                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[#0eb50e]">
                        <Clock className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#4c9a4c]">Business Hours</p>
                        <p className="mt-0.5 font-semibold text-[var(--foreground)]">Monday to Friday: 8:30 AM - 5:00 PM</p>
                    </div>
                </div>
            </div>
            {/* Map Widget */}
            <div className="group relative h-64 cursor-pointer overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white shadow-sm">
                <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                        backgroundImage: 'url(/assets/visitors/bekwai.JPG)',
                    }}
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-lg bg-white/90 px-4 py-3 backdrop-blur">
                    <span className="truncate pr-2 text-sm font-bold">Locate us in Western North</span>
                    <ArrowRight className="h-5 w-5 text-[var(--primary)]" />
                </div>
            </div>
        </div>
    );
}
