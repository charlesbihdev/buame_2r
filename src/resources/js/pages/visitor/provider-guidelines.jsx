import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';

export default function ProviderGuidelines() {
    return (
        <VisitorLayout>
            <Head title="Provider Guidelines">
                <meta name="description" content="Guidelines for service providers on 2RBUAME. Registration requirements, service standards, and platform rules." />
            </Head>

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-foreground mb-2 text-3xl font-bold">Provider Guidelines</h1>
                <p className="text-muted-foreground mb-10 text-sm">Rules and standards for all service providers on 2RBUAME.</p>

                <div className="text-foreground space-y-8 text-sm leading-relaxed">
                    <section>
                        <h2 className="mb-3 text-lg font-semibold">1. Registration</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Provide true and complete personal information</li>
                            <li>Use a valid phone number so customers can reach you</li>
                            <li>Add a clear profile photo and detailed description of your services</li>
                            <li>Verify your phone number before subscribing</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">2. Service Delivery</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Deliver services professionally and on time</li>
                            <li>Clearly state prices, availability, and scope — no hidden fees</li>
                            <li>Respect customers' privacy and safety</li>
                            <li>Respond to inquiries promptly and keep customers informed</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">3. Ratings & Reviews</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Ratings must reflect actual service delivery</li>
                            <li>Do not manipulate, force, or fake reviews</li>
                            <li>Poor conduct or fake reviews may lead to suspension</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">4. Prohibited Activities</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Fraud, impersonation, or false advertising</li>
                            <li>Harassment, abuse, or discrimination against any user</li>
                            <li>Offering illegal activities or services</li>
                            <li>Listing banned items (drugs, weapons, contraband, etc.)</li>
                            <li>Misleading or deceptive advertisements</li>
                        </ul>
                        <p className="mt-2">Violations will result in account suspension or permanent removal from the platform.</p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">5. Subscriptions</h2>
                        <p>
                            Providers subscribe to plans for increased visibility and the ability to post more products or services.
                            Payments are processed through Paystack. See our{' '}
                            <Link href="/terms" className="text-primary underline">Terms of Service</Link> for full payment details.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">6. Get Started</h2>
                        <p>
                            Ready to join?{' '}
                            <Link href="/join-as-provider" className="text-primary underline">Sign up as a provider</Link> or
                            contact us at{' '}
                            <a href="mailto:support@2rbuame.com" className="text-primary underline">support@2rbuame.com</a> if you have questions.
                        </p>
                    </section>
                </div>
            </div>
        </VisitorLayout>
    );
}
