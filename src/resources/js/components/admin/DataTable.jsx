import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function DataTable({ columns, data, pagination, emptyMessage = 'No data found', emptyIcon: EmptyIcon }) {
    return (
        <div className="border-border rounded-lg border">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-muted-foreground px-4 py-12 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        {EmptyIcon && <EmptyIcon className="h-10 w-10 opacity-50" />}
                                        <p>{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr key={row.id || index} className="border-border hover:bg-muted/30 border-t transition-colors">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3 text-sm">
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && pagination.last_page > 1 && (
                <div className="border-border flex items-center justify-between border-t px-4 py-3">
                    <span className="text-muted-foreground text-sm">
                        Showing {pagination.from} to {pagination.to} of {pagination.total}
                    </span>
                    <div className="flex gap-2">
                        {pagination.prev_page_url ? (
                            <Link href={pagination.prev_page_url} preserveScroll preserveState>
                                <Button variant="outline" size="sm">
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="outline" size="sm" disabled>
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                        )}
                        {pagination.next_page_url ? (
                            <Link href={pagination.next_page_url} preserveScroll preserveState>
                                <Button variant="outline" size="sm">
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="outline" size="sm" disabled>
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
