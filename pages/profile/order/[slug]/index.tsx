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
import { detail } from '../../../../api/order';
import { detailCategory, getone } from '../../../../api/category';
import { format } from 'date-fns';
import { formatCurrency, methodPay } from '../../../../contexts/ulti';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const HotelBookingConfirmation = () => {
    const defaultData = {
        room: {
            image: [],
            name: "",
            description: "",
            slug: ""
        },
        checkins: new Date(),
        voucher: {
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
    }
    const [data, setData] = useState(defaultData);
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

    return (
        <div className="w-full pl-4 flex flex-col">
            <div className="bg-white rounded-lg pb-4 shadow-sm">
                <div
                    onClick={() => {
                        router.push('/profile/order')
                    }}
                    className="border-b flex items-center cursor-pointer group py-2">
                    <ChevronLeftIcon className="h-6 w-6 text-gray-700 group-hover:translate-x-[-5px] transition-all duration-300" />
                    <h1 className="text-lg font-medium ml-2">Đặt phòng của tôi</h1>
                </div>
                <h2 className="text-4xl pb-[32px] font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Lựa chọn của bạn</h2>
                <div className="flex gap-4">
                    <img
                        src="https://uploadthingy.s3.us-west-1.amazonaws.com/meLe6KsQ3KGxJrHXB5BQiN/image.png"
                        alt="Standard Room"
                        className="w-20 h-20 object-cover rounded-md"
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
                        <span className="ml-1">{methodPay(data?.methodpay)}</span>
                    </div>
                </div>
                <div className="border-b pb-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <CreditCardTwoToneIcon />
                            <span className="ml-2">Tiền phòng</span>
                            <ExpandMoreTwoToneIcon className="ml-1" />
                        </div>
                        <div>
                            <span className="line-through text-gray-500 mr-2">600.000₫</span>
                            <span className="font-medium">480.000₫</span>
                        </div>
                    </div>
                </div>
                <div className="pt-3">
                    <div className="flex justify-between items-center">
                        <div className="font-medium">Tổng thanh toán</div>
                        <div className="font-bold">{formatCurrency(data?.total)}</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-medium mb-4">Chính sách hủy phòng</h2>
                <div className="pb-4 border-b">
                    <div className="text-gray-700">
                        Hủy miễn phí trước{' '}
                        <span className="font-medium">02:00, 20/04/2025</span>
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
        </div>
    )
}

HotelBookingConfirmation.Layout = ProfileLayout
export default HotelBookingConfirmation;

//