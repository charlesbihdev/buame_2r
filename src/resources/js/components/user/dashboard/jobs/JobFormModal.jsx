import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

export function JobFormModal({ isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        company: '',
        type: '',
        category: '',
        salary: '',
        location: '',
        address: '',
        latitude: '',
        longitude: '',
        phone: '',
        whatsapp: '',
        email: '',
        description: '',
        requirements: '',
        responsibilities: '',
        benefits: '',
        application_link: '',
        application_instructions: '',
        is_urgent: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.dashboard.jobs.store'), {
            preserveScroll: true,
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    const jobTypes = [
        { value: 'full_time', label: 'Full Time' },
        { value: 'part_time', label: 'Part Time' },
        { value: 'daily_wage', label: 'Daily Wage' },
        { value: 'apprenticeship', label: 'Apprenticeship' },
    ];

    const jobCategories = [
        { value: 'construction_trades', label: 'Construction & Trades' },
        { value: 'home_services', label: 'Home Services' },
        { value: 'auto_mechanical', label: 'Auto & Mechanical' },
        { value: 'transport_equipment', label: 'Transport & Equipment' },
        { value: 'electrical_electronics', label: 'Electrical & Electronics' },
        { value: 'ict_digital', label: 'ICT & Digital' },
        { value: 'business_office', label: 'Business & Office' },
        { value: 'education_training', label: 'Education & Training' },
        { value: 'health_care', label: 'Health & Care' },
        { value: 'hospitality_events', label: 'Hospitality & Events' },
        { value: 'fashion_beauty', label: 'Fashion & Beauty' },
        { value: 'agriculture', label: 'Agriculture' },
        { value: 'security', label: 'Security' },
        { value: 'media_creative', label: 'Media & Creative' },
        { value: 'general_jobs', label: 'General Jobs' },
    ];

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter job title"
                            required
                        />
                        <FormError error={errors.title} />
                    </div>

                    {/* Company */}
                    <div>
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                            id="company"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            placeholder="Enter company name"
                            required
                        />
                        <FormError error={errors.company} />
                    </div>

                    {/* Type and Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="type">Job Type *</Label>
                            <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormError error={errors.type} />
                        </div>

                        <div>
                            <Label htmlFor="category">Category *</Label>
                            <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobCategories.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormError error={errors.category} />
                        </div>
                    </div>

                    {/* Salary */}
                    <div>
                        <Label htmlFor="salary">Salary</Label>
                        <Input
                            id="salary"
                            value={data.salary}
                            onChange={(e) => setData('salary', e.target.value)}
                            placeholder="e.g., GH₵ 2,000 - 3,000/month"
                        />
                        <FormError error={errors.salary} />
                    </div>

                    {/* Location and Address */}
                    <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                            id="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            placeholder="Enter location"
                            required
                        />
                        <FormError error={errors.location} />
                    </div>

                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Enter full address (optional)"
                            rows={2}
                        />
                        <FormError error={errors.address} />
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <Label htmlFor="phone">Phone *</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Phone number"
                                required
                            />
                            <FormError error={errors.phone} />
                        </div>

                        <div>
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input
                                id="whatsapp"
                                value={data.whatsapp}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                placeholder="WhatsApp number"
                            />
                            <FormError error={errors.whatsapp} />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email address"
                            />
                            <FormError error={errors.email} />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Job Description *</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Describe the job position..."
                            rows={4}
                            required
                        />
                        <FormError error={errors.description} />
                    </div>

                    {/* Requirements */}
                    <div>
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                            id="requirements"
                            value={data.requirements}
                            onChange={(e) => setData('requirements', e.target.value)}
                            placeholder="List job requirements (one per line or as paragraphs)"
                            rows={4}
                        />
                        <FormError error={errors.requirements} />
                    </div>

                    {/* Responsibilities */}
                    <div>
                        <Label htmlFor="responsibilities">Responsibilities</Label>
                        <Textarea
                            id="responsibilities"
                            value={data.responsibilities}
                            onChange={(e) => setData('responsibilities', e.target.value)}
                            placeholder="List job responsibilities (one per line or as paragraphs)"
                            rows={4}
                        />
                        <FormError error={errors.responsibilities} />
                    </div>

                    {/* Benefits */}
                    <div>
                        <Label htmlFor="benefits">Benefits</Label>
                        <Textarea
                            id="benefits"
                            value={data.benefits}
                            onChange={(e) => setData('benefits', e.target.value)}
                            placeholder="List job benefits (one per line or as paragraphs)"
                            rows={4}
                        />
                        <FormError error={errors.benefits} />
                    </div>

                    {/* Application Link */}
                    <div>
                        <Label htmlFor="application_link">Application Link</Label>
                        <Input
                            id="application_link"
                            type="url"
                            value={data.application_link}
                            onChange={(e) => setData('application_link', e.target.value)}
                            placeholder="https://example.com/apply"
                        />
                        <FormError error={errors.application_link} />
                    </div>

                    {/* Application Instructions */}
                    <div>
                        <Label htmlFor="application_instructions">Application Instructions</Label>
                        <Textarea
                            id="application_instructions"
                            value={data.application_instructions}
                            onChange={(e) => setData('application_instructions', e.target.value)}
                            placeholder="Provide instructions on how to apply for this job"
                            rows={3}
                        />
                        <FormError error={errors.application_instructions} />
                    </div>

                    {/* Is Urgent */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_urgent"
                            checked={data.is_urgent}
                            onChange={(e) => setData('is_urgent', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="is_urgent" className="cursor-pointer">
                            Mark as Urgent
                        </Label>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                        >
                            {processing ? 'Posting...' : 'Post Job'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
