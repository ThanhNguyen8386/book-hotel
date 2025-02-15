/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ProductType } from "../../types/products";
import { useForm, SubmitHandler } from "react-hook-form";
import { checkUserBookRoom } from "../../api/order";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useProducts from "../../hook/use-product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Box from "@mui/material/Box";
import BasicDateRangePicker from "../../components/DatePicker/index4";
import DialogConfirm from "../../components/Dialog";
import { DateTimePicker, LocalizationProvider } from "@material-ui/pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Tab, Tabs, Typography } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getOnefac } from "../../api/facilities";
import CommentItem from "../../components/CommentItem";
import { UserType } from "../../types/user";
import useComment from "../../hook/use-comment";
import { CommentType, CommentType2 } from "../../types/comment";
import { getVoucherByCode } from "../../api/voucher";
import { Voucher } from "../../types/voucher";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useRouter } from "next/router";

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
  const LIMIT_SHOW_COMMENT = 6;

  const router = useRouter();
  const { slug } = router.query;
  const { data: product } = useProducts(slug);
  const { data: comments, addComment, removeComment } = useComment(product?._id);

  const [value, setValue] = useState(0);
  const [date, setDate] = useState<any>([]); //date range pciker
  const [datebook, setdatebook] = useState({});
  const [dataorder, setdataorder] = useState({});
  const [dialong, setdialog] = useState(false);
  const [status, setstatus] = useState<string>();
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
        // console.log(res)
        setfacilities(res);
      });
    };
    getfacilities();
    console.log(facilities);
  }, [product?._id]);

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
    if (product && !Array.isArray(product)) setchaprice(product.price[0].value);
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

  return (
    <div className="w-[80%] mx-auto py-2">
      <div className="content-header__booking mt-8">
        <div className="content-text__booking">
          <div className="new-content__booking">
            <div className="flex justify-between items-center">
              <h1 className="text-[#FFA500] mb:text-4xl mbs:text-2xl font-semibold">{product?.name}</h1>

              <button
                className={`bg-[orange] px-4 py-2 rounded-md duration-300 ${open ? "invisible translate-y-[-20px] opacity-0" : "visible translate-y-0 opacity-100"
                  }`}
                onClick={handleClickOpen}
              >
                Đặt phòng
              </button>
            </div>
            <h2 className=" mb:text-2xl mbs:text-xl font-semibold">{product?.category?.name}</h2>
          </div>
        </div>
        <div className="relative mx-auto mt-6 w-full overflow-hidden rounded-md mb:flex-row flex mbs:flex-col h-[auto]">
          <div className="basis-4/5 hover:opacity-70 duration-150">
            <img className="w-full" src={product?.image ? product.image[0] : ""} alt="" />
          </div>
          <div className="flex-1 mbs:flex mbs:flex-row  mb:flex-col">
            {product?.image?.map((item: any, index: any) => (
              <div key={index} className={`${index == 0 ? "hidden" : ""} hover:opacity-70 duration-150 border`}>
                <img src={`${item}`} srcSet={`${item}`} alt={item} loading="lazy" />
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              handleClickOpen2();
            }}
            className="absolute bottom-[20px] right-[20px] bg-white shadow-xl p-2 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </div>
        </div>
        <div className="mt-[50px]">
          <h1 className="text-[35px] font-medium text-[#FFA500]">Giá Phòng</h1>
          <div className="flex mt-[30px] mbs:mt-[10px] mb:mt-[30px] mbs:flex-col mb:flex-row">
            {product?.price?.map((item: any, index: number) => (
              <div className="mb:px-[30px] mbs:px-[0px]" key={index}>
                <span className="font-medium text-[20px] text-red-500">{item.title}:</span>
                <span className="ml-[10px] text-[18px] text-red-500">
                  {new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[50px] mbs:mt-[20px] mb:mt-[50px]">
          <h1 className="text-[35px] font-medium text-[#FFA500]">Tiện Ích</h1>
          <div className="grid mb:grid-cols-3 mb:gap-10 mbs:gap-4 mb:mb-[50px] mbs:mb-[10px] mbs:grid-cols-1 ">
            {facilities.map((item: any, index: number) => (
              <div className="flex mb:ml-[70px] mb:mt-[30px] mbs:ml-[0px] mbs:mt-[10px]" key={index}>
                <img width={45} className="mr-[20px] sepia mbs:w-[30px] mb:w-[45px]" src={`${item.image}`} alt="" />
                <p className="self-center text-[18px] text-gray-500 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* bình luận */}
        <div>
          <div className="pt-5 font-bold flex items-end">
            <h2 className="text-[35px] font-medium text-[#FFA500]">Đánh giá</h2>
            <div className="text-lg pb-1.5">
              &ensp;•&ensp;
              {comments?.length} Đánh giá
            </div>
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
          <div className="flex flex-wrap ">
            {comments?.slice(0, LIMIT_SHOW_COMMENT).map((cmt: CommentType) => {
              // eslint-disable-next-line react/jsx-key
              return (
                <div className="border-2 mx-[5px] mbs:w-[100%] mb:w-[33.3%]" key={cmt._id}>
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

        <>
          <Dialog
            fullWidth
            maxWidth="md"
            open={open2}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <button
              className="absolute top-[20px] right-[20px] p-2 rounded-full bg-[white] z-50 shadow-xl"
              onClick={() => {
                handleClose2();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <>
              <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                autoHeight={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Mousewheel, Pagination]}
                className="mySwiper"
              >
                {product?.image?.map((item: any, index: any) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        className="h-full w-full"
                        src={item}
                        alt="Two each of gray, white, and black shirts laying flat."
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </>
          </Dialog>
        </>

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
                        <BasicDateRangePicker settotaldate={settotaldate} getDate={getDate} id={product?._id ? product._id : ''} />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <BasicDateRangePicker settotaldate={settotaldate} getDate={getDate} id={product?._id ? product._id : ''} />
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
    </div>
  );
};

export default BookingDetail;

{
  /* <div className="flex mt-6 border rounded-md p-2 relative">
                    <Box className='basis-4/6' sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: ReactNode;
                                } = {};
                                if (isStepOptional(index)) {
                                    labelProps.optional = (
                                        <Typography variant="caption">Optional</Typography>
                                    );
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {activeStep == 0 ?
                                    <>
                                        <DialogTitle>Thông tin đặt phòng</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Những thông tin này sẽ giúp chúng tôi liên hệ và trợ giúp bạn dễ dàng hơn
                                            </DialogContentText>
                                            <form action="" onSubmit={handleSubmit(onsubmit)}>
                                                <div className="mb-6">
                                                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Họ và tên <span>*</span></label>
                                                    <input {...register('name', { required: true })} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    {Object.keys(errors).length !== 0 && (
                                                        <div>
                                                            {errors.name?.type === "required" && <p className='text-red-600'>Tên không được bỏ trống</p>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Số điện thoại <span>*</span></label>
                                                    <input {...register('phone', { required: true })} type="number" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    {Object.keys(errors).length !== 0 && (
                                                        <div>
                                                            {errors.phone?.type === "required" && <p className='text-red-600'>Số điện thoại sản phẩm không được bỏ trống</p>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email <span>*</span></label>
                                                    <input {...register('email', { required: true })} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    {Object.keys(errors).length !== 0 && (
                                                        <div>
                                                            {errors.email?.type === "required" && <p className='text-red-600'>Email sản phẩm không được bỏ trống</p>}
                                                        </div>
                                                    )}
                                                </div>
                                                <Box sx={{ width: '100%' }}>
                                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                            <Tab icon={<CalendarMonthIcon />} iconPosition="start" label="Theo ngày" {...a11yProps(0)} />
                                                            <Tab icon={<BedtimeIcon />} iconPosition="start" label="Qua đêm" {...a11yProps(1)} />
                                                            <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Theo giờ" {...a11yProps(2)} />
                                                        </Tabs>
                                                    </Box>
                                                    <TabPanel value={value} index={2}>
                                                        <div className='mt-6'>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DateTimePicker
                                                                    renderInput={(props) => <TextField helperText="" {...props} />}
                                                                    label="DateTimePicker"
                                                                    value={values}
                                                                    onChange={(newValues) => {
                                                                        setValues(newValues)
                                                                        setDate([
                                                                            newValues.$d,
                                                                            addDays(new Date(newValues.$d), 1)
                                                                        ])
                                                                    }}
                                                                />
                                                            </LocalizationProvider>

                                                        </div>
                                                    </TabPanel>
                                                    <TabPanel value={value} index={0}>
                                                        <BasicDateRangePicker getDate={getDate} id={product?._id ? product._id : ''} />
                                                    </TabPanel>
                                                    <TabPanel value={value} index={1}>
                                                        <BasicDateRangePicker getDate={getDate} id={product?._id ? product._id : ''} />
                                                    </TabPanel>

                                                </Box>
                                                {/*footer*/
}
//                                 <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
//                                     <DialogActions>
//                                         <Button onClick={handleClose}>Hủy</Button>
//                                         <Button
//                                             type="submit"
//                                             onClick={() => { setShowModal(false); on(); handleClose; setdialog(true); }}
//                                         >
//                                             Đặt phòng
//                                         </Button>

//                                     </DialogActions>
//                                 </div>
//                             </form>
//                         </DialogContent>
//                     </>
//                     : ""}
//                 <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                     <Button
//                         color="inherit"
//                         disabled={activeStep === 0}
//                         onClick={handleBack}
//                         sx={{ mr: 1 }}
//                     >
//                         Back
//                     </Button>
//                     <Box sx={{ flex: '1 1 auto' }} />
//                     {isStepOptional(activeStep) && (
//                         <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                             Skip
//                         </Button>
//                     )}
//                     <Button onClick={handleNext}>
//                         {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                     </Button>
//                 </Box>
//             </Fragment>
//         )}
//     </Box>
//     <div className='relative flex-1 border-l p-2'>
//         <div className=" sticky top-[100px]">Thông tin đặt phòng</div>
//     </div>
// </div> */}
