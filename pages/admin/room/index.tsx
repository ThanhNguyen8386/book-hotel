/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarGroup, Button, Dialog, DialogActions, DialogTitle, IconButton, LinearProgress, Switch, TablePagination, Tooltip } from '@mui/material'
import Link from 'next/link'
import * as React from 'react';
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
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Room_admin_detail from './Room_admin_detail';

type Props = {}

const ProductsAdmin = (props: Props) => {
    const { data, error, dele, edit } = useProducts("")
    const refDetail = React.useRef<any>();
    const [rows, setRows] = React.useState<any>([{ _id: 1, name: null }]);
    const [loading, setLoading] = React.useState(true)
    const [openDialog, setOpenDialog] = React.useState(false)
    const defaultData = {
        category: null,
        createdAt: null,
        description: null,
        image: [],
        listFacility: [],
        name: null,
        price: null,
        ratingAvg: null,
        ratings: null,
        slug: null,
        status: null
    }
    const [roomData, setRoomData] = React.useState<any>(defaultData)
    const router = useRouter()

    React.useEffect(() => {
        if (data) {
            setRows(data)
            setLoading(false)
        }
    }, [data])

    const actionCrud = {
        create: (item: any, type: any) => {
            refDetail.current.create(item, type)
        },
        update: (item: any, type: any) => {
            refDetail.current.update(item, type)
        },
        remove: (item: any) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result: any) => {
                if (result.isConfirmed) {
                    dele(item)
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })
                }
            })
        }
    }

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

    const convertToPlainText = (html: any) => {
        if (html) {
            const withoutTags = html?.replace(/<[^>]*>/g, ' ');
            const withoutEntities = withoutTags
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/\s+/g, ' ')
                .trim();

            return withoutEntities;
        }
    };
    const deleteUser = React.useCallback(
        (id: any) => () => {
            setTimeout(() => {
                setRows((prevRows: any) => prevRows.filter((row: any) => row?._id !== id));
            });
        },
        [],
    )

    const handleCheckStatus = (e: any, userData: any) => {
        const status = e.target.checked ? true : false
        const _userData = { ...userData, status }
        setRoomData(_userData);
    }

    const submit = () => {
        try {
            edit(roomData).then(() => {
                handleClose()
            })
        } catch (error) {
            console.log(error);

        }
    }


    const handleClose = () => {
        setOpenDialog(false);
        setRoomData(defaultData);
    };

    return (
        <div className="w-[100%]">
            <Head>
                <title>Rooms</title>
            </Head>
            <div className='h-full' style={{ width: '100%', padding: "15px" }}>
                <Head>
                    <title>Rooms</title>
                </Head>
                {loading ? <LinearProgress className='fixed top-[65px] z-50 w-full' /> : <></>}

                <ShowForPermission>
                    <Button
                        variant='text'
                        sx={{ color: "orange" }}
                        onClick={() => {
                            router.push("/admin/room/add")
                        }}
                    >
                        <AddIcon /> Thêm mới
                    </Button>
                </ShowForPermission>
                <Room_admin_detail ref={refDetail} />

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
                                { field: 'name', headerName: "Tên", align: "left", type: 'string', minWidth: 150, flex: 1 },
                                {
                                    field: 'image',
                                    headerName: "Ảnh",
                                    align: "left",
                                    type: 'object',
                                    display: 'flex',
                                    minWidth: 150,
                                    flex: 1,
                                    renderCell: (params: any) => {
                                        return (
                                            <AvatarGroup spacing="small" max={3}>
                                                {params.row.image?.map((item: any, index: any) => {
                                                    return <Avatar key={index} alt="Ảnh" src={item} />
                                                })}
                                            </AvatarGroup>
                                        );
                                    }
                                },
                                {
                                    field: 'price',
                                    headerName: "Giá",
                                    align: "left",
                                    type: 'object',
                                    minWidth: 150,
                                    flex: 1,
                                    renderCell: (params: any) => {
                                        const arrPrice = params.row.price?.map((item: any, index: any) => item.value);
                                        const arrPriceLenght = arrPrice?.length;

                                        for (let i = 0; i < arrPriceLenght - 1; i++) {
                                            for (let j = 0; j < arrPriceLenght - i - 1; j++) {
                                                if (arrPrice[j] > arrPrice[j + 1]) {
                                                    let temp = arrPrice[j];
                                                    arrPrice[j] = arrPrice[j + 1];
                                                    arrPrice[j + 1] = temp;
                                                }
                                            }
                                        }
                                        return (
                                            arrPrice && <div><span className='font-bold text-xl'>{arrPrice[0]} - {arrPrice[arrPriceLenght - 1]}</span> VNĐ</div>
                                        );
                                    }
                                },
                                {
                                    field: 'description',
                                    headerName: "Mô tả",
                                    align: "left",
                                    type: 'string',
                                    minWidth: 350,
                                    flex: 1,
                                    renderCell: (params: any) => {
                                        return convertToPlainText(params.row.description)
                                    }
                                },
                                {
                                    field: 'status',
                                    headerName: "Trạng thái",
                                    align: "left",
                                    type: 'string',
                                    minWidth: 100,
                                    // flex: 1,
                                    renderCell: (params: any) => {
                                        return (
                                            <Switch
                                                checked={params.row.status}
                                                color='success'
                                                onChange={(e) => {
                                                    setOpenDialog(true)
                                                    handleCheckStatus(e, params.row);
                                                }}
                                            />
                                        );
                                    }
                                },
                                {
                                    minWidth: 100,
                                    field: 'actions',
                                    type: 'actions',
                                    // flex: 1,
                                    align: "center",
                                    getActions: (params: any) => [
                                        <ShowForPermission key={1}>
                                            <GridActionsCellItem
                                                icon={<Tooltip title="Edit">
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>}
                                                label="Edit"
                                                onClick={() => actionCrud.update(params.row, params)}
                                            />
                                        </ShowForPermission>,
                                        <ShowForPermission key={2}>
                                            <GridActionsCellItem
                                                icon={<Tooltip title="Delete">
                                                    <IconButton>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>}
                                                label="Delete"
                                                onClick={() => actionCrud.remove(params.id)}
                                            />
                                        </ShowForPermission>
                                    ],
                                },
                            ],
                            [deleteUser]
                        )}
                    />
                </div>
            </div>
            <Dialog
                onClose={handleClose}
                open={openDialog}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Chuyển trạng thái phòng này?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Từ chối</Button>
                    <Button onClick={submit}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}


ProductsAdmin.Layout = DashboardLayout
export default ProductsAdmin



