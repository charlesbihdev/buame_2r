import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VerifyOtp({ phone, type, status }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: phone,
        code: '',
    });

    const [countdown, setCountdown] = useState(120); // 2 minutes
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        const routeName = type === 'register' ? 'user.register.verify' : 'user.login.verify';
        post(route(routeName));
    };

    const handleResend = () => {
        if (!canResend) return;
        
        const routeName = type === 'register' ? 'user.register.resend-otp' : 'user.login.resend-otp';
        post(route(routeName), {
            preserveScroll: true,
            onSuccess: () => {
                setCountdown(120);
                setCanResend(false);
            },
        });
    };

    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setData('code', value);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Head title="Verify OTP" />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 dark:bg-[#102210]">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#13ec13]/10">
                            <Shield className="h-8 w-8 text-[#13ec13]" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#0d1b0d] dark:text-white">Verify Your Phone</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            We sent a 6-digit code to <span className="font-semibold text-[#0d1b0d] dark:text-white">{phone}</span>
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#e7f3e7] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        {status && (
                            <div className="mb-4 rounded-lg bg-[#13ec13]/10 p-3 text-sm font-medium text-[#13ec13]">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="code" className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">
                                    Verification Code
                                </label>
                                <Input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    value={data.code}
                                    onChange={handleCodeChange}
                                    placeholder="Enter 6-digit code"
                                    className="h-14 text-center text-2xl font-bold tracking-widest"
                                    maxLength={6}
                                    autoFocus
                                />
                                {errors.code && <p className="mt-2 text-sm text-red-600">{errors.code}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing || data.code.length !== 6}
                                className="h-12 w-full bg-[#13ec13] text-base font-bold text-[#0d1b0d] hover:bg-[#0eb50e]"
                            >
                                {processing ? 'Verifying...' : 'Verify & Continue'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            {canResend ? (
                                <button
                                    onClick={handleResend}
                                    disabled={processing}
                                    className="text-sm font-semibold text-[#13ec13] hover:underline disabled:opacity-50"
                                >
                                    Resend Code
                                </button>
                            ) : (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Resend code in <span className="font-semibold text-[#0d1b0d] dark:text-white">{formatTime(countdown)}</span>
                                </p>
                            )}
                        </div>

                        <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                💡 <strong>Tip:</strong> Check your phone messages for the verification code. It may take a few seconds to arrive.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

