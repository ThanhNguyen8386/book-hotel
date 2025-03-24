/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { DateRangePicker, DateRangeDelimiter, LocalizationProvider, DateTimePicker } from "@material-ui/pickers";
import { Avatar, InputAdornment } from "@mui/material";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useRouter } from 'next/router';
import { USER_ROLE } from '../../constants';
import dayjs, { Dayjs } from 'dayjs';
import TextField from "@material-ui/core/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LogoutIcon from "@mui/icons-material/Logout";
// import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import LoginIcon from "@mui/icons-material/Login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { useRoom } from '../../contexts/RoomContext';
import BookingFilter from './tabSelec';

type Props = {}

const HeaderBookingDetail = (props: Props) => {
    const { roomName } = useRoom();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])
    const defaultSelectedDate = useMemo(() => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

        return [dayjs(currentDate.toISOString()), dayjs(futureDate.toISOString())];
    }, []);

    const [selectedDate, setSelectedDate] = useState<any>(defaultSelectedDate);

    // thời gian nhận phòng - form tìm kiếm theo giờ
    const [dateTimeStart, setDateTimeStart] = useState<Dayjs | null>(() => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 6, 30);

        return dayjs(futureDate.toISOString());
    });

    // thời gian trả phòng - form tìm kiếm theo giờ
    const [hours, setHours] = useState<number>(2);
    const [selection, setSelection] = useState<number>(1);

    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const open2 = Boolean(anchorEl2);
    const handleClick2 = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

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

    const [visible, setVisible] = useState(false);
    const [indexTab, setIndexTab] = useState(1);
    const [open, setOpen] = useState(true)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 150) {
            setVisible(true)
            setOpen(true)
        }
        else if (scrolled <= 150) {
            setVisible(false)
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", toggleVisible)
    }, [])
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

    const DateRangerPicker = () => {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs as any}>
                <DateRangePicker
                    startText="Nhận phòng"
                    inputFormat="dd/MM/YYY"
                    endText="Trả phòng"
                    value={selectedDate}
                    disablePast
                    onChange={(date: any) => setSelectedDate(date)}
                    renderInput={(startProps, endProps) => (
                        <>
                            <TextField
                                {...startProps}
                                size="small"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LoginIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                helperText=""
                            />
                            <DateRangeDelimiter> to </DateRangeDelimiter>
                            <TextField
                                {...endProps}
                                size="small"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LogoutIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!selectedDate[1]}
                                helperText=""
                            />
                        </>
                    )}
                />
            </LocalizationProvider>
            // <div></div>
        );
    };

    const DateTimePickers = () => {
        return (
            <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        disablePast
                        label="Nhận phòng"
                        inputFormat="HH:mm, DD [tháng] MM"
                        renderInput={(params) => <TextField {...params} size="small" helperText="" />}
                        value={dateTimeStart}
                        onChange={(newValue) => {
                            setDateTimeStart(newValue);
                        }}
                    />
                </LocalizationProvider>

                <div className="ml-2 mr-3 min-w-[150px]">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Số giờ sử dụng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={hours as any}
                            label="Age"
                            onChange={(e: ChangeEvent<any>) => {
                                setHours(+e.target.value);
                            }}
                        >
                            <MenuItem value={1}>1 giờ</MenuItem>
                            <MenuItem value={2}>2 giờ</MenuItem>
                            <MenuItem value={3}>3 giờ</MenuItem>
                            <MenuItem value={4}>4 giờ</MenuItem>
                            <MenuItem value={5}>5 giờ</MenuItem>
                            <MenuItem value={6}>6 giờ</MenuItem>
                            <MenuItem value={7}>7 giờ</MenuItem>
                            <MenuItem value={8}>8 giờ</MenuItem>
                            <MenuItem value={9}>9 giờ</MenuItem>
                            <MenuItem value={10}>10 giờ</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </>
        );
    };

    // search room.
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedDate[0] || !selectedDate[1]) {
            toastr.info("Vui lòng chọn thời gian trả phòng!");
            return;
        }

        let query = {};

        // tìm kiếm theo giờ.
        if (indexTab === 1) {
            const timeCheckin = new Date(dateTimeStart as any);

            query = {
                checkin: new Date(
                    timeCheckin.getFullYear(),
                    timeCheckin.getMonth(),
                    timeCheckin.getDate(),
                    timeCheckin.getHours(),
                    timeCheckin.getMinutes(),
                    timeCheckin.getSeconds(),
                ).toISOString(),
                checkout: new Date(
                    timeCheckin.getFullYear(),
                    timeCheckin.getMonth(),
                    timeCheckin.getDate(),
                    timeCheckin.getHours() + hours,
                    timeCheckin.getMinutes(),
                    timeCheckin.getSeconds(),
                ).toISOString(),
            };
        } else {
            const [checkin, checkout] = selectedDate;
            const dateCheckin = new Date(checkin);
            const dateCheckout = new Date(checkout);

            // tìm kiếm phòng qua đêm, theo ngày mặc định thời gian checkin là 14h và checkout là 12h trưa hôm sau.
            query = {
                checkin: new Date(dateCheckin.getFullYear(), dateCheckin.getMonth(), dateCheckin.getDate(), 14).toISOString(),
                checkout: new Date(
                    dateCheckout.getFullYear(),
                    dateCheckout.getMonth(),
                    dateCheckout.getDate(),
                    12,
                ).toISOString(),
            };
        }

        setOpen(true);

        router.push({
            pathname: "search",
            query,
        });
    };

    return (
        <header className='sticky w-[80%] border-b mx-auto top-0 z-[90] bg-[#fff]'>
            <div className="flex justify-between items-center py-2 mb:flex mbs:block ">
                <Link href="/" >
                    <img className='w-[100px] cursor-pointer' src="https://res.cloudinary.com/fptpolytechnic/image/upload/v1673543047/samples/325042297_711092773955485_5422088835829082377_n_ejizf3.png" alt="" />
                </Link>
                <div className="">
                    {
                        isMounted && (
                            <BookingFilter />
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
                                                    {/* <img
                              width={50}
                              className="rounded-full h-[50px] w-[50px] object-cover border-current"
                              src={user.avatar || "https://go2joy.vn/images/icons/user-placeholder.svg"}
                              alt="" /> */}
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