import React, { useEffect, useState } from 'react'

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { API_URL } from '../../constants';

type props = {
  id: any,
  getDate: any,
  label: any,
}

export default function DateBooked({ id, getDate, label }: props) {
  const [dataDate, setDataDate] = useState([])
  const [value, setValue] = React.useState<any>(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`${API_URL}/dateBooked`).then((res) => res.json())
      setDataDate(data)
    }
    getData()
  }, [])

  getDate(value?.$d)
  const bookedDates: any[] = []

  const getBookedDates = () => {
    dataDate?.forEach((item: any) => {
      if (item.room == id) {
        const startDate = new Date(item.dateFrom).getTime()
        const endDate = new Date(item.dateTo).getTime()
        const rangeDate = ((((endDate - startDate) / 1000) / 60) / 60) / 24
        let rangeDateValue = startDate;
        for (let i = 0; i < rangeDate; i++) {
          bookedDates.push(rangeDateValue += 86400000)
        }
        bookedDates.push(startDate, endDate)
      }
      else return bookedDates
    })
  }
  getBookedDates()

  const disableBookedDays = (date: any) => {
    const convertedIntoDateObject = bookedDates.map((bookedDate) => {
      return new Date(bookedDate).getTime();
    });
    //  return true
    return date.$d.getTime() === 0 || date.$d.getTime() === 6 || convertedIntoDateObject.includes(date.$d.getTime());
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className='w-full'
        shouldDisableDate={disableBookedDays}
        label={label}
        disablePast
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
