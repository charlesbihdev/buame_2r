import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

export default function AppearanceTabs() {
    const { data, setData, patch, processing } = useForm({
        theme: 'system', // default theme
    });

    const handleThemeChange = (theme) => {
        setData('theme', theme);
        // You can add a route here to save the theme preference
        // patch(route('appearance.update'), { preserveScroll: true });
    };

    return (
        <div className="space-y-4">
            <Tabs value={data.theme} onValueChange={handleThemeChange}>
                <TabsList>
                    <TabsTrigger value="light">Light</TabsTrigger>
                    <TabsTrigger value="dark">Dark</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
                <TabsContent value={data.theme} className="mt-4">
                    <p className="text-sm text-muted-foreground">
                        {data.theme === 'light' && 'Light mode uses a light color scheme.'}
                        {data.theme === 'dark' && 'Dark mode uses a dark color scheme.'}
                        {data.theme === 'system' && 'System mode follows your device\'s theme preference.'}
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    );
}

