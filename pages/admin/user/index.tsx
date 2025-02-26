import * as React from 'react';
import { DashboardLayout } from '../../../components/dashboard-layout'
import userUser from '../../../hook/use-user'
import { Avatar, Button, Dialog, DialogActions, DialogTitle, IconButton, LinearProgress, Switch, Tooltip } from '@mui/material'
import ShowForPermission from '../../../components/Private/showForPermission'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
type Props = {}

const UserAdmin = (props: Props) => {
    const { data, dele, edit } = userUser()
    const [rows, setRows] = React.useState([{ _id: 1, name: null, email: null, status }]);
    const [openDialog, setOpenDialog] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const defaultData = {
        address: null,
        avatar: null,
        email: null,
        gender: null,
        name: null,
        password: null,
        phone: null,
        role: null,
        status: null,
    }
    const [userData, setUserData] = React.useState(defaultData)

    React.useEffect(() => {
        if (data) {
            setRows(data)
            setLoading(false)
        }
    }, [data])

    const deleteUser = React.useCallback(
        (id: any) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row?._id !== id));
            });
        },
        [],
    )

    const handleCheckStatus = (e: any, userData: any) => {
        const status = e.target.checked ? 1 : 0
        const _userData = { ...userData, status }
        setUserData(_userData);
    }

    const submit = () => {
        try {
            edit(userData).then(() => {
                console.log("update oke");
                handleClose()
            })
        } catch (error) {
            console.log(error);

        }
    }

    const handleClose = () => {
        setOpenDialog(false);
        setUserData(defaultData);
    };

    return (
        <div className='p-[15px]'>
            {loading ? <LinearProgress className='fixed top-[65px] z-50 w-full' /> : <></>}
            <div className="h-[600px]">
                <DataGrid
                    columns={React.useMemo(
                        () => [
                            {
                                field: 'avatar',
                                align: "left",
                                type: 'string',
                                headerName: "Ảnh",
                                maxWidth: 50,
                                renderCell: (params: any) => {
                                    return (
                                        <Avatar alt="Ảnh" src={params.row.avatar} />
                                    );
                                }
                            },
                            { field: 'name', align: "left", headerName: "Tên", type: 'string', minWidth: 150, flex: 1 },
                            { field: 'email', align: "left", headerName: "Email", type: 'string', minWidth: 150, flex: 1 },
                            {
                                field: 'status',
                                align: "center",
                                headerName: "Trạng thái",
                                type: 'number',
                                minWidth: 100,
                                renderCell: (params: any) => {
                                    return (
                                        <Switch
                                            checked={params.row.status == 1 ? true : false}
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
                                headerName: "Hành động",
                                type: 'actions',
                                // flex: 1,
                                align: "center",
                                getActions: (params: any) => [
                                    <ShowForPermission key={2}>
                                        <GridActionsCellItem
                                            icon={<Tooltip title="Delete">
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>}
                                            label="Delete"
                                            onClick={() => {
                                                try {
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
                                                            dele(params.row._id)
                                                                .then(() => {
                                                                    Swal.fire(
                                                                        'Deleted!',
                                                                        'Your file has been deleted.',
                                                                        'success'
                                                                    )
                                                                })
                                                        }
                                                    })
                                                } catch (error) {
                                                    console.log(error);

                                                }
                                            }}
                                        />
                                    </ShowForPermission>
                                ],
                            },
                        ],
                        [deleteUser]
                    )}
                    rows={rows}
                    getRowId={(row) => row._id} />
            </div>
            <Dialog
                onClose={handleClose}
                open={openDialog}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Chuyển trạng thái tài khoản này?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Từ chối</Button>
                    <Button onClick={submit}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


UserAdmin.Layout = DashboardLayout
export default UserAdmin





