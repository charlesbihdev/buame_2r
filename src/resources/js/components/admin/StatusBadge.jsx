export function StatusBadge({ status, type = 'default' }) {
    const getStatusStyles = () => {
        switch (type) {
            case 'user':
                return status
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'verification':
                return status
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'approval':
                return status
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
            case 'subscription':
                switch (status) {
                    case 'active':
                        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
                    case 'grace_period':
                        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
                    case 'expired':
                        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
                    case 'cancelled':
                        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
                    default:
                        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
                }
            case 'role':
                return status === 'super_admin'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const getLabel = () => {
        switch (type) {
            case 'user':
                return status ? 'Active' : 'Blocked';
            case 'verification':
                return status ? 'Verified' : 'Unverified';
            case 'approval':
                return status ? 'Approved' : 'Pending';
            case 'subscription':
                return status?.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Unknown';
            case 'role':
                return status === 'super_admin' ? 'Super Admin' : 'Admin';
            default:
                return String(status);
        }
    };

    return <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles()}`}>{getLabel()}</span>;
}
