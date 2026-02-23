import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

const statusConfig = {
    active: {
        icon: CheckCircle,
        label: 'Active',
        className: 'bg-green-100 text-green-700',
    },
    grace_period: {
        icon: Clock,
        label: 'Grace Period',
        className: 'bg-yellow-100 text-yellow-700',
    },
    expired: {
        icon: XCircle,
        label: 'Expired',
        className: 'bg-red-100 text-red-700',
    },
    cancelled: {
        icon: AlertCircle,
        label: 'Cancelled',
        className: 'bg-gray-100 text-gray-700',
    },
};

export default function SubscriptionStatusBadge({ status, expiresAt, showExpiry = true, size = 'default' }) {
    const config = statusConfig[status] || statusConfig.expired;
    const Icon = config.icon;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const sizeClasses = {
        small: 'px-2 py-0.5 text-[10px]',
        default: 'px-3 py-1 text-xs',
        large: 'px-4 py-1.5 text-sm',
    };

    const iconSizes = {
        small: 'h-3 w-3',
        default: 'h-3.5 w-3.5',
        large: 'h-4 w-4',
    };

    return (
        <div className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${config.className} ${sizeClasses[size]}`}>
            <Icon className={iconSizes[size]} />
            <span>{config.label}</span>
            {showExpiry && expiresAt && (
                <span className="opacity-75">
                    ({status === 'active' ? 'Expires' : 'Expired'}: {formatDate(expiresAt)})
                </span>
            )}
        </div>
    );
}
