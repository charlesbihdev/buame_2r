import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function Jobs() {
    return (
        <VisitorLayout>
            <Head title="Jobs - 2RBUAME" />
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-[var(--foreground)] dark:text-white">
                        Job Opportunities
                    </h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Find your next opportunity across Western North and beyond. We welcome job seekers from all backgrounds.
                    </p>
                </div>
            </div>
        </VisitorLayout>
    );
}


