import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { Briefcase, Hammer, Home, Hotel, ShoppingBag, Bike, Check } from 'lucide-react';
import { useState } from 'react';

const categoryIcons = {
    artisans: Hammer,
    hotels: Hotel,
    transport: Bike,
    rentals: Home,
    marketplace: ShoppingBag,
    jobs: Briefcase,
};

export default function SelectCategory({ categories, registrationData }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const { post, processing } = useForm({
        category: '',
    });

    const handleSelect = (categoryValue) => {
        setSelectedCategory(categoryValue);
    };

    const handleContinue = () => {
        if (!selectedCategory) return;
        
        post(route('user.register.category'), {
            data: { category: selectedCategory },
        });
    };

    return (
        <>
            <Head title="Select Category" />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 py-12 dark:bg-[var(--buame-background-dark)]">
                <div className="w-full max-w-4xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">Choose Your Category</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Select the category you want to start with. You can add more later.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category) => {
                                const Icon = categoryIcons[category.value] || ShoppingBag;
                                const isSelected = selectedCategory === category.value;

                                return (
                                    <button
                                        key={category.value}
                                        onClick={() => handleSelect(category.value)}
                                        className={`group relative flex flex-col items-center gap-4 rounded-xl border-2 p-6 transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 ${
                                            isSelected
                                                ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                                : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                                        }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)]">
                                                <Check className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                        
                                        <div
                                            className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                                                isSelected ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            <Icon className="h-8 w-8" />
                                        </div>

                                        <div className="text-center">
                                            <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">{category.label}</h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                                            <p className="mt-2 text-lg font-bold text-[var(--primary)]">GH₵ {category.price}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-8">
                            <Button
                                onClick={handleContinue}
                                disabled={!selectedCategory || processing}
                                className="h-12 w-full bg-[var(--primary)] text-base font-bold text-white hover:bg-[#0eb50e] disabled:opacity-50"
                            >
                                {processing ? 'Processing...' : 'Continue to Payment'}
                            </Button>
                        </div>

                        <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                💡 <strong>Note:</strong> You can switch between categories or add more categories later from your dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

