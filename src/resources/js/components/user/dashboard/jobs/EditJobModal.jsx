import { jobCategories } from '@/config/job-categories';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

export function EditJobModal({ isOpen, onClose, job }) {
    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        _method: 'put',
        title: job?.title || '',
        company: job?.company || '',
        type: job?.type || '',
        category: job?.category || '',
        sub_category: job?.sub_category || '',
        salary: job?.salary || '',
        location: job?.location || '',
        address: job?.address || '',
        latitude: job?.latitude || '',
        longitude: job?.longitude || '',
        phone: job?.phone || '',
        phone_2: job?.phone_2 || '',
        whatsapp: job?.whatsapp || '',
        email: job?.email || '',
        description: job?.description || '',
        requirements: job?.requirements || '',
        responsibilities: job?.responsibilities || '',
        benefits: job?.benefits || '',
        application_link: job?.application_link || '',
        application_instructions: job?.application_instructions || '',
        is_urgent: job?.is_urgent || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('user.dashboard.jobs.update', job.id), {
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

    const handleJobRoleChange = (roleId) => {
        // Find the category that contains this role
        const category = jobCategories.find(cat =>
            cat.subRoles && cat.subRoles.some(role => role.id === roleId)
        );

        if (category) {
            setData((prevData) => ({
                ...prevData,
                sub_category: roleId,
                category: category.id
            }));
        } else {
            setData('sub_category', roleId);
        }
    };

    const jobTypes = [
        { value: 'full_time', label: 'Full Time' },
        { value: 'part_time', label: 'Part Time' },
        { value: 'contract', label: 'Contract' },
        { value: 'internship', label: 'Internship' },
        { value: 'daily_wage', label: 'Daily Wage' },
        { value: 'apprenticeship', label: 'Apprenticeship' },
    ];

    if (!isOpen || !job) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Job</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <Label htmlFor="edit-title">Job Title *</Label>
                        <Input
                            id="edit-title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter job title"
                            required
                        />
                        <FormError error={errors.title} />
                    </div>

                    {/* Company */}
                    <div>
                        <Label htmlFor="edit-company">Company Name *</Label>
                        <Input
                            id="edit-company"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            placeholder="Enter company name"
                            required
                        />
                        <FormError error={errors.company} />
                    </div>

                    {/* Type and Sub-Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="edit-type">Job Type *</Label>
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
                            <Label htmlFor="edit-sub_category">Job Role / Category *</Label>
                            <Select value={data.sub_category} onValueChange={handleJobRoleChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select job role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobCategories.map((group) => (
                                        <SelectGroup key={group.id}>
                                            <SelectLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                                {group.label}
                                            </SelectLabel>
                                            {group.subRoles && group.subRoles.map((role) => (
                                                <SelectItem key={role.id} value={role.id}>
                                                    {role.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormError error={errors.sub_category} />
                            <FormError error={errors.category} />
                        </div>
                    </div>

                    {/* Salary */}
                    <div>
                        <Label htmlFor="edit-salary">Salary <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Input
                            id="edit-salary"
                            value={data.salary}
                            onChange={(e) => setData('salary', e.target.value)}
                            placeholder="e.g., GH₵ 2,000 - 3,000/month"
                        />
                        <FormError error={errors.salary} />
                    </div>

                    {/* Location and Address */}
                    <div>
                        <Label htmlFor="edit-location">Location *</Label>
                        <Input
                            id="edit-location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            placeholder="Enter location"
                            required
                        />
                        <FormError error={errors.location} />
                    </div>

                    <div>
                        <Label htmlFor="edit-address">Address <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Textarea
                            id="edit-address"
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
                            <Label htmlFor="edit-phone">Phone *</Label>
                            <Input
                                id="edit-phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Phone number"
                                required
                            />
                            <FormError error={errors.phone} />
                        </div>

                        <div>
                            <Label htmlFor="edit-phone_2">Phone 2 <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                            <Input
                                id="edit-phone_2"
                                value={data.phone_2}
                                onChange={(e) => setData('phone_2', e.target.value)}
                                placeholder="Second phone number"
                            />
                            <FormError error={errors.phone_2} />
                        </div>

                        <div>
                            <Label htmlFor="edit-whatsapp">WhatsApp <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                            <Input
                                id="edit-whatsapp"
                                value={data.whatsapp}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                placeholder="WhatsApp number"
                            />
                            <FormError error={errors.whatsapp} />
                        </div>

                        <div>
                            <Label htmlFor="edit-email">Email <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                            <Input
                                id="edit-email"
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
                        <Label htmlFor="edit-description">Job Description *</Label>
                        <Textarea
                            id="edit-description"
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
                        <Label htmlFor="edit-requirements">Requirements <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Textarea
                            id="edit-requirements"
                            value={data.requirements}
                            onChange={(e) => setData('requirements', e.target.value)}
                            placeholder="List job requirements (one per line or as paragraphs)"
                            rows={4}
                        />
                        <FormError error={errors.requirements} />
                    </div>

                    {/* Responsibilities */}
                    <div>
                        <Label htmlFor="edit-responsibilities">Responsibilities <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Textarea
                            id="edit-responsibilities"
                            value={data.responsibilities}
                            onChange={(e) => setData('responsibilities', e.target.value)}
                            placeholder="List job responsibilities (one per line or as paragraphs)"
                            rows={4}
                        />
                        <FormError error={errors.responsibilities} />
                    </div>

                    {/* Benefits */}
                    <div>
                        <Label htmlFor="edit-benefits">Benefits <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Textarea
                            id="edit-benefits"
                            value={data.benefits}
                            onChange={(e) => setData('benefits', e.target.value)}
                            placeholder="List job benefits (one per line or as paragraphs)"
                            rows={4}
                        />
                        <FormError error={errors.benefits} />
                    </div>

                    {/* Application Link */}
                    <div>
                        <Label htmlFor="edit-application_link">Application Link <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Input
                            id="edit-application_link"
                            type="url"
                            value={data.application_link}
                            onChange={(e) => setData('application_link', e.target.value)}
                            placeholder="https://example.com/apply"
                        />
                        <FormError error={errors.application_link} />
                    </div>

                    {/* Application Instructions */}
                    <div>
                        <Label htmlFor="edit-application_instructions">Application Instructions <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Textarea
                            id="edit-application_instructions"
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
                            id="edit-is_urgent"
                            checked={data.is_urgent}
                            onChange={(e) => setData('is_urgent', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="edit-is_urgent" className="cursor-pointer">
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
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
