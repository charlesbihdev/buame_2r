import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function AdminsEdit({ adminUser, roles }) {
    const { admin: currentAdmin } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: adminUser.name || '',
        email: adminUser.email || '',
        password: '',
        password_confirmation: '',
        role: adminUser.role || 'admin',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.admins.update', adminUser.id));
    };

    const isEditingSelf = adminUser.id === currentAdmin.id;

    return (
        <AdminLayout>
            <Head title={`Edit Admin: ${adminUser.name}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('admin.admins.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-foreground text-2xl font-bold">Edit Admin</h1>
                        <p className="text-muted-foreground">Update administrator details</p>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Admin Details</CardTitle>
                        <CardDescription>
                            Update the details for {adminUser.name}
                            {isEditingSelf && <span className="text-primary ml-2">(This is your account)</span>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="text-foreground mb-2 block text-sm font-semibold">Name</label>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Enter admin name" className="h-12" />
                                {errors.name && <p className="text-destructive mt-2 text-sm">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="text-foreground mb-2 block text-sm font-semibold">Email Address</label>
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@buame.com"
                                    className="h-12"
                                />
                                {errors.email && <p className="text-destructive mt-2 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="text-foreground mb-2 block text-sm font-semibold">Role</label>
                                <Select value={data.role} onValueChange={(value) => setData('role', value)} disabled={isEditingSelf}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem key={role.value} value={role.value}>
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-destructive mt-2 text-sm">{errors.role}</p>}
                                {isEditingSelf && <p className="text-muted-foreground mt-2 text-xs">You cannot change your own role.</p>}
                            </div>

                            <div className="border-border rounded-lg border p-4">
                                <h3 className="text-foreground mb-4 font-medium">Change Password (Optional)</h3>
                                <p className="text-muted-foreground mb-4 text-sm">Leave blank to keep the current password.</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-foreground mb-2 block text-sm font-semibold">New Password</label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Enter new password"
                                                className="h-12 pr-11"
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

                                    <div>
                                        <label className="text-foreground mb-2 block text-sm font-semibold">Confirm New Password</label>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Confirm new password"
                                            className="h-12"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing} className="flex-1">
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Link href={route('admin.admins.index')} className="flex-1">
                                    <Button type="button" variant="outline" className="w-full">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
