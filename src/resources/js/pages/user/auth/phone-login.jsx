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

            <div className="flex min-h-screen items-center justify-center bg-background px-4">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                        <p className="mt-2 text-muted-foreground">Enter your phone number to continue</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                        {status && <div className="mb-4 rounded-lg bg-primary/10 p-3 text-sm font-medium text-primary">{status}</div>}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
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
                                {errors.phone && <p className="mt-2 text-sm text-destructive">{errors.phone}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
                            >
                                {processing ? 'Sending OTP...' : 'Continue'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link href={route('choose-path')} className="font-semibold text-primary hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 text-center">
                            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
