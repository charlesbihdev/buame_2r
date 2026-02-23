import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function FoodStay() {
    return (
        <VisitorLayout>
            <Head title="Food & Stay">
                <meta name="description" content="Discover local restaurants, chop bars, and guest houses in Ghana. Find the best places to eat and stay across Western North and beyond on 2RBUAME." />
                <meta name="keywords" content="restaurants Ghana, guest houses, chop bars, local food, accommodation, hotels, food spots, 2RBUAME" />
                <meta property="og:title" content="Food & Stay - 2RBUAME" />
                <meta property="og:description" content="Find local restaurants and accommodations across Western North Ghana." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Food & Stay - 2RBUAME" />
                <meta name="twitter:description" content="Find local restaurants and accommodations across Western North Ghana." />
            </Head>
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-[var(--foreground)]">
                        Food & Guest House
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Find local restaurants and accommodations
                    </p>
                </div>
            </div>
        </VisitorLayout>
    );
}

