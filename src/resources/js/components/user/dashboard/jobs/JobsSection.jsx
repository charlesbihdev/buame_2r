import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobsListings } from './JobsListings';

export function JobsSection({ activeTab, onTabChange, data }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[#0d1b0d] dark:text-white">Jobs Dashboard</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your job postings and applications</p>
            </div>

            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="listings" activeValue={activeTab}>My Jobs</TabsTrigger>
                    <TabsTrigger value="applications" activeValue={activeTab}>Applications</TabsTrigger>
                </TabsList>

                <TabsContent value="listings" activeValue={activeTab} className="mt-6">
                    <JobsListings listings={data?.listings || []} />
                </TabsContent>

                <TabsContent value="applications" activeValue={activeTab} className="mt-6">
                    <div className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-6">
                        <p className="text-center text-gray-600 dark:text-gray-400">Applications feature coming soon</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

