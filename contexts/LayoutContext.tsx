import { createContext, useState, useContext } from "react";
import { addDays, set } from 'date-fns';
import { TYPE_BOOKING } from "../constants";

const LayoutContext = createContext("");

export const LayoutProvider = ({ children }: any) => {
  const [inputValue, setInputValue] = useState([
    {
      [TYPE_BOOKING.hourly]: {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: 'selection',
      },
      [TYPE_BOOKING.daily]: {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: 'selection',
      },
      [TYPE_BOOKING.overNight]: {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: 'selection',
      }
    },
  ]);

  const handleInputChange = (e: any) => setInputValue(e);

  const [updateBooking, setUpdateBooking] = useState<(() => void) | null>(null);
  const [selectedType, setSelectedType] = useState<"daily" | "overnight" | "hourly">("hourly");
  const [roomName, setRoomName] = useState<string | null>(null);

  return (
    <LayoutContext.Provider value={{
      inputValue,
      handleInputChange,
      setUpdateBooking,
      updateBooking,
      setSelectedType,
      selectedType,
      roomName,
      setRoomName
    }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook để dễ sử dụng
export const useLayout = () => useContext(LayoutContext);
