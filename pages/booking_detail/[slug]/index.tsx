/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { checkUserBookRoom } from "../../../api/order";
import { getOnefac } from "../../../api/facilities";
import CommentItem from "../../../components/CommentItem";
import { UserType } from "../../../types/user";
import useComment from "../../../hook/use-comment";
import { CommentType, CommentType2 } from "../../../types/comment";
import { getVoucherByCode } from "../../../api/voucher";
import { Voucher } from "../../../types/voucher";
import { useRouter } from "next/router";
import { API_URL } from "../../../constants";
import { fetcher } from "../../../api/instance";
import useSWR from "swr";
import RoomDetailLayout from "../../../components/Layout/RoomDetailLayout";
import Carousel from "../../../components/Carousel";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLayout } from "../../../contexts/LayoutContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Checkout from "./Checkout";
import { differenceInSeconds, parseISO } from "date-fns";
import { getRoomAvailabe } from "../../../api/rooms";

type Form = {
  name: string;
  email: string;
  phone: number;
  ckeckins: any;
  ckeckouts: any;
};

type FormComment = {
  comment: string;
  star: string;
};


const BookingDetail = () => {
  const router = useRouter();
  const dataQuery = router.query;
  const { data: product, mutate } = useSWR(
    dataQuery.slug ? `${API_URL}/roomsbyCategory/${dataQuery.slug}` : null,
    fetcher
  );
  const {
    inputValue,
    setUpdateBooking,
    setRoomName,
    selectedType,
    setSelectedType,
    handleInputChange
  } = useLayout()
  const LIMIT_SHOW_COMMENT = 6;
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    rooms: useRef<HTMLDivElement>(null),
    facilities: useRef<HTMLDivElement>(null),
    reviews: useRef<HTMLDivElement>(null),
    policy: useRef<HTMLDivElement>(null),
    cancel: useRef<HTMLDivElement>(null),
  }
  const refCheckout = useRef(null);
  const { data: comments, addComment, removeComment } = useComment(product?._id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm<FormComment>();
  const [open, setOpen] = useState(false);
  const [facilities, setfacilities] = useState<any[]>([]);
  const [chaprice, setchaprice] = useState<any>();
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [isLogged, setIsLogged] = useState(false);
  // trạng thái user đã sử dụng - trả phòng chưa.
  const [isBooked, setIsBooked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [active, setActive] = useState('overview')
  const [dataRoom, setDataRoom] = useState()
  const [isMount, setIsMount] = useState(false)

  const load = async () => {
    try {
      await getRoomAvailabe({
        dateFrom: new Date(inputValue[0].startDate).toISOString(),
        dateTo: new Date(inputValue[0].endDate).toISOString(),
        categoryId: product._id
      })
        .then((res) => {
          setDataRoom(res.data)
        })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsMount(true)
  }, [])

  // useEffect(() => {
  //   if (router.isReady && product) {
  //     load()
  //     setSelectedType(dataQuery.type)
  //     handleInputChange([{
  //       endDate: parseISO(dataQuery.checkout),
  //       startDate: parseISO(dataQuery.checkin),
  //       key: "selection"
  //     }])
  //   }
  // }, [isMount, product])

  useEffect(() => {
    const getfacilities = async () => {
      await getOnefac(`${product?._id}`).then((res: any) => {
        setfacilities(res.data);
      });
    };
    product && getfacilities();
  }, [product]);

  useEffect(() => {
    const getUser = JSON.parse((localStorage.getItem("user") as string) || "{}");
    setIsLogged(!!getUser._id);
    setCurrentUser(getUser);
    const user: any = {
      name: currentUser?.name,
      email: currentUser?.email,
      phone: currentUser?.phone,
    };
    reset(currentUser);
  }, [open, dataQuery.slug]);

  // set giá phòng.
  useEffect(() => {
    // kiểm tra product ko phải [] => set price
    if (product && !Array.isArray(product.roomList)) setchaprice(product.roomList.price[0].value);
  }, [product]);

  // check trạng thái đặt phòng.
  useEffect(() => {
    if (isLogged) {
      (async () => {
        const { isBooked } = await checkUserBookRoom({
          user: currentUser?._id!,
          room: product?._id,
        });

        setIsBooked(isBooked);
      })();
    }
  }, [currentUser?._id, isLogged, product?._id]);

  // check trạng thái đã từng comment chưa.
  useEffect(() => {
    if (isLogged) {
      const isCommented = comments?.some((cmt: CommentType2) => cmt.user._id === currentUser?._id);
      setIsCommented(isCommented);
    }
  }, [isLogged, comments, currentUser?._id]);

  // Function để gọi API đặt phòng khi click cập nhật ngày giờ
  const callBookingAPI = async () => {
    load()
  };

  useEffect(() => {
    if (product) {
      setRoomName(product?.name)
    }
  }, [product])
  useEffect(() => {
    if (setUpdateBooking) {
      setUpdateBooking(() => callBookingAPI);
    }
  }, [setUpdateBooking, inputValue]);

  // submit comment
  const handleSubmitComment: SubmitHandler<FormComment> = async ({ star, comment }) => {
    await addComment({
      comment,
      user: currentUser?._id as any,
      room: product._id,
      star,
    });
    toastr.success("Bình luận thành công");
    reset2();
  };

  const startDate = new Date(inputValue[0].startDate);
  const endDate = new Date(inputValue[0].endDate);
  const diffInSeconds = Math.ceil(differenceInSeconds(endDate, startDate) / 60 / 60 / 24);

  const actionOpenDialog = {
    checkout: (item: any, type: any) => {
      const _item = {
        ...item,
        address: product.address,
        total: diffInSeconds * item.price[selectedType].value
      }
      refCheckout.current.checkout(_item, type)
    },
    update: (item: any, type: any) => {
      refCheckout.current.comment(item, type)
    }
  }

  //mảng tab điểu khiển
  const tabs = [
    { label: 'Tổng quan', id: 'overview' },
    { label: 'Danh sách phòng', id: 'rooms' },
    { label: 'Tiện ích', id: 'facilities' },
    { label: 'Đánh giá', id: 'reviews' }
  ]

  // tab điều khiển 
  const handleClick = (id: string) => {
    setActive(id)
    sectionRefs[id as keyof typeof sectionRefs]?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  // Auto detect section in viewport
  useEffect(() => {
    const handleScroll = () => {
      const offsets = Object.entries(sectionRefs).map(([key, ref]) => {
        return {
          id: key,
          offset: ref.current
            ? Math.abs(ref.current.getBoundingClientRect().top - 100) // 100 = offset từ top để dễ nhìn
            : Infinity,
        }
      })

      const nearest = offsets.reduce((prev, curr) =>
        curr.offset < prev.offset ? curr : prev
      )

      setActive(nearest.id)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatCurrency = (currency: number) => {
    const tempCurrency = +currency >= 0 ? currency : 0;
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
  };
  return (
    <div className="w-[80%] mx-auto">
      <div className="content-header__booking">
        <div ref={sectionRefs.overview} className="content-text__booking h-full py-8 flex justify-between item-center">
          <div className="">
            <h1 className=" mb:text-4xl mbs:text-2xl font-semibold">{product?.name}</h1>
            <p className="flex">
              <LocationOnIcon color="warning" />
              {product?.address}
            </p>
            {/* <button
                className={`bg-[orange] px-4 py-2 rounded-md duration-300 ${open ? "invisible translate-y-[-20px] opacity-0" : "visible translate-y-0 opacity-100"
                  }`}
                onClick={handleClickOpen}
              >
                Đặt phòng
              </button> */}
          </div>
          <div className="flex flex-col justify-center items-end">
            <p className="cursor-pointer font-semibold"><FavoriteBorderSharpIcon color="error" /> Yêu thích</p>
            <p
              className="cursor-pointer font-semibold"
              onClick={() => handleClick("reviews")}>
              <span className="text-[#ff6400] text-xs">
                <FontAwesomeIcon icon={faStar} />
                {/* <StarIcon /> */}
              </span>
              {
                product && product.listRatings.length > 0 ?
                  (product && product.listRatings.reduce((accumulator: any, currentValue: any) => {
                    return accumulator += +(currentValue.star);
                  }, 0) / product.listRatings.length) + "/5" : "0/0"
              } •{product && product.listRatings.length} Đánh giá
            </p>
          </div>
        </div>
        {product && <Carousel images={product.images} />}

        <div className="">
          {/* tab */}
          <div className="sticky my-4 top-[89.98px] z-50 bg-white">
            <div className="flex gap-6 py-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleClick(tab.id)}
                  className={`pb-2 whitespace-nowrap font-medium transition-all ${active === tab.id
                    ? 'text-black border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-black'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* giới thiệu */}
          <div ref={sectionRefs.rooms} className="my-8">
            <p className="font-semibold text-2xl mb-4">Tổng quan</p>
          </div>

          {/* phòng */}
          <div ref={sectionRefs.rooms} className="scroll-mt-[160px] my-8">
            <p className="font-semibold text-2xl mb-4">Danh sách phòng</p>
            {dataRoom && (
              <div className="space-y-6">
                {dataRoom.map((item: any, index: any) => {
                  const prevId = `prev-${item._id}`;
                  const nextId = `next-${item._id}`;
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="flex flex-col md:flex-row">
                        {/* Room Image */}
                        <div className="relative w-full h-full md:w-72 h-72 md:h-auto overflow-hidden">
                          <Swiper
                            pagination={{
                              clickable: true,
                              dynamicBullets: true,
                            }}
                            navigation={{
                              nextEl: `#${nextId}`,
                              prevEl: `#${prevId}`,
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper w-full h-full"
                          >
                            {
                              item.image?.map((i: any, index: any) => {
                                return (
                                  <SwiperSlide key={index}>
                                    <div className="relative w-full h-full">
                                      <Image
                                        src={i}
                                        alt='anh'
                                        layout="fill"
                                        objectFit="cover"
                                        priority
                                        className='cursor-grab hover:opacity-75 transition rounded-l-xl'
                                      />
                                    </div>
                                  </SwiperSlide>
                                )
                              })
                            }
                          </Swiper>

                          <div id={prevId} className="absolute top-1/2 left-2 -translate-y-1/2 z-10 custom-prev bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                            <NavigateBeforeIcon />
                          </div>
                          <div id={nextId} className="absolute top-1/2 right-2 -translate-y-1/2 z-10 custom-next bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                            <NavigateNextIcon />
                          </div>
                        </div>
                        {/* Room Details */}
                        <div className="flex-grow p-6 flex flex-col md:flex-row">
                          {/* Room Info */}
                          <div className="flex-grow">
                            <div className="mb-5">
                              <h3 className="text-gray-500 text-sm font-medium mb-2">
                                Thông tin phòng
                              </h3>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800 text-lg">
                                  {item.name}
                                </p>

                              </div>
                            </div>
                            {/* {room.features.length > 0 && (
                              <div>
                                <h3 className="text-gray-500 text-sm font-medium mb-2">
                                  Đặc điểm nổi bật
                                </h3>
                                <div className="flex gap-2">
                                  {room.features.map((feature, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm border border-gray-100"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )} */}
                            <button
                              onClick={() => console.log(`View details for ${item.name}`)}
                              className="mt-6 inline-flex items-center text-gray-600 hover:text-gray-800 font-medium text-sm group/btn"
                            >
                              Xem chi tiết phòng{' '}

                            </button>
                          </div>
                          {/* Price and Book */}
                          <div className="mt-6 md:mt-0 md:w-56 flex flex-col items-start md:items-end justify-between border-t md:border-t-0 pt-6 md:pt-0">
                            <div className="text-right">
                              <h3 className="text-gray-500 text-sm font-medium mb-1">
                                Giá phòng
                              </h3>
                              <div className="flex items-baseline gap-1 justify-end">
                                <div className="flex items-end">
                                  <p className="text-gray-800 font-semibold text-2xl">{
                                    formatCurrency((item.price[selectedType].value) * diffInSeconds)
                                  }</p>
                                  <span className="text-orange-500">/{diffInSeconds}</span>
                                </div>
                                <span className="text-sm font-normal text-gray-500">
                                  {item.hourRate}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                actionOpenDialog.checkout(item, "CHECKOUT")
                              }}
                              className="w-full md:w-auto mt-4 px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-300 font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30">
                              Đặt phòng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* tiện ích */}
          <div ref={sectionRefs.facilities} className=" my-8 mbs:mt-[20px] mb:mt-[50px]">
            <p className="font-semibold text-2xl mb-4">Tiện Ích</p>
            <div className="grid mb:grid-cols-3 mb:gap-10 mbs:gap-4 mb:mb-[50px] mbs:mb-[10px] mbs:grid-cols-1 ">
              {facilities.map((item: any, index: number) => (
                <div className="flex mb:ml-[70px] mb:mt-[30px] mbs:ml-[0px] mbs:mt-[10px]" key={index}>
                  <img width={45} className="mr-[20px] sepia mbs:w-[30px] mb:w-[45px]" src={`${item.image}`} alt="" />
                  <p className="self-center text-[18px] text-gray-500 font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* đánh giá */}
          <div ref={sectionRefs.reviews} className=" my-8">
            <div className="pt-5 font-bold flex items-end">
              <p className="font-semibold text-2xl mb-4">Đánh giá</p>
            </div>
            {/* form comment */}
            {isLogged && isBooked && !isCommented && (
              <form
                key={2}
                className="px-3 py-2 border-2 border-[#FFA500] mt-3"
                onSubmit={handleSubmit2(handleSubmitComment)}
              >
                <h2 className="font-semibold text-xl">
                  {!comments?.length
                    ? `Hãy là người đầu tiên bình luận về "${product?.name}"`
                    : `Bình luận về "${product?.name}"`}
                </h2>
                <div className="mt-2">
                  <label className="block text-sm font-semibold">Đánh giá của bạn *</label>
                  <div className="stars">
                    <input
                      type="radio"
                      hidden
                      {...register2("star", { required: "Vui lòng chọn mức đánh giá" })}
                      className="form__comment-star-number"
                      id="star-5"
                      value="5"
                    />
                    <label htmlFor="star-5" title="5 sao" className="star__item">
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input
                      type="radio"
                      hidden
                      {...register2("star", { required: "Vui lòng chọn mức đánh giá" })}
                      className="form__comment-star-number"
                      id="star-4"
                      value="4"
                    />
                    <label htmlFor="star-4" title="4 sao" className="star__item">
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input
                      type="radio"
                      hidden
                      {...register2("star", { required: "Vui lòng chọn mức đánh giá" })}
                      className="form__comment-star-number"
                      id="star-3"
                      value="3"
                    />
                    <label htmlFor="star-3" title="3 sao" className="star__item">
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input
                      type="radio"
                      hidden
                      {...register2("star", { required: "Vui lòng chọn mức đánh giá" })}
                      className="form__comment-star-number"
                      id="star-2"
                      value="2"
                    />
                    <label htmlFor="star-2" title="2 sao" className="star__item">
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input
                      type="radio"
                      hidden
                      {...register2("star", { required: "Vui lòng chọn mức đánh giá" })}
                      className="form__comment-star-number"
                      id="star-1"
                      value="1"
                    />
                    <label htmlFor="star-1" title="1 sao" className="star__item">
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                  </div>
                  <div className="text-sm mt-0.5 text-red-500">{errors2.star?.message}</div>
                </div>
                <div className="mt-2">
                  <label htmlFor="form__comment-content" className="block text-sm font-semibold">
                    Nhận xét của bạn
                  </label>
                  <textarea
                    id="form__comment-content"
                    {...register2("comment", { required: "Vui lòng nhập nội dung bình luận" })}
                    cols={30}
                    rows={10}
                    className="w-full outline-none border mt-1 px-3 py-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]"
                    placeholder="Nhập nội dung bình luận"
                  />
                  <div className="text-sm mt-0.5 text-red-500">{errors2.comment?.message}</div>
                </div>
                <button className="my-3 px-4 py-2 bg-[#FFA500] font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                  Gửi đi
                </button>
              </form>
            )}
            {/* danh sách comment */}
            <div className="grid grid-cols-2 gap-4">
              {product && product.reviews?.slice(0, LIMIT_SHOW_COMMENT).map((cmt: CommentType) => {
                // eslint-disable-next-line react/jsx-key
                return (
                  <div className="" key={cmt._id}>
                    <CommentItem
                      comment={cmt as any}
                      isLogged={isLogged}
                      currentUser={currentUser}
                      onRemoveCmt={removeComment}
                    />
                  </div>
                );
              })}
            </div>
            {/* button see more */}
            {comments?.length > LIMIT_SHOW_COMMENT && (
              <div className="inline-flex items-center cursor-pointer mb-12" onClick={() => handleCloseDialog()}>
                <span className="font-bold underline">Hiển thị thêm</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4 mt-1 ml-1">
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <Checkout
          ref={refCheckout}
          comments={comments}
          isLogged={isLogged}
          currentUser={currentUser}
          removeComment={removeComment}
          dataDate={inputValue}
        />
      </div>
    </div >
  );
};

BookingDetail.Layout = RoomDetailLayout
export default BookingDetail;
