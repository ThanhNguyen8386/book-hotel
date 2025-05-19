import { LinearProgress, Skeleton, TablePagination } from "@mui/material";
import React from "react";

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
};

type AdminTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  getRowKey: (item: T) => string;
  loading?: boolean;
  page: number;
  rowsPerPage: number;
  count: number;
  rowsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AdminTable<T>({
  data,
  columns,
  getRowKey,
  loading = false,
  page,
  rowsPerPage,
  count,
  rowsPerPageOptions = [5, 10, 25],
  onPageChange,
  onRowsPerPageChange
}: AdminTableProps<T>) {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const getAlignmentClass = (align: 'left' | 'center' | 'right' = 'left') => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

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
                  className={`${getAlignmentClass(col.align)} px-4 py-3 font-medium border-b ${col.className ?? ""}`}
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
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className={`${getAlignmentClass(col.align)} px-4 py-4`}>
                      <Skeleton variant="text" height={24} />
                    </td>
                  ))}
                </tr>
              ))
              : data.map((item) => (
                <tr
                  key={getRowKey(item)}
                  className="border-b hover:bg-gray-50"
                >
                  {columns.map((col, idx) => (
                    <td
                      key={idx}
                      className={`${getAlignmentClass(col.align)} px-4 py-4 align-top ${col.className ?? ""}`}
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
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage="Số hàng mỗi trang"
          />
        </div>
      )}
    </div>
  );
}
