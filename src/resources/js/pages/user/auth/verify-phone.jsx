import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, router, useForm } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VerifyPhone({ phone, status }) {
    const [countdown, setCountdown] = useState(120);
    const [canResend, setCanResend] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        phone: phone,
        code: '',
    });

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
        post(route('user.register.verify'));
    };

    const handleResend = () => {
        if (!canResend) return;
        router.post(route('user.register.resend-otp'), {}, {
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
            <Head title="Verify Phone" />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">
                            <Shield className="h-8 w-8 text-[var(--primary)]" />
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--foreground)]">Verify Your Phone</h1>
                        <p className="mt-2 text-gray-600">
                            We sent a verification code to <span className="font-semibold">{phone}</span>
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-8 shadow-sm">
                        {status && (
                            <div className="mb-4 rounded-lg bg-[var(--primary)]/10 p-3 text-sm font-medium text-[var(--primary)]">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="code" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
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
                                className="h-12 w-full bg-[var(--primary)] text-base font-bold text-white hover:bg-[#0eb50e]"
                            >
                                {processing ? 'Verifying...' : 'Verify Phone'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            {canResend ? (
                                <button
                                    onClick={handleResend}
                                    disabled={processing}
                                    className="text-sm font-semibold text-[var(--primary)] hover:underline disabled:opacity-50"
                                >
                                    Resend Code
                                </button>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    Resend code in <span className="font-semibold">{formatTime(countdown)}</span>
                                </p>
                            )}
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-xs text-gray-500">
                                Didn't receive the code? Check your SMS inbox or request a new code.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
