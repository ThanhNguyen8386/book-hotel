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
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useRouter } from 'next/router';
import { categoryPagination } from '../../../api/category';
import AdminTable from '../../../components/AdminTable';
import { format } from 'date-fns';

function CategoryAdmin() {
    const router = useRouter()
    const defaultData = {
        "status": false,
        "address": null,
        "image": null,
        "name": null
    }
    const defaultFilterCondition = {
        page: 1,
        size: 10,
        search: ""
    }
    const [filterCondition, setFilterCondition] = React.useState(defaultFilterCondition);
    const e = useCategory();
    const [loading, setLoading] = React.useState(true)
    const [rows, setRows] = React.useState<any>([{ _id: 1, name: null }]);
    const refDetail = React.useRef<any>();
    const [openDialog, setOpenDialog] = React.useState(false)
    const [categoryData, setCategoryData] = React.useState(defaultData)

    const load = async () => {
        const _filterCondition = { ...filterCondition };
        const result = await categoryPagination(_filterCondition);
        setRows(result.data.data);
        setLoading(false)
    }

    React.useEffect(() => {
        load()
    }, [])

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
        load()
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
        <div className='flex flex-col h-full overflow-hidden' style={{ width: '100%', padding: "15px" }}>
            <Head>
                <title>
                    Customers
                </title>
            </Head>
            <ShowForPermission>
                <Button className='justify-start' variant='text' sx={{ color: "orange" }} onClick={() => {
                    // actionCrud.create(1, "CREATE")
                    router.push("/admin/category/add")
                }}>
                    <AddIcon /> Thêm mới
                </Button>
            </ShowForPermission>
            <Category_admin_detail ref={refDetail} afterSubmit={load} />
            <div className="bg-white border-b border-gray-200 h-12 flex items-center px-4">
                <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 w-96 mx-auto">
                    <SearchTwoToneIcon className="h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="conceals.management.com"
                        className="bg-transparent border-0 outline-none px-2 w-full text-sm"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-hidden bg-white">
                <AdminTable
                    loading={loading}
                    data={rows}
                    page={filterCondition.page}
                    rowsPerPage={filterCondition.size}
                    onPageChange={(page) => {
                        setFilterCondition({ ...filterCondition, page });
                    }}
                    onRowsPerPageChange={(size) => {
                        setFilterCondition({ ...filterCondition, size });
                    }}
                    getRowKey={(item) => item._id}
                    columns={[
                        {
                            key: "name",
                            header: "Sản phẩm",
                            render: (item) => (
                                <div className="flex items-start gap-2">
                                    <img src={item.image} className="w-12 h-12 object-cover rounded" />
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-gray-500">SKU: {item._id}</div>
                                    </div>
                                </div>
                            ),
                        },
                        { key: "address", header: "Địa chỉ" },
                        {
                            key: "price",
                            header: "Giá bán lẻ",
                            render: (params: any) => {
                                console.log(params);

                                const arrPrice = params.price?.map((item: any, index: any) => item.value);
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
                        { key: "sales", header: "Doanh số" },
                        {
                            key: "updated",
                            header: "Cập nhật",
                            render: (item) => {
                                return format(new Date(item.updatedAt), 'HH:mm, dd/MM/yyyy')
                            }
                        },
                        // {
                        //     key: "status",
                        //     header: "Trạng thái",
                        //     render: (item) => (
                        //         <span className={`px-2 py-1 rounded text-xs font-medium ${item.status.includes("vô hiệu") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                        //             {item.status}
                        //         </span>
                        //     ),
                        // },
                        // {
                        //     key: "actions",
                        //     header: "Hành động",
                        //     render: () => (
                        //         <div className="flex gap-2 text-blue-600 text-sm underline">
                        //             <Switch
                        //                 checked={true}
                        //                 color='success'
                        //                 onChange={(e) => {
                        //                     setOpenDialog(true)
                        //                     handleCheckStatus(e, {status: false });
                        //                 }} />
                        //             <button>Sao chép</button>
                        //         </div>
                        //     ),
                        // },
                    ]}
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