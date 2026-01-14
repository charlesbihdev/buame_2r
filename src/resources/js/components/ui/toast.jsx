import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export function Toast({ type, message, onHide, duration = 5000 }) {
    const [isVisible, setIsVisible] = useState(false);
    const [exit, setExit] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setExit(true);
                setTimeout(() => {
                    setIsVisible(false);
                    setExit(false);
                    onHide?.();
                }, 300);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onHide]);

    const handleClose = () => {
        setExit(true);
        setTimeout(() => {
            setIsVisible(false);
            setExit(false);
            onHide?.();
        }, 300);
    };

    if (!isVisible || !message) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />;
            case 'error':
                return <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />;
            case 'warning':
                return <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />;
            default:
                return <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return {
                    container: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
                    title: 'text-green-800 dark:text-green-300',
                    message: 'text-green-700 dark:text-green-400',
                    closeButton: 'hover:bg-green-200 dark:hover:bg-green-800/30 text-green-700 dark:text-green-300',
                };
            case 'error':
                return {
                    container: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
                    title: 'text-red-800 dark:text-red-300',
                    message: 'text-red-700 dark:text-red-400',
                    closeButton: 'hover:bg-red-200 dark:hover:bg-red-800/30 text-red-700 dark:text-red-300',
                };
            case 'warning':
                return {
                    container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
                    title: 'text-yellow-800 dark:text-yellow-300',
                    message: 'text-yellow-700 dark:text-yellow-400',
                    closeButton: 'hover:bg-yellow-200 dark:hover:bg-yellow-800/30 text-yellow-700 dark:text-yellow-300',
                };
            default:
                return {
                    container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
                    title: 'text-blue-800 dark:text-blue-300',
                    message: 'text-blue-700 dark:text-blue-400',
                    closeButton: 'hover:bg-blue-200 dark:hover:bg-blue-800/30 text-blue-700 dark:text-blue-300',
                };
        }
    };

    const styles = getStyles();
    const title = type === 'success' ? 'Success' : type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : 'Info';

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
                exit ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
        >
            <div className={`w-80 rounded-lg shadow-lg border p-4 ${styles.container}`}>
                <div className="flex items-start gap-3">
                    {getIcon()}
                    <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-semibold ${styles.title}`}>{title}</h3>
                        <p className={`text-sm mt-1 ${styles.message}`}>{message}</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className={`p-1 rounded-full transition-colors ${styles.closeButton}`}
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
