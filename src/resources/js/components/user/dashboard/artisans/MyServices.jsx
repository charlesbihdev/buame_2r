import { Button } from '@/components/ui/button';
import { Plus, Wrench } from 'lucide-react';

export function MyServices({ data }) {
    const services = data?.services || [];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--foreground)]">My Services</h3>
                <Button className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                </Button>
            </div>

            {services.length > 0 ? (
                <div className="space-y-3">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex items-center justify-between rounded-lg border border-[var(--buame-border-light)] bg-white p-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                                    <Wrench className="h-5 w-5 text-[var(--primary)]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--foreground)]">{service.name}</p>
                                    <p className="text-sm text-gray-600">{service.description}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                    <Wrench className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600">No services added yet</p>
                    <Button className="mt-4 cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Service
                    </Button>
                </div>
            )}
        </div>
    );
}

