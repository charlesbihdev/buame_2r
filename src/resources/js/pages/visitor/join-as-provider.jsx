import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function JoinAsProvider() {
    return (
        <VisitorLayout>
            <Head title="Join as Provider - BUAME 2R" />
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-[var(--foreground)] dark:text-white">Join as Provider</h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Grow your business with BUAME 2R</p>
                </div>
            </div>
        </VisitorLayout>
    );
}
