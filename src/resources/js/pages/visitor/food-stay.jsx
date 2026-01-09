import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function FoodStay() {
    return (
        <VisitorLayout>
            <Head title="Food & Stay - BUAME 2R" />
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-[#0d1b0d] dark:text-white">
                        Food & Guest House
                    </h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Find local restaurants and accommodations
                    </p>
                </div>
            </div>
        </VisitorLayout>
    );
}

