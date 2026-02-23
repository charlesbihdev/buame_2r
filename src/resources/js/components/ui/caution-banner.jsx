import { useState } from 'react';
import { AlertTriangle, ShieldCheck, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CautionBanner({ type = 'general', className = '' }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Get caution data based on type (product, service, or general)
    const getCautionData = () => {
        switch (type) {
            case 'product':
                return {
                    heading: 'Buying an Item?',
                    points: [
                        'Carefully inspect the item\'s condition, quantity, and specifications before making any payment',
                        'Meet the seller in person at a safe, public location to verify the item',
                        'Never pay in advance without physically inspecting the item first',
                        'Use secure payment methods and request receipts for your records',
                        'Report any suspicious activity or fraudulent listings immediately',
                    ],
                };
            case 'service':
                return {
                    heading: 'Hiring a Service Provider?',
                    points: [
                        'Verify the service provider\'s credentials, experience, and reviews',
                        'Meet in person to discuss project scope, timeline, and pricing',
                        'Draft a written agreement or contract outlining deliverables and payment terms',
                        'Consider milestone-based payments for larger projects',
                        'Keep all communication and agreements documented',
                    ],
                };
            case 'job':
                return {
                    heading: 'Applying for a Job?',
                    points: [
                        'Verify the employer\'s legitimacy and business registration',
                        'Never pay any fees for job applications or interviews',
                        'Meet in a professional, public setting for interviews',
                        'Request a formal employment contract before starting work',
                        'Be wary of offers that seem too good to be true',
                    ],
                };
            default:
                return {
                    heading: 'Transaction Safety Tips',
                    points: [
                        'Always verify seller/service provider identity and credentials',
                        'Meet at safe, public locations for exchanges or initial consultations',
                        'Never share sensitive personal or financial information unnecessarily',
                        'Use 2RBUAME\'s approved communication channels when possible',
                        'Trust your instincts - if something feels off, proceed with caution',
                    ],
                };
        }
    };

    const cautionData = getCautionData();

    if (isDismissed) {
        return null;
    }

    return (
        <div className={`relative overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 ${className}`}>
            {/* Decorative background pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-400"></div>
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-yellow-400"></div>
            </div>

            <div className="relative p-5 md:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-400/20">
                            <ShieldCheck className="h-5 w-5 text-amber-700" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-amber-900 md:text-lg">
                                    Safe Transaction Notice
                                </h3>
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                            </div>
                            <p className="mt-1 text-sm text-amber-800">
                                {cautionData.heading} Please read these important safety guidelines.
                            </p>
                        </div>
                    </div>

                    {/* Dismiss button */}
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-amber-700 transition-colors hover:bg-amber-200/50"
                        aria-label="Dismiss notice"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Collapsible Content */}
                {isExpanded && (
                    <div className="mt-4 space-y-3 border-t border-amber-200 pt-4">
                        <ul className="space-y-2">
                            {cautionData.points.map((point, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-amber-900">
                                    <span className="mt-1 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 rounded-lg bg-amber-100/50 p-3">
                            <p className="text-xs leading-relaxed text-amber-800">
                                <strong>Disclaimer:</strong> 2RBUAME is a platform that connects buyers and sellers/service providers.
                                While we strive to maintain a safe marketplace, all transactions are conducted directly between parties.
                                2RBUAME is not responsible for any disputes, losses, or issues arising from transactions.
                                Always exercise caution and due diligence.
                            </p>
                        </div>

                        <p className="text-xs font-semibold text-amber-700">
                            Stay safe and transact responsibly on 2RBUAME
                        </p>
                    </div>
                )}

                {/* Expand/Collapse Button */}
                <div className="mt-4 flex justify-center">
                    <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-amber-800 hover:bg-amber-200/50 hover:text-amber-900"
                    >
                        {isExpanded ? (
                            <>
                                Show Less
                                <ChevronUp className="h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Read Safety Guidelines
                                <ChevronDown className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
