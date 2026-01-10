import { Link } from '@inertiajs/react';
import { Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { AppLogo } from './app-logo';

export function Footer() {
    return (
        <footer className="border-border bg-card border-t pt-16">
            <div className="mx-auto max-w-[1200px] px-4 pb-8 md:px-8 lg:px-40">
                <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <AppLogo className="pointer-events-auto" />
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Connecting Western North and beyond digitally. Empowering communities through service and opportunity.
                        </p>
                        <div className="mt-2 flex gap-4">
                            <a
                                href="#"
                                className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                            >
                                <Globe className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                            >
                                <MessageCircle className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Platform Column */}
                    <div>
                        <h3 className="text-foreground mb-4 font-bold">Platform</h3>
                        <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-primary transition-colors">
                                    Browse Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" className="hover:text-primary transition-colors">
                                    Find Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/transport" className="hover:text-primary transition-colors">
                                    Transport
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-foreground mb-4 font-bold">Support</h3>
                        <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
                            <li>
                                <Link href="/help" className="hover:text-primary transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:text-primary transition-colors">
                                    Safety Tips
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    Provider Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-foreground mb-4 font-bold">Contact</h3>
                        <ul className="text-muted-foreground flex flex-col gap-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone className="text-primary h-5 w-5" />
                                <span>+233 20 000 0000</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="text-primary h-5 w-5" />
                                <span>support@2RBUAME.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="text-primary h-5 w-5" />
                                <span>Western North and beyond</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-border flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                    <p className="text-muted-foreground text-xs">© 2023 2RBUAME. All rights reserved.</p>
                    <div className="text-muted-foreground flex gap-6 text-xs">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
