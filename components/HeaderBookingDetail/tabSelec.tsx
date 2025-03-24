'use client';

import { useEffect, useState } from 'react';

import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import DatePickerFilter from '../DatePickerFilter';

export default function BookingFilter() {
    const [selectedType, setSelectedType] = useState<'hourly' | 'overnight' | 'daily'>('hourly');
    
    // Khởi tạo với undefined thay vì null
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
    
    // Thêm state để xác định khi nào client-side đã được mounted
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Đánh dấu rằng component đã được mounted trên client
        setIsMounted(true);
        
        const now = new Date();
        setCheckIn(now);
        setCheckOut(new Date(now.getTime() + 2 * 60 * 60 * 1000)); // cộng 2h giả định
    }, []);

    return (
        <div className="flex items-center rounded-full border px-4 py-2 gap-4 shadow-sm bg-white overflow-auto">
            {/* === Kiểu thuê === */}
            <div className="flex items-center gap-6 rounded-full border-r pr-4">
                {[
                    { label: 'Theo giờ', value: 'hourly', icon: <HourglassFullTwoToneIcon /> },
                    { label: 'Qua đêm', value: 'overnight', icon: <DarkModeTwoToneIcon /> },
                    { label: 'Theo ngày', value: 'daily', icon: <CalendarMonthTwoToneIcon /> },
                ].map(({ label, value, icon }) => (
                    <div
                        key={value}
                        onClick={() => setSelectedType(value as any)}
                        className={`flex flex-col items-center cursor-pointer text-sm font-semibold transition ${selectedType === value ? 'text-orange-500' : 'text-black'
                            }`}
                    >
                        <div className="text-lg">{icon}</div>
                        <span>{label}</span>
                        {selectedType === value && <div className="w-4 h-[2px] bg-orange-500 rounded-full mt-1" />}
                    </div>
                ))}
            </div>

            {/* === Địa điểm === */}
            <div className="text-sm font-semibold text-gray-400 border-r pr-4">
                <div>Địa điểm</div>
                <div className="text-gray-600 whitespace-nowrap truncate w-40">Cloud 9 Hotel Quang Tr...</div>
            </div>

            {/* === Nhận phòng === */}
            <div className="text-sm font-semibold border-r pr-4">
                <div className="flex items-center gap-1 text-gray-500">
                    <LoginTwoToneIcon fontSize="small" />
                    <span>Nhận phòng</span>
                </div>
                {/* Hiển thị placeholder khi chưa mount client */}
                {!isMounted && (
                    <div className="outline-none text-black">--:-- --/--</div>
                )}
            </div>

            {/* === Trả phòng === */}
            <div className="text-sm font-semibold pr-4">
                <div className="flex items-center gap-1 text-gray-500">
                    <LogoutTwoToneIcon fontSize="small" />
                    <span>Trả phòng</span>
                </div>
                {!isMounted && (
                    <div className="outline-none text-black">--:-- --/--</div>
                )}
            </div>

            {/* === Button === */}
            <button className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange-600 transition">
                Cập nhật
            </button>
        </div>
        // <DatePickerFilter />
    );
}