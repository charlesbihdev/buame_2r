import { useState } from 'react';
import { MyProducts } from './MyProducts';
import { StoreSettings } from './StoreSettings';
import { ProductFormModal } from './ProductFormModal';

export function MarketplaceSection({ activeTab, data, isFreeAccess = false }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {activeTab === 'store' ? (
                <StoreSettings store={data?.store} tiers={data?.tiers} isFreeAccess={isFreeAccess} />
            ) : (
                <MyProducts
                    products={data?.products || []}
                    store={data?.store}
                    tiers={data?.tiers}
                    onAddProduct={() => setIsModalOpen(true)}
                    isFreeAccess={isFreeAccess}
                />
            )}

            <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} store={data?.store} />
        </div>
    );
}

