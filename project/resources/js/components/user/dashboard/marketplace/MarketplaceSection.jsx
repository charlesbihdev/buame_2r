import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MyProducts } from './MyProducts';
import { StoreSettings } from './StoreSettings';

export function MarketplaceSection({ activeTab, onTabChange, data }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[#0d1b0d] dark:text-white">Marketplace Dashboard</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your products and store settings</p>
            </div>

            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="products" activeValue={activeTab}>My Products</TabsTrigger>
                    <TabsTrigger value="store" activeValue={activeTab}>Store Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="products" activeValue={activeTab} className="mt-6">
                    <MyProducts products={data?.products || []} />
                </TabsContent>

                <TabsContent value="store" activeValue={activeTab} className="mt-6">
                    <StoreSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
}

