import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WhatsAppButton() {
    const whatsappNumber = '233540929012';
    const message = encodeURIComponent('Hello, I need help with 2RBUAME');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    const [showLabel, setShowLabel] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowLabel(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed right-6 bottom-6 z-50 flex items-center gap-2"
            aria-label="Contact us on WhatsApp"
        >
            {showLabel && (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg">
                    Need help?
                </span>
            )}
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110">
                <MessageCircle className="h-8 w-8" />
            </span>
        </a>
    );
}
