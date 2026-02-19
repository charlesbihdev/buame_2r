import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { Phone, Mail, MessageCircle, MapPin, Briefcase, Calendar, Banknote, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CautionBanner } from '@/components/ui/caution-banner';
import { VideoEmbed } from '@/components/ui/video-embed';
import { BackToHome } from '@/components/ui/back-to-home';

const formatSalary = (salary) => {
    if (!salary) return null;
    const s = salary.toString().trim();
    if (s.startsWith('₵') || s.startsWith('GH₵') || s.toLowerCase().startsWith('ghs')) {
        return s;
    }
    return `₵${s}`;
};

export default function JobView({ job, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
    if (!job) {
        return (
            <VisitorLayout>
                <Head title="Job Not Found">
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                    <p className="text-center text-gray-600 dark:text-gray-400">Job not found</p>
                </div>
            </VisitorLayout>
        );
    }

    const whatsappUrl = job.whatsapp_url || null;
    const companyName = job.company || job.poster?.name || 'Company';
    const posterName = job.poster?.name;

    const jobDescription = job.description ? job.description.substring(0, 160) : `${job.title} position at ${companyName} in ${job.location}`;

    return (
        <VisitorLayout>
            <Head title={`${job.title} - ${companyName}`}>
                <meta name="description" content={`${job.title} job at ${companyName} in ${job.location}. ${jobDescription}${jobDescription.length >= 160 ? '...' : ''}`} />
                <meta name="keywords" content={`${job.title}, ${companyName}, ${job.location}, job vacancy, employment, Ghana jobs, 2RBUAME`} />
                <meta property="og:title" content={`${job.title} - ${companyName} | 2RBUAME Jobs`} />
                <meta property="og:description" content={`${job.title} position at ${companyName} in ${job.location}. Apply now on 2RBUAME.`} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={`${job.title} - ${companyName} | 2RBUAME Jobs`} />
                <meta name="twitter:description" content={`${job.title} position at ${companyName} in ${job.location}. Apply now.`} />
            </Head>

            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                <div className="mb-6">
                    <BackToHome to="/jobs" label="Back to Jobs" />
                </div>

                {/* Caution Banner */}
                <CautionBanner type="job" className="mb-8" />

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <div className="mb-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">{job.title}</h1>
                                    {job.is_urgent && (
                                        <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">Urgent</span>
                                    )}
                                </div>
                                <div className="mb-4 flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-gray-400" />
                                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{companyName}</span>
                                </div>
                                {job.poster && (
                                    <div className="mb-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Posted by </span>
                                        <Link
                                            href={`/jobs/employer/${job.poster.slug}`}
                                            className="text-sm font-semibold text-[var(--primary)] hover:underline"
                                        >
                                            {posterName}
                                        </Link>
                                    </div>
                                )}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {job.type_label}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Posted {job.posted_at_human}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Videos */}
                        {job.video_links && job.video_links.length > 0 && (() => {
                            const tallPlatforms = ['tiktok', 'instagram'];
                            const tallVideos = job.video_links.filter((l) => tallPlatforms.includes(l.platform));
                            const wideVideos = job.video_links.filter((l) => !tallPlatforms.includes(l.platform));
                            return (
                                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                    <h2 className="mb-4 text-xl font-bold text-[var(--foreground)] dark:text-white">Videos</h2>
                                    <div className="space-y-4">
                                        {wideVideos.length > 0 && (
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {wideVideos.map((link) => (
                                                    <VideoEmbed key={link.id} url={link.url} platform={link.platform} embedUrl={link.embed_url} tiktokVideoId={link.tiktok_video_id} title={link.title} />
                                                ))}
                                            </div>
                                        )}
                                        {tallVideos.length > 0 && (
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {tallVideos.map((link) => (
                                                    <div key={link.id} className="min-h-[480px]" style={{ height: '480px' }}>
                                                        <VideoEmbed url={link.url} platform={link.platform} embedUrl={link.embed_url} tiktokVideoId={link.tiktok_video_id} title={link.title} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Description */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] dark:text-white">Job Description</h2>
                            <p className="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{job.description}</p>
                        </div>

                        {/* Requirements */}
                        {job.requirements && job.requirements.length > 0 && (
                            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] dark:text-white">Requirements</h2>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                                    {job.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Responsibilities */}
                        {job.responsibilities && job.responsibilities.length > 0 && (
                            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] dark:text-white">Responsibilities</h2>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                                    {job.responsibilities.map((resp, idx) => (
                                        <li key={idx}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Benefits */}
                        {job.benefits && job.benefits.length > 0 && (
                            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] dark:text-white">Benefits</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.benefits.map((benefit, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded-md bg-[var(--primary)]/10 px-3 py-1 text-sm font-semibold text-[var(--primary)] dark:bg-[var(--primary)]/20"
                                        >
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* How to Apply */}
                        {(job.application_link || job.application_instructions) && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] dark:text-white">How to Apply</h2>
                                {job.application_link && (
                                    <div className="mb-4">
                                        <Button asChild className="mb-3 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                                            <a href={job.application_link} target="_blank" rel="noopener noreferrer">
                                                Apply on External Site
                                            </a>
                                        </Button>
                                    </div>
                                )}
                                {job.application_instructions && (
                                    <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                                        <p className="whitespace-pre-wrap">{job.application_instructions}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Poster Info */}
                            {job.poster && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                    <div className="mb-4 flex items-center gap-3">
                                        {job.poster.logo && (
                                            <img
                                                src={job.poster.logo}
                                                alt={posterName}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[var(--foreground)] dark:text-white">{posterName}</h4>
                                            {job.poster.is_verified && (
                                                <span className="text-xs text-[var(--primary)]">Verified Employer</span>
                                            )}
                                        </div>
                                    </div>
                                    {job.poster.description && (
                                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                            {job.poster.description}
                                        </p>
                                    )}
                                    <Link
                                        href={`/jobs/employer/${job.poster.slug}`}
                                        className="text-sm font-semibold text-[var(--primary)] hover:underline"
                                    >
                                        View all jobs by this employer →
                                    </Link>
                                </div>
                            )}

                            {/* Salary */}
                            {job.salary && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Banknote className="h-5 w-5 text-[var(--primary)]" />
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Salary</div>
                                    </div>
                                    <div className="text-2xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">{formatSalary(job.salary)}</div>
                                </div>
                            )}

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Apply Now</h3>
                                <div className="space-y-3">
                                    {job.phone && (
                                        <a
                                            href={`tel:${job.phone}`}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Phone className="h-5 w-5 text-[var(--primary)]" />
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">{job.phone}</span>
                                        </a>
                                    )}
                                    {job.phone_2 && (
                                        <a
                                            href={`tel:${job.phone_2}`}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Phone className="h-5 w-5 text-[var(--primary)]" />
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">{job.phone_2}</span>
                                        </a>
                                    )}
                                    {whatsappUrl && (
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <MessageCircle className="h-5 w-5 text-[var(--primary)]" />
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">WhatsApp</span>
                                        </a>
                                    )}
                                    {job.email && (
                                        <a
                                            href={`mailto:${job.email}?subject=Application for ${job.title}`}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Mail className="h-5 w-5 text-[var(--primary)]" />
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">{job.email}</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {whatsappUrl && (
                                <div className="space-y-3">
                                    <Button
                                        asChild
                                        className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
                                    >
                                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="mr-2 h-5 w-5" />
                                            Apply via WhatsApp
                                        </a>
                                    </Button>
                                    {job.email && (
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                                        >
                                            <a href={`mailto:${job.email}?subject=Application for ${job.title}`}>
                                                <Mail className="mr-2 h-5 w-5" />
                                                Apply via Email
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}
