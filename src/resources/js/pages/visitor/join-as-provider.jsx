import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function JoinAsProvider() {
    return (
        <VisitorLayout>
            <Head title="Join as Provider">
                <meta name="description" content="Grow your business with 2RBUAME. Join as a service provider and reach customers across Ghana. List your artisan services, products, hotels, transport, or rentals." />
                <meta name="keywords" content="join 2RBUAME, become provider, sell on 2RBUAME, list services, artisan registration, grow business Ghana" />
                <meta property="og:title" content="Join as Provider - 2RBUAME" />
                <meta property="og:description" content="Grow your business with 2RBUAME. Join as a service provider and reach customers across Ghana." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Join as Provider - 2RBUAME" />
                <meta name="twitter:description" content="Grow your business with 2RBUAME. Join as a service provider." />
            </Head>
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-[var(--foreground)] dark:text-white">Join as Provider</h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Grow your business with 2RBUAME</p>
                </div>
            </div>
        </VisitorLayout>
    );
}
