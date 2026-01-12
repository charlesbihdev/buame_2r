import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const categoryLabels = {
    artisans: 'Artisan',
    transport: 'Driver',
    marketplace: 'Trader',
    jobs: 'Employer',
    hotels: 'Hotel',
    rentals: 'Rentals',
};

export default function PhoneRegister({ category }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
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

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 py-12 dark:bg-[var(--buame-background-dark)]">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">
                            {category ? `Register as ${categoryLabels[category] || 'Provider'}` : 'Create Account'}
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {category ? `Join 2RBUAME as a ${categoryLabels[category] || 'provider'}` : 'Join 2RBUAME and grow your business'}
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

                    <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
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
                                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="0244123456"
                                        className="h-12 pl-11 text-base"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">10 digits starting with 0</p>
                                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
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

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Create a password"
                                        className="h-12 pl-11 pr-11 text-base"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm your password"
                                        className="h-12 pl-11 pr-11 text-base"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password_confirmation && <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full bg-[var(--primary)] text-base font-bold text-white hover:bg-[#0eb50e]"
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link href={route('user.login')} className="font-semibold text-[var(--primary)] hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 text-center">
                            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[var(--primary)] dark:text-gray-400">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
