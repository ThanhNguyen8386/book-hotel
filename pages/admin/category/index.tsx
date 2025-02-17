/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Category_admin_detail from './Category_admin_detail';
import { Button, IconButton, Tooltip } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import useCategory from '../../../hook/useCategory';
import Head from 'next/head';
import Swal from 'sweetalert2'
import ShowForPermission from '../../../components/Private/showForPermission';
function CategoryAdmin() {
    const e = useCategory();

    const [rows, setRows] = React.useState([{ _id: 1, name: null }]);
    const refDetail = React.useRef<any>();

    React.useEffect(() => {
        if (e.data) {
            setRows(e.data)
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

    const deleteUser = React.useCallback(
        (id: any) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    )

    const columns = React.useMemo(
        () => [
            { field: '_id', type: 'string', width: 150, headerName: "#" },
            { field: 'name', type: 'number' },
            {
                field: 'actions',
                type: 'actions',
                width: 150,
                getActions: (params: any) => [
                    <ShowForPermission key={1}>
                        <GridActionsCellItem
                            icon={
                                <Tooltip title="Edit">
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>}
                            label="Edit"
                            onClick={() => actionCrud.update(params.row, params)}
                        />
                    </ShowForPermission> ,
                    <ShowForPermission key={2}>
                        <GridActionsCellItem
                            icon={
                                <Tooltip title="Delete">
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
        [deleteUser],
    );

    return (
        <div style={{ width: '100%', padding: "15px" }}>
            <Head>
                <title>
                    Customers
                </title>
            </Head>

            <ShowForPermission>
                <Button variant='text' sx={{ color: "orange" }} onClick={() => actionCrud.create(1, "CREATE")}>
                    <AddIcon /> Thêm mới
                </Button>
            </ShowForPermission>
            
            <Category_admin_detail ref={refDetail} />
            <div className="h-[600px]">
                <DataGrid
                    columns={columns}
                    rows={rows}
                    getRowId={(row) => row._id} />
            </div>
        </div>
    );
}


CategoryAdmin.Layout = DashboardLayout

export default CategoryAdmin