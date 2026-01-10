import { BuameNavbar } from '@/components/visitor/buame-navbar';
import { Footer } from '@/components/visitor/footer';
import { WhatsAppButton } from '@/components/visitor/whatsapp-button';

export default function VisitorLayout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            <BuameNavbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}
