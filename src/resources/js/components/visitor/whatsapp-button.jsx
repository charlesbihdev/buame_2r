import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
    const whatsappNumber = '233540929012'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Hello, I need help with 2RBUAME');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed right-6 bottom-6 z-50 flex items-center justify-center rounded-full bg-[#25D366] p-3 text-white shadow-lg transition-transform hover:scale-110"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle className="h-8 w-8" />
        </a>
    );
}
