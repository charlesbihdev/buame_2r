import { BuameNavbar } from '@/components/visitor/buame-navbar';
import Footer from '@/components/visitor/footer';
import { WhatsAppButton } from '@/components/visitor/whatsapp-button';
import ToastProvider from '@/components/ui/toast-provider';

export default function VisitorLayout({ children }) {
    return (
        <ToastProvider>
            <div className="min-h-screen bg-background">
                <BuameNavbar />
                <main>{children}</main>
                <Footer />
                <WhatsAppButton />
            </div>
        </ToastProvider>
    );
}
