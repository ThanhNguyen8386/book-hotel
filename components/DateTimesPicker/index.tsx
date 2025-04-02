import { useState } from "react";
import { Calendar, DateRange } from "react-date-range";
import { addHours, format } from "date-fns";
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./custom-datepicker.module.css"

const DateTimesPicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("15:00");
  const [selectedHours, setSelectedHours] = useState(2);

  const times = ["15:00", "16:00", "17:00", "18:00", "19:00"];
  const hoursOptions = [1, 2, 3, 4];

  const checkoutTime = addHours(
    new Date(selectedDate.setHours(parseInt(selectedTime))),
    selectedHours
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg flex gap-6">
      <div className="w-1/2">
        <h3 className="font-semibold mb-2 text-lg">Chọn ngày</h3>
        <div className="custom-calendar-container">
          <Calendar
            date={selectedDate}
            onChange={date => setSelectedDate(date)}
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

      <div className="w-1/2 flex flex-col gap-4">
        <div>
          <h3 className="font-semibold mb-2 flex items-center text-lg"><AccessTimeTwoToneIcon className="mr-2 text-orange-500" /> Giờ nhận phòng</h3>
          <div className="flex gap-2 flex-wrap">
            {times.map((time) => (
              <button
                key={time}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedTime === time ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 flex items-center text-lg"><AccessTimeTwoToneIcon className="mr-2 text-orange-500" /> Số giờ sử dụng</h3>
          <div className="flex gap-2">
            {hoursOptions.map((hour) => (
              <button
                key={hour}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedHours === hour ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => setSelectedHours(hour)}
              >
                {hour} giờ
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="font-semibold flex items-center"><CalendarMonthTwoToneIcon className="mr-2 text-orange-500" /> Trả phòng:</span>
          <span className="font-semibold text-gray-700">{format(checkoutTime, "HH:mm, dd/MM")}</span>
        </div>

        <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-orange-600 transition-all">
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default DateTimesPicker;
