import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { ContactHero } from '@/components/visitor/contact/contact-hero';
import { ContactForm } from '@/components/visitor/contact/contact-form';
import { ContactSidebar } from '@/components/visitor/contact/contact-sidebar';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <VisitorLayout>
            <Head title="Contact Us">
                <meta name="description" content="Get in touch with 2RBUAME. We're here to help with any questions about our services, marketplace, jobs, or partnerships. Reach out to our support team today." />
                <meta name="keywords" content="contact 2RBUAME, customer support, help, inquiries, Ghana services support, get in touch" />
                <meta property="og:title" content="Contact Us - 2RBUAME" />
                <meta property="og:description" content="Have questions? Get in touch with 2RBUAME. Our team is ready to help with inquiries about jobs, marketplace, and services." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Contact Us - 2RBUAME" />
                <meta name="twitter:description" content="Have questions? Get in touch with 2RBUAME. Our team is ready to help." />
            </Head>
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

