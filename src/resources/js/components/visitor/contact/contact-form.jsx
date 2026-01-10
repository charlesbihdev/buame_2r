import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useForm } from '@inertiajs/react';

export function ContactForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success
            },
        });
    };

    return (
        <div className="lg:col-span-7 xl:col-span-8">
            <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
                <div className="mb-8">
                    <h2 className="mb-2 text-2xl font-bold">Send us a Message</h2>
                    <p className="text-[#4c9a4c] dark:text-gray-400">
                        Fill out the form below and our support team will get back to you within 24 hours.
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Name */}
                        <div className="block">
                            <Label htmlFor="name" className="mb-2 block text-sm font-semibold">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Kwame Mensah"
                                className="h-12 rounded-lg border border-[var(--buame-border-light)] bg-background-light px-4 transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] dark:border-white/10 dark:bg-background-dark placeholder:text-[#4c9a4c]/50"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        {/* Email */}
                        <div className="block">
                            <Label htmlFor="email" className="mb-2 block text-sm font-semibold">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="e.g. kwame@example.com"
                                className="h-12 rounded-lg border border-[var(--buame-border-light)] bg-background-light px-4 transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] dark:border-white/10 dark:bg-background-dark placeholder:text-[#4c9a4c]/50"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Phone */}
                        <div className="block">
                            <Label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="e.g. 024 123 4567"
                                className="h-12 rounded-lg border border-[var(--buame-border-light)] bg-background-light px-4 transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] dark:border-white/10 dark:bg-background-dark placeholder:text-[#4c9a4c]/50"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>
                        {/* Inquiry Type */}
                        <div className="block">
                            <Label htmlFor="inquiryType" className="mb-2 block text-sm font-semibold">
                                Inquiry Type
                            </Label>
                            <Select value={data.inquiryType} onValueChange={(value) => setData('inquiryType', value)}>
                                <SelectTrigger
                                    id="inquiryType"
                                    className="h-12 rounded-lg border border-[var(--buame-border-light)] bg-background-light transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] dark:border-white/10 dark:bg-background-dark"
                                >
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="artisan">Find an Artisan</SelectItem>
                                    <SelectItem value="marketplace">Marketplace Listing</SelectItem>
                                    <SelectItem value="transport">Transport Services</SelectItem>
                                    <SelectItem value="jobs">Job Opportunities</SelectItem>
                                    <SelectItem value="other">General Inquiry</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.inquiryType && <p className="mt-1 text-sm text-red-600">{errors.inquiryType}</p>}
                        </div>
                    </div>
                    {/* Message */}
                    <div className="block">
                        <Label htmlFor="message" className="mb-2 block text-sm font-semibold">
                            Message
                        </Label>
                        <Textarea
                            id="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder="How can we help you today?"
                            rows={5}
                            className="resize-none rounded-lg border border-[var(--buame-border-light)] bg-background-light p-4 transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] dark:border-white/10 dark:bg-background-dark placeholder:text-[#4c9a4c]/50"
                        />
                        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    </div>
                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 font-bold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:bg-[#0eb50e] md:w-auto"
                        >
                            <span>Send Message</span>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

