// contexts/RoomContext.tsx
import { createContext, useContext } from 'react';

export const RoomContext = createContext<{ roomName?: string }>({});

export const useRoom = () => useContext(RoomContext);
