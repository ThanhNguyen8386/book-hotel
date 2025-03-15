/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Chip, IconButton, MenuItem, Tooltip } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { listOrderUser } from '../../../api/order'
import ProfileLayout from '../../../components/Layout/ProfileLayout'
import { OrderType } from '../../../types/order'
import { OrderUser } from '../../../types/OrderUser'
import { BookingList } from './BookingList'
import ShowForPermission from '../../../components/Private/showForPermission'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs'

type Props = {}

const Orderlisst = (props: Props) => {
    const [user, setUser] = useState<any>({})
    const [rows, setRows] = React.useState<any>([{ _id: 1, name: null }]);
    const [order, setorder] = useState([])
    const [status, setStatus] = useState(false)
    const refDetail = React.useRef<any>();
    const router = useRouter();
    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem('user') as string)
        if (getUser == 0 || getUser == null) {
            router.push('/')
            setStatus(false)
        } else {
            setStatus(true)
        }
        setUser(getUser)
        const get = async () => {
            if (getUser == 0 || getUser == null) {
                router.push('/')
                setStatus(false)
            } else {
                setStatus(true)
                const { data }: any = await listOrderUser(getUser._id)
                setorder(data)
                setRows(data)
            }
        }
        get()
    }, [])

    const actionCrud = {
        create: (item: any, type: any) => {
            refDetail.current.create(item, type)
        }
    }

    // const statuss = (value: any) => {
    //     if (value == 0) {
    //         return <span className='rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Chờ Xác Nhận</span>
    //     } else if (value == 1) {
    //         return <span className='bg-orange-600 rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Đã Xác Nhận</span>
    //     } else if (value == 2) {
    //         return <span className='bg-green-600 rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Đang Có Khách</span>
    //     } else if (value == 3) {
    //         return <span className='bg-orange-600 rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Đã Trả Phòng</span>
    //     }
    //     else {
    //         return <span className='bg-red-600 rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Hủy Phòng</span>
    //     }
    // }

    const statuss = (value: any) => {
        if (value == 0) {
            return {
                name: "Chờ Xác Nhận",
                color: "warning"
            }
        } else if (value == 1) {
            return {
                name: "Đã Xác Nhận",
                color: "primary"
            }
        } else if (value == 2) {
            return {
                name: "Đang Có Khách",
                color: "info"
            }
        } else if (value == 3) {
            return {
                name: "Đã Trả Phòng",
                color: "success"
            }
        }
        else {
            return {
                name: "Hủy Phòng",
                color: "error"
            }
        }
    }
    return (
        <div className='flex justify-center'>
            <div className="account_body container justify-center my-[40px] flex flex-row px-[96px] mb:flex mbs:inline ">
                <div className="account_sidebar flex flex-col w-[370px] h-fit border border-gray-20 rounded-3xl p-[24px] pb-[70px] mr-[32px] mb:flex mbs:mx-auto">
                    <div className="account_info px-[16px] py-[24px]">
                        <div className='contents'><img width={50} className="rounded-full mx-auto h-[100px] w-[100px] object-cover border-current" src={user?.avatar || "https://go2joy.vn/images/icons/user-placeholder.svg"} alt="" /></div>
                        <div className='text-center font-medium text-2xl'>{user?.phone}</div>
                    </div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='/profile' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                        <span className='pl-[10px] font-normal text-lg'>Hồ sơ của tôi</span></a></div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='/profile/order' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg><span className='pl-[10px] font-normal text-lg'>Đặt phòng của tôi</span></a></div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='/profile/room_like' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg><span className='pl-[10px] font-normal text-lg'>Danh sách yêu thích</span></a></div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='#' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg><span className='pl-[10px] font-normal text-lg'>Tem của tôi</span></a></div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='#' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg><span className='pl-[10px] font-normal text-lg'>Coupon của tôi </span></a></div>
                    <hr className='my-[16px]' />
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='#' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                        <span onClick={() => {
                            setStatus(false)
                            localStorage.removeItem('user')
                            router.push('/')
                        }} className='pl-[10px] font-normal text-lg'>
                            Đăng Xuất</span></a></div>

                </div>
                <div className="w-full pl-4">
                    <div className="border-b border-gray-100">
                        <div className="">
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Phòng Đặt của tôi
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    Quản lý tất cả các đặt phòng của bạn
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-col flex'>
                        <DataGrid
                            rowHeight={70}
                            rows={rows}
                            getRowId={(row) => {
                                if (row.data) {
                                    return row.data._id
                                }
                                return row._id

                            }}
                            columns={React.useMemo(
                                () => [
                                    {
                                        field: 'name',
                                        headerName: "Tên phòng",
                                        align: "left",
                                        type: 'string',
                                        minWidth: 150,
                                        flex: 1,
                                        renderCell: (params: any) => {
                                            console.log(params.row);
                                            return (
                                                <div className='flex items-center'>
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src={params.row.room && params.row.room.image[0]}
                                                        sx={{ width: 24, height: 24 }}
                                                        variant="rounded"
                                                    />
                                                    <span className='pl-2'>{params.row.room && params.row.room.name}</span>
                                                </div>

                                            )
                                        }
                                    },
                                    {
                                        field: 'checkin',
                                        headerName: "Thời gian đặt nhận",
                                        align: "left",
                                        type: 'string',
                                        minWidth: 150,
                                        flex: 1,
                                        renderCell: (params: any) => {
                                            return (
                                                <div className="text-sm flex flex-col justify-center">
                                                    <p className="text-gray-800 font-medium">{params.row && dayjs(params.row.checkins).format("HH:mm DD/MM/YYYY")}</p>
                                                    <p className="text-gray-500 mt-1">đến {params.row && dayjs(params.row.checkouts).format("HH:mm DD/MM/YYYY")}</p>
                                                </div>
                                            )
                                        }
                                    },
                                    {
                                        minWidth: 150,
                                        headerName: "Trạng thái phòng",
                                        field: 'actions',
                                        type: 'actions',
                                        flex: 1,
                                        align: "center",
                                        renderCell: (params: any) => {
                                            if (params.row.statusorder) {
                                                return (
                                                    <p>
                                                        <Chip
                                                            label={statuss(params.row.statusorder).name}
                                                            size="small"
                                                            color={statuss(params.row.statusorder).color}
                                                        />
                                                        <Chip
                                                            className='pl-2'
                                                            clickable
                                                            label="Chi tiết"
                                                            size="small"
                                                            variant="outlined"
                                                            onClick={() => actionCrud.updateOrder(params.row, "UPDATE")}
                                                        />
                                                    </p>
                                                )
                                            }
                                        }
                                    },
                                ]
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

Orderlisst.Layout = ProfileLayout;
export default Orderlisst