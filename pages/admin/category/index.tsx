/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Category_admin_detail from './Category_admin_detail';
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Switch, Tooltip } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import useCategory from '../../../hook/useCategory';
import Head from 'next/head';
import Swal from 'sweetalert2'
import ShowForPermission from '../../../components/Private/showForPermission';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useRouter } from 'next/router';
import { categoryPagination } from '../../../api/category';
import AdminTable from '../../../components/AdminTable';
import { format } from 'date-fns';
import { debounce } from "lodash";
import CustomAccordion from '../../../components/CustomAccordion';

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
    const [rows, setRows] = React.useState<any>({
        data: [{ _id: 1, name: null }],
        currentPage: 1,
        pageSize: 10,
        totalItems: 100,
        totalPages: 2
    });
    const refDetail = React.useRef<any>();
    const [openDialog, setOpenDialog] = React.useState(false)
    const [categoryData, setCategoryData] = React.useState(defaultData)

    const load = async () => {
        setLoading(true);
        const params = {
            page: 1,
            size: 10,
            search: ""
        }
        const _rows = { ...rows };
        await categoryPagination(params)
            .then(({ data }) => {
                _rows.data = data.data;
                _rows.currentPage = data.pagination.currentPage;
                _rows.pageSize = data.pagination.pageSize;
                _rows.totalItems = data.pagination.totalItems;
                _rows.totalPages = data.pagination.totalPages;
                setRows(_rows);
            })
        setLoading(false)
    }

    const filter = async (filterCondition: any) => {
        setLoading(true);
        const params = {
            page: filterCondition.page || 1,
            size: filterCondition.size || 10,
            search:
                filterCondition.search !== null && filterCondition.search !== undefined
                    ? filterCondition.search
                    : filterCondition.search || "",
        }
        const _rows = { ...rows };
        try {
            await categoryPagination(params)
                .then(({ data }) => {
                    _rows.data = data.data;
                    _rows.currentPage = data.pagination.currentPage;
                    _rows.pageSize = data.pagination.pageSize;
                    _rows.totalItems = data.pagination.totalItems;
                    _rows.totalPages = data.pagination.totalPages;
                    setRows(_rows);
                    setLoading(false)
                })
        } catch (error) {
            console.log(error);

        }
    }

    const debouncedFilter = React.useMemo(() =>
        debounce((fc) => {
            filter(fc);
        }, 500),
        [], []);

    React.useEffect(() => {
        return () => {
            debouncedFilter.cancel();
        };
    }, []);

    const applyChangeFilter = (prop: String, val: String) => {
        let _filterCondition = { ...filterCondition };
        if (prop) {
            switch (prop) {
                case "search":
                    _filterCondition[prop] = val;
                    break;
                default:
                    _filterCondition[prop] = val;
                    break;
            }
            setFilterCondition(_filterCondition);

            if (prop === "search") {
                debouncedFilter(_filterCondition); // debounce cho search
            } else {
                filter(_filterCondition); // gọi trực tiếp cho các prop khác
            }
        }
    };

    const onPage = (e: any) => {
        const _filterCondition = { ...filterCondition };
        _filterCondition.page = e.page;
        _filterCondition.size = e.size;
        setFilterCondition(_filterCondition);
        filter(_filterCondition);
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
        filter(filterCondition);
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
                    Quản lí khách sạn
                </title>
            </Head>
            <Category_admin_detail ref={refDetail} afterSubmit={load} />
            <div className="bg-white border-b border-gray-200 h-12 flex items-center px-4">
                <ShowForPermission>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon fontSize="small" />}
                        className="!normal-case px-3 py-1 text-sm inline-flex items-center"
                        onClick={() => {
                            router.push("/admin/category/add")
                        }}
                        sx={{
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#ffa500c7',
                                transition: 'all 0.2s ease-in-out',
                            },
                        }}
                    >
                        Thêm mới
                    </Button>
                </ShowForPermission>
                <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 w-96 mx-auto">
                    <SearchTwoToneIcon className="h-4 w-4 text-gray-500" />
                    <div className="relative w-full">
                        <input
                            value={filterCondition.search}
                            onChange={(e) => applyChangeFilter("search", e.target.value)}
                            type="text"
                            placeholder="Tìm kiếm khách sạn..."
                            className="bg-transparent border-0 outline-none px-2 w-full text-sm"

                        />
                        {filterCondition.search && (
                            <button
                                type="button"
                                onClick={() => applyChangeFilter("search", "")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                </div>
            </div>
            <div className="flex-1 overflow-hidden bg-white">
                <AdminTable
                    loading={loading}
                    data={rows.data}
                    page={rows.currentPage - 1}
                    rowsPerPage={rows.pageSize}
                    rowsPerPageOptions={[10, 20, 50]}
                    count={rows.totalItems}
                    onPageChange={(newPage) => {
                        onPage({
                            page: newPage + 1,
                            size: rows.pageSize,
                        })
                    }}
                    onRowsPerPageChange={(newSize) => {
                        onPage({
                            size: newSize.target.value,
                            page: rows.currentPage,
                        })
                    }}
                    getRowKey={(item: any) => item._id}
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
                            key: "updated",
                            header: "Cập nhật",
                            render: (item) => {
                                return format(new Date(item.updatedAt), 'HH:mm, dd/MM/yyyy')
                            }
                        },
                        {
                            key: "status",
                            header: "Trạng thái",
                            render: (item) => (
                                <div className="flex gap-2 text-blue-600 text-sm underline">
                                    <Switch
                                        checked={item.status}
                                        color='success'
                                        onChange={(e) => {
                                            setOpenDialog(true)
                                            handleCheckStatus(e, item);
                                        }}
                                    />
                                </div>
                            ),
                        },
                        {
                            key: "actions",
                            header: "Hành động",
                            render: (item) => (
                                <ShowForPermission key={1}>
                                    <div className="flex flex-col items-center">
                                        <EditIcon
                                            onClick={() => {
                                                // actionCrud.update(params.row, params)}
                                                return router.push(`/admin/category/${item._id}`)
                                            }}
                                        />
                                    </div>
                                </ShowForPermission>
                            ),
                        },
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