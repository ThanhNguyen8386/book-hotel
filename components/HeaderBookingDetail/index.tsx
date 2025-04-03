/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Avatar } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from 'next/router';
import { USER_ROLE } from '../../constants';
import dayjs, { Dayjs } from 'dayjs';
import "toastr/build/toastr.min.css";
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // style mặc định
import 'react-date-range/dist/theme/default.css'; // theme mặc định
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useLayout } from '../../contexts/LayoutContext';

type Props = {}

const HeaderBookingDetail = (props: Props) => {
    const {
        inputValue,
        handleInputChange,
        updateBooking,
        selectedType,
        setSelectedType,
        roomName
    } = useLayout();
    
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])

    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const open2 = Boolean(anchorEl2);

    const router = useRouter()
    const query = router.asPath
    const [status, setStatus] = useState(false)
    const [user, setUser] = useState<any>({})
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem('user') as string)
        if (getUser == 0 || getUser == null) {
            setStatus(false)
        } else {
            setStatus(true)
        }
        setUser(getUser)
    }, [])

    const [open, setOpen] = useState(true)
    useEffect(() => {
        if (query === "/") {
            setShowSearch(false)
        }
        else {
            setShowSearch(true)
        }
    }, [query])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open1 = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (!showDatePicker) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.date-picker-container') && !target.closest('.date-fields')) {
                setShowDatePicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDatePicker]);

    const handleApplyDates = () => {
        setShowDatePicker(false);
    };

    const handleUpdateBooking = () => {
        if (updateBooking) {
            updateBooking(); // Gọi API từ BookingDetail
        } else {
            console.error("🚨 Không tìm thấy hàm gọi API!");
        }
    };
        
    return (
        <header className='sticky w-[90%] border-b mx-auto top-0 z-[90] bg-[#fff]'>
            <div className="flex justify-between items-center py-2 mb:flex mbs:block ">
                <Link href="/" >
                    <img className='w-[100px] cursor-pointer' src="https://res.cloudinary.com/fptpolytechnic/image/upload/v1673543047/samples/325042297_711092773955485_5422088835829082377_n_ejizf3.png" alt="" />
                </Link>

                {/* tab select */}
                <div className="flex-1">
                    {
                        isMounted && (
                            <div className="relative flex items-center rounded-full border px-4 py-2 gap-4 shadow-sm bg-white">
                                {/* === Kiểu thuê === */}
                                <div className="flex items-center gap-6 rounded-full border-r pr-4">
                                    {[
                                        { label: 'Theo giờ', value: 0, icon: <HourglassFullTwoToneIcon /> },
                                        { label: 'Qua đêm', value: 1, icon: <DarkModeTwoToneIcon /> },
                                        { label: 'Theo ngày', value: 2, icon: <CalendarMonthTwoToneIcon /> },
                                    ].map(({ label, value, icon }) => (
                                        <div
                                            key={value}
                                            onClick={() => setSelectedType(value as any)}
                                            className={`flex flex-col items-center cursor-pointer text-sm font-semibold transition ${selectedType == value ? 'text-orange-500' : 'text-black'
                                                }`}
                                        >
                                            <div className="text-lg">{icon}</div>
                                            <span>{label}</span>
                                            {selectedType == value && <div className="w-4 h-[2px] bg-orange-500 rounded-full mt-1" />}
                                        </div>
                                    ))}
                                </div>

                                {/* === Địa điểm === */}
                                <div className="text-sm font-semibold text-gray-400 border-r pr-4">
                                    <div>Địa điểm</div>
                                    <div className="text-gray-600 whitespace-nowrap truncate w-40">
                                        <p className='text-xl truncate'>{roomName}</p>
                                    </div>
                                </div>

                                {/* === Nhận và trả phòng === */}
                                <div
                                    className="date-fields flex-1 flex justify-evenly items-center border-r pr-4 cursor-pointer"
                                    onClick={() => setShowDatePicker(true)}
                                >
                                    {/* Nhận phòng */}
                                    <div className="text-sm font-semibold">
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <LoginTwoToneIcon fontSize="small" />
                                            <span>Nhận phòng</span>
                                        </div>
                                        {isMounted ? (
                                            <div className="text-gray-700">
                                                <p className='text-xl'>{format(inputValue[0].startDate, 'dd/MM/yyyy')}</p>
                                            </div>
                                        ) : (
                                            <div className="outline-none text-black">--/--/----</div>
                                        )}
                                    </div>

                                    <div className="border-l h-8 mx-3"></div>

                                    {/* Trả phòng */}
                                    <div className="text-sm font-semibold">
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <LogoutTwoToneIcon fontSize="small" />
                                            <span>Trả phòng</span>
                                        </div>
                                        {isMounted ? (
                                            <div className="text-gray-700">
                                                <p className='text-xl'>{format(inputValue[0].endDate, 'dd/MM/yyyy')}</p>
                                            </div>
                                        ) : (
                                            <div className="outline-none text-black">--/--/----</div>
                                        )}
                                    </div>
                                </div>

                                {/* === Button === */}
                                <button
                                    onClick={() => { handleUpdateBooking() }}
                                    className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition ml-auto">
                                    Cập nhật
                                </button>

                                {/* === Date Range Picker Popup === */}
                                {isMounted && showDatePicker && (
                                    <div className="date-picker-container absolute top-16 right-12 z-50 mt-2">
                                        <div className="bg-white shadow-xl rounded-lg p-4 border">
                                            <DateRange
                                                ranges={inputValue}
                                                onChange={(item: any) => handleInputChange([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                months={2}
                                                direction="horizontal"
                                                minDate={new Date()}
                                                locale={vi}
                                                rangeColors={["#f97316"]}
                                                color="#f97316"
                                            />
                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={handleApplyDates}
                                                    className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                                                >
                                                    Áp dụng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>

                <div className="">
                    <div className='px-4 py-2 border-[1px] ml-[10px] border-black rounded-full text-[#777]'>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-[black] mr-2 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-[black] w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </Button>
                        <div className=''>
                            {
                                status ? (
                                    <Menu
                                        className='mt-[25px] left-[-125px]'
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open1}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <Link href={`${user.role === USER_ROLE ? '/profile' : '/admin'}`}>
                                            <MenuItem>
                                                <div className='contents'>
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        sx={{ width: 56, height: 56 }}
                                                        src={user.avatar || "https://go2joy.vn/images/icons/user-placeholder.svg"} />

                                                </div>
                                                <div className="flex-col pl-3 w-[100%] items-start">
                                                    <p>+{user.phone}</p>
                                                    <p className='text-left'>xem hồ sơ</p>
                                                </div>
                                            </MenuItem>
                                        </Link>
                                        <hr className="my-[10px]" />
                                        <MenuItem className='w-[240px]'>
                                            <Link href={'/profile/order'}  >
                                                <span className='w-[100%] flex flex-row font-semibold'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>Đặt phòng của tôi
                                                </span>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className='w-[240px]'>
                                            <Link href={'/profile/room_like'} >
                                                <span className='w-[100%] font-semibold flex flex-row'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                    </svg>
                                                    Danh sách yêu thích</span>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className='w-[240px]'>
                                            <Link href={'/'}  >
                                                <span className='w-[100%] flex flex-row block font-semibold'
                                                    onClick={() => {
                                                        setStatus(false)
                                                        localStorage.removeItem('user')
                                                    }}>
                                                    Đăng xuất
                                                </span>
                                            </Link>
                                        </MenuItem>
                                    </Menu>

                                ) : (
                                    <Menu
                                        className='mt-[5px] left-[-150px]   '
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open1}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem className='w-[240px]' onClick={handleClose}><Link href={'/signup'}  ><a className='w-[100%] block'>Đăng ký</a></Link></MenuItem>
                                        <MenuItem className='w-[240px]' onClick={handleClose}><Link href={'/signin'}  ><a className='w-[100%] block'>Đăng nhâp</a></Link></MenuItem>
                                    </Menu>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderBookingDetail