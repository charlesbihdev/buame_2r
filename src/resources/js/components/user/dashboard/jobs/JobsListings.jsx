import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Briefcase, MapPin, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { EditJobModal } from './EditJobModal';

export function JobsListings({ listings, onAddJob, poster }) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleCreate = () => {
        if (onAddJob) {
            onAddJob();
        }
    };

    const handleEdit = (job) => {
        setSelectedJob(job);
        setEditModalOpen(true);
    };

    const handleDelete = (job) => {
        if (confirm(`Are you sure you want to delete "${job.title}"? This action cannot be undone.`)) {
            router.delete(route('user.dashboard.jobs.destroy', job.id), {
                preserveScroll: true,
            });
        }
    };

    const handleToggleActive = (job) => {
        router.post(route('user.dashboard.jobs.toggle-active', job.id), {
            preserveScroll: true,
        });
    };

    const getTypeLabel = (type) => {
        const labels = {
            full_time: 'Full Time',
            part_time: 'Part Time',
            contract: 'Contract',
            internship: 'Internship',
            daily_wage: 'Daily Wage',
            apprenticeship: 'Apprenticeship',
        };
        return labels[type] || type;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">My Job Postings</h3>
                {poster && (
                    <Button onClick={handleCreate} className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Post Job
                    </Button>
                )}
            </div>

            {listings && listings.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="rounded-xl border border-[var(--buame-border-light)] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] overflow-hidden transition-all hover:shadow-lg"
                        >
                            <div className="p-4">
                                <div className="mb-2 flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[var(--foreground)] dark:text-white">{listing.title}</h4>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{listing.company}</p>
                                    </div>
                                    {listing.is_urgent && (
                                        <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">Urgent</span>
                                    )}
                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <span className="rounded bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                                        {getTypeLabel(listing.type)}
                                    </span>
                                    {listing.salary && (
                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{listing.salary}</span>
                                    )}
                                </div>

                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-3 w-3" />
                                    <span>{listing.location}</span>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <Button
                                        onClick={() => handleToggleActive(listing)}
                                        variant={listing.is_active ? 'outline' : 'default'}
                                        size="sm"
                                        className={listing.is_active
                                            ? 'flex-1 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                                            : 'flex-1 bg-gray-500 text-white hover:bg-gray-600'}
                                    >
                                        {listing.is_active ? (
                                            <>
                                                <Eye className="mr-2 h-3 w-3" />
                                                Live
                                            </>
                                        ) : (
                                            <>
                                                <EyeOff className="mr-2 h-3 w-3" />
                                                Hidden
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={() => handleEdit(listing)}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(listing)}
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        {poster ? 'No job postings yet. Start posting jobs!' : 'Please set up your employer profile first to post jobs.'}
                    </p>
                    {poster && (
                        <Button onClick={handleCreate} className="mt-4 cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Post Your First Job
                        </Button>
                    )}
                </div>
            )}

            {/* Edit Modal */}
            <EditJobModal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedJob(null);
                }}
                job={selectedJob}
            />
        </div>
    );
}
