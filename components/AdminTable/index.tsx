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
};

export default function AdminTable<T>({
    data,
    columns,
    getRowKey
}: AdminTableProps<T>) {
    return (
        <div className="overflow-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className={`text-left px-4 py-2 font-medium ${col.className ?? ""}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={getRowKey(item)} className="border-t hover:bg-gray-50">
                            {columns.map((col, cIdx) => (
                                <td key={cIdx} className={`px-4 py-2 align-top ${col.className ?? ""}`}>
                                    {col.render ? col.render(item) : (item as any)[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
