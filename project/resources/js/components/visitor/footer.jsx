import { Link } from '@inertiajs/react';
import { Network, Globe, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-white pt-16 dark:border-gray-800 dark:bg-background-dark">
            <div className="mx-auto max-w-[1200px] px-4 pb-8 md:px-8 lg:px-40">
                <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-[#0d1b0d] dark:text-white">
                            <div className="flex size-6 items-center justify-center text-[#13ec13]">
                                <Network className="h-6 w-6" />
                            </div>
                            <h2 className="text-lg font-bold">BUAME 2R</h2>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            Connecting the Western North Region digitally. Empowering locals through service and opportunity.
                        </p>
                        <div className="mt-2 flex gap-4">
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#13ec13] hover:text-[#0d1b0d] dark:bg-gray-800 dark:text-gray-400"
                            >
                                <Globe className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#13ec13] hover:text-[#0d1b0d] dark:bg-gray-800 dark:text-gray-400"
                            >
                                <MessageCircle className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Platform Column */}
                    <div>
                        <h3 className="mb-4 font-bold text-[#0d1b0d] dark:text-white">Platform</h3>
                        <ul className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href="/" className="transition-colors hover:text-[#13ec13]">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="transition-colors hover:text-[#13ec13]">
                                    Browse Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" className="transition-colors hover:text-[#13ec13]">
                                    Find Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/services?category=transport" className="transition-colors hover:text-[#13ec13]">
                                    Transport
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="mb-4 font-bold text-[#0d1b0d] dark:text-white">Support</h3>
                        <ul className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href="/help" className="transition-colors hover:text-[#13ec13]">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="transition-colors hover:text-[#13ec13]">
                                    Safety Tips
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="transition-colors hover:text-[#13ec13]">
                                    Provider Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="transition-colors hover:text-[#13ec13]">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="mb-4 font-bold text-[#0d1b0d] dark:text-white">Contact</h3>
                        <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-[#13ec13]" />
                                <span>+233 20 000 0000</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-[#13ec13]" />
                                <span>support@buame2r.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-[#13ec13]" />
                                <span>Sefwi Bekwai, Western North</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 dark:border-gray-800 md:flex-row">
                    <p className="text-xs text-gray-400">© 2023 BUAME 2R. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-gray-400">
                        <Link href="/privacy" className="transition-colors hover:text-[#13ec13]">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition-colors hover:text-[#13ec13]">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

