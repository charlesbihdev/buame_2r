import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm, router } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResetPassword({ phone, status }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [countdown, setCountdown] = useState(120);
    const [canResend, setCanResend] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        phone: phone,
        code: '',
        password: '',
        password_confirmation: '',
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
        post(route('user.password.update'));
    };

    const handleResend = () => {
        if (!canResend) return;
        router.post(route('user.password.resend'), {}, {
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
            <Head title="Reset Password" />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 py-12 dark:bg-[var(--buame-background-dark)]">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">
                            <Shield className="h-8 w-8 text-[var(--primary)]" />
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">Reset Password</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            We sent a code to <span className="font-semibold">{phone}</span>
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        {status && (
                            <div className="mb-4 rounded-lg bg-[var(--primary)]/10 p-3 text-sm font-medium text-[var(--primary)]">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            {/* Verification Code */}
                            <div>
                                <label htmlFor="code" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
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

                            {/* New Password */}
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter new password"
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

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="password_confirmation" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm new password"
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
                                disabled={processing || data.code.length !== 6}
                                className="h-12 w-full bg-[var(--primary)] text-base font-bold text-white hover:bg-[#0eb50e]"
                            >
                                {processing ? 'Resetting...' : 'Reset Password'}
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
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Resend code in <span className="font-semibold">{formatTime(countdown)}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
