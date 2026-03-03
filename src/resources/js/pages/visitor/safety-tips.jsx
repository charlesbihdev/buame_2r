import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';

export default function SafetyTips() {
    return (
        <VisitorLayout>
            <Head title="Safety Tips">
                <meta name="description" content="Stay safe while using 2RBUAME. Safety guidelines for customers and service providers." />
            </Head>

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-foreground mb-2 text-3xl font-bold">Safety Tips</h1>
                <p className="text-muted-foreground mb-10 text-sm">Your safety matters. Follow these guidelines for a secure experience on 2RBUAME.</p>

                <div className="text-foreground space-y-8 text-sm leading-relaxed">
                    <section>
                        <h2 className="mb-3 text-lg font-semibold">1. For Customers</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Check ratings and reviews before booking a service or buying an item</li>
                            <li>Meet service providers or sellers in safe, public locations</li>
                            <li>Inspect items carefully before making any payment</li>
                            <li>Never pay in advance without verifying the product or service first</li>
                            <li>Use secure payment methods and request receipts</li>
                            <li>Report suspicious behaviour or fraudulent listings immediately</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">2. For Service Providers</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Provide accurate personal and service information</li>
                            <li>Communicate clearly with clients before accepting jobs</li>
                            <li>State your prices, availability, and scope upfront — no hidden fees</li>
                            <li>Respect customers and their property at all times</li>
                            <li>Respond to inquiries promptly</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">3. For Everyone</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Never share your password or verification codes with anyone</li>
                            <li>Be cautious of fake profiles or offers that seem too good to be true</li>
                            <li>Keep conversations and agreements documented</li>
                            <li>Trust your instincts — if something feels off, walk away and report it</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">4. Important Reminder</h2>
                        <p>
                            2RBUAME connects buyers with sellers and service providers. All transactions happen directly between parties.
                            We are not responsible for disputes, losses, or issues arising from transactions. Always exercise caution and due diligence.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">5. Report an Issue</h2>
                        <p>
                            If you encounter anything suspicious, contact us at{' '}
                            <a href="mailto:support@2rbuame.com" className="text-primary underline">support@2rbuame.com</a> or
                            visit our <Link href="/contact" className="text-primary underline">Contact page</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </VisitorLayout>
    );
}
