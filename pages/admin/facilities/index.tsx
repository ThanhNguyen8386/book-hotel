import React from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout'
import { Button, TablePagination, Tooltip } from '@mui/material'
import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useFacilities from '../../../hook/facilities';
import Swal from 'sweetalert2'
import ShowForPermission from '../../../components/Private/showForPermission';
import Head from 'next/head';
type Props = {}

const Utilities = (props: Props) => {
    const { data, error, dele } = useFacilities("")
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 0));
        setPage(0);
    };
    if (!data) return <div>Loading...</div>
    if (error) return <div>Error</div>

    function remove(id: any) {
        return Swal.fire({
            title: 'Chắc chắn xóa?',
            text: "Xóa sẽ mất toàn bộ dữ liệu tiện ích này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: "Hủy"
        }).then((result: any) => {
            if (result.isConfirmed) {
                dele(id)
                    .then(() => {
                        Swal.fire(
                            'Đã xóa!',
                            'Blog này đã xóa thành công'
                        )
                    })
            }
        })
    }

    return (
        <div>
            <div>
                <div className="container w-[100%] p-2">
                    <Head>
                        <title>Tiện ích</title>
                    </Head>
                    <div className="">
                        <ShowForPermission>
                            <Link href={'/admin/utilities/add'}>
                                <button type="button" className="text-white bg-[#111827] hover:bg-[#1118276b] focus:outline-none focus:ring-4 focus:ring-[#111827] font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-[#111827]">
                                    Thêm tiện ích mới <AddIcon />
                                </button>
                            </Link>
                        </ShowForPermission>

                        <div className="inline-block sm:min-w-full w-[900px] shadow-xl rounded-xl h-[600px] relative border">
                            <div className="h-full overflow-y-auto overflow-x-auto pb-[50px]">
                                <table className="table-auto w-full border">
                                    <thead className='sticky top-0 shadow z-50'>
                                        <tr>
                                            <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                                #
                                            </th>
                                            <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                                Name
                                            </th>
                                            
                                            <ShowForPermission>
                                                <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                                </th>
                                            </ShowForPermission>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((item: any, index: any) => (
                                            <tr key={item._id} className="cursor-pointer select-none">
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {index + 1}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <ShowForPermission>
                                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                        <Link href={`/admin/utilities/${item._id}`}>
                                                            <Tooltip title={`Chỉnh sửa ${item.name}`}>
                                                                <Button className='text-[#111827]' variant="text" startIcon={<EditIcon />}>
                                                                    Edit
                                                                </Button>
                                                            </Tooltip>
                                                        </Link>
                                                        <Tooltip title={`Xóa ${item.name}`}>
                                                            <Button onClick={() => { remove(item._id) }} className='text-[red]' variant="text" startIcon={<DeleteIcon />}>
                                                                Delete
                                                            </Button>
                                                        </Tooltip>
                                                    </td>
                                                </ShowForPermission>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="absolute bottom-0 bg-white w-full border-t border">
                                <TablePagination
                                    className=''
                                    component="div"
                                    count={100}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Utilities.Layout = DashboardLayout
export default Utilities