import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function SelectableDataTable({
    columns,
    data,
    pagination,
    emptyMessage = 'No data found',
    emptyIcon: EmptyIcon,
    selectedIds,
    onSelectionChange,
}) {
    const allSelected = data.length > 0 && data.every((row) => selectedIds.includes(row.id));
    const someSelected = data.some((row) => selectedIds.includes(row.id));

    const handleSelectAll = (checked) => {
        if (checked) {
            const newIds = [...new Set([...selectedIds, ...data.map((row) => row.id)])];
            onSelectionChange(newIds);
        } else {
            const pageIds = data.map((row) => row.id);
            onSelectionChange(selectedIds.filter((id) => !pageIds.includes(id)));
        }
    };

    const handleSelectRow = (rowId, checked) => {
        if (checked) {
            onSelectionChange([...selectedIds, rowId]);
        } else {
            onSelectionChange(selectedIds.filter((id) => id !== rowId));
        }
    };

    return (
        <div className="border-border rounded-lg border">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="w-12 px-4 py-3">
                                <Checkbox
                                    checked={allSelected}
                                    data-state={someSelected && !allSelected ? 'indeterminate' : undefined}
                                    onCheckedChange={handleSelectAll}
                                />
                            </th>
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
                                <td colSpan={columns.length + 1} className="text-muted-foreground px-4 py-12 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        {EmptyIcon && <EmptyIcon className="h-10 w-10 opacity-50" />}
                                        <p>{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr key={row.id || index} className="border-border hover:bg-muted/30 border-t transition-colors">
                                    <td className="px-4 py-3">
                                        <Checkbox
                                            checked={selectedIds.includes(row.id)}
                                            onCheckedChange={(checked) => handleSelectRow(row.id, checked)}
                                        />
                                    </td>
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
