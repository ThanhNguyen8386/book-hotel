/* eslint-disable @next/next/no-img-element */
import { Button, TablePagination, Tooltip } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout'
import AddIcon from '@mui/icons-material/Add';
import useProducts from '../../../hook/use-product'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import Head from 'next/head';
import ShowForPermission from '../../../components/Private/showForPermission';
import { update } from '../../../api/rooms';
import { useRouter } from 'next/router';

type Props = {}

const ProductsAdmin = (props: Props) => {
    const { data, error, dele } = useProducts("")
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const router = useRouter()
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    if (!data) return <div>Loading...</div>
    if (error) return <div>Error</div>
    function remove(id: any) {
        return Swal.fire({
            title: 'Chắc chắn xóa?',
            text: "Xóa sẽ mất toàn bộ dữ liệu phòng này!",
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
                            'Phòng này đã xóa thành công'
                        )
                    })
            }
        })
    }
    const status = (value: any, id: any) => {
        if (value == true) {
            return (
                <div className='flex'>
                    <div className='bg-green-500 text-white text-center px-[10px] py-[5px] font-bold rounded-lg'>Active</div>
                    <button onClick={() => {
                        const product: any = {
                            status: false,
                            _id: id
                        }
                        update(product).then(() => {
                            router.push('/admin').then(() => {
                                router.push('/admin/room')
                            })
                        })
                    }} className='bg-orange-200 text-slate-100 text-center px-[10px] py-[5px] font-bold rounded-lg'>Inactive</button>
                </div>
            )
        } else if (value == false) {
            return (
                <div className='flex'>
                    <div className='bg-orange-500 text-white text-center px-[10px] py-[5px] font-bold rounded-lg'>Inactive</div>
                    <button onClick={() => {
                        const product: any = {
                            status: true,
                            _id: id
                        }
                        update(product).then(() => {
                            router.push('/admin').then(() => {
                                router.push('/admin/room')
                            })
                        })
                    }} className='bg-green-300 text-slate-100 text-center px-[10px] py-[5px] font-bold rounded-lg'>Active</button>
                </div>
            )
        }
    }
    return (
        <div>
            <div className="container w-[100%] p-2">
                <Head>
                    <title>Rooms</title>
                </Head>
                <div className="">
                    <ShowForPermission>
                        <Link href={'/admin/room/add'}>
                            <button type="button" className="text-white bg-[#111827] hover:bg-[#1118276b] focus:outline-none focus:ring-4 focus:ring-[#111827] font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-[#111827]">
                                Tạo phòng mới <AddIcon />
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

                                        <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                            image
                                        </th>
                                        <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                            description
                                        </th>
                                        <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                            Status
                                        </th>
                                        <ShowForPermission>
                                            <th scope="col" className="text-xs px-5 py-3 bg-white border-b border-gray-200 text-[#333] text-left uppercase">
                                            </th>
                                        </ShowForPermission>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => (
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
                                            {/* <p className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {item.price}
                                                </p>
                                            </p> */}
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <div className="w-[50px] h-[50px] rounded-xl overflow-hidden shadow-xl">
                                                    <img src={item.image[0] ? item?.image[0] : "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"} className="w-[100px] h-[100px]" alt="" />
                                                </div>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {item.description}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {status(item.status, item._id)}
                                                </p>
                                            </td>
                                            <ShowForPermission>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <Link href={`/admin/room/${item.slug}`}>
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
                                rowsPerPageOptions={[]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


ProductsAdmin.Layout = DashboardLayout
export default ProductsAdmin



