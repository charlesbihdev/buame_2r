<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BillingCycle;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminRevenueController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Payment::with(['user:id,name,phone,email'])
            ->where('status', 'completed')
            ->latest('paid_at');

        // Category filter
        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        // Billing cycle filter
        if ($cycle = $request->query('billing_cycle')) {
            $query->where('billing_cycle', $cycle);
        }

        // Date range filter
        if ($from = $request->query('from')) {
            $query->whereDate('paid_at', '>=', $from);
        }

        if ($to = $request->query('to')) {
            $query->whereDate('paid_at', '<=', $to);
        }

        // Payment type filter
        if ($type = $request->query('payment_type')) {
            $query->where('payment_type', $type);
        }

        $payments = $query->paginate(20)->withQueryString();

        // Revenue statistics
        $stats = [
            'total' => Payment::where('status', 'completed')->sum('amount'),
            'this_month' => Payment::where('status', 'completed')
                ->whereMonth('paid_at', now()->month)
                ->whereYear('paid_at', now()->year)
                ->sum('amount'),
            'this_week' => Payment::where('status', 'completed')
                ->whereBetween('paid_at', [now()->startOfWeek(), now()->endOfWeek()])
                ->sum('amount'),
            'today' => Payment::where('status', 'completed')
                ->whereDate('paid_at', now())
                ->sum('amount'),
        ];

        // Revenue by category
        $byCategory = Payment::where('status', 'completed')
            ->select('category', DB::raw('sum(amount) as total'), DB::raw('count(*) as count'))
            ->groupBy('category')
            ->get();

        // Revenue by billing cycle
        $byBillingCycle = Payment::where('status', 'completed')
            ->select('billing_cycle', DB::raw('sum(amount) as total'), DB::raw('count(*) as count'))
            ->groupBy('billing_cycle')
            ->get();

        // Monthly trend (last 12 months)
        $driver = DB::connection()->getDriverName();

        if ($driver === 'sqlite') {
            // SQLite doesn't support YEAR()/MONTH()
            $yearExpr = "CAST(strftime('%Y', paid_at) AS INTEGER)";
            $monthExpr = "CAST(strftime('%m', paid_at) AS INTEGER)";
        } else {
            $yearExpr = 'YEAR(paid_at)';
            $monthExpr = 'MONTH(paid_at)';
        }

        $monthlyTrend = Payment::where('status', 'completed')
            ->where('paid_at', '>=', now()->subMonths(12))
            ->selectRaw("$yearExpr as year, $monthExpr as month, sum(amount) as total")
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        return Inertia::render('admin/revenue/index', [
            'payments' => $payments,
            'stats' => $stats,
            'byCategory' => $byCategory,
            'byBillingCycle' => $byBillingCycle,
            'monthlyTrend' => $monthlyTrend,
            'filters' => $request->only(['category', 'billing_cycle', 'from', 'to', 'payment_type']),
            'categories' => array_keys(config('categories.list', [])),
            'billingCycles' => collect(BillingCycle::cases())->map(fn($c) => [
                'value' => $c->value,
                'label' => $c->label(),
            ]),
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $query = Payment::with(['user:id,name,phone,email'])
            ->where('status', 'completed')
            ->latest('paid_at');

        // Apply filters
        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        if ($from = $request->query('from')) {
            $query->whereDate('paid_at', '>=', $from);
        }

        if ($to = $request->query('to')) {
            $query->whereDate('paid_at', '<=', $to);
        }

        $payments = $query->get();

        $filename = 'revenue_export_' . now()->format('Y-m-d_H-i-s') . '.csv';

        return response()->streamDownload(function () use ($payments) {
            $handle = fopen('php://output', 'w');

            // CSV Header
            fputcsv($handle, [
                'ID',
                'User Name',
                'User Phone',
                'User Email',
                'Category',
                'Billing Cycle',
                'Payment Type',
                'Amount (GHS)',
                'Transaction ID',
                'Payment Reference',
                'Paid At',
            ]);

            // CSV Data
            foreach ($payments as $payment) {
                fputcsv($handle, [
                    $payment->id,
                    $payment->user?->name ?? 'N/A',
                    $payment->user?->phone ?? 'N/A',
                    $payment->user?->email ?? 'N/A',
                    ucfirst($payment->category),
                    $payment->billing_cycle?->label() ?? 'N/A',
                    ucfirst($payment->payment_type ?? 'initial'),
                    number_format($payment->amount, 2),
                    $payment->transaction_id ?? 'N/A',
                    $payment->payment_reference ?? 'N/A',
                    $payment->paid_at?->format('Y-m-d H:i:s') ?? 'N/A',
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }
}
