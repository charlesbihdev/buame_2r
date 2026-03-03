import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';

export default function AcceptableUse() {
    return (
        <VisitorLayout>
            <Head title="Acceptable Use Policy">
                <meta name="description" content="Acceptable Use Policy for 2RBUAME. Guidelines for using our platform responsibly." />
            </Head>

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-foreground mb-2 text-3xl font-bold">Acceptable Use Policy</h1>
                <p className="text-muted-foreground mb-10 text-sm">Last updated: March 2026</p>

                <div className="text-foreground space-y-8 text-sm leading-relaxed">
                    <section>
                        <h2 className="mb-3 text-lg font-semibold">1. Overview</h2>
                        <p>
                            This Acceptable Use Policy outlines the rules and guidelines for using 2RBUAME. By accessing or using our platform,
                            you agree to comply with this policy. Violations may result in account suspension or termination.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">2. Permitted Use</h2>
                        <p className="mb-2">You may use 2RBUAME to:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>List and advertise legitimate businesses, services, and products</li>
                            <li>Browse and discover service providers, artisans, hotels, and businesses</li>
                            <li>Read reviews and contact providers directly</li>
                            <li>Subscribe to plans for increased visibility</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">3. Banned Items & Services</h2>
                        <p className="mb-2">The following are strictly banned from the platform:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Illegal products or contraband</li>
                            <li>Fraudulent services or scam listings</li>
                            <li>Drugs, narcotics, or controlled substances</li>
                            <li>Weapons, firearms, or ammunition</li>
                            <li>Misleading or deceptive advertisements</li>
                        </ul>
                        <p className="mt-2">Any listing found to contain banned items will be removed immediately and the account may be permanently suspended.</p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">4. Prohibited Activities</h2>
                        <p className="mb-2">You must not use 2RBUAME to:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Post false, misleading, or fraudulent listings</li>
                            <li>Harass, threaten, or abuse other users</li>
                            <li>Impersonate another person or business</li>
                            <li>Spam or send unsolicited messages through the platform</li>
                            <li>Attempt to hack, disrupt, or interfere with the platform</li>
                            <li>Use the platform for money laundering or any financial crime</li>
                            <li>Post content that is offensive, discriminatory, or violates any law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">5. Transaction Safety</h2>
                        <p>
                            A Safe Transaction Notice is displayed on all listing pages across the platform. 2RBUAME connects buyers with
                            sellers and service providers — all transactions happen directly between parties. We advise users to meet in
                            safe public locations, verify items or credentials before payment, and report any suspicious activity immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">6. Provider Responsibilities</h2>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Provide accurate business information and contact details</li>
                            <li>Deliver services as described in your listings</li>
                            <li>Respond to customer inquiries professionally</li>
                            <li>Keep your profile and listings up to date</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">7. Enforcement</h2>
                        <p>
                            We reserve the right to investigate reports of policy violations. If you are found to be in violation,
                            we may warn you, suspend your account, remove your listings, or permanently ban you from the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold">8. Reporting Violations</h2>
                        <p>
                            If you encounter a user or listing that violates this policy, please report it to{' '}
                            <a href="mailto:support@2rbuame.com" className="text-primary underline">support@2rbuame.com</a> or
                            visit our <Link href="/contact" className="text-primary underline">Contact page</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </VisitorLayout>
    );
}
