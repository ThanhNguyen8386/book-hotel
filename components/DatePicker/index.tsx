import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'

// import format from 'date-fns/format'
// import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
// import vi from "date-fns/locale/vi"

type prop = {
  date: any
}


const DateRangePickerComp = ({ date }: prop) => {

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      // endDate: addDays(new Date(), date),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e: any) => {
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e: any) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  return (
    <div className="relative top-[50%] translate-y-[30%]">
      <div className="flex">
        <div className="relative">
          <label className='absolute top-[-30%] left-[5px] text-xs font-semibold flex items-center' htmlFor="inputStartDate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Ngày nhận
          </label>
          <input
            id='inputStartDate'
            // value={`${format(range[0].startDate, "dd/MM/yyyy")}`}
            readOnly
            className="p-2 outline-none font-semibold"
            onClick={() => setOpen(open => !open)}
          />
        </div>
        <div className="relative">
          <label htmlFor="inputEndDate" className='absolute top-[-30%] left-[5px] text-xs font-semibold flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Ngày trả
          </label>
          <input
            id='inputEndDate'
            // value={`${format(range[0].endDate, "dd/MM/yyyy")}`}
            readOnly
            className="p-2 outline-none font-semibold"
            onClick={() => setOpen(open => !open)}
          />
        </div>
      </div>
      <div className={`absolute top-[140%] ${open ? "visible" : "invisible"} `} ref={refOne}>
        <DateRangePicker
          onChange={(item:any) => setRange([item.selection])}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          // locale={vi}
          ranges={range}
          months={2}
          direction="horizontal"
          className="calendarElement"
          rangeColors={["orange"]}
        />
      </div>

    </div>
  )
}

export default DateRangePickerComp