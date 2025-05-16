import { LinearProgress, Skeleton, TablePagination } from "@mui/material";
import React from "react";

// ... giữ nguyên phần định nghĩa Column và AdminTableProps
type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
};

type AdminTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    getRowKey: (item: T) => string;
    loading?: boolean;
    page?: number;
    rowsPerPage?: number;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (size: number) => void;
};

export default function AdminTable<T>({
    data,
    columns,
    getRowKey,
    loading = false,
    page: controlledPage,
    rowsPerPage: controlledRowsPerPage,
    onPageChange,
    onRowsPerPageChange
}: AdminTableProps<T>) {
    const [internalPage, setInternalPage] = React.useState(0);
    const [internalRowsPerPage, setInternalRowsPerPage] = React.useState(10);

    const page = controlledPage ?? internalPage;
    const rowsPerPage = controlledRowsPerPage ?? internalRowsPerPage;

    const handleChangePage = (_: unknown, newPage: number) => {
        if (onPageChange) onPageChange(newPage);
        else setInternalPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newSize = parseInt(event.target.value, 10);
        if (onRowsPerPageChange) onRowsPerPageChange(newSize);
        else {
            setInternalRowsPerPage(newSize);
            setInternalPage(0);
        }
    };

    const paginatedData = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <div className="flex flex-col h-full max-h-full">
            {loading && (
                <div className="absolute top-0 left-0 right-0 z-20">
                    <LinearProgress />
                </div>
            )}
            <div className="overflow-auto flex-1">
                <table className="min-w-full bg-white text-sm table-auto">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className={`text-left px-4 py-3 font-medium border-b ${col.className ?? ""}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={loading ? "pointer-events-none" : ""}>
                        {loading
                            ? Array.from({ length: rowsPerPage }).map((_, idx) => (
                                <tr key={idx} className="border-b">
                                    {columns.map((_, cIdx) => (
                                        <td key={cIdx} className="px-4 py-4">
                                            <Skeleton variant="text" height={24} />
                                        </td>
                                    ))}
                                </tr>
                            ))
                            : paginatedData.map((item) => (
                                <tr
                                    key={getRowKey(item)}
                                    className="border-b hover:bg-gray-50"
                                >
                                    {columns.map((col, idx) => (
                                        <td
                                            key={idx}
                                            className={`px-4 py-4 align-top ${col.className ?? ""}`}
                                        >
                                            {col.render
                                                ? col.render(item)
                                                : (item as any)[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {!loading && (
                <div className="px-4 py-2 border-t bg-white">
                    <TablePagination
                        component="div"
                        count={data.length}
                        page={page}
                        onPageChange={(_, newPage) => handleChangePage(_, newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage="Số hàng mỗi trang"
                    />
                </div>
            )}
        </div>
    );
}
