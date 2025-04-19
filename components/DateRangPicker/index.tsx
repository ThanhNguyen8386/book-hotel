import { DateRange } from "react-date-range"
import { useLayout } from "../../contexts/LayoutContext";
import 'react-date-range/dist/styles.css'; // style mặc định
import 'react-date-range/dist/theme/default.css';
import { vi } from "date-fns/locale";
import { set } from "date-fns";

const DateRangPicker = (props) => {
    const { style } = props;
    const {
        inputValue,
        handleInputChange,
        selectedType
    } = useLayout();

    const handleSelect = (ranges: any) => {
        const selected = ranges.selection;
        handleInputChange([
            {
                ...inputValue[0],
                [selectedType]: {
                    startDate: set(selected.startDate, { hours: 14 }),
                    endDate: set(selected.endDate, { hours: 12 }),
                    key: 'selection',
                }
            },
        ]);
    };

    return (
        <div className={style}>
            <div className="bg-white shadow-xl rounded-lg p-4 border">
                <DateRange
                    ranges={[inputValue[0][selectedType]]}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    direction="horizontal"
                    minDate={new Date()}
                    locale={vi}
                    rangeColors={["#f97316"]}
                    color="#f97316"
                />
            </div>
        </div>
    )
}

export default DateRangPicker