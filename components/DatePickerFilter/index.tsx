// components/DatePickerFilter/DatePickerFilter.tsx
'use client';

import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// import './datepicker.css';
import { vi } from 'date-fns/locale';
import { format } from 'date-fns';

import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';

export default function DatePickerFilter() {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleApply = () => {
    setShowPicker(false);
  };

  return (
    <div className="relative bg-white rounded-full border px-4 py-2 flex items-center gap-4 w-full max-w-6xl">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center text-orange-500 font-semibold text-sm">
          <CalendarMonthTwoToneIcon fontSize="small" />
          <span>Theo ngày</span>
        </div>

        <div className="text-gray-400 text-sm">
          <p className="text-xs">Địa điểm</p>
          <p className="truncate max-w-[140px]">Cloud 9 Hotel Quang Trung</p>
        </div>
      </div>

      <div className="border-l h-8 mx-2" />

      <div onClick={() => setShowPicker(!showPicker)} className="cursor-pointer flex items-center gap-2">
        <div className="text-sm">
          <p className="text-xs">Nhận phòng</p>
          <p className="font-medium">
            <LoginIcon fontSize="inherit" className="mr-1" />
            {format(range[0].startDate, 'HH:mm, dd/MM')}
          </p>
        </div>

        <div className="border-l h-8 mx-2" />

        <div className="text-sm">
          <p className="text-xs">Trả phòng</p>
          <p className="font-medium">
            <ExitToAppIcon fontSize="inherit" className="mr-1" />
            {format(range[0].endDate, 'HH:mm, dd/MM')}
          </p>
        </div>
      </div>

      <button className="ml-auto bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
        Cập nhật
      </button>

      {showPicker && (
        <div className="absolute top-16 left-0 z-50 bg-white shadow-lg p-4 rounded-xl">
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            months={2}
            direction="horizontal"
            locale={vi}
            showDateDisplay={false}
            rangeColors={["#fb923c"]}
            minDate={new Date()}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleApply}
              className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm"
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
