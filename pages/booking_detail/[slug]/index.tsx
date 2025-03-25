/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ProductType } from "../../../types/products";
import { useForm, SubmitHandler } from "react-hook-form";
import { checkUserBookRoom } from "../../../api/order";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import BasicDateRangePicker from "../../../components/DatePicker/index4";
import DialogConfirm from "../../../components/Dialog";
import { DateTimePicker, LocalizationProvider } from "@material-ui/pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Tab, Tabs, Typography } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getOnefac } from "../../../api/facilities";
import CommentItem from "../../../components/CommentItem";
import { UserType } from "../../../types/user";
import useComment from "../../../hook/use-comment";
import { CommentType, CommentType2 } from "../../../types/comment";
import { getVoucherByCode } from "../../../api/voucher";
import { Voucher } from "../../../types/voucher";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';

type ProductProps = {
  product: ProductType;
};
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

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const BookingDetail = () => {
  const { data: product, mutate } = useSWR(
    slug ? `${API_URL}/roomsbyCategory/${slug}` : null,
    fetcher
  );
  const { inputValue, setUpdateBooking } = useLayout()
  const LIMIT_SHOW_COMMENT = 6;
  const router = useRouter();
  const { slug } = router.query;
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    rooms: useRef<HTMLDivElement>(null),
    facilities: useRef<HTMLDivElement>(null),
    reviews: useRef<HTMLDivElement>(null),
    policy: useRef<HTMLDivElement>(null),
    cancel: useRef<HTMLDivElement>(null),
  }
  const { data: comments, addComment, removeComment } = useComment(product?._id);
  const [value, setValue] = useState(0);
  const [date, setDate] = useState<any>([]); //date range pciker
  const [datebook, setdatebook] = useState({});
  const [dataorder, setdataorder] = useState({});
  const [dialong, setdialog] = useState(false);
  const [status, setstatus] = useState<string>();
  const [step, setStep] = useState<"list" | "checkout">("list");

  // const [ckeckout, setckekout] = useState('')
  const [showModal, setShowModal] = useState(false);
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
  // const { creatstatus } = useStatus(setstatus)
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openDialogComment, setOpenDialogComment] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = ["Select campaign settings", "Create an ad group", "Create an ad"];
  const [facilities, setfacilities] = useState<any[]>([]);
  const [chaprice, setchaprice] = useState<any>();
  const [totaldate, settotaldate] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [isLogged, setIsLogged] = useState(false);
  // trạng thái user đã sử dụng - trả phòng chưa.
  const [isBooked, setIsBooked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);

  // voucher code
  const [voucher, setVoucher] = useState<string>("");
  const [errVoucher, setErrVoucher] = useState<string>();

  const [voucherData, setVoucherData] = useState<Voucher | null>(null);
  const [active, setActive] = useState('overview')
  // thời gian nhận phòng theo giờ
  const [dateTimeStart, setDateTimeStart] = useState<Dayjs | null>(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 6, 30);

    return dayjs(futureDate.toISOString());
  });
  const [hours, setHours] = useState<number>(2);

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
  }, [open, slug]);

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

  // Function để gọi API đặt phòng
  const callBookingAPI = async () => {
    console.log("Gọi API với ngày:", inputValue);
    // Ví dụ call API
    // await fetch('/api/booking', { method: 'POST', body: JSON.stringify(inputValue) });
  };

  useEffect(() => {
    if (setUpdateBooking) {
      setUpdateBooking(() => callBookingAPI);
    }
  }, [setUpdateBooking, inputValue]);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const dialogConfirmRef = useRef<any>();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen(false);
    setVoucher("");
    setVoucherData(null);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  // toggle dialog comment list
  const handleToggleDialogComment = () => setOpenDialogComment(!openDialogComment);

  const getDate = (dateData: any) => {
    //date range pciker
    setDate(dateData);
  };
  const on = async () => { };

  const openDialogConfirm = () => {
    dialogConfirmRef.current.open("hi");
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    if (newValue === 2) {
      setDateTimeStart(() => {
        const currentDate = new Date();
        const futureDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1,
          6,
          30,
        );

        return dayjs(futureDate.toISOString());
      });
      setHours(2);
      settotaldate(2);
    }

    setValue(newValue);
  };

  const onsubmit: SubmitHandler<Form> = async (data) => {
    let tempVoucher;
    if (voucher.trim()) {
      const { isValid, voucherData } = await validateVoucher();
      if (!isValid) return;
      tempVoucher = voucherData;
    }

    const user = JSON.parse(localStorage.getItem("user") as string)?._id;
    const total = chaprice * totaldate;

    let neworder: any = {
      ...data,
      user: user,
      room: product._id,
      statusorder: "0",
      total: total,
      status: status,
      voucher: tempVoucher,
      methodpay: "0"
    };

    let dateBooked: any = {
      room: product._id,
    };

    // đặt phòng theo giờ.
    if (value === 2) {
      const dateFrom = dayjs(dateTimeStart).toISOString();
      const dateTo = dayjs(dateTimeStart).add(hours, "hours").toISOString();
      dateBooked = {
        ...dateBooked,
        dateFrom,
        dateTo,
      };

      neworder = {
        ...neworder,
        checkins: dateFrom,
        checkouts: dateTo,
      };
    } else {
      const [a, b] = date;

      // thời gian checkin là 14h và checkout là 12h trưa hôm sau
      // nếu đặt phòng theo ngày và qua đêm
      const dateFrom = dayjs(a).hour(14).minute(0).second(0).millisecond(0).toISOString();
      const dateTo = dayjs(b).hour(12).minute(0).second(0).millisecond(0).toISOString();

      dateBooked = {
        ...dateBooked,
        dateFrom,
        dateTo,
      };

      neworder = {
        ...neworder,
        checkins: dateFrom,
        checkouts: dateTo,
      };
    }

    setdatebook(dateBooked);
    setdataorder(neworder);
    openDialogConfirm();
    handleClose();
    setValue(0);
    setchaprice(product.price[0].value);
  };

  // validate voucher
  const validateVoucher = async () => {
    let isValid = true;
    const code = voucher.trim();

    // get thông tin voucher
    const voucherData = await getVoucherByCode(code);
    setVoucherData(voucherData);
    if (!voucherData) {
      setErrVoucher("Voucher không tồn tại");
      isValid = false;
    } else {
      const { quantity, activeTime, expriedTime, users } = voucherData;
      const today = new Date().getTime();
      const activeTimeGetTime = new Date(activeTime).getTime();
      const expriedTimeGetTime = new Date(expriedTime).getTime();

      // check số lượng voucher hiện còn.
      if (quantity <= 0) {
        setErrVoucher("Voucher đã hết lượt sử dụng");
        isValid = false;
      } else if (today < activeTimeGetTime) {
        // check thời gian sử dụng voucher
        setErrVoucher("Voucher chưa đến thời gian sử dụng");
        isValid = false;
      } else if (today > expriedTimeGetTime) {
        // check thời hạn sử dụng voucher
        setErrVoucher("Voucher đã hết hạn");
        isValid = false;
      } else if (users?.includes(currentUser?._id!)) {
        // check user đã từng sử dụng voucher chưa.
        setErrVoucher("Bạn đã sử dụng Voucher này trước đó");
        isValid = false;
      } else {
        // check điều kiện sử dụng: đã đặt phòng 1 lần.
        const { isBooked } = await checkUserBookRoom({ user: currentUser?._id! });
        if (!isBooked) {
          setErrVoucher("Bạn không đủ điều kiện sử dụng Voucher");
          isValid = false;
        } else {
          setErrVoucher("");
          isValid = true;
        };
      }
    }

    return { isValid, voucherData };
  };

  const changePrice = (value: number) => {
    // console.log(product.price)
    setchaprice(value);
  };

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

  // format tiền.
  const formatCurrency = (currency: number) => {
    const tempCurrency = +currency >= 0 ? currency : 0;
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
  };

  const DateTimePickers = () => {
    return (
      <div className="d-flex">
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

        <div className="inline-block min-w-[150px] pl-4">
          <FormControl className="w-full">
            <InputLabel id="demo-simple-select-label">Số giờ sử dụng</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hours as any}
              label="Age"
              onChange={(e: any) => {
                setHours(+e.target.value);
                settotaldate(+e.target.value);
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
      </div>
    );
  };

  const tabs = [
    { label: 'Tổng quan', id: 'overview' },
    { label: 'Danh sách phòng', id: 'rooms' },
    { label: 'Tiện ích', id: 'facilities' },
    { label: 'Đánh giá', id: 'reviews' }
  ]

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

  // const prevId = `prev-${product ? product.roomList._id : ""}`;
  // const nextId = `next-${product ? product.roomList._id : ""}`;

  return (
    <div className="w-[80%] mx-auto">
      {step == "list" ? (
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
            <div className="sticky my-4 top-[86.98px] z-50 bg-white">
              <div className="flex gap-6 py-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleClick(tab.id)}
                    className={`pb-2 whitespace-nowrap text-xl font-medium transition-all ${active === tab.id
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
            <div ref={sectionRefs.rooms} className="scroll-mt-[150px] my-8">
              <p className="font-semibold text-2xl mb-4">Danh sách phòng</p>
              {product && (
                <div className="space-y-6">
                  {product.roomList.map((item:any, index:any) => {
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
                                  <p className="text-gray-800 font-bold text-2xl">{item.price[0].value}</p>
                                  <span className="text-sm font-normal text-gray-500">
                                    {item.hourRate}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => setStep("checkout")}
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
                <div className="inline-flex items-center cursor-pointer mb-12" onClick={() => handleToggleDialogComment()}>
                  <span className="font-bold underline">Hiển thị thêm</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4 mt-1 ml-1">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div>
            <Dialog open={open} onClose={handleClose}>
              {product?.coc ? (
                <div className="flex justify-center flex-col items-center">
                  <DialogTitle>Yêu cầu thanh toán trước</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Phòng đặc biệt này phải đặt cọc để giữ phòng</DialogContentText>
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          router.push("/payment");
                        }}
                      >
                        Ok
                      </button>
                      <button autoFocus onClick={handleClose}>
                        Hủy
                      </button>
                    </div>
                  </DialogContent>
                </div>
              ) : (
                <>
                  <DialogTitle>Thông tin đặt phòng</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Những thông tin này sẽ giúp chúng tôi liên hệ và trợ giúp bạn dễ dàng hơn
                    </DialogContentText>
                    <form action="" key={1} onSubmit={handleSubmit(onsubmit)}>
                      <div className="mb-6">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Họ và tên <span>*</span>
                        </label>
                        <input
                          {...register("name", { required: true })}
                          type="text"
                          id="default-input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {Object.keys(errors).length !== 0 && (
                          <div>
                            {errors.name?.type === "required" && <p className="text-red-600">Tên không được bỏ trống</p>}
                          </div>
                        )}
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Số điện thoại <span>*</span>
                        </label>
                        <input
                          {...register("phone", { required: true })}
                          type="number"
                          id="default-input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {Object.keys(errors).length !== 0 && (
                          <div>
                            {errors.phone?.type === "required" && (
                              <p className="text-red-600">Số điện thoại sản phẩm không được bỏ trống</p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Email <span>*</span>
                        </label>
                        <input
                          {...register("email", { required: true })}
                          type="text"
                          id="default-input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {Object.keys(errors).length !== 0 && (
                          <div>
                            {errors.email?.type === "required" && (
                              <p className="text-red-600">Email sản phẩm không được bỏ trống</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* voucher */}
                      {isLogged && (
                        <div className="mb-6">
                          <label
                            htmlFor="default-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Voucher
                          </label>
                          <input
                            value={voucher}
                            onChange={(e) => {
                              const voucher = e.target.value;
                              setVoucher(voucher);
                              if (!voucher.trim()) {
                                setErrVoucher("");
                                setVoucherData(null);
                              }
                            }}
                            type="text"
                            id="default-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          <div>{errVoucher?.trim() && <p className="text-red-600">{errVoucher}</p>}</div>
                        </div>
                      )}

                      {/* tab */}
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {product?.price?.map((item: any, index: number) => (
                              <Tab
                                key={index}
                                icon={<CalendarMonthIcon />}
                                onClick={() => {
                                  setchaprice(item.value);
                                }}
                                iconPosition="start"
                                label={`${item.title}`}
                                {...a11yProps(item.brand)}
                              />
                            ))}
                            {/* <Tab icon={<CalendarMonthIcon />} iconPosition="start" label="Theo ngày" {...a11yProps(0)} />
                                                    <Tab icon={<BedtimeIcon />} iconPosition="start" label="Qua đêm" {...a11yProps(1)} />
                                                    <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Theo giờ" {...a11yProps(2)} /> */}
                          </Tabs>
                        </Box>
                        <div className="flex mt-[10px] font-medium text-gray-500">
                          Giá phòng: {formatCurrency(chaprice)}
                          {value !== 2 && <div className="ml-[40px]">Số ngày ở: {totaldate}</div>}
                        </div>

                        <div className="mt-[10px] font-medium text-gray-500">
                          <span>Tạm tính: </span>
                          <span>{formatCurrency(chaprice * totaldate)}</span>
                        </div>

                        {!errVoucher?.trim().length && voucherData && (
                          <div className="mt-[10px] font-medium text-gray-500">
                            <span>Voucher: </span>
                            <span>
                              {voucherData.code} (-{formatCurrency(voucherData.discount)})
                            </span>
                          </div>
                        )}

                        <div className="mt-[10px] font-bold text-[18px] text-orange-500">
                          Tổng:{" "}
                          {totaldate
                            ? formatCurrency(
                              chaprice * totaldate -
                              +`${!errVoucher?.trim().length && voucherData ? voucherData?.discount : 0}`,
                            )
                            : formatCurrency(0)}
                        </div>

                        {/* giá theo giờ */}
                        <TabPanel value={value} index={2}>
                          <DateTimePickers />
                        </TabPanel>
                        <TabPanel value={value} index={0}>
                          <BasicDateRangePicker settotaldate={settotaldate} getDate={getDate} id={product?._id ? product._id : ''} disabled={undefined} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <BasicDateRangePicker settotaldate={settotaldate} getDate={getDate} id={product?._id ? product._id : ''} disabled={undefined} />
                        </TabPanel>
                      </Box>

                      {/*footer*/}
                      <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
                        <DialogActions>
                          <Button onClick={handleClose}>Hủy</Button>
                          <Button
                            type="submit"
                            onClick={() => {
                              setShowModal(false);
                              on();
                              handleClose;
                              setdialog(true);
                            }}
                          >
                            Đặt phòng
                          </Button>
                        </DialogActions>
                      </div>
                    </form>
                  </DialogContent>
                </>
              )}
            </Dialog>
            <DialogConfirm ref={dialogConfirmRef} data={dataorder} datebooks={datebook} room={product?.name} />
          </div>

          {/* dialog comment */}
          <Dialog open={openDialogComment} onClose={() => handleToggleDialogComment()} fullWidth maxWidth="lg">
            <div className="px-6 py-4">
              <button className="block ml-auto" onClick={() => handleToggleDialogComment()}>
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
                {comments?.map((cmt: CommentType) => {
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
          </Dialog>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto bg-white">
          {/* Header */}
          <div 
          onClick={()=>setStep("list")}
          className="p-4 border-b flex items-center">
            <ChevronLeftRoundedIcon className="h-6 w-6 text-gray-700" />
            <h1 className="text-lg font-medium ml-2">Xác nhận & Thanh toán</h1>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Left Column */}
            <div className="md:w-1/2 border-r">
              {/* Booking Summary */}
              <div className="p-6 border-b">
                <h2 className="text-base font-medium mb-4">Lựa chọn của bạn</h2>
                <div className="flex">
                  <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/4KcCU3eePgyftWj2SotWcM/image.png"
                    alt="Royal Hotel Room"
                    className="w-32 h-32 object-cover rounded-md"
                  />
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
                      <span className="text-base font-medium">Royal Hotel</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12H20M4 12C2.89543 12 2 11.1046 2 10V6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V10C22 11.1046 21.1046 12 20 12M4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-base">Superior Room</span>
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
                        28 Đường số 9 - Khu dân cư Trung Sơn, Xã Bình Hưng, Bình
                        Chánh, TP. HCM
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
                    <span className="text-sm mt-1">1 ngày</span>
                  </div>
                  <div>
                    <div className="text-base text-gray-700">Nhận phòng</div>
                    <div className="text-base font-medium">14:00 • 30/03/2025</div>
                    <div className="text-base text-gray-700 mt-2">Trả phòng</div>
                    <div className="text-base font-medium">12:00 • 31/03/2025</div>
                  </div>
                </div>
              </div>
              {/* Guest Information */}
              <div className="p-6 border-b">
                <h2 className="text-base font-medium mb-4">Người đặt phòng</h2>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-base text-gray-700">Số điện thoại</div>
                  <div className="text-base">+84 354170252</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-base text-gray-700">Họ tên</div>
                  <div className="flex items-center">
                    <span className="text-base">Thành</span>
                    <ModeTwoToneIcon className="h-5 w-5 text-orange-500 ml-2" />
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
                  <div className="text-base">480.000đ</div>
                </div>
                <div className="flex justify-between items-center font-medium text-lg border-t pt-4">
                  <div>Tổng thanh toán</div>
                  <div>480.000đ</div>
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
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium text-base">
                  Đặt phòng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

BookingDetail.Layout = RoomDetailLayout
export default BookingDetail;
