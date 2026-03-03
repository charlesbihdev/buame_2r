import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';

export default function Terms() {
    return (
        <VisitorLayout>
            <Head title="Terms of Service">
                <meta name="description" content="Terms of Service for 2RBUAME. Understand your responsibilities and our platform rules." />
            </Head>

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-foreground mb-2 text-3xl font-bold">Terms of Service</h1>
                <p className="text-muted-foreground mb-10 text-sm">Last updated: March 2026</p>

                <div className="text-foreground space-y-8 text-sm leading-relaxed">
                    <section>
                        <h2 className="mb-3 text-lg font-semibold">1. About the Platform</h2>
                        <p>
                            2RBUAME is an advertising and service listing platform that connects businesses, artisans, hotels, and service providers with potential customers.
                            We do not process payments on behalf of users, hold funds, or act as an intermediary in any transaction between providers and customers.
                            All dealings between providers and customers happen directly between them.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">2. User Responsibilities</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Provide accurate and truthful information</li>
                            <li>Use the platform only for lawful purposes</li>
                            <li>Respect other users and follow community standards</li>
                            <li>Keep your account credentials secure</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">3. Subscriptions & Payments</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Service providers pay subscription fees to list on the platform and access premium features</li>
                            <li>Payments are processed securely through Paystack</li>
                            <li>Subscription fees are non-refundable once the subscription period has begun</li>
                            <li>Failure to renew may limit access to premium features</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">4. Account Suspension</h2>
                        <p className="mb-2">2RBUAME reserves the right to:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Suspend or terminate accounts that violate our policies</li>
                            <li>Remove listings that breach platform rules</li>
                            <li>Take action against fraudulent or suspicious activities</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">5. Limitation of Liability</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>2RBUAME is not responsible for disputes regarding service quality between providers and customers</li>
                            <li>Transactions and agreements made outside the platform are not covered by us</li>
                            <li>We act as a listing and advertising platform, not a party to any transaction</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">6. Disputes</h2>
                        <p>
                            If you have a complaint, contact us through the app or email us at{' '}
                            <a href="mailto:support@2rbuame.com" className="text-primary underline">support@2rbuame.com</a>.
                            We will investigate and respond fairly.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">7. Contact</h2>
                        <p>
                            For questions about these terms, reach out at{' '}
                            <a href="mailto:support@2rbuame.com" className="text-primary underline">support@2rbuame.com</a> or
                            visit our <Link href="/contact" className="text-primary underline">Contact page</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </VisitorLayout>
    );
}
