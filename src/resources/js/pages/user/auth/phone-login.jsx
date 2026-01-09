import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { Phone } from 'lucide-react';

export default function PhoneLogin({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('user.login'));
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 dark:bg-[#102210]">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-[#0d1b0d] dark:text-white">Welcome Back</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Enter your phone number to continue</p>
                    </div>

                    <div className="rounded-2xl border border-[#e7f3e7] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        {status && <div className="mb-4 rounded-lg bg-[#13ec13]/10 p-3 text-sm font-medium text-[#13ec13]">{status}</div>}

                        <form onSubmit={submit} className="space-y-6">
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
                                        autoFocus
                                    />
                                </div>
                                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
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
                                Don't have an account?{' '}
                                <Link href={route('choose-path')} className="font-semibold text-[#13ec13] hover:underline">
                                    Sign Up
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
