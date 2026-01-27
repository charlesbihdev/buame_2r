import { JobsListings } from './JobsListings';
import { JobPosterSettings } from './JobPosterSettings';
import { JobFormModal } from './JobFormModal';
import { useState } from 'react';

export function JobsSection({ activeTab, data }) {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const handleAddJob = () => {
        setCreateModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {activeTab === 'poster' ? (
                <JobPosterSettings poster={data?.poster} />
            ) : (
                <JobsListings listings={data?.listings || []} onAddJob={handleAddJob} poster={data?.poster} />
            )}

            <JobFormModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
        </div>
    );
}

