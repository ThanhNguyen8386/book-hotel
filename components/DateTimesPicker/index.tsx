import { useEffect, useRef, useState } from "react";
import { Calendar, DateRange } from "react-date-range";
import { addHours, format } from "date-fns";
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./custom-datepicker.module.css"
import { useLayout } from "../../contexts/LayoutContext";
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DateTimesPicker = () => {
  const swiperRef = useRef(null);
  const swiperRefHour = useRef(null);
  const {
    inputValue,
    handleInputChange
  } = useLayout();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedHours, setSelectedHours] = useState(2);
  const [isMounted, setIsMounted] = useState(false)
  const hoursOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const checkoutTime = (() => {
    if (!inputValue[0]?.startDate || !selectedTime) return "Chưa chọn thời gian";

    const [hours, minutes] = selectedTime.split(":").map(Number); // Lấy giờ và phút
    const startDate = new Date(inputValue[0].startDate); // Tạo bản sao để tránh sửa dữ liệu gốc

    startDate.setHours(hours, minutes, 0, 0); // Cập nhật giờ, phút

    return addHours(startDate, selectedHours);
  })();

  const generateTimeSlot = (selectedDate: Date) => {
    const now = new Date();
    const isToday = now.toDateString() === selectedDate.toDateString(); // Kiểm tra nếu ngày chọn là hôm nay

    let startHour = isToday ? now.getHours() + (now.getMinutes() > 0 ? 1 : 0) : 0; // Hôm nay thì bắt đầu từ giờ gần nhất, ngày khác thì từ 00:00

    if (startHour >= 24) {
      return ["00:00"]; // Nếu đã qua 23:59, chỉ có "00:00"
    }

    return Array.from({ length: 24 - startHour }, (_, i) =>
      `${String(startHour + i).padStart(2, "0")}:00`
    );
  };

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timeSlots = generateTimeSlot(inputValue[0].startDate);
    setSelectedTime(timeSlots[0])
  }, [])

  const applyChange = (date: any) => {
    const [hours, minutes] = selectedTime.split(":").map(Number); // Lấy giờ và phút
    const startDate = new Date(date); // Tạo bản sao để tránh sửa dữ liệu gốc

    startDate.setHours(hours, minutes, 0, 0); // Cập nhật giờ, phút

    handleInputChange([
      {
        startDate: date,
        endDate: addHours(startDate, selectedHours),
        key: 'selection',
      },
    ])
  }

  return isMounted && (
    <div className="p-6 bg-white rounded-2xl shadow-lg flex gap-6">
      <div className="w-1/2">
        <h3 className="font-semibold mb-2 text-lg">Chọn ngày</h3>
        <div className="custom-calendar-container">
          <Calendar
            date={inputValue[0].startDate}
            onChange={date => {
              applyChange(date)
            }}
            color="#f97316"
            className="custom-datepicker"
            showMonthAndYearPickers={false}
            weekdayDisplayFormat="EEEEE"
            monthDisplayFormat="MMMM yyyy"
            locale={{
              localize: {
                day: n => ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][n],
                month: n => ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'][n]
              },
              formatLong: {
                date: () => 'dd/MM/yyyy'
              },
              options: {
                weekStartsOn: 1 // Tuần bắt đầu từ Thứ 2
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-16 w-1/2">
        <div className="">
          <h3 className="font-semibold mb-4 flex items-center text-lg">
            <AccessTimeTwoToneIcon className="mr-2 text-orange-500" />
            Giờ nhận phòng
          </h3>
          <div className="max-w-[300px] relative flex items-center justify-between">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0"
            >
              <ArrowBackIosNewIcon className="text-gray-700 hover:text-gray-500 transition hover:scale-75" />
            </button>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[FreeMode]}
              className="mySwiper w-[80%]"
              spaceBetween={20}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
            >
              {
                generateTimeSlot(inputValue[0].startDate).map((i: any, index: any) => {
                  return (
                    <SwiperSlide key={index}>
                      <button
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedTime === i ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                        onClick={() => {
                          applyChange(inputValue[0].startDate)
                          setSelectedTime(i)
                        }}
                      >
                        {i}
                      </button>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0"
            >
              <ArrowForwardIosIcon className="text-gray-700 hover:text-gray-500 transition hover:scale-75" />
            </button>
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold mb-4 flex items-center text-lg">
            <AccessTimeTwoToneIcon className="mr-2 text-orange-500" />
            Số giờ sử dụng
          </h3>
          <div className="max-w-[300px] relative flex items-center justify-between">
            <button
              onClick={() => swiperRefHour.current?.slidePrev()}
              className="absolute left-0"
            >
              <ArrowBackIosNewIcon className="text-gray-700 hover:text-gray-500 transition hover:scale-75" />
            </button>
            <Swiper
              onSwiper={(swiper) => (swiperRefHour.current = swiper)}
              modules={[FreeMode]}
              className="mySwiper w-[80%]"
              spaceBetween={10}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
            >
              {
                hoursOptions.map((i: any, index: any) => {
                  return (
                    <SwiperSlide key={index}>
                      <button
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedHours === i ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                        onClick={() => setSelectedHours(i)}
                      >
                        {i} giờ
                      </button>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
            <button
              onClick={() => swiperRefHour.current?.slideNext()}
              className="absolute right-0"
            >
              <ArrowForwardIosIcon className="text-gray-700 hover:text-gray-500 transition hover:scale-75" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="font-semibold flex items-center"><CalendarMonthTwoToneIcon className="mr-2 text-orange-500" /> Trả phòng:</span>
          <span className="font-semibold text-gray-700">{format(checkoutTime, "HH:mm, dd/MM")}</span>
        </div>
      </div>
    </div>
  )
};

export default DateTimesPicker;
