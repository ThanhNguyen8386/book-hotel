import { DateRange } from "react-date-range"
import { useLayout } from "../../contexts/LayoutContext";
import 'react-date-range/dist/styles.css'; // style mặc định
import 'react-date-range/dist/theme/default.css';
import { vi } from "date-fns/locale";

const DateRangPicker = (props) => {
    const {style} = props;
      const {
        inputValue,
        handleInputChange,
        updateBooking,
        selectedType,
        setSelectedType,
        roomName
      } = useLayout();
    return (
        <div className={style}>
            <div className="bg-white shadow-xl rounded-lg p-4 border">
                <DateRange
                    ranges={inputValue}
                    onChange={(item: any) => handleInputChange([item.selection])}
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