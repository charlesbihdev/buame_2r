import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Toast } from '@/components/ui/toast';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';
import { useRef, useState } from 'react';

export function ContactForm() {
    const formRef = useRef(null);
    const [processing, setProcessing] = useState(false);
    const [alert, setAlert] = useState({
        show: false,
        type: '',
        message: '',
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setAlert({
                show: true,
                type: 'error',
                message: 'Please fill in all required fields (Name, Email, and Message).',
            });
            return;
        }

        setProcessing(true);

        emailjs
            .sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formRef.current, {
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            })
            .then(
                () => {
                    setAlert({
                        show: true,
                        type: 'success',
                        message: 'Message sent successfully! We will get back to you soon.',
                    });

                    formRef.current.reset();
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: '',
                        message: '',
                    });
                    setProcessing(false);
                },
                (error) => {
                    console.error('EmailJS Error:', error);
                    setAlert({
                        show: true,
                        type: 'error',
                        message: 'Failed to send message. Please try again later.',
                    });
                    setProcessing(false);
                },
            );
    };

    return (
        <div className="lg:col-span-7 xl:col-span-8">
            {alert.show && <Toast type={alert.type} message={alert.message} onHide={() => setAlert({ show: false, type: '', message: '' })} />}
            <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-6 shadow-sm md:p-8">
                <div className="mb-8">
                    <h2 className="mb-2 text-2xl font-bold">Send us a Message</h2>
                    <p className="text-[#4c9a4c]">
                        Fill out the form below and our support team will get back to you within 24 hours.
                    </p>
                </div>
                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                    {/* Hidden field for recipient email */}
                    <input type="hidden" name="to_email" value={import.meta.env.VITE_CONTACT_EMAIL || ''} />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Name */}
                        <div className="block">
                            <Label htmlFor="name" className="mb-2 block text-sm font-semibold">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                name="from_name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Kwame Mensah"
                                className="bg-background-light h-12 rounded-lg border border-[var(--buame-border-light)] px-4 transition-all placeholder:text-[#4c9a4c]/50 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                required
                            />
                        </div>
                        {/* Email */}
                        <div className="block">
                            <Label htmlFor="email" className="mb-2 block text-sm font-semibold">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="from_email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="e.g. user@example.com"
                                className="bg-background-light h-12 rounded-lg border border-[var(--buame-border-light)] px-4 transition-all placeholder:text-[#4c9a4c]/50 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                                required
                            />
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
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="e.g. 024 123 4567"
                                className="bg-background-light h-12 rounded-lg border border-[var(--buame-border-light)] px-4 transition-all placeholder:text-[#4c9a4c]/50 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                            />
                        </div>
                        {/* Inquiry Type */}
                        <div className="block">
                            <Label htmlFor="inquiryType" className="mb-2 block text-sm font-semibold">
                                Inquiry Type
                            </Label>
                            <Select value={formData.inquiryType} onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}>
                                <SelectTrigger
                                    id="inquiryType"
                                    name="inquiry_type"
                                    className="bg-background-light h-12 rounded-lg border border-[var(--buame-border-light)] transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
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
                            {/* Hidden input for EmailJS to capture the select value */}
                            <input type="hidden" name="inquiry_type" value={formData.inquiryType} />
                        </div>
                    </div>
                    {/* Message */}
                    <div className="block">
                        <Label htmlFor="message" className="mb-2 block text-sm font-semibold">
                            Message
                        </Label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="How can we help you today?"
                            rows={5}
                            className="bg-background-light resize-none rounded-lg border border-[var(--buame-border-light)] p-4 transition-all placeholder:text-[#4c9a4c]/50 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                            required
                        />
                    </div>
                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 font-bold text-white shadow-[var(--primary)]/20 shadow-lg transition-all hover:bg-[#0eb50e] md:w-auto"
                        >
                            <span>{processing ? 'Sending...' : 'Send Message'}</span>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
