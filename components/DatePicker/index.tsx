'use client';

import { DateRange } from 'react-date-range';
import { vi } from 'date-fns/locale';
import { useState } from 'react';
import { addDays, set } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useLayout } from '../../contexts/LayoutContext';
// import '@/styles/calendar.css'; // tuỳ chỉnh nếu có

export default function CustomCalendar() {
    const {
        inputValue,
        handleInputChange,
        selectedType
    } = useLayout();
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: 'selection',
        },
    ]);

    const handleSelect = (ranges: any) => {
        const selected = ranges.selection;
        handleInputChange([
            {
                ...inputValue[0],
                [selectedType]: {
                    startDate: set(selected.startDate, { hours: 22 }),
                    endDate: set(addDays(selected.startDate, 1), { hours: 12 }),
                    key: 'selection',
                }
            },
        ]);
    };

    return (
        <div className="rounded-xl border bg-white p-4 shadow-md w-fit">
            <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={[inputValue[0][selectedType]]}
                locale={vi}
                months={1}
                direction="vertical"
                showMonthArrow={true}
                rangeColors={['#ff5a1f']}
                className="custom-calendar"
            />
        </div>
    );
}
