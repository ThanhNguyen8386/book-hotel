/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import Menu from '@mui/material/Menu';
import { Avatar } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from 'next/router';
import { USER_ROLE } from '../../constants';
import "toastr/build/toastr.min.css";
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import 'react-date-range/dist/styles.css'; // style mặc định
import 'react-date-range/dist/theme/default.css'; // theme mặc định
import { format } from 'date-fns';
import { useLayout } from '../../contexts/LayoutContext';
import DateTimesPicker from '../DateTimesPicker';
import DateRangPicker from '../DateRangPicker';
import CustomCalendar from '../DatePicker';

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
                            <div className="relative flex justify-between items-center rounded-full border px-4 py-2 gap-4 shadow-sm bg-white">
                                {/* === Kiểu thuê === */}
                                <div className="flex items-center gap-6 rounded-full border-r pr-4">
                                    {[
                                        { label: 'Theo giờ', value: 0, icon: <HourglassFullTwoToneIcon /> },
                                        { label: 'Qua đêm', value: 1, icon: <DarkModeTwoToneIcon /> },
                                        { label: 'Theo ngày', value: 2, icon: <CalendarMonthTwoToneIcon /> },
                                    ].map(({ label, value, icon }) => {
                                        const isActive = selectedType === value;
                                        return (
                                            <div
                                                key={value}
                                                onClick={() => setSelectedType(value)}
                                                className={`
                                                    flex flex-col items-center cursor-pointer px-3 py-1.5 rounded-full
                                                    transition-all duration-200 ease-in-out
                                                    ${isActive
                                                        ? 'text-orange-600 bg-orange-50 shadow-inner'
                                                        : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}
                                                        `}
                                            >
                                                <div className="text-lg">{icon}</div>
                                                <span className="text-xs font-medium">{label}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* === Địa điểm === */}
                                <div className="text-sm flex-1 font-semibold text-gray-400 border-r pr-4 max-w-[20%]">
                                    <div>Địa điểm</div>
                                    <div className="text-gray-600 whitespace-nowrap truncate">
                                        <p className='text-xl truncate'>{roomName}</p>
                                    </div>
                                </div>

                                {/* === Nhận và trả phòng === */}
                                <div
                                    className="date-fields flex flex-1 justify-evenly items-center border-r pr-4 cursor-pointer"
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
                                                <p className='text-xl'>{format(inputValue[0].startDate, "HH:mm, dd/MM/yyyy")}</p>
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
                                                <p className='text-xl'>{format(inputValue[0].endDate, "HH:mm, dd/MM/yyyy")}</p>
                                            </div>
                                        ) : (
                                            <div className="outline-none text-black">--/--/----</div>
                                        )}
                                    </div>
                                </div>

                                {/* === Button === */}
                                <button
                                    onClick={() => { handleUpdateBooking() }}
                                    className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition">
                                    Cập nhật
                                </button>

                                {/* === Date Range Picker Popup === */}
                                {(isMounted && showDatePicker) ?
                                    <div className="date-picker-container absolute top-16 right-12 z-50 mt-2">
                                        {selectedType == 0 ? <DateTimesPicker /> : selectedType == 1 ? <CustomCalendar /> : <DateRangPicker />}
                                    </div>
                                    : ""}
                            </div>
                        )
                    }
                </div>

                <div className=''>
                    {
                        status && user !== null ?
                            <Avatar
                                alt="Remy Sharp"
                                src={user.avatar}
                                aria-controls={open ? 'ava-control' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                className='ml-2'
                            />
                            : (
                                <div className='flex items-center ml-4'>
                                    <button
                                        onClick={() => { router.push("/signin") }}
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Đăng nhập
                                    </button>
                                    <button
                                        onClick={() => { router.push("/signup") }}
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Đăng kí
                                    </button>
                                </div>
                            )
                    }

                    {
                        user && status && (
                            <Menu
                                className='mt-[20px] rounded-xl'
                                id="ava-control"
                                anchorEl={anchorEl}
                                open={open1}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>Đặt phòng của tôi
                                        </span>
                                    </Link>
                                </MenuItem>
                                <MenuItem className='w-[240px]'>
                                    <Link href={'/profile/room_like'} >
                                        <span className='w-[100%] font-semibold flex flex-row'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
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
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default HeaderBookingDetail