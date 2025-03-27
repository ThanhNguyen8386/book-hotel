import { Dialog } from "@mui/material"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import CommentItem from "../../../components/CommentItem";
import { differenceInSeconds, format } from 'date-fns';
import Image from "next/image";
import dayjs from "dayjs";
import { creat } from "../../../api/bookedDate";
import { creatOrder } from "../../../api/order";

const Checkout = (props: any, ref: any) => {
    const { comments, removeComment, currentUser, isLogged, dataDate } = props;

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setdatebook(defaultDateBook);
        setdataorder(defaultOrder)
    };
    const refMode = useRef(null);

    const defaultDateBook = {
        room: "",
        dateFrom: "",
        dateTo: "",
    }
    const defaultOrder = {
        checkins: "",
        checkouts: "",
        user: '',
        room: "",
        statusorder: "0",
        total: "",
        status: "",
        // voucher: "",
        methodpay: "0",
        email: "",
        name: "",
        phone: ""
    }
    const [datebook, setdatebook] = useState(defaultDateBook);
    const [dataorder, setdataorder] = useState(defaultOrder);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const startDate = new Date(dataDate[0].startDate);
    const endDate = new Date(dataDate[0].endDate);
    const diffInSeconds = differenceInSeconds(endDate, startDate) / 60 / 60 / 24;

    useImperativeHandle(ref, () => ({
        checkout: (item: any, type: any) => {
            refMode.current = type;
            handleClickOpen();
            const dateFrom = dayjs(dataDate[0].startDate).hour(14).minute(0).second(0).millisecond(0).toISOString();
            const dateTo = dayjs(dataDate[0].endDate).hour(12).minute(0).second(0).millisecond(0).toISOString();
            const _dataOrder = {
                ...dataorder,
                room: item._id,
                roomName: item.name,
                address: item.address,
                image: item.image,
                user: currentUser._id,
                email: currentUser.email,
                name: currentUser.name,
                phone: currentUser.phone,
                checkins: dateFrom,
                checkouts: dateTo,
                total: item.total
            }
            const _dataDate = {
                room: item._id,
                checkins: dateFrom,
                checkouts: dateTo,
            }
            setdatebook(_dataDate);
            setdataorder(_dataOrder);
        },
        comment: (item: any, type: any) => {

        }
    }))

    const submit = async () => {
        const _dataDate = { ...datebook };
        const _dataOrder = { ...dataorder };

        await creat(_dataDate)
            .then(async(res) => {
                const newdataOrder = {
                    ..._dataOrder,
                    status: res.data._id
                }
                await creatOrder(newdataOrder)
            })
            .catch((res) => {
                console.log(res);

            })

    }

    const formatCurrency = (currency: number) => {
        const tempCurrency = +currency >= 0 ? currency : 0;
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
      };

    const formCheckout = () => {
        return (
            <div className="max-w-6xl mx-auto bg-white">
                {/* Header */}
                <div
                    onClick={() => handleClose()}
                    className="p-4 border-b flex items-center cursor-pointer">
                    <CloseTwoToneIcon className="h-6 w-6 text-gray-700" />
                    <h1 className="text-lg font-medium ml-2">Xác nhận & Thanh toán</h1>
                </div>
                <div className="flex flex-col md:flex-row">
                    {/* Left Column */}
                    <div className="md:w-1/2 border-r">
                        {/* Booking Summary */}
                        <div className="p-6 border-b">
                            <h2 className="text-base font-medium mb-4">Lựa chọn của bạn</h2>
                            <div className="flex">
                                <div className="">
                                    {
                                        dataorder.image && (
                                            <Image
                                                src={dataorder.image[0]}
                                                alt="Royal Hotel Room"
                                                className="rounded-md"
                                                width={100}
                                                height={100}
                                            />
                                        )
                                    }
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
                                        <span className="text-sm text-gray-600">
                                            {dataorder.address}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Check-in/Check-out */}
                            <div className="mt-6 bg-orange-100 rounded-lg p-4 flex">
                                <div className="w-20 h-20 bg-orange-400 rounded-lg flex flex-col items-center justify-center text-white mr-4">
                                    <svg
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                            stroke="white"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M12 7V12L15 15"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span className="text-sm mt-1">{diffInSeconds} ngày</span>
                                </div>
                                <div>
                                    <div className="text-base text-gray-700">Nhận phòng</div>
                                    <div className="text-base font-medium">14:00 • {format(dataDate[0].startDate, 'dd/MM/yyyy')}</div>
                                    <div className="text-base text-gray-700 mt-2">Trả phòng</div>
                                    <div className="text-base font-medium">12:00 • {format(dataDate[0].endDate, 'dd/MM/yyyy')}</div>
                                </div>
                            </div>
                        </div>
                        {/* Guest Information */}
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
                                    {/* <ModeTwoToneIcon className="h-5 w-5 text-orange-500 ml-2" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="md:w-1/2">
                        {/* Payment Details */}
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
                                    <span className="text-base">Tiền phòng</span>
                                    <InfoTwoToneIcon className="h-5 w-5 text-orange-500 ml-1" />
                                </div>
                                <div className="text-base">{formatCurrency(dataorder.total)}</div>
                            </div>
                            <div className="flex justify-between items-center font-medium text-lg border-t pt-4">
                                <div>Tổng thanh toán</div>
                                <div>{formatCurrency(dataorder.total)}</div>
                            </div>
                        </div>
                        {/* Payment Methods */}
                        <div className="p-6 border-b">
                            <h2 className="text-base font-medium mb-4">
                                Chọn phương thức thanh toán
                            </h2>
                            {/* Payment options with larger touch targets */}
                            <div className="space-y-4">
                                {/* MoMo */}
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
                                {/* ZaloPay */}
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
                                {/* Pay at Hotel */}
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
                        {/* Promotions */}
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-base font-medium">Ưu đãi</h2>
                                <div className="flex items-center text-orange-500">
                                    <span>Chọn ưu đãi</span>
                                    <ChevronRightTwoToneIcon className="h-5 w-5 ml-1" />
                                </div>
                            </div>
                        </div>
                        {/* Bottom Actions */}
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
            </div>
        )
    }

    const formComment = () => {
        return (
            <div className="px-6 py-4">
                <button className="block ml-auto" onClick={() => handleClose()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-6 h-6">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                </button>

                <div className="font-bold flex items-end">
                    <h2 className="text-[35px]">Đánh giá</h2>
                    <div className="text-lg pb-1.5">
                        &ensp;•&ensp;
                        {comments?.length} Đánh giá
                    </div>
                </div>

                {/* list comment */}
                <div className="grid grid-cols-3 gap-5 my-3">
                    {comments?.map((cmt: any) => {
                        return (
                            <CommentItem
                                key={cmt._id}
                                comment={cmt as any}
                                isLogged={isLogged}
                                currentUser={currentUser}
                                onRemoveCmt={removeComment}
                            />
                        );
                    })}
                </div>
            </div>
        )
    }

    return (
        <>
            <Dialog
                maxWidth="md"
                fullWidth
                open={open}
                onClose={handleClose}
            >
                {
                    refMode.current == "CHECKOUT" ? formCheckout() : formComment()
                }
            </Dialog>
        </>
    )
}

export default forwardRef(Checkout)