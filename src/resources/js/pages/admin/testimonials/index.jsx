import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head } from '@inertiajs/react';
import { MessageSquare } from 'lucide-react';

export default function TestimonialsIndex({ message }) {
    return (
        <AdminLayout>
            <Head title="Testimonials" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-foreground text-2xl font-bold">Testimonials</h1>
                    <p className="text-muted-foreground">Manage user testimonials and reviews</p>
                </div>

                {/* Placeholder Content */}
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <MessageSquare className="text-muted-foreground mb-4 h-16 w-16" />
                        <CardTitle className="mb-2">Testimonials Feature Coming Soon</CardTitle>
                        <CardDescription className="text-center">{message || 'This feature is currently under development and will be available in a future update.'}</CardDescription>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
