import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { ContactHero } from '@/components/visitor/contact/contact-hero';
import { ContactForm } from '@/components/visitor/contact/contact-form';
import { ContactSidebar } from '@/components/visitor/contact/contact-sidebar';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <VisitorLayout>
            <Head title="Contact Us - 2RBUAME" />
            <ContactHero />
            <main className="w-full flex-grow px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        <ContactForm />
                        <ContactSidebar />
                    </div>
                </div>
            </main>
        </VisitorLayout>
    );
}

