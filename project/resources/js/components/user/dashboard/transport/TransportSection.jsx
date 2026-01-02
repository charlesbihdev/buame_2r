import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransportListings } from './TransportListings';

export function TransportSection({ activeTab, onTabChange, data }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[#0d1b0d] dark:text-white">Transport Dashboard</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your ride listings</p>
            </div>

            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="listings" activeValue={activeTab}>My Rides</TabsTrigger>
                </TabsList>

                <TabsContent value="listings" activeValue={activeTab} className="mt-6">
                    <TransportListings listings={data?.listings || []} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

