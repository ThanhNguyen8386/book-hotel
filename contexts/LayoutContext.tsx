import { createContext, useState, useContext } from "react";
import { addDays, format } from 'date-fns';

const LayoutContext = createContext("");

export const LayoutProvider = ({ children }: any) => {
  const [inputValue, setInputValue] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
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
