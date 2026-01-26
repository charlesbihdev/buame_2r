import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobsListings } from './JobsListings';
import { ListingVisibilityBanner } from '@/components/user/dashboard/ListingVisibilityBanner';
import { JobFormModal } from './JobFormModal';
import { useState } from 'react';

export function JobsSection({ activeTab, onTabChange, data }) {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const handleAddJob = () => {
        setCreateModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">Jobs Dashboard</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your job postings and applications</p>
            </div>

            {/* Visibility Banner */}
            {data?.profile && (
                <ListingVisibilityBanner
                    listing={data.profile}
                    routeName="user.dashboard.jobs.toggle-active"
                    label="Profile"
                />
            )}

            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="listings" activeValue={activeTab}>My Jobs</TabsTrigger>
                    <TabsTrigger value="applications" activeValue={activeTab}>Applications</TabsTrigger>
                </TabsList>

                <TabsContent value="listings" activeValue={activeTab} className="mt-6">
                    <JobsListings listings={data?.listings || []} onAddJob={handleAddJob} />
                </TabsContent>

                <TabsContent value="applications" activeValue={activeTab} className="mt-6">
                    <div className="rounded-xl border border-[var(--buame-border-light)] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-6">
                        <p className="text-center text-gray-600 dark:text-gray-400">Applications feature coming soon</p>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Create Job Modal */}
            <JobFormModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
        </div>
    );
}

