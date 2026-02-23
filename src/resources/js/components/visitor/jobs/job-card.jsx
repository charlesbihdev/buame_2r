import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { MapPin, Clock, Banknote } from 'lucide-react';

const formatSalary = (salary) => {
    if (!salary) return null;
    const s = salary.toString().trim();
    if (s.startsWith('₵') || s.startsWith('GH₵') || s.toLowerCase().startsWith('ghs')) {
        return s;
    }
    return `₵${s}`;
};

export function JobCard({ job }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-lg">
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-base leading-tight font-bold text-[var(--foreground)]">{job.title}</h3>
                        {job.company && (
                            <p className="mt-1 text-sm font-medium text-gray-600">{job.company}</p>
                        )}
                        {job.poster && (
                            <Link
                                href={`/jobs/employer/${job.poster.slug}`}
                                className="mt-1 text-sm font-medium text-[var(--primary)] hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {job.poster.name}
                            </Link>
                        )}
                    </div>
                    {job.is_urgent && (
                        <span className="shrink-0 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">Urgent</span>
                    )}
                </div>

                <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                        {job.type_label}
                    </span>
                    {job.category && (
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                            {job.category}
                        </span>
                    )}
                </div>

                <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="truncate">{job.location}</span>
                </div>

                {job.salary && (
                    <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)]">
                        <Banknote className="h-4 w-4 text-[var(--primary)]" />
                        <span>{formatSalary(job.salary)}</span>
                    </div>
                )}

                <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>Posted {job.posted_at_human}</span>
                </div>

                {(job.requirements_count > 0 || job.benefits_count > 0) && (
                    <div className="mb-4 flex items-center gap-4 text-xs text-gray-500">
                        {job.requirements_count > 0 && <span>{job.requirements_count} requirements</span>}
                        {job.benefits_count > 0 && <span>{job.benefits_count} benefits</span>}
                    </div>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-[var(--buame-border-light)] pt-4">
                    <Button asChild variant="ghost" className="text-sm font-bold text-[var(--primary)] hover:text-[var(--primary)] hover:underline">
                        <Link href={`/jobs/${job.id}`}>View Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
