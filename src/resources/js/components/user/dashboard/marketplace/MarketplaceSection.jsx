import { useState } from 'react';
import { MyProducts } from './MyProducts';
import { StoreSettings } from './StoreSettings';
import { ProductFormModal } from './ProductFormModal';

export function MarketplaceSection({ activeTab, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {activeTab === 'store' ? (
                <StoreSettings store={data?.store} tiers={data?.tiers} />
            ) : (
                <MyProducts
                    products={data?.products || []}
                    store={data?.store}
                    tiers={data?.tiers}
                    onAddProduct={() => setIsModalOpen(true)}
                />
            )}

            <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} store={data?.store} />
        </div>
    );
}

