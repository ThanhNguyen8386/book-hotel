/* eslint-disable @next/next/no-img-element */
import { Button, TablePagination, Tooltip } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout'
import AddIcon from '@mui/icons-material/Add';
import useBlog from '../../../hook/use-blog'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import ShowForPermission from '../../../components/Private/showForPermission';
import Head from 'next/head';
import { Blog } from '../../../types/blog';

type Props = {}

const BlogAdmin = (props: Props) => {
    const { data, error, dele } = useBlog();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: any, newPage: number) => {
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
            text: "Xóa sẽ mất toàn bộ dữ liệu blog này!",
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
        })}})
    }

    return (
        <div>
            <div className="container w-[100%] p-2">
                <Head>
                    <title>Blog</title>
                </Head>
                <div>
                    <ShowForPermission>
                        <Link href={'/admin/blog/add'}>
                            <button type="button" className="text-white bg-[#111827] hover:bg-[#1118276b] focus:outline-none focus:ring-4 focus:ring-[#111827] font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-[#111827]">
                                Thêm blog mới <AddIcon />
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
                                            Title
                                        </th>
                                        <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                            Thumbnail
                                        </th>
                                        <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                            Category
                                        </th>
                                        <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                            Author
                                        </th>
                                        <ShowForPermission>
                                            <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                            </th>
                                        </ShowForPermission>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* cắt mảng => phân trang. */}
                                    {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: Blog, index: number) => (
                                        <tr key={item._id} className="cursor-pointer select-none">
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {index + 1 + page * rowsPerPage}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {/* giới hạn title. */}
                                                    {item.title.length > 40 ? `${item.title.slice(0, 40)}...` : item.title}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <div className="w-[50px] h-[50px] rounded-xl overflow-hidden shadow-xl">
                                                    <img src={item.image} className="w-[100px] h-[100px] object-cover" alt="" />
                                                </div>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {item.category.name}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {item.user?.name}
                                                </p>
                                            </td>
                                            
                                            <ShowForPermission>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <Link href={`/admin/blog/${item.slug}`}>
                                                        <Tooltip title={`Chỉnh sửa ${item.title}`}>
                                                            <Button className='text-[#111827]' variant="text" startIcon={<EditIcon />}>
                                                                Edit
                                                            </Button>
                                                        </Tooltip>
                                                    </Link>
                                                    <Tooltip title={`Xóa ${item.title}`}>
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
                                component="div"
                                count={data.length}
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
    )
}


BlogAdmin.Layout = DashboardLayout
export default BlogAdmin



