import React from 'react'

type Props = {}

const InputSearch = (props: Props) => {
  const date = new Date()
  const [selectedDate, handleDateChange] = React.useState<any>([date, null]);
  return (
        <div className={`${visible ? "visible scale-100 opacity-100" : "invisible scale-50 opacity-0"} duration-300 translate-x-[-50%] translate-y-[-80%] absolute top-[100%] left-[50%] w-[80%] mx-auto bg-white shadow-xl rounded-xl p-4`}>
            <div className="flex justify-center">
                <button className={`${indexTab == 3 ? 'text-[red] border-b border-[red]' : 'border-b border-[white]'} duration-150 hover:text-[red] flex flex-col items-center px-4`} onClick={() => { setIndexTab(3) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Theo giờ</p>
                </button>

                <button className={`${indexTab == 2 ? 'text-[red] border-b border-[red]' : null} duration-150 hover:text-[red] flex flex-col items-center px-4`} onClick={() => { setIndexTab(2) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                    <p>Qua đêm</p>
                </button>

                <button className={`${indexTab == 1 ? 'text-[red] border-b border-[red]' : null} duration-150 hover:text-[red] flex flex-col items-center px-4`} onClick={() => { setIndexTab(1) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                    <p>Theo ngày</p>
                </button>
            </div>
            <div className={`border rounded-full p-4 mt-4 relative flex justify-center`}>
                {indexTab == 1 ? <DateRangerPicker /> : ""}
                {indexTab == 2 ? <DateRangerPicker /> : ""}
                {indexTab == 3 ? <DateTimePickers /> : ""}
                <div onClick={() => { open(selectedDate) }} className="flex px-4 py-2 bg-[orange] rounded-full text-white cursor-pointer items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <p>Tìm kiếm</p>
                </div>
            </div>
        </div>
      </div >
  )
}

export default InputSearch