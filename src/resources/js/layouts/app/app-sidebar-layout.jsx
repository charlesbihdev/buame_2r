import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import ToastProvider from '@/components/ui/toast-provider';

export default function AppSidebarLayout({ children, breadcrumbs = [] }) {
    return (
        <ToastProvider>
            <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs}/>
                {children}
            </AppContent>
        </AppShell>
        </ToastProvider>
    );
}

