import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Search, MapPin, Home, Wrench, Tractor, Car, Store } from 'lucide-react';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';

export default function Rentals({ rentals, filters, typeCounts, pagination }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/rentals',
            {
                search: searchQuery,
                location: location,
                type: filters?.type,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleTypeFilter = (type) => {
        router.get(
            '/rentals',
            {
                search: searchQuery,
                location: location,
                type: type === 'all' ? null : type,
                sort: filters?.sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleSort = (sort) => {
        router.get(
            '/rentals',
            {
                search: searchQuery,
                location: location,
                type: filters?.type,
                sort: sort,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const getTypeLabel = (type) => {
        const labels = {
            house: 'House',
            equipment: 'Equipment',
            tools: 'Tools',
            land: 'Land',
            commercial: 'Commercial',
            vehicle: 'Vehicle',
            store: 'Store',
        };
        return labels[type] || type;
    };

    const typeIcons = {
        house: Home,
        equipment: Tractor,
        tools: Wrench,
        land: Tractor,
        commercial: Store,
        vehicle: Car,
        store: Store,
    };

    const getPeriodLabel = (period) => {
        return period === 'day' ? '/day' : period === 'week' ? '/week' : '/month';
    };

    return (
        <VisitorLayout>
            <Head title="Rentals - House & Equipment | BUAME 2R" />

            {/* Hero Section */}
            <div className="border-b border-gray-200