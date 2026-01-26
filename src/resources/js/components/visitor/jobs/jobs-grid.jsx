import { JobCard } from './job-card';

export function JobsGrid({ jobs = [] }) {
    if (jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">No jobs found</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}
