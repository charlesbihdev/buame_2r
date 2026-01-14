import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Toast } from './toast';

export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState({
        success: null,
        warning: null,
        error: null,
        info: null,
    });

    const flash = usePage().props.flash || {};

    const handleHide = (type) => {
        setToasts((prev) => ({
            ...prev,
            [type]: null,
        }));
    };

    useEffect(() => {
        if (flash.success) {
            setToasts((prev) => ({
                ...prev,
                success: {
                    message: flash.success,
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                },
            }));
        }

        if (flash.error) {
            setToasts((prev) => ({
                ...prev,
                error: {
                    message: flash.error,
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                },
            }));
        }

        if (flash.warning) {
            setToasts((prev) => ({
                ...prev,
                warning: {
                    message: flash.warning,
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                },
            }));
        }

        if (flash.info || flash.status) {
            setToasts((prev) => ({
                ...prev,
                info: {
                    message: flash.info || flash.status,
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                },
            }));
        }
    }, [flash]);

    return (
        <>
            {toasts.success && (
                <Toast
                    key={toasts.success.id}
                    type="success"
                    message={toasts.success.message}
                    onHide={() => handleHide('success')}
                />
            )}
            {toasts.error && (
                <Toast
                    key={toasts.error.id}
                    type="error"
                    message={toasts.error.message}
                    onHide={() => handleHide('error')}
                />
            )}
            {toasts.warning && (
                <Toast
                    key={toasts.warning.id}
                    type="warning"
                    message={toasts.warning.message}
                    onHide={() => handleHide('warning')}
                />
            )}
            {toasts.info && (
                <Toast
                    key={toasts.info.id}
                    type="info"
                    message={toasts.info.message}
                    onHide={() => handleHide('info')}
                />
            )}
            {children}
        </>
    );
}
