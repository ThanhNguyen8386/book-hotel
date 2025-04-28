import React, { useEffect, useState } from 'react'
import BedroomParentTwoToneIcon from '@mui/icons-material/BedroomParentTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import ProfileLayout from '../../../../components/Layout/ProfileLayout';
import { useRouter } from 'next/router';
import { detail, update } from '../../../../api/order';
import { detailCategory } from '../../../../api/category';
import { format } from 'date-fns';
import { formatCurrency, methodPay } from '../../../../contexts/ulti';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Info } from '@mui/icons-material';
import { bangking } from '../../../../api/banking';
import { remove } from '../../../../api/bookedDate';
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import AlertMessage from '../../../../components/AlertMessage';
import Image from 'next/image';

const HotelBookingConfirmation = () => {
    const defaultData = {
        room: {
            image: [],
            name: "",
            description: "",
            slug: ""
        },
        checkins: new Date(),
        voucherCode: {
            code: "",
            discount: 0,
            quantity: 0
        },
        checkouts: new Date(),
        statusorder: 0,
        total: 0,
        methodpay: 0,
        address: "",
        categoryName: "",
        originalPrice: 0,
        discountAmount: 0,
        duration: ""
    }
    const [data, setData] = useState(defaultData);
    const [showAlert, setShowAlert] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const load = async () => {
        const { slug } = router.query;
        await detail(slug).then(async (res: any) => {
            await detailCategory(res.data.room[0].category).then((resCategory: any) => {
                const data = {
                    ...res.data.order,
                    address: resCategory.data.address,
                    categoryName: resCategory.data.name,
                    room: { ...res.data.room[0] },
                }
                setData(data)
            })
        })
    }

    useEffect(() => {
        if (router.isReady) {
            load()
        }
    }, [router.isReady]);

    const onsubmit = async () => {
        const newdata = { ...data, statusorder: 4 };
        // update order
        await update(newdata).then((res: any) => {
            if (res.data?.statusorder == 4 || res.data?.statusorder == 3) {
                remove(res.data?.status).then((res: any) => {
                    load()
                    setShowAlert(true);
                })
            } else {
                // router.push("/profile/order");
            }
        });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const submit = async () => {
        await onsubmit();
        setOpen(false);
    }
    const openDialog = () => {
        setOpen(true);
    }

    return (
        <div className="w-full pl-4 flex flex-col">
            <AlertMessage
                type="success" // hoặc 'error', 'info', 'warning'
                message="Hủy phòng thành công!"
                show={showAlert}
                onClose={() => setShowAlert(false)}
                duration={5000}
            />
            <div className="bg-white rounded-lg pb-4 shadow-sm">
                <div
                    onClick={() => {
                        router.push('/profile/order')
                    }}
                    className="border-b flex items-center cursor-pointer group py-2">
                    <ChevronLeftIcon className="h-6 w-6 text-gray-700 group-hover:translate-x-[-5px] transition-all duration-300" />
                    <h1 className="text-lg font-medium ml-2">Đặt phòng của tôi</h1>
                </div>
                {data.statusorder == 4 && (
                    <div className="flex items-center gap-4 p-4 bg-red-100 rounded-lg">
                        <Image
                            src="https://res.cloudinary.com/djsbi0bma/image/upload/v1745592376/datn/rg6v1l153xfy6ouq7nuy.svg"
                            alt="cancel"
                            className="w-full h-96 object-cover"
                            height={50}
                            width={50}
                        />
                        <div className="">
                            <p className='text-red-600'>Đã hủy</p>
                            <p>Đã hủy đặt phòng vào {format(new Date(data.updatedAt), 'HH:mm, dd/MM/yyyy')}</p>
                        </div>
                    </div>
                )}
                <h2 className="text-lg font-medium my-4">Lựa chọn của bạn</h2>
                <div className="flex gap-4">
                    <Image src={data.room.image[0]}
                        alt="Standard Room"
                        className="object-cover rounded-md"
                        height={100}
                        width={100}
                        objectFit='cover'
                    />

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <BedroomParentTwoToneIcon />
                            <span className="font-medium">{data.room.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <MeetingRoomTwoToneIcon />
                            <span>{data.categoryName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FmdGoodTwoToneIcon />
                            <span>
                                {data.address}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex mt-4 border-t pt-4">
                    <div className="bg-blue-500 text-white p-3 rounded-lg flex flex-col items-center justify-center w-24">
                        <CalendarMonthTwoToneIcon />
                        <span className="text-sm mt-1">{data.duration}</span>
                    </div>
                    <div className="flex-1 flex justify-between">
                        <div className="bg-gray-100 flex-1 mx-2 p-3 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-gray-500 text-sm">Nhận phòng</span>
                            <span className="font-medium">{data.checkins
                                ? format(new Date(data.checkins), "HH:mm") + " • " +
                                format(new Date(data.checkins), 'dd/MM/yyyy')
                                : "--:--"
                            }</span>
                        </div>
                        <div className="flex items-center">•</div>
                        <div className="bg-gray-100 flex-1 mx-2 p-3 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-gray-500 text-sm">Trả phòng</span>
                            <span className="font-medium">{data.checkouts
                                ? format(new Date(data.checkouts), "HH:mm") + " • " +
                                format(new Date(data.checkouts), 'dd/MM/yyyy')
                                : "--:--"
                            }</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Thông tin nhận phòng</h2>
                    <div className="text-blue-500 text-sm">Mã đặt phòng: {data?._id}</div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <div className="text-gray-600">Số điện thoại</div>
                        <div className="font-medium">+84 {data?.phone}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-gray-600">Họ và tên</div>
                        <div className="font-medium">{data?.name}</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Chi tiết thanh toán</h2>
                    <div className="flex items-center text-orange-500">
                        <HomeTwoToneIcon />
                        <span className="ml-1">{methodPay(data?.methodpay.toString())}</span>
                    </div>
                </div>
                <div className="border-b pb-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <CreditCardTwoToneIcon />
                            <span className="ml-2">Tiền phòng</span>
                            <ExpandMoreTwoToneIcon
                                className={`ml-1 cursor-pointer transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        </div>
                        <div>
                            {data.discountAmount > 0 && (
                                <span className="line-through text-red-500 mr-2">{formatCurrency(data?.originalPrice)}</span>
                            )}
                            <span className="font-medium">{formatCurrency(data?.total)}</span>
                        </div>
                    </div>

                    {/* Nội dung mở rộng */}
                    {isOpen && (
                        <div className="mt-3 text-gray-600 pl-7 grid justify-end">
                            <p>Chi tiết giá:</p>
                            <ul className="list-disc ml-4">
                                <li>Giá phòng ({data?.duration}): {formatCurrency(data?.originalPrice)}</li>
                                <li>Giảm giá: {formatCurrency(data?.discountAmount)}</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="pt-3">
                    <div className="flex justify-between items-center">
                        <div className="font-medium">Tổng thanh toán</div>
                        <div className="font-bold">{formatCurrency(data?.total)}</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b">
                    <div className="">
                        <h2 className="text-lg font-medium mb-4">Chính sách hủy phòng</h2>
                        <div className="">
                            <div className="text-gray-700">
                                Hủy miễn phí trước{' '}
                                <span className="font-medium">02:00, 20/04/2025</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="">
                                {data && data.statusorder < 2
                                    ? (<button
                                        className="bg-red-700 text-white py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
                                        onClick={() => {
                                            openDialog()
                                        }}
                                    >
                                        Hủy
                                    </button>)
                                    : ("")
                                }
                            </div>
                            {data && (data.statusorder < 1 && data.methodpay == 1) ? (<button
                                className="bg-green-500 text-white py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
                                onClick={() => {
                                    const { id } = router.query;
                                    bangking({
                                        'id_order': id,
                                        "total": data.total,
                                        "orderDescription": "",
                                        "orderType": "billpayment",
                                        "language": "vn",
                                        "bankCode": ""
                                    }).then((res: any) => { router.push(`${res.redirect}`) })
                                }}
                            >Thanh toán</button>) : ""}
                        </div>
                        {data && data.statusorder > 2 ?
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        router.push(`/booking_detail/${data?.room.slug}`);
                                    }}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30">
                                    <Info className="h-4 w-4" />
                                    <span>Đặt lại</span>
                                </button>
                            </div>
                            : ""}
                    </div>
                </div>
                <div className="flex justify-between pt-4 text-sm">
                    <div>
                        <span className="text-gray-600">Xem thêm </span>
                        <a href="#" className="text-blue-500">
                            Điều khoản và Chính sách
                        </a>
                        <span className="text-gray-600"> Đặt phòng</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Dịch vụ hỗ trợ khách hàng - </span>
                        <a href="#" className="text-blue-500">
                            Liên hệ ngay
                        </a>
                    </div>
                </div>
            </div>
            <Dialog
                onClose={handleClose}
                open={open}
            >
                <DialogTitle id="alert-dialog-title">
                    <p>Bạn sẽ hủy phòng đã đặt</p>
                </DialogTitle>
                <DialogActions>
                    <p className='cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md' onClick={submit}>Đồng ý</p>
                    <p className='cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md' onClick={handleClose}>Hủy</p>
                </DialogActions>
            </Dialog>
        </div>
    )
}

HotelBookingConfirmation.Layout = ProfileLayout
export default HotelBookingConfirmation;

//