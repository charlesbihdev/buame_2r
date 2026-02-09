import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { BackToHome } from '@/components/ui/back-to-home';
import { Phone } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('user.password.phone'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 dark:bg-[var(--buame-background-dark)]">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">Forgot Password?</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Enter your phone number and we'll send you a verification code to reset your password.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        {status && (
                            <div className="mb-4 rounded-lg bg-[var(--primary)]/10 p-3 text-sm font-medium text-[var(--primary)]">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
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
                                        autoFocus
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">10 digits starting with 0</p>
                                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full bg-[var(--primary)] text-base font-bold text-white hover:bg-[#0eb50e]"
                            >
                                {processing ? 'Sending Code...' : 'Send Reset Code'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <BackToHome to={route('user.login')} label="Back to Login" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
