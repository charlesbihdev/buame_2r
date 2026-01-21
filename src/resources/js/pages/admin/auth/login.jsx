import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppLogo } from '@/components/visitor/app-logo';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

export default function AdminLogin({ status }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login'));
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="bg-background flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <div className="mb-4 flex justify-center">
                            <AppLogo size="lg" />
                        </div>
                        <h1 className="text-foreground text-2xl font-bold">Admin Portal</h1>
                        <p className="text-muted-foreground mt-2">Sign in to access the admin dashboard</p>
                    </div>

                    <div className="border-border bg-card rounded-2xl border p-8 shadow-sm">
                        {status && <div className="bg-primary/10 text-primary mb-4 rounded-lg p-3 text-sm font-medium">{status}</div>}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="text-foreground mb-2 block text-sm font-semibold">Email Address</label>
                                <div className="relative">
                                    <Mail className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="admin@buame.com"
                                        className="h-12 pl-11 text-base"
                                        autoFocus
                                    />
                                </div>
                                {errors.email && <p className="text-destructive mt-2 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="text-foreground mb-2 block text-sm font-semibold">Password</label>
                                <div className="relative">
                                    <Lock className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                        className="h-12 pr-11 pl-11 text-base"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-destructive mt-2 text-sm">{errors.password}</p>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="border-border rounded"
                                />
                                <label htmlFor="remember" className="text-muted-foreground ml-2 text-sm">
                                    Remember me
                                </label>
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full text-base font-bold"
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>
                    </div>

                    <p className="text-muted-foreground mt-6 text-center text-sm">
                        Admin accounts are created by super administrators.
                    </p>
                </div>
            </div>
        </>
    );
}
