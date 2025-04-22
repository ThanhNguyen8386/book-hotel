import { forwardRef, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import Image from "next/image";
import { creat } from "../../api/bookedDate";
import { calculateBooking, creatOrder } from "../../api/order";
import { format } from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from "next/router";
import { Card, Dialog, Slide } from "@mui/material";
import { getAvailableVouchers } from "../../api/voucher2";
import { RadioButtonUnchecked } from "@mui/icons-material";

const CheckOut = () => {
    const defaultDateBook = {
        room: "",
        dateFrom: "",
        dateTo: "",
    };
    const defaultOrder = {
        checkins: "",
        checkouts: "",
        user: '',
        room: "",
        statusorder: "0",
        total: "",
        status: "",
        methodpay: "0",
        email: "",
        name: "",
        phone: "",
        roomName: "",
        address: "",
        image: [],
        bookingType: "",
        pricePerUnit: 0,
        originalPrice: 0,
        discountAmount: 0,
        duration: "",
    };
    const router = useRouter();
    const [isMount, setIsMount] = useState(false);
    const [datebook, setdatebook] = useState(defaultDateBook);
    const [dataorder, setdataorder] = useState(defaultOrder);
    const [dataVoucher, setdataVoucher] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsMount(true);
    }, []);

    useEffect(() => {
        if (open) {
            const load = async () => {
                await getAvailableVouchers({ roomId: dataorder.room, checkIn: datebook.dateFrom, checkOut: datebook.dateTo })
                    .then((res: any) => {
                        setdataVoucher(res.data);
                    })
            }
            load()
        }
    }, [open]);

    useEffect(() => {
        if (isMount) {
            const raw = localStorage.getItem('dataOrder');
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (raw) {
                const orderData = JSON.parse(raw);
                const dateFrom = new Date(orderData.inputValue.startDate);
                const dateTo = new Date(orderData.inputValue.endDate);
                // Gọi API calculate
                const fetchCalculation = async () => {
                    try {
                        const response = await calculateBooking({
                            bookingType: orderData.type,
                            checkIn: dateFrom.toISOString(),
                            checkOut: dateTo.toISOString(),
                            roomId: orderData.item._id,
                            voucher: "10", // Giả sử voucher mặc định 10%, có thể thay đổi
                        })
                        const { room, bookingDetails } = response.data;
                        setdataorder({
                            ...dataorder,
                            room: orderData.item._id,
                            roomName: room.name,
                            address: room.address,
                            image: room.image ? [room.image] : orderData.item.image,
                            user: currentUser._id,
                            email: currentUser.email,
                            name: currentUser.name,
                            phone: currentUser.phone,
                            checkins: dateFrom.toISOString(),
                            checkouts: dateTo.toISOString(),
                            total: bookingDetails.totalPrice,
                            bookingType: room.bookingType,
                            pricePerUnit: room.pricePerUnit,
                            originalPrice: bookingDetails.originalPrice,
                            discountAmount: bookingDetails.discountAmount,
                            duration: bookingDetails.duration,
                        });
                        setdatebook({
                            room: orderData.item._id,
                            dateFrom: dateFrom.toISOString(),
                            dateTo: dateTo.toISOString(),
                        });
                    } catch (error) {
                        console.error('Error fetching calculation:', error);
                    }
                };
                fetchCalculation();
                setUser(currentUser);
                localStorage.removeItem('dataOrder');
            }
            else {
                // router.back();
            }
        }
    }, [isMount]);

    const submit = async () => {
        const _dataDate = { ...datebook };
        const _dataOrder = { ...dataorder };
        await creat(_dataDate)
            .then(async (res) => {
                const newdataOrder = {
                    ..._dataOrder,
                    status: res.data._id,
                };
                await creatOrder(newdataOrder).then((res) => {
                    router.push('/checkout/booking-status/' + res.data._id);
                });
            })
            .catch((res) => {
                console.log(res);
            });
    };

    const formatCurrency = (currency: number) => {
        const tempCurrency = +currency >= 0 ? currency : 0;
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setdataVoucher([]);
    };

    return isMount && (
        <div className="w-[70%] mx-auto bg-white">
            <div
                onClick={() => {
                    router.back()
                }}
                className="p-4 border-b flex items-center cursor-pointer group">
                <ChevronLeftIcon className="h-6 w-6 text-gray-700 group-hover:translate-x-[-5px] transition-all duration-300" />
                <h1 className="text-lg font-medium ml-2">Xác nhận & Thanh toán</h1>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 border-r">
                    <div className="p-6 border-b">
                        <h2 className="text-base font-medium mb-4">Lựa chọn của bạn</h2>
                        <div className="flex">
                            <div>
                                {dataorder.image && (
                                    <Image
                                        src={dataorder.image[0]}
                                        alt={dataorder.roomName}
                                        className="rounded-md"
                                        width={100}
                                        height={100}
                                    />
                                )}
                            </div>
                            <div className="ml-4">
                                <div className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 21V5C19 3.9 18.1 3 17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21Z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span className="text-base font-medium">{dataorder.roomName}</span>
                                </div>
                                <div className="flex items-start mt-2">
                                    <svg
                                        className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-600">{dataorder.address}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-orange-100 rounded-lg p-4 flex">
                            <div className="w-20 h-20 bg-orange-400 rounded-lg flex flex-col items-center justify-center text-white mr-4">
                                <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                                    <path
                                        d="M12 7V12L15 15"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="text-sm mt-1">{dataorder.duration}</span>
                            </div>
                            <div>
                                <div className="text-base text-gray-700">Nhận phòng</div>
                                <div className="text-base font-medium">
                                    {dataorder.checkins
                                        ? format(new Date(dataorder.checkins), "HH:mm") + " • " +
                                        format(new Date(dataorder.checkins), 'dd/MM/yyyy')
                                        : "--:--"
                                    }
                                </div>
                                <div className="text-base text-gray-700 mt-2">Trả phòng</div>
                                <div className="text-base font-medium">
                                    {dataorder.checkouts
                                        ? format(new Date(dataorder.checkouts), "HH:mm") + " • " +
                                        format(new Date(dataorder.checkouts), 'dd/MM/yyyy')
                                        : "--:--"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-b">
                        <h2 className="text-base font-medium mb-4">Người đặt phòng</h2>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-base text-gray-700">Số điện thoại</div>
                            <div className="text-base">{dataorder.phone}</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-base text-gray-700">Họ tên</div>
                            <div className="flex items-center">
                                <span className="text-base">{dataorder.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="p-6 border-b">
                        <h2 className="text-base font-medium mb-4">Chi tiết thanh toán</h2>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <svg
                                    className="w-6 h-6 mr-2"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="2"
                                        y="4"
                                        width="20"
                                        height="16"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <span className="text-base">Tiền phòng ({dataorder.bookingType})</span>
                                <InfoTwoToneIcon className="h-5 w-5 text-orange-500 ml-1" />
                            </div>
                            <div className="text-base">{formatCurrency(dataorder.originalPrice)}</div>
                        </div>
                        {dataorder.discountAmount > 0 && (
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <span className="text-base">Giảm giá (Voucher)</span>
                                </div>
                                <div className="text-base">-{formatCurrency(dataorder.discountAmount)}</div>
                            </div>
                        )}
                        <div className="flex justify-between items-center font-medium text-lg border-t pt-4">
                            <div>Tổng thanh toán</div>
                            <div>{formatCurrency(dataorder.total)}</div>
                        </div>
                    </div>
                    <div className="p-6 border-b">
                        <h2 className="text-base font-medium mb-4">Chọn phương thức thanh toán</h2>
                        <div className="space-y-4">
                            <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-4">
                                    <div className="w-3 h-3 rounded-full"></div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center mr-3">
                                        <span className="text-white text-sm">M</span>
                                    </div>
                                    <span className="text-base">Ví MoMo</span>
                                </div>
                            </div>
                            <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-4">
                                    <div className="w-3 h-3 rounded-full"></div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-3">
                                        <span className="text-white text-sm">Z</span>
                                    </div>
                                    <span className="text-base">Ví ZaloPay</span>
                                </div>
                            </div>
                            <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-4">
                                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-base">Trả tại khách sạn</span>
                                </div>
                            </div>
                        </div>
                        <div className="ml-10 mt-3 text-sm text-gray-500 flex items-start">
                            <InfoTwoToneIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                            <span>Khách sạn có thể hủy phòng tùy theo tình trạng phòng</span>
                        </div>
                    </div>
                    <div className="p-6 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-medium">Ưu đãi</h2>
                            <div
                                onClick={handleClickOpen}
                                className="flex items-center text-orange-500 cursor-pointer">
                                <span>Chọn ưu đãi</span>
                                <ChevronRightTwoToneIcon className="h-5 w-5 ml-1" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex justify-between items-center">
                        <div className="text-base text-gray-700">
                            <a href="#" className="text-gray-700 underline">
                                Chính sách hủy phòng
                            </a>
                        </div>
                        <button onClick={submit} className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium text-base">
                            Đặt phòng
                        </button>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                aria-describedby="alert-dialog-slide-description"
            >
                <div className="px-4 py-8">
                    <div className="flex justify-between items-center mb-4">
                        <div className="ml-2">
                            <h1 className="text-2xl font-semibold ">Chọn ưu đãi</h1>
                        </div>
                        <div
                            onClick={() => handleClose}
                            className="flex items-center cursor-pointer group">
                            <CloseTwoToneIcon className="h-6 w-6 text-gray-700 group-hover:scale-125 transition-all duration-300" />
                        </div>
                    </div>
                    {dataVoucher && dataVoucher.length > 0 ? dataVoucher.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col items-center px-4 bg-white rounded-lg shadow-[0_10px_20px_rgba(153,_153,_153,_0.5)] md:flex-row md:max-w-xl">
                            <Image
                                className="object-cover rounded-xl"
                                src={item.image}
                                alt=""
                                width={200}
                                height={200}
                                priority
                            />
                            <div className="flex flex-col justify-between px-4 leading-normal">
                                <h5 className="mb-2 text-xl font-semibold tracking-tight">{item.name}</h5>
                                <p className="mb-3 font-normal"></p>
                            </div>

                        </div>
                    ))
                        : ""}
                </div>
            </Dialog >
        </div >
    );
};

CheckOut.Layout = SiteLayout;
export default CheckOut;