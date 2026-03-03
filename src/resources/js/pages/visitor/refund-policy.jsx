import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';

export default function RefundPolicy() {
    return (
        <VisitorLayout>
            <Head title="Refund Policy">
                <meta name="description" content="Refund Policy for 2RBUAME. Understand our policy on subscription refunds." />
            </Head>

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-foreground mb-2 text-3xl font-bold">Refund Policy</h1>
                <p className="text-muted-foreground mb-10 text-sm">Last updated: March 2026</p>

                <div className="text-foreground space-y-8 text-sm leading-relaxed">
                    <section>
                        <h2 className="mb-3 text-lg font-semibold">1. Overview</h2>
                        <p>
                            2RBUAME is an advertising and service listing platform. We do not sell physical or digital products. The only payments
                            processed on our platform are subscription fees paid by service providers (businesses, artisans, hotels, etc.) for
                            increased visibility and access to premium features.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">2. Subscription Payments</h2>
                        <p>
                            Subscription fees are generally non-refundable once the subscription period has begun, as the service (listing visibility
                            and premium features) is delivered immediately upon payment.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">3. When Refunds May Be Issued</h2>
                        <p className="mb-2">We may issue a refund in the following cases:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Duplicate payment due to a technical error</li>
                            <li>Payment was charged but the subscription was not activated due to a system error</li>
                            <li>Unauthorized transaction (with valid proof)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">4. How to Request a Refund</h2>
                        <p>
                            To request a refund, contact us within 7 days of the payment at{' '}
                            <a href="mailto:support@2rbuame.com" className="text-primary underline">
                                support@2rbuame.com
                            </a>{' '}
                            with your account details and proof of payment. We will review and respond within 5 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">5. No Fulfilment of Physical Goods</h2>
                        <p>
                            2RBUAME does not sell, ship, or fulfil physical products. We are not a fulfilment centre. Products listed on the
                            marketplace are advertised by third-party sellers. Any purchases happen directly between the buyer and seller outside of
                            our platform. We are not responsible for delivery, quality, or returns of any products listed by sellers.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">6. Contact</h2>
                        <p>
                            For refund requests or questions, email{' '}
                            <a href="mailto:support@2rbuame.com" className="text-primary underline">
                                support@2rbuame.com
                            </a>{' '}
                            or visit our{' '}
                            <Link href="/contact" className="text-primary underline">
                                Contact page
                            </Link>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </VisitorLayout>
    );
}
