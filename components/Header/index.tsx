/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { FormEvent, MouseEvent, useEffect, useMemo, useState } from 'react'
import Menu from '@mui/material/Menu';
import { Avatar } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from 'next/router';
import { USER_ROLE } from '../../constants';
import dayjs, { Dayjs } from 'dayjs';
// import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { useLayout } from '../../contexts/LayoutContext';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import { format } from 'date-fns';
import DateRangPicker from '../DateRangPicker';
import DateTimesPicker from '../DateTimesPicker';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

type Props = {}

const Header = (props: Props) => {
  const {
    inputValue,
    handleInputChange,
    updateBooking,
    selectedType,
    setSelectedType,
    roomName
  } = useLayout();
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
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('user') as string)
    if (getUser == 0 || getUser == null) {
      setStatus(false)
    } else {
      setStatus(true)
    }
    setUser(getUser)
  }, [])

  const [indexTab, setIndexTab] = useState(1);
  const [open, setOpen] = useState(false)
  const [openBookingSearch, setOpenBookingSearch] = useState(false)

  const toggleVisible = () => {
    setOpenBookingSearch(false)
    setShowDatePicker(false)
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 150) {
      setOpen(true)
    }
    else if (scrolled <= 150) {
      setOpen(false)
      setOpenBookingSearch(false)
    }
  };
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    isClient && window.addEventListener("scroll", toggleVisible)
  }, [])
  useEffect(() => {
    switch (query) {
      case "/":
        setShowSearch(false);
        break;
      default:
        setShowSearch(true);
        break;
    }
  }, [query])
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // search room.
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue[0].startDate || !inputValue[0].endDate) {
      toastr.info("Vui lòng chọn thời gian trả phòng!");
      return;
    }

    let query = {};

    // tìm kiếm theo giờ.
    if (selectedType === 0) {
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
      const dateCheckin = new Date(inputValue[0].startDate);
      const dateCheckout = new Date(inputValue[0].endDate);

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

    // setOpen(true);

    router.push({
      pathname: "search",
      query,
    });
  };

  const searchBar = () => {
    return (
      <div className={`w-full transform transition-all duration-300`}>
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-full border shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex-grow flex-1 max-w-[50%] p-2 pl-4 group">
            <div className="text-sm text-gray-500 mb-0.5 flex items-center gap-2">
              <RoomTwoToneIcon
                className="text-orange-500"
              />
              <span className="font-medium">Bạn muốn đi đâu?</span>
            </div>
          </div>

          <div className="flex items-center max-w-[45%] flex-1 border-l border-gray-100 p-2 sm:pl-4 group cursor-pointer hover:bg-gray-50/80 transition-all duration-200">
            <div className='flex justify-between'>
              <div className="text-sm text-gray-500 mb-0.5 flex items-center gap-2">
                <CalendarMonthTwoToneIcon
                  className="text-orange-500"
                />
                <span className="font-medium">{selectedType == 0 ? "Theo giờ" : selectedType == 1 ? "Qua đêm" : "Theo ngày"}•</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">
                  {format(inputValue[0].startDate, 'dd/MM')}-{format(inputValue[0].endDate, 'dd/MM')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-1 flex-1 max-w-[10%]">
            <button className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95">
              <SearchTwoToneIcon className="text-white w-4 h-4 stroke-[2.5px]" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  const bookingSearch = () => {
    return (
      <div className={`duration-300 bg-white rounded-b-2xl shadow-[0_15px_50px_rgb(0,0,0,0.1)] overflow-hidden border border-gray-100`}>
        <div className="flex flex-col md:flex-row p-6 gap-4">
          <div className="flex-1 border hover:border-orange-500 rounded-xl flex items-center p-4 transition-all duration-200 bg-gray-50 hover:bg-white group hover:shadow-sm">
            <RoomTwoToneIcon className="mr-2" />
            <div className="flex flex-col flex-1">
              <label className="text-xs font-medium text-gray-500 mb-0.5">
                Địa điểm
              </label>
              <input
                type="text"
                placeholder="Bạn muốn đi đâu?"
                className="outline-none text-gray-700 bg-transparent placeholder:text-gray-400 w-full font-medium placeholder:font-normal"
              />
            </div>
          </div>
          <div
            className="flex md:w-[38%] gap-3"
            onClick={() => setShowDatePicker(true)}
          >
            <div className="flex-1 border hover:border-orange-500 rounded-xl flex items-center p-4 transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer group hover:shadow-sm">
              <div className="flex items-center w-full">
                <CalendarMonthTwoToneIcon className="mr-2" />
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-0.5">
                    Nhận phòng
                  </label>
                  <span className="font-medium text-gray-800">{format(inputValue[0].startDate, 'dd/MM/yyyy')}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 border hover:border-orange-500 rounded-xl flex items-center p-4 transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer group hover:shadow-sm">
              <div className="flex items-center w-full">
                <CalendarMonthTwoToneIcon className="mr-2" />
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-0.5">
                    Trả phòng
                  </label>
                  <span className="font-medium text-gray-800">{format(inputValue[0].endDate, 'dd/MM/yyyy')}</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={(e: any) => handleSearch(e)} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6 flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] font-medium">
            <SearchTwoToneIcon />
          </button>
        </div>
      </div>
    )
  }

  return (
    <header className='sticky top-0 z-[90] bg-[#fff]'>
      <div className="w-[80%] border-b mx-auto py-2 mb:w-[80%] mbs:[100%] relative">
        <div className="flex justify-between items-center my-2 mb:flex mbs:block ">
          <div className="flex items-center">
            <Link href="/" >
              <img className='w-[100px] cursor-pointer' src="https://res.cloudinary.com/fptpolytechnic/image/upload/v1673543047/samples/325042297_711092773955485_5422088835829082377_n_ejizf3.png" alt="" />
            </Link>
            <p
              aria-controls={open ? 'ava-control' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick2}
              className='ml-6 font-semibold cursor-pointer hover:text-gray-500 duration-300'
            >Danh mục nhà nghỉ <ExpandMoreTwoToneIcon /></p>
            <Menu
              className='w-[100%] mt-[20px]'
              id="basic-menu"
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}

            >
              <MenuItem className='w-[100%]' onClick={handleClose2}>HappyWeekend Room</MenuItem>
              <MenuItem onClick={handleClose2}>Tình yêu</MenuItem>
              <MenuItem onClick={handleClose2}>Sang trọng</MenuItem>
              <MenuItem onClick={handleClose2}>Du lịch</MenuItem>
            </Menu>
          </div>

          {
            !showSearch
              ? open ? (
                <div
                  onClick={() => {
                    setOpenBookingSearch(true)
                    setOpen(false)
                  }}
                  className={`${open ? "visible scale-100 translate-y-0 opacity-100" : "invisible scale-150 translate-y-10 opacity-0"} flex-auto h-full max-w-[35%] cursor-pointer duration-300`}
                >
                  {searchBar()}
                </div>
              )
                : ""
              : ""
          }

          {
            openBookingSearch && !open ? (
              <div className="flex flex-auto max-w-[35%] cursor-pointer">
                <button
                  className={`flex-1 px-2 flex flex-col items-center text-sm transition-all duration-300 ease-in-out
            ${selectedType === 0 ? 'text-orange-500 border-b-2 border-orange-500 bg-white font-medium shadow-sm' : 'text-gray-600 hover:text-orange-500 hover:bg-white/80 border-b-2 border-white'}`}
                  onClick={() => setSelectedType(0)}
                >
                  <AccessTimeTwoToneIcon />
                  <span className="tracking-wide">Theo giờ</span>
                </button>
                <button
                  className={`flex-1 px-2 flex flex-col items-center text-sm transition-all duration-300 ease-in-out
            ${selectedType === 1 ? 'text-orange-500 border-b-2 border-orange-500 bg-white font-medium shadow-sm' : 'text-gray-600 hover:text-orange-500 hover:bg-white/80 border-b-2 border-white'}`}
                  onClick={() => setSelectedType(1)}
                >
                  <DarkModeTwoToneIcon />
                  <span className="tracking-wide">Qua đêm</span>
                </button>
                <button
                  className={`flex-1 px-2 flex flex-col items-center text-sm transition-all duration-300 ease-in-out
            ${selectedType === 2 ? 'text-orange-500 border-b-2 border-orange-500 bg-white font-medium shadow-sm' : 'text-gray-600 hover:text-orange-500 hover:bg-white/80 border-b-2 border-white'}`}
                  onClick={() => setSelectedType(2)}
                >
                  <CalendarMonthTwoToneIcon />
                  <span className="tracking-wide">Theo ngày</span>
                </button>
              </div>
            ) : ""
          }

          <div className="flex items-center">
            <div className="mr-6 flex items-center hover:text-gray-500 duration-200 cursor-pointer">
              <CardGiftcardIcon />
              <p className='font-semibold pl-2'>Ưu đãi</p>
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
                  />
                  : (
                    <div className='flex'>
                      <button onClick={() => { router.push("/signin") }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
                      <button onClick={() => { router.push("/signup") }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng kí</button>
                    </div>
                  )
              }
            </div>
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
        <div
          className='absolute top-[87px] left-[50%] translate-x-[-50%] w-[80%]'>
          {openBookingSearch ? bookingSearch() : ""}
          {showDatePicker ? <div className="date-picker-container absolute top-[115px] right-[50px] z-50 mt-2">
            {selectedType == 0 ? <DateTimesPicker /> : selectedType == 1 ? <DateRangPicker /> : <DateRangPicker />}
          </div> : ""}
        </div>
      </div>
    </header>
  )
}

export default Header