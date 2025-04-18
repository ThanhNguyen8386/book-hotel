/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Category_admin_detail from './Category_admin_detail';
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Switch, Tooltip } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import useCategory from '../../../hook/useCategory';
import Head from 'next/head';
import Swal from 'sweetalert2'
import ShowForPermission from '../../../components/Private/showForPermission';
import LinearProgress from '@mui/material/LinearProgress';
function CategoryAdmin() {
    const e = useCategory();
    const [loading, setLoading] = React.useState(true)
    const [rows, setRows] = React.useState<any>([{ _id: 1, name: null }]);
    const refDetail = React.useRef<any>();
    const [openDialog, setOpenDialog] = React.useState(false)
    const defaultData = {
        "status": false,
        "address": null,
        "image": null,
        "name": null
    }
    const [categoryData, setCategoryData] = React.useState(defaultData)

    React.useEffect(() => {
        if (e.data) {
            setRows(e.data)
            setLoading(false)
        }
    }, [e.data])

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
                    e.dele(item)
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
    const handleClose = () => {
        setOpenDialog(false);
        setCategoryData(defaultData);
    };

    const submit = () => {
        try {
            e.edit(categoryData).then(() => {
                handleClose()
            })
        } catch (error) {
            console.log(error);

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

    const handleCheckStatus = (e: any, userData: any) => {
        const status = e.target.checked
        const _categoryData = { ...userData, status }
        setCategoryData(_categoryData);
    }
    return (
        <div className='h-full' style={{ width: '100%', padding: "15px" }}>
            <Head>
                <title>
                    Customers
                </title>
            </Head>
            {loading ? <LinearProgress className='fixed top-[65px] z-50 w-full' /> : <></>}

            <ShowForPermission>
                <Button variant='text' sx={{ color: "orange" }} onClick={() => actionCrud.create(1, "CREATE")}>
                    <AddIcon /> Thêm mới
                </Button>
            </ShowForPermission>
            <Category_admin_detail ref={refDetail} />
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
                            { field: 'name', headerName: "Tên", align: "left", type: 'string', minWidth: 150, flex: 1 },
                            { field: 'address', headerName: "Địa chỉ", align: "left", type: 'string', minWidth: 150, flex: 1 },
                            {
                                field: 'status',
                                headerName: "Trạng thái",
                                align: "left",
                                type: 'string',
                                minWidth: 100,
                                renderCell: (params: any) => {
                                    return (
                                        <Switch
                                            checked={params.row.status}
                                            color='success'
                                            onChange={(e) => {
                                                setOpenDialog(true)
                                                handleCheckStatus(e, params.row);
                                            }} />
                                    );
                                }
                            },
                            {
                                minWidth: 100,
                                field: 'actions',
                                type: 'actions',

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
                                            onClick={() => actionCrud.update(params.row, params)} />
                                    </ShowForPermission>
                                    // <ShowForPermission key={2}>
                                    //     <GridActionsCellItem
                                    //         icon={<Tooltip title="Delete">
                                    //             <IconButton>
                                    //                 <DeleteIcon />
                                    //             </IconButton>
                                    //         </Tooltip>}
                                    //         label="Delete"
                                    //         onClick={() => actionCrud.remove(params.id)} />
                                    // </ShowForPermission>
                                ],
                            },
                        ],
                        [deleteUser]
                    )}
                />
            </div>
            <Dialog
                onClose={handleClose}
                open={openDialog}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Chuyển trạng thái Danh mục này?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Từ chối</Button>
                    <Button onClick={submit}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


CategoryAdmin.Layout = DashboardLayout

export default CategoryAdmin