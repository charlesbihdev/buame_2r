import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle, Clock } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

export default function SubscriptionRenewalWarning({ subscription, category, isFreeAccess = false, freeAccessDays = 30 }) {
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);

    if (!subscription) {
        return null;
    }

    const { subscription_status, days_until_expiry, expires_at, is_expiring_soon, is_in_grace_period } = subscription;

    // Don't show warning for active subscriptions that aren't expiring soon
    if (subscription_status === 'active' && !is_expiring_soon) {
        return null;
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getWarningContent = () => {
        if (subscription_status === 'cancelled') {
            return {
                icon: AlertCircle,
                title: 'Subscription Cancelled',
                message:
                    'Your subscription has been cancelled. Your profile and listings are hidden from visitors, and editing is disabled. Subscribe again to restore access.',
                className: 'bg-gray-50 border-gray-200 text-gray-800',
                iconClassName: 'text-gray-600',
            };
        }

        if (subscription_status === 'expired') {
            return {
                icon: AlertCircle,
                title: 'Subscription Expired',
                message:
                    'Your subscription has expired. Your profile and listings are no longer visible to visitors, and editing is disabled. Renew now to restore full access.',
                className: 'bg-red-50 border-red-200 text-red-800',
                iconClassName: 'text-red-600',
            };
        }

        if (is_in_grace_period) {
            const daysLeft = Math.abs(days_until_expiry);
            return {
                icon: Clock,
                title: 'Grace Period Active',
                message: `Your subscription has expired. You have ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left in your grace period before access is deactivated. Renew now to keep your services active.`,
                className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                iconClassName: 'text-yellow-600',
            };
        }

        if (is_expiring_soon && days_until_expiry > 0) {
            return {
                icon: AlertTriangle,
                title: 'Subscription Expiring Soon',
                message: `Your subscription expires in ${days_until_expiry} day${days_until_expiry !== 1 ? 's' : ''} (${formatDate(expires_at)}). Renew now to avoid service interruption.`,
                className: 'bg-orange-50 border-orange-200 text-orange-800',
                iconClassName: 'text-orange-600',
            };
        }

        if (days_until_expiry === 0) {
            return {
                icon: AlertTriangle,
                title: 'Subscription Expires Today',
                message: 'Your subscription expires today! Renew now to avoid any interruption to your services.',
                className: 'bg-orange-50 border-orange-200 text-orange-800',
                iconClassName: 'text-orange-600',
            };
        }

        return null;
    };

    const warning = getWarningContent();

    if (!warning) {
        return null;
    }

    const Icon = warning.icon;

    return (
        <>
            <div className={`mb-6 rounded-lg border p-4 ${warning.className}`}>
                <div className="flex items-start gap-3">
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${warning.iconClassName}`} />
                    <div className="flex-1">
                        <h3 className="mb-1 font-bold">{warning.title}</h3>
                        <p className="text-sm">{warning.message}</p>
                        <Button
                            onClick={() => setPaymentModalOpen(true)}
                            className="mt-3 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                            size="sm"
                        >
                            Renew Now
                        </Button>
                    </div>
                </div>
            </div>

            <PaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} category={category} subscription={subscription} isFreeAccess={isFreeAccess} freeAccessDays={freeAccessDays} />
        </>
    );
}
