import instance from "./instance";

export const getAvailableVouchers = ({roomId, checkIn, checkOut}:{roomId:string, checkIn:string, checkOut:string}) => {
  const url = `getAvailableVouchers`;
  return instance.get(url, {
    params: {
      roomId,
      checkIn,
      checkOut,
    },
  });
};