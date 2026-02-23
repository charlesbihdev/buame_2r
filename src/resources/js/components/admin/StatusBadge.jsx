export function StatusBadge({ status, type = 'default' }) {
    const getStatusStyles = () => {
        switch (type) {
            case 'user':
                return status
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700';
            case 'verification':
                return status
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700';
            case 'approval':
                return status
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700';
            case 'subscription':
                switch (status) {
                    case 'active':
                        return 'bg-green-100 text-green-700';
                    case 'grace_period':
                        return 'bg-yellow-100 text-yellow-700';
                    case 'expired':
                        return 'bg-red-100 text-red-700';
                    case 'cancelled':
                        return 'bg-gray-100 text-gray-700';
                    default:
                        return 'bg-gray-100 text-gray-700';
                }
            case 'role':
                return status === 'super_admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-blue-100 text-blue-700';
            case 'review':
                switch (status) {
                    case 'approved':
                        return 'bg-green-100 text-green-700';
                    case 'pending':
                        return 'bg-yellow-100 text-yellow-700';
                    case 'disapproved':
                        return 'bg-red-100 text-red-700';
                    default:
                        return 'bg-gray-100 text-gray-700';
                }
            default:
                return 'bg-gray-100 text-gray-700';
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
            case 'review':
                return status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';
            default:
                return String(status);
        }
    };

    return <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles()}`}>{getLabel()}</span>;
}
