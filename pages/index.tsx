import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import ActionAreaCard from "../components/Card";
import Link from "next/link";
// import DateFnsUtils from "@material-ui/pickers/adapter/date-fns"; // choose your lib
import { Popover, Skeleton } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import SiteLayout from "../components/Layout";
import { useRouter } from "next/router";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import useSWR from "swr";
import { fetcher } from "../api/instance";
import { API_URL, TYPE_BOOKING } from "../constants";
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import { useLayout } from "../contexts/LayoutContext";
import { format } from 'date-fns';
import DateTimesPicker from "../components/DateTimesPicker";
import Image from "next/image";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import useFavoriteRoom from "../hook/favoriteRoom";
import DateRangPicker from "../components/DateRangPicker";
import CustomCalendar from "../components/DatePicker";
const Home = () => {
  const router = useRouter();
  const {
    inputValue,
    selectedType,
    setSelectedType
  } = useLayout();

  const defaultSelectedDate = useMemo(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    return [dayjs(currentDate.toISOString()), dayjs(futureDate.toISOString())];
  }, []);
  const [isMounted, setIsMounted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(defaultSelectedDate);
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState();

  // thời gian nhận phòng - form tìm kiếm theo giờ
  const [dateTimeStart, setDateTimeStart] = useState<Dayjs | null>(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 6, 30);

    return dayjs(futureDate.toISOString());
  });

  // thời gian trả phòng - form tìm kiếm theo giờ
  const [hours, setHours] = useState<number>(2);
  const { data } = useSWR(`${API_URL}/getAllCategoryWithImage`, fetcher);
  const { data: favoriteRoomData, addFavoriteRooms, deleFavoriteRooms } = useFavoriteRoom(user);
  const [checkinDate, setCheckinDate] = useState(defaultSelectedDate[0]);
  const [checkoutDate, setCheckoutDate] = useState(defaultSelectedDate[1]);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
      setUser(user._id)
    }
  }, [])

  const skeletonLoadingRoom = () => {
    return (
      <div className="flex justify-between">
        <div className="">
          <Skeleton variant="rounded" width={350} height={100} />
          <Skeleton variant="text" width={350} height={30} />
          <Skeleton variant="text" width={350} height={30} />
          <Skeleton variant="text" width={350} height={30} />
        </div>
        <div className="">
          <Skeleton variant="rounded" width={350} height={100} />
          <Skeleton variant="text" width={350} height={30} />
          <Skeleton variant="text" width={350} height={30} />
          <Skeleton variant="text" width={350} height={30} />
        </div>
        <div className="">
          <Skeleton variant="rounded" width={350} height={100} />
          <Skeleton variant="text" width={350} height={30} />
          <Skeleton variant="text" width={350} height={30} />
          <Skeleton variant="text" width={350} height={30} />
        </div>
      </div>
    );
  };

  const toggleVisible = () => {
    setShowDatePicker(false)
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 150) {
      setVisible(false);
    } else if (scrolled <= 150) {
      setVisible(true);
    }
  };

  // search room.
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = hanldeTimeToSearch();
    router.push({
      pathname: "search",
      query,
    });
  };

  const hanldeTimeToSearch = () => {
    if (!inputValue[0][selectedType].endDate || !inputValue[0][selectedType].startDate) {
      toastr.info("Vui lòng chọn thời gian trả phòng!");
      return;
    }

    let query = {};

    // tìm kiếm theo giờ.
    if (selectedType === TYPE_BOOKING.hourly) {
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
      const dateCheckin = new Date(inputValue[0][selectedType].startDate);
      const dateCheckout = new Date(inputValue[0][selectedType].endDate);

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
    return query;
  }

  const handleChangeFavoriteRoom = async (e: any) => {
    favoriteRoomData.some(fav => fav?.category?._id === e.category)
      ? await deleFavoriteRooms(user, e.category)
      : await addFavoriteRooms(e)
  }

  useEffect(() => {
    const query = hanldeTimeToSearch();
    if (query?.checkin || query?.checkout) {
      setCheckinDate(query.checkin);
      setCheckoutDate(query.checkout);
    }
  }, [selectedDate[0], selectedDate[1]])

  const bookingSearch = () => {
    return (
      <div className={`${visible ? "visible scale-100 opacity-100 translate-y-20" : "invisible scale-50 opacity-0 translate-y-0"} duration-300 w-[80%] mx-auto translate-x-[-50%] absolute top-[30%] left-[50%] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-100`}>
        <div className="flex border-b bg-gray-50/80">
          <button
            className={`flex-1 py-6 px-2 flex flex-col items-center text-sm transition-all duration-300 ease-in-out
            ${selectedType === TYPE_BOOKING.hourly ? 'text-orange-500 border-b-2 border-orange-500 bg-white font-medium shadow-sm' : 'text-gray-600 hover:text-orange-500 hover:bg-white/80 border-b-2 border-white'}`}
            onClick={() => setSelectedType(TYPE_BOOKING.hourly)}
          >
            <AccessTimeTwoToneIcon />
            <span className="tracking-wide">Theo giờ</span>
          </button>
          <button
            className={`flex-1 py-6 px-2 flex flex-col items-center text-sm transition-all duration-300 ease-in-out
            ${selectedType === TYPE_BOOKING.overNight ? 'text-orange-500 border-b-2 border-orange-500 bg-white font-medium shadow-sm' : 'text-gray-600 hover:text-orange-500 hover:bg-white/80 border-b-2 border-white'}`}
            onClick={() => setSelectedType(TYPE_BOOKING.overNight)}
          >
            <DarkModeTwoToneIcon />
            <span className="tracking-wide">Qua đêm</span>
          </button>
          <button
            className={`flex-1 py-6 px-2 flex flex-col items-center text-sm transition-all duration-300 ease-in-out
            ${selectedType === TYPE_BOOKING.daily ? 'text-orange-500 border-b-2 border-orange-500 bg-white font-medium shadow-sm' : 'text-gray-600 hover:text-orange-500 hover:bg-white/80 border-b-2 border-white'}`}
            onClick={() => setSelectedType(TYPE_BOOKING.daily)}
          >
            <CalendarMonthTwoToneIcon />
            <span className="tracking-wide">Theo ngày</span>
          </button>
        </div>
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
            aria-describedby={id}
            className="flex flex-1 md:w-[38%] gap-3"
            onClick={handleClick}
          >
            <div className="flex-1 border hover:border-orange-500 rounded-xl flex items-center p-4 transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer group hover:shadow-sm">
              <div className="flex items-center w-full">
                <CalendarMonthTwoToneIcon className="mr-2" />
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-0.5">
                    Nhận phòng
                  </label>
                  <span className="font-medium text-gray-800">{format(inputValue[0][selectedType].startDate, "HH:mm, dd/MM/yyyy")}</span>
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
                  <span className="font-medium text-gray-800">{format(inputValue[0][selectedType].endDate, "HH:mm, dd/MM/yyyy")}</span>
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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowDatePicker(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className="">
      {/* <DateTimesPicker /> */}
      <div className="w-[80%] mx-auto relative mb-[50px] z-10">
        <div className="flex justify-center h-[286px] bg-[url('https://res.cloudinary.com/dkhutgvlb/image/upload/v1669818180/33_1654843382_62a2e7f6b03fb_brxw7x.png')] bg-no-repeat bg-cover">
          <h1 className="text-5xl text-center font-semibold text-white mt-5 w-[65%]">
            Đặt phòng nhà nghỉ nhanh - tiện lợi
          </h1>
        </div>
        {bookingSearch()}
        {
          isMounted && showDatePicker ?
            (
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                sx={{
                  borderRadius: '16px',
                  overflow: "hidden"
                }}
              >
                {selectedType == TYPE_BOOKING.hourly ? <DateTimesPicker /> : selectedType == TYPE_BOOKING.overNight ? <CustomCalendar /> : <DateRangPicker />}
              </Popover>
            )
            : ""
        }
      </div>
      <div className="mb:w-[80%] mbs:w-[95%] mx-auto pt-12">
        <h1 className='text-3xl font-semibold text-[orange] py-6'>Danh sách các phòng </h1>
        {data
          ? (
            <div className={`flex mb:justify-between flex-wrap mbs:justify-center`}>
              {
                data.data.map((item: any, index: any) => {
                  return (
                    <div className={`mb-4 ${item.status ? '' : 'hidden'} relative w-[280px] rounded-xl hover:shadow-lg transition overflow-hidden cursor-pointer`} key={index}>
                      <div
                        onClick={() => {
                          if (user == null) {
                            router.push("/signin")
                            return;
                          }
                          return handleChangeFavoriteRoom({
                            category: item._id,
                            user: user
                          })
                        }}
                        className="absolute top-2 right-2 z-10">
                        <p className={`${favoriteRoomData?.some(fav => fav?.category?._id === item._id) ? "text-red-600" : ""} text-gray-600 hover:text-red-600 hover:scale-125 duration-300`}>
                          <FavoriteTwoToneIcon className="" />
                        </p>
                      </div>
                      <Link href={`/booking_detail/${item.slug}`}>
                        <div className="">
                          <div className="">
                            <Image
                              src={item.representativeImage ? item.representativeImage : ''}
                              alt="Ba Vì"
                              width={280}
                              height={200}
                              className="rounded-xl object-cover"
                            />
                          </div>

                          <div className="p-3">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-500 text-sm">{item.address}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          )
          : skeletonLoadingRoom()}
      </div>
      <div className="mb:w-[80%] mbs:w-[95%] mx-auto pt-2">
        <p className="text-2xl text-amber-400 py-6 font-bold">Trải nghiệm cùng HappyWeekendHotel</p>

      </div>
      {/* list news */ }
  <div className="py-8">
    <div className="w-[80%] mx-auto">
      <div className="flex justify-between items-center ">
        <h1 className="relative"><img className="rounded-lg" src="https://s3.go2joy.vn/1000w/cover_photo/33_14148447441.jpg" alt="" /></h1>
        <h1 className="absolute pb-20 ml-[40px] text-white text-3xl mb:pb-20 ml-[40px] mbs:pb-10 ml-[20px] font-bold mb:text-3xl mbs:text-xl">Những điều thú vị có thể bạn chưa biết</h1>
        <h1 className="text-normal font-semibold text-[orange] py-6 mx-auto group hover:opacity-50 duration-300 flex items-center cursor-pointer absolute ml-[40px] bg-slate-200 w-[200px] rounded-lg mbs: mb:mt-[60px] ml-[20px] w-[100px] py-2 h-[30px]">
          <Link href="/blog">Danh sách các bài blog</Link>


        </h1>
      </div>
      <ActionAreaCard
        newsList={[
          [
            {
              _id: "63613e3ec5b015dc3665246c",
              name: "ThanhntOk",
              slug: "thanhntok",
              image: {
                _id: "63613e50c5b015dc3665246f",
                image: [
                  "https://a0.muscache.com/im/pictures/beec3be2-ad2b-423b-a9a5-75070f905d0b.jpg?im_w=720",
                  "https://a0.muscache.com/im/pictures/235d56fe-4241-4267-a24c-c70fdb4f8711.jpg?im_w=1200",
                ],
                room: "63613e3ec5b015dc3665246c",
                createdAt: "2022-11-01T15:42:08.949Z",
                updatedAt: "2022-11-01T15:48:25.010Z",
                __v: 0,
              },
              price: 150,
              description: "<p>ABCLGVSBDKVBSDLVHOSBDVSBDIUSDIUCBSDHVSDIYFVDS</p>",
              coc: true,
              category: "6352172dcdb05980122fdcb0",
              date: "635e9b7c5dee23ec01e8f4e6",
              createdAt: "2022-11-01T15:41:50.511Z",
              updatedAt: "2022-11-01T15:46:43.167Z",
              __v: 0,
            },
          ],
        ]}
      />
    </div>
  </div>
    </div >
  );
};

Home.Layout = SiteLayout;
export default Home;
