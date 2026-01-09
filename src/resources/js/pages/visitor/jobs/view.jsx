import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Briefcase, Calendar, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function JobView({ job }) {
    const jobData = job || {
        id: 1,
        title: 'Shop Assistant Needed',
        company: 'ABC Retail Store',
        type: 'Full-time',
        salary: '₵800 - ₵1,200',
        location: 'Sefwi Bekwai, Market Area',
        posted: '2 days ago',
        phone: '+233 24 123 4567',
        whatsapp: '+233241234567',
        email: 'hr@abcretail.com',
        description: 'We are looking for a reliable and hardworking shop assistant to join our retail team. The ideal candidate should have good communication skills and be able to work in a fast-paced environment.',
        requirements: [
            'Minimum SHS certificate',
            'Good communication skills',
            'Ability to work weekends',
            'Previous retail experience preferred',
        ],
        responsibilities: [
            'Assist customers with purchases',
            'Maintain store cleanliness',
            'Handle cash transactions',
            'Stock management',
        ],
        benefits: ['Health insurance', 'Paid leave', 'Performance bonus'],
    };

    const whatsappUrl = `https://wa.me/${jobData.whatsapp.replace(/\D/g, '')}?text=Hello, I'm interested in applying for the ${jobData.title} position.`;

    return (
        <VisitorLayout>
            <Head title={`${jobData.title} - ${jobData.company} | BUAME 2R Jobs`} />
            
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                <Link
                    href="/jobs"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#13ec13] dark:text-gray-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Jobs
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <div className="mb-4">
                                <h1 className="mb-2 text-3xl font-bold text-[#0d1b0d] dark:text-white">{jobData.title}</h1>
                                <div className="mb-4 flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-gray-400" />
                                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{jobData.company}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {jobData.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {jobData.type}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Posted {jobData.posted}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">Job Description</h2>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">{jobData.description}</p>
                        </div>

                        {/* Requirements */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">Requirements</h2>
                            <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                                {jobData.requirements.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Responsibilities */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">Responsibilities</h2>
                            <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                                {jobData.responsibilities.map((resp, idx) => (
                                    <li key={idx}>{resp}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefits */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">Benefits</h2>
                            <div className="flex flex-wrap gap-2">
                                {jobData.benefits.map((benefit, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-md bg-[#13ec13]/10 px-3 py-1 text-sm font-semibold text-[#0d1b0d] dark:text-[#13ec13]"
                                    >
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Salary */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <div className="mb-2 flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-[#13ec13]" />
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Salary Range</div>
                                </div>
                                <div className="text-2xl font-black text-[#0d1b0d] dark:text-[#13ec13]">{jobData.salary}</div>
                                <div className="mt-2 text-sm text-gray-500">per month</div>
                            </div>

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Apply Now</h3>
                                <div className="space-y-3">
                                    <a
                                        href={`tel:${jobData.phone}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Phone className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{jobData.phone}</span>
                                    </a>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <MessageCircle className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">WhatsApp</span>
                                    </a>
                                    <a
                                        href={`mailto:${jobData.email}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Mail className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{jobData.email}</span>
                                    </a>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    asChild
                                    className="w-full bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]"
                                >
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        Apply via WhatsApp
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full border-[#13ec13] text-[#13ec13] hover:bg-[#13ec13] hover:text-[#0d1b0d]"
                                >
                                    <a href={`mailto:${jobData.email}?subject=Application for ${jobData.title}`}>
                                        <Mail className="mr-2 h-5 w-5" />
                                        Apply via Email
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}


