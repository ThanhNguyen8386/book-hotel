import { AppBar, Chip, Dialog, DialogContent, IconButton, Toolbar, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {
    Wifi,
    LocalParking,
    AcUnit,
    Kitchen,
    Tv,
    CheckCircle,
    AccessTime,
    CalendarMonth,
    AttachMoney,
    Info,
    ZoomIn,
    Collections,
    Room,
} from '@mui/icons-material'
import Image from "next/image";
import dayjs from "dayjs";

const Order_detail = (props: any, ref: any) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        room: {
            image: []
        },
        checkins: "",
        voucher: {
            code: "",
            discount: ""
        },
        checkouts: "",
        statusorder: ""
    });

    useImperativeHandle(ref, () => ({
        updateOrder: (item: any) => {
            setData(item)
            handleOpen();
        }
    }))
    console.log(data);

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const formatCurrency = (currency: number) => {
        const tempCurrency = +currency >= 0 ? currency : 0;
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
    };
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
    const methodPay = (key: string) => {
        if (key == "0") {
            return <div className="">
                <span className="">
                    Thanh toán trực tiếp
                </span>
            </div>
        } else if (key == "1") {
            return <div className="flex items-center justify-between">
                <span className="">Thanh toán trực tuyến</span>
                <span className=" text-red-500">Chưa thanh toán</span>
            </div>
        } else if (key == "2") {
            return <div className="flex items-center justify-between">
                <span className="">Thanh toán trực tuyến</span>
                <span className="">Đã thanh toán</span>
            </div>
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="lg"
        >
            <AppBar sx={{ position: 'sticky', display: 'flex', flex: 'justify-between' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Chi tiết
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                                {data.room && data.room.name}
                            </h1>
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <div className="aspect-video rounded-xl overflow-hidden relative group">
                                            <Image
                                                src={data.room && data.room.image[0]}
                                                alt="Room main view"
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                layout="fill"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                                            <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
                                                <ZoomIn className="h-5 w-5" />
                                                <span>Phóng to</span>
                                            </button>
                                        </div>
                                    </div>
                                    {data.room && data.room.image.slice(1, 3).map((img, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-video rounded-xl overflow-hidden">
                                                <Image
                                                    src={img}
                                                    alt={`Room view ${index + 2}`}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    layout="fill"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200">
                                    <Collections className="h-5 w-5" />
                                    <span className="font-medium">
                                        Xem tất cả ảnh
                                    </span>
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                        Chi tiết phòng
                                    </h2>
                                    <p className="text-gray-600">
                                        {data.room && data.room.description}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                        Tiện ích
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Wifi className="text-blue-500" />
                                            <span>Wifi miễn phí</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <LocalParking className="text-blue-500" />
                                            <span>Bãi đỗ xe</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <AcUnit className="text-blue-500" />
                                            <span>Điều hòa</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Kitchen className="text-blue-500" />
                                            <span>Mini bar</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Tv className="text-blue-500" />
                                            <span>TV</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Thông tin đặt phòng
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <CalendarMonth className="text-blue-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Check In</p>
                                            <p className="font-medium text-gray-800">{dayjs(data && data.checkins).format("HH:mm DD/MM/YYYY")}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <AccessTime className="text-blue-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Check Out</p>
                                            <p className="font-medium text-gray-800">{dayjs(data && data.checkouts).format("HH:mm DD/MM/YYYY")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-4 border-b border-gray-200">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Tạm tính</span>
                                        <span className="font-medium text-gray-800">{formatCurrency(data && data.total)}</span>
                                    </div>
                                    {data && data.voucher && (
                                        <p className="py-[10px] text-[17px] font-medium">
                                            Voucher{" "}
                                            <span className="float-right">
                                                {data && data.voucher.code} (-{formatCurrency(data && data.voucher?.discount)})
                                            </span>
                                        </p>
                                    )}
                                    <div className="flex justify-between text-lg">
                                        <span className="font-medium text-gray-800">Tổng tiền</span>
                                        <span className="float-right">
                                            {formatCurrency(data && (data.total - (data.voucher?.discount || 0)))}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                                        <span className="font-medium">
                                            <Chip
                                                label={data && statuss(data.statusorder).name}
                                                size="small"
                                                color={data && statuss(data.statusorder).color}
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">
                                            Phương thức thanh toán
                                        </p>
                                        <div className="">
                                            <span>
                                                {data && methodPay(data.methodpay)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30">
                                        <Info className="h-4 w-4" />
                                        <span>Đặt lại</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default forwardRef(Order_detail);