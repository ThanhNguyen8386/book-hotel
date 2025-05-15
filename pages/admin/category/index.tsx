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
        <div className='h-full' style={{ width: '100%', padding: "15px" }}>
            <Head>
                <title>
                    Customers
                </title>
            </Head>
            {loading ? <LinearProgress className='fixed top-[65px] z-50 w-full' /> : <></>}

            <ShowForPermission>
                <Button variant='text' sx={{ color: "orange" }} onClick={() => {
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
                                            onClick={() => {
                                                // actionCrud.update(params.row, params)}
                                                return router.push(`/admin/category/${params.row._id}`)
                                            }} />
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
            <AdminTable
                data={[
                    {
                        "_id": "680f403f8f2b03957edf6104",
                        "name": "Nhà nghỉ Mai Sơn",
                        "slug": "nha-nghi-mai-son",
                        "status": true,
                        "address": "Nhà nghỉ Mai Sơn",
                        "image": "",
                        "rooms": [
                            "680f8f1a57048a3b3b125703"
                        ],
                        "facilities": [
                            "6814e57927de297ce58c5c62",
                            "680da969de6e63a972e5aa28",
                            "68162763c95e4019d8805bef"
                        ],
                        "createdAt": "2025-04-28T08:45:51.984Z",
                        "updatedAt": "2025-05-11T10:47:57.702Z",
                        "__v": 2
                    },
                    {
                        "_id": "68160cf9c95e4019d8805956",
                        "name": "Khách sạn Năm Châu",
                        "slug": "khach-san-nam-chau",
                        "status": true,
                        "address": "Hà Nội",
                        "image": "http://res.cloudinary.com/dkhutgvlb/image/upload/v1739795711/xwfbzfrvi09g0h3sxwfs.jpg",
                        "rooms": [
                            "681638b7ef4b35eaa4838f9e",
                            "68163ae1a507086c91132650",
                            "68177173ce22165db4f1f690",
                            "681e26aa87a33bac97bad21f"
                        ],
                        "facilities": [
                            "6814e57927de297ce58c5c62",
                            "680da969de6e63a972e5aa28",
                            "68162757c95e4019d8805bec",
                            "68162744c95e4019d8805be9",
                            "68162763c95e4019d8805bef"
                        ],
                        "type": "another",
                        "createdAt": "2025-05-03T12:32:57.430Z",
                        "updatedAt": "2025-05-11T15:21:32.687Z",
                        "__v": 5,
                        "introduction": "<p><strong>Hotline</strong>: 0354170252</p><p><strong>Khách sạn Năm Châu</strong> có vị trí tại số <i><strong>27 đường Bàu Cát 2, Phường 14, Quận Tân Bình, Thành phố Hồ Chí Minh</strong></i>. Khu vực này vô cùng yên tĩnh, thanh bình và cư dân xung quanh cũng rất văn minh. Nên khi nghỉ ngơi tại đây, bạn có thể yên tâm là sẽ không ai làm phiền ngày nghỉ dưỡng của bạn.</p><p>&nbsp;</p><p>Khách sạn này có đến 27 phòng trong đó có 4 phòng đôi và 23 phòng đơn để bạn thoải mái lựa chọn. Không chỉ được yêu thích với chất lượng phòng ốc, Ngọc Hoa Mai Hotel còn được đánh giá cao bởi chất lượng dịch vụ đặt chuẩn. Mỗi phòng đều được dọn dẹp kỹ lưỡng, thay mới chăn-drap-gối khăn liên tục sau mỗi lượt khách.</p><p>&nbsp;</p><p>Chất lượng dịch vụ của Ngọc Hoa Mai Hotel được đánh giá cao khi các nhân viên luôn tôn trọng khách hàng có thái độ phục vụ tốt, nên cho dù bạn có đến nhận phòng vào nửa đêm hay rạng sáng thì cũng sẽ được đón tiếp nồng nhiệt. Nếu bạn sợ hết phòng thì có thể book ngay trên app Go2Joy nhé, chỉ sau 30 phút là bạn đã có thể nhận phòng ngay</p><p>&nbsp;</p><p>Bên cạnh đó, đường Bàu Cát 2 cũng khá to và thông thoáng, ô tô có thể chạy vào đến tận nơi. Xung quanh khách sạn vẫn có các địa điểm ăn uống nổi tiếng như Katinat Saigon Cafe, Highlands, Phúc Long, Cheese Coffee, Ba Gác Nướng, K-Pub BBQ và nhiều khu vui chơi như: công viên Hoàng Văn Thụ, Lotte Cộng Hòa,…</p><figure class=\"image\"><img src=\"https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/be73d3660ef347c98ea5c918b19f1337~tplv-o3syd03w52-origin-jpeg.jpeg?dr=15568&amp;nonce=59161&amp;refresh_token=f864dd1397134ab0f6a0853c6db551e1&amp;from=476444299&amp;idc=maliva&amp;ps=933b5bde&amp;shcp=9b759fb9&amp;shp=1c65f68b&amp;t=555f072d\"><figcaption>Hình ảnh khách sạn</figcaption></figure><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>"
                    },
                    {
                        "_id": "6818db90cc5db71b57132266",
                        "name": "Khách sạn Bốn bể",
                        "slug": "khach-san-bon-be",
                        "status": true,
                        "address": "Khách sạn Năm Châu",
                        "image": "http://res.cloudinary.com/dkhutgvlb/image/upload/v1739795711/xwfbzfrvi09g0h3sxwfs.jpg",
                        "rooms": [],
                        "facilities": [
                            "68162763c95e4019d8805bef",
                            "680da969de6e63a972e5aa28",
                            "6814e57927de297ce58c5c62",
                            "68162744c95e4019d8805be9",
                            "68162757c95e4019d8805bec"
                        ],
                        "type": "another",
                        "introduction": "<p><strong>Hotline</strong>: 02838493134</p><p><strong>Khách sạn Bốn bể</strong> có vị trí tại số <i>27 đường Bàu Cát 2, Phường 14, Quận Tân Bình, Thành phố Hồ Chí Minh</i>. Khu vực này vô cùng yên tĩnh, thanh bình và cư dân xung quanh cũng rất văn minh. Nên khi nghỉ ngơi tại đây, bạn có thể yên tâm là sẽ không ai làm phiền ngày nghỉ dưỡng của bạn.</p><p>&nbsp;</p><p>Khách sạn này có đến 27 phòng trong đó có 4 phòng đôi và 23 phòng đơn để bạn thoải mái lựa chọn. Không chỉ được yêu thích với chất lượng phòng ốc, Ngọc Hoa Mai Hotel còn được đánh giá cao bởi chất lượng dịch vụ đặt chuẩn. Mỗi phòng đều được dọn dẹp kỹ lưỡng, thay mới chăn-drap-gối khăn liên tục sau mỗi lượt khách.</p><p>&nbsp;</p><p>Chất lượng dịch vụ của Ngọc Hoa Mai Hotel được đánh giá cao khi các nhân viên luôn tôn trọng khách hàng có thái độ phục vụ tốt, nên cho dù bạn có đến nhận phòng vào nửa đêm hay rạng sáng thì cũng sẽ được đón tiếp nồng nhiệt. Nếu bạn sợ hết phòng thì có thể book ngay trên app Go2Joy nhé, chỉ sau 30 phút là bạn đã có thể nhận phòng ngay</p><p>&nbsp;</p><p>Bên cạnh đó, đường Bàu Cát 2 cũng khá to và thông thoáng, ô tô có thể chạy vào đến tận nơi. Xung quanh khách sạn vẫn có các địa điểm ăn uống nổi tiếng như Katinat Saigon Cafe, Highlands, Phúc Long, Cheese Coffee, Ba Gác Nướng, K-Pub BBQ và nhiều khu vui chơi như: công viên Hoàng Văn Thụ, Lotte Cộng Hòa,…</p>",
                        "createdAt": "2025-05-05T15:38:56.748Z",
                        "updatedAt": "2025-05-11T14:52:39.999Z",
                        "__v": 0
                    },
                    {
                        "_id": "681a269c88e93b18844f45f6",
                        "name": "Khách sạn Bốn bể 2",
                        "slug": "khach-san-bon-be-2",
                        "status": true,
                        "address": "Khách sạn Bốn bể",
                        "image": "http://res.cloudinary.com/dkhutgvlb/image/upload/v1739795711/xwfbzfrvi09g0h3sxwfs.jpg",
                        "rooms": [],
                        "facilities": [
                            "68162757c95e4019d8805bec",
                            "68162744c95e4019d8805be9",
                            "6814e57927de297ce58c5c62"
                        ],
                        "introduction": "introduction",
                        "createdAt": "2025-05-06T15:11:24.617Z",
                        "updatedAt": "2025-05-06T15:11:58.922Z",
                        "__v": 1
                    },
                    {
                        "_id": "6820c271fbe41a8b5b549f0e",
                        "name": "Khách sạn Năm Châu 6",
                        "slug": "khach-san-nam-chau-6",
                        "status": true,
                        "address": "Hà Nội",
                        "image": "http://res.cloudinary.com/dkhutgvlb/image/upload/v1739795711/xwfbzfrvi09g0h3sxwfs.jpg",
                        "rooms": [
                            "6820c2ddfbe41a8b5b549f98"
                        ],
                        "facilities": [
                            "6814e57927de297ce58c5c62",
                            "68162763c95e4019d8805bef",
                            "680da969de6e63a972e5aa28",
                            "68162757c95e4019d8805bec"
                        ],
                        "introduction": "<h2><strong>Giới thiệu về chỗ ở này</strong></h2><p>Phòng rộng 17m² với thiết kế hiện đại, ấm cúng và view sân vườn xanh mát, mang đến không gian thư giãn gần gũi thiên nhiên. Cửa kính lớn giúp tận dụng ánh sáng tự nhiên, tạo cảm giác thoáng đãng. Phòng trang bị đầy đủ tiện nghi như điều hòa, Wi-Fi tốc độ cao, phòng tắm riêng sạch sẽ cùng đồ dùng cần thiết. Không gian yên tĩnh, an toàn, lý tưởng cho những ai muốn nghỉ ngơi sau hành trình khám phá Ninh Bình.</p><h2>Chỗ ở</h2><p>Gai Mountain Lodge là một không gian nghỉ dưỡng yên bình giữa thiên nhiên, nằm gần động Thiên Tôn, Hoa Lư, Ninh Bình. Với thiết kế hiện đại, view núi non và sân vườn xanh mát, nơi đây mang đến trải nghiệm thư giãn và gần gũi thiên nhiên. Du khách có thể tận hưởng không gian riêng tư, dịch vụ chu đáo và dễ dàng khám phá các điểm du lịch nổi tiếng xung quanh.</p><h2>Tiện nghi khách có quyền sử dụng</h2><p>Khách có quyền sử dụng sân thượng tầng 2, phòng ăn, bể bơi và các tiện ích công cộng khác tại nơi ở.</p><h2>Trong thời gian ở</h2><p>Liên lạc với bảo vệ tại nơi ở</p>",
                        "createdAt": "2025-05-11T15:29:53.112Z",
                        "updatedAt": "2025-05-11T15:31:41.843Z",
                        "__v": 1
                    },
                    {
                        "_id": "6822149c223e00c7c45b8157",
                        "name": "Khách sạn Năm Châu 7",
                        "slug": "khach-san-nam-chau-7",
                        "status": true,
                        "address": "Hà Nội",
                        "image": "http://res.cloudinary.com/dkhutgvlb/image/upload/v1739795711/xwfbzfrvi09g0h3sxwfs.jpg",
                        "rooms": [],
                        "facilities": [
                            "6814e57927de297ce58c5c62",
                            "680da969de6e63a972e5aa28",
                            "68162763c95e4019d8805bef"
                        ],
                        "introduction": "<h2><strong>Giới thiệu về chỗ ở này</strong></h2><p>Bạn sẽ ở 1 căn nhà tre bungalow đặc biệt được xây dựng theo kiến trúc truyền thống của dân tộc các tỉnh miền núi phía Bắc Việt Nam. Tất cả các phòng được trang bị các vật dụng thiết yếu và thiết kế rộng rãi, thoải mái với đầy đủ máy lạnh (làm mát hoặc sưởi ấm), phòng tắm riêng, nước nóng và đồ vệ sinh cá nhân miễn phí.<br>Bungalow có 1 sân hiên nhỏ kèm theo võng, đệm ngồi và bàn để cùng bạn thức dậy với 1 tách trà, thưởng thức tiếng chim hót cùng bạn bè trong mọi điều kiện thời tiết.</p><h2>Chỗ ở</h2><p>Nhà tre nghỉ dưỡng Dinh Gia Trang nằm tại Yên Bái, một tỉnh miền núi phía Bắc Việt Nam, một nơi thôn quê cách sân bay Hà Nội khoảng 1,5 giờ và không xa để di chuyển tới Hà Giang và Sa Pa. Khu vườn Dinh Gia Trang là nơi trở về cho những ai yêu thiên nhiên, thư giãn và thiền định. Tại đây, bạn có thể trải nghiệm văn hóa địa phương đích thực, ẩm thực cũng như lối sống của người dân vùng núi Bắc Việt Nam.<br>Bạn có thể dễ dàng đến đây bằng xe buýt địa phương từ Hà Nội (khoảng 2,5 giờ), Sa Pa (3 giờ) và Hà Giang (4 giờ). Chúng tôi rất vui lòng hỗ trợ bạn đặt xe buýt hoặc phương tiện di chuyển khác theo nhu cầu của bạn.</p><h2>Tiện nghi khách có quyền sử dụng</h2><p>Chúng tôi chỉ cách bến xe khách ở Yên Bái 2km.và cách trạm thu phí cao tốc 3km.<br>Vui lòng liên hệ với chúng tôi nếu bạn cần bất kỳ sự trợ giúp hoặc gợi ý nào để đến Yên Bái.<br><br>Từ/Đến chặng Yên Bái - Hà Nội có dịch vụ xe buýt hàng giờ.<br>****<br>- Đi bằng xe máy hoặc ô tô cá nhân<br><br>Bạn có thể tìm kiếm trên google map “Dinh Gia Trang homestay” sau đó làm theo hướng dẫn.</p><h2>Những điều cần lưu ý khác</h2><p>Chúng tôi có một số chú mèo dễ thương quanh vườn, vui lòng cân nhắc nếu bạn bị dị ứng hoặc không thích động vật. Ngoài ra, chúng tôi có thể cung cấp dịch vụ giặt ủi và bữa ăn theo yêu cầu.</p>",
                        "createdAt": "2025-05-12T15:32:44.294Z",
                        "updatedAt": "2025-05-12T15:32:44.294Z",
                        "__v": 0
                    }
                ]}
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
                    { key: "price", header: "Giá bán lẻ" },
                    { key: "sales", header: "Doanh số" },
                    { key: "updated", header: "Cập nhật" },
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
                    //                     handleCheckStatus(e, { status: false });
                    //                 }} />
                    //             <button>Sao chép</button>
                    //         </div>
                    //     ),
                    // },
                ]}
            />
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