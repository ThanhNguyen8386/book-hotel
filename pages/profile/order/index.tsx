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
import Order_detail from './Order_detail'

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
        updateOrder: (item: any, type: any) => {
            refDetail.current.updateOrder(item, type)
        }
    }

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
            <Order_detail ref={refDetail} />
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
                                    return (
                                        <div className='flex items-center'>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={params.row.room && params.row.room.image[0]}
                                                // sx={{ width: 56, height: 56 }}
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
                                        <div className="text-sm h-full flex flex-col justify-center">
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

    )
}

Orderlisst.Layout = ProfileLayout;
export default Orderlisst