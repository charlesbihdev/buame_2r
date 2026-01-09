import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Phone, User } from 'lucide-react';
import { useEffect } from 'react';

const categoryLabels = {
    artisans: 'Artisan',
    transport: 'Driver',
    marketplace: 'Trader',
    jobs: 'Employer',
    hotels: 'Hotel',
    rentals: 'Rentals',
};

export default function PhoneRegister({ category }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        category: category || '',
    });

    useEffect(() => {
        if (category) {
            setData('category', category);
        }
    }, [category]);

    const submit = (e) => {
        e.preventDefault();
        post(route('user.register'));
    };

    return (
        <>
            <Head title="Register" />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 py-12 dark:bg-[#102210]">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-[#0d1b0d] dark:text-white">
                            {category ? `Register as ${categoryLabels[category] || 'Provider'}` : 'Create Account'}
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {category ? `Join BUAME 2R as a ${categoryLabels[category] || 'provider'}` : 'Join BUAME 2R and grow your business'}
                        </p>
                        {!category && (
                            <p className="mt-2 text-sm text-orange-600 dark:text-orange-400">
                                Please select a category first from{' '}
                                <Link href="/choose-path" className="font-semibold underline">
                                    Choose Your Path
                                </Link>
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-[#e7f3e7] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className="h-12 pl-11 text-base"
                                        autoFocus
                                    />
                                </div>
                                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="e.g., 0244123456"
                                        className="h-12 pl-11 text-base"
                                    />
                                </div>
                                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">
                                    Email <span className="text-gray-400">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="your.email@example.com"
                                        className="h-12 pl-11 text-base"
                                    />
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full bg-[#13ec13] text-base font-bold text-[#0d1b0d] hover:bg-[#0eb50e]"
                            >
                                {processing ? 'Sending OTP...' : 'Continue'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link href={route('user.login')} className="font-semibold text-[#13ec13] hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 text-center">
                            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#13ec13] dark:text-gray-400">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
