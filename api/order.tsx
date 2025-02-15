import { OrderType } from "../types/order";
import instance from "./instance";

export const creatOrder = (item: OrderType) => {
  const url = "order";
  return instance.post(url, item);
};
export const sendMail = (item: any) => {
  const url = "sendMail";
  return instance.post(url, item);
};

export const listOrder = () => {
  const url = "order";
  return instance.get(url);
};

export const detail = (id: any | undefined) => {
  const url = `order/${id}`;
  return instance.get(url);
};
export const listOrderUser = (id: any) => {
  const url = `orders/${id}`;
  return instance.get(url);
};
export const update = (item: OrderType) => {
  const url = `order/${item._id}/edit`;
  return instance.put(url, item);
};

export const checkUserBookRoom = (data: { user: string; room?: string }): Promise<{ isBooked: boolean  }> => {
  const url = "order/checkUserBookRoom";
  return instance.post(url, data);
};

// kiểm tra trạng thái phòng trước khi đặt phòng.
export const checkStatusRoom = (data: { checkin: Date, checkout: Date, room: string }): Promise<{isRoomEmpty: boolean}> => {
  const url = "order/checkStatusRoom";
  return instance.post(url, data);
}