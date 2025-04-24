/* eslint-disable react-hooks/exhaustive-deps */
import { Chip } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ProfileLayout from '../../../components/Layout/ProfileLayout'
import dayjs from 'dayjs'
import Order_detail from './Order_detail'
import useSWR from 'swr'
import { API_URL, TYPE_BOOKING } from '../../../constants'
import { fetcher } from '../../../api/instance'
import { Hotel, WatchLater, LocationOn } from '@mui/icons-material';
import Image from 'next/image'
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { format } from 'date-fns'

type Props = {}

const Orderlisst = (props: Props) => {
    const [user, setUser] = useState<any>({})
    const [rows, setRows] = React.useState<any>([{ _id: 1, name: null }]);
    const [status, setStatus] = useState(false)
    const refDetail = React.useRef<any>();
    const router = useRouter();
    // const { data, mutate } = useSWR(`${API_URL}/orders/${user?._id}`, fetcher);
    const { data, mutate } = useSWR(
        user?._id ? `${API_URL}/orders/${user._id}` : null,
        fetcher
    );
    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem('user') as string)
        if (getUser == 0 || getUser == null) {
            router.push('/')
            setStatus(false)
        } else {
            setStatus(true)
        }
        setUser(getUser)
    }, [])

    useEffect(() => {
        setRows(data)
        mutate()
    }, [data])

    const actionCrud = {
        updateOrder: (item: any, type: any) => {
            refDetail.current.updateOrder(item, type)
        }
    }

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

    const formatCurrency = (currency: number) => {
        const tempCurrency = +currency >= 0 ? currency : 0;
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
    };
    return (
        <div className="w-full pl-4">
            <div className="">
                <div className="">
                    <div>
                        <h2 className="text-4xl pb-[32px] font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Phòng Đặt của tôi
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Quản lý tất cả các đặt phòng của bạn
                        </p>
                    </div>
                </div>
            </div>
            <Order_detail ref={refDetail} />
            <div className="overflow-auto pr-2 space-y-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                {
                    rows && rows?.map((item: any, index: any) => {
                        return (
                            <div key={index} className="border rounded-xl p-4 space-y-3 my-4">
                                {/* Mã đặt phòng */}
                                <div className="flex justify-between items-center text-sm">
                                    <span>
                                        Mã đặt phòng: <span className="text-blue-600 font-semibold">{item._id}</span>
                                    </span>
                                    <Chip
                                        label={statuss(item?.statusorder).name}
                                        size="small"
                                        color={statuss(item?.statusorder).color}
                                    />
                                </div>

                                {/* Nội dung chính */}
                                <div className="bg-gray-50 rounded-lg p-3 flex gap-3 items-start">
                                    <Image
                                        src={item.room && item?.room.image[0]}
                                        alt="Phòng"
                                        width={100}
                                        height={80}
                                        className="rounded-md object-cover"
                                    />

                                    <div className="flex-1 space-y-1 text-sm">
                                        <div className="flex items-center gap-1 text-purple-600">
                                            {[
                                                { label: 'Theo giờ', value: TYPE_BOOKING.hourly, icon: <HourglassFullTwoToneIcon fontSize="small" /> },
                                                { label: 'Qua đêm', value: TYPE_BOOKING.overNight, icon: <DarkModeTwoToneIcon fontSize="small" /> },
                                                { label: 'Theo ngày', value: TYPE_BOOKING.daily, icon: <CalendarMonthTwoToneIcon fontSize="small" /> },
                                            ].map(({ label, value, icon }) => {
                                                if (item.bookingType == value) return (
                                                    <span key={value}>
                                                        {icon}
                                                        <span className="font-medium">{label}</span>
                                                    </span>
                                                )

                                            })}
                                            <span className="mx-1 text-gray-400">|</span>
                                            <span>
                                                {/* {dayjs(item?.checkins).format("HH:mm DD/MM/YYYY")} - {dayjs(item?.checkouts).format("HH:mm DD/MM/YYYY")} */}
                                                {item.checkins
                                                    ? format(new Date(item.checkins), 'HH:mm,dd/MM/yyyy')
                                                    : "--:--"
                                                }
                                                {
                                                    " - "
                                                }
                                                {item.checkouts
                                                    ? format(new Date(item.checkouts), 'HH:mm,dd/MM/yyyy')
                                                    : "--:--"
                                                }
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Hotel fontSize="small" />
                                            <span>{item.room && item?.room?.name}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-700">
                                            <LocationOn fontSize="small" />
                                            <span>{item && item?.address || "Address"}</span>
                                        </div>
                                    </div>

                                    {/* Giá + Chi tiết */}
                                    <div className="text-right text-sm min-w-[100px]">
                                        <p className="font-semibold text-lg">{formatCurrency(item?.total)}</p>
                                        <p className="flex items-center justify-end gap-1 text-orange-600">
                                            <LocationOn fontSize="small" className="text-orange-600" />
                                            {methodPay(item?.methodpay)}
                                        </p>
                                        <Chip
                                            className='pl-2'
                                            clickable
                                            label="Chi tiết"
                                            size="small"
                                            variant="outlined"
                                            onClick={() => {
                                                // actionCrud.updateOrder(item, "UPDATE")
                                                router.push({
                                                    pathname: `/profile/order/${item._id}`
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Thời gian huỷ */}
                                <p className="text-xs text-gray-600">
                                    {item.statusorder == 4 && (
                                        <p>
                                            Đã huỷ đặt phòng vào <span className="text-black font-semibold">
                                                {format(new Date(item.updatedAt), 'HH:mm,dd/MM/yyyy')}
                                            </span>
                                        </p>
                                    )}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

Orderlisst.Layout = ProfileLayout;
export default Orderlisst