/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link'
import * as React from 'react';
import { DashboardLayout } from '../../../components/dashboard-layout'
import OrderHook from '../../../hook/use-order'
import { OrderType } from '../../../types/order'
import { Button, Chip, IconButton, LinearProgress, TablePagination, Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import Head from 'next/head'
import ShowForPermission from '../../../components/Private/showForPermission'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import OrderDetail from './orderDetail';

type Props = {}

const index = (props: Props) => {
    const { data, error, mutate } = OrderHook()
    const [rows, setRows] = React.useState<any>([{ _id: 1, name: null }]);
    const refDetail = React.useRef<any>();
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (data) {
            setRows(data)
            setLoading(false)
        }
    }, [data])

    const actionCrud = {
        updateOrder: (item: any, type: any) => {
            refDetail.current.update(item, type)
        }
    }

    const deleteUser = React.useCallback(
        (id: any) => () => {
            setTimeout(() => {
                setRows((prevRows: any) => prevRows.filter((row: any) => row?._id !== id));
            });
        },
        [],
    )

    const statuss = (value: any) => {
        if (value == 0) {
            return {
                name: "Chờ Xác Nhận",
                color: "warning"
            }
        } else if (value == 1) {
            return {
                name:"Đã Xác Nhận",
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
        <div>
            <div className='h-full' style={{ width: '100%', padding: "15px" }}>
                <Head>
                    <title>
                        Order
                    </title>
                </Head>
                {loading ? <LinearProgress className='fixed top-[65px] z-50 w-full' /> : <></>}
                <div className="flex-col flex">
                    <DataGrid
                        rows={rows}
                        getRowId={(row) => {
                            if (row.data) {
                                return row.data._id
                            }
                            return row._id

                        }}
                        columns={React.useMemo(
                            () => [
                                // { field: '_id', align: "left", type: 'string', headerName: "#", minWidth: 150, flex: 1 },
                                { headerName: 'Tên Khách hàng', field: 'name', align: "left", type: 'string', minWidth: 150, flex: 1 },
                                {
                                    headerName: 'Tên Phòng',
                                    field: "room",
                                    align: "left",
                                    type: 'string',
                                    minWidth: 150,
                                    flex: 1,
                                    renderCell: (params) => {
                                        if (params.row.room) {
                                            return params.row.room.name
                                        }
                                    }
                                },
                                { headerName: 'Email', field: 'email', align: "left", type: 'string', minWidth: 150, flex: 1 },
                                { headerName: 'Số điện thoại', field: 'phone', align: "left", type: 'string', minWidth: 150, flex: 1 },
                                {
                                    headerName: 'Check in',
                                    field: "checkins",
                                    align: "left",
                                    type: 'string',
                                    minWidth: 150,
                                    flex: 1,
                                    renderCell: (params) => {
                                        if (params.row) {
                                            return dayjs(params.row.checkins).format("HH:mm DD/MM/YYYY")
                                        }
                                    }
                                },
                                {
                                    minWidth: 150,
                                    headerName: "Trạng thái phòng",
                                    field: 'actions',
                                    type: 'actions',
                                    flex: 1,
                                    align: "center",
                                    renderCell: (params) => {
                                        if (params.row.statusorder) {
                                            return (
                                                <p>
                                                    <Chip
                                                        label={statuss(params.row.statusorder).name}
                                                        size="small"
                                                        color={statuss(params.row.statusorder).color}
                                                    />
                                                    <Chip
                                                        label="Chi tiết"
                                                        size="small"
                                                        color="default"
                                                        onClick={() => actionCrud.updateOrder(params.row, "UPDATE")}
                                                    />
                                                </p>
                                            )
                                        }
                                    }
                                }
                            ],
                            [deleteUser]
                        )}
                    />
                </div>
            </div>
            <OrderDetail ref={refDetail} status={statuss} />
        </div >
    )
}
index.Layout = DashboardLayout

export default index