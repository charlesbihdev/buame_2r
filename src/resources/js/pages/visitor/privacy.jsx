import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';

export default function Privacy() {
    return (
        <VisitorLayout>
            <Head title="Privacy Policy">
                <meta name="description" content="Privacy Policy for 2RBUAME. Learn how we collect, use, and protect your personal data." />
            </Head>

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-foreground mb-2 text-3xl font-bold">Privacy Policy</h1>
                <p className="text-muted-foreground mb-10 text-sm">Last updated: March 2026</p>

                <div className="text-foreground space-y-8 text-sm leading-relaxed">
                    <section>
                        <h2 className="mb-3 text-lg font-semibold">1. About 2RBUAME</h2>
                        <p>
                            2RBUAME is an advertising and service listing platform. We connect businesses, artisans, hotels, and other service providers
                            with potential customers. We do not hold funds, process payments on behalf of users, or act as an intermediary in transactions
                            between providers and customers. Paystack is used only to collect subscription payments from providers who subscribe to our plans.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">2. Information We Collect</h2>
                        <p className="mb-2">We collect the following information when you register or use our platform:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Name, phone number, and location</li>
                            <li>Business or service information you provide</li>
                            <li>Reviews and ratings you give or receive</li>
                            <li>Payment information (processed securely by Paystack — we do not store card details)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">3. How We Use Your Information</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>To provide and improve our platform services</li>
                            <li>To verify your identity and prevent fraud</li>
                            <li>To send you updates and notifications about your account</li>
                            <li>To process subscription payments via Paystack</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">4. Data Protection</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Your data is stored securely using industry-standard encryption</li>
                            <li>We do not sell your personal data to third parties</li>
                            <li>You can request account deletion or data correction at any time by contacting us</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">5. Your Rights</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Access your personal data</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your account and data</li>
                            <li>Opt out of marketing communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">6. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, contact us at{' '}
                            <a href="mailto:support@2rbuame.com" className="text-primary underline">support@2rbuame.com</a> or
                            visit our <Link href="/contact" className="text-primary underline">Contact page</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </VisitorLayout>
    );
}
