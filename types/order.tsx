import { Voucher } from "./voucher";
export type OrderType = {
  checkins: string;
  _id?: number;
  name: string;
  email: string;
  phone: number;
  statusorder: number;
  total: number;
  room: string;
  user: string;
  status: string;
  voucher: Voucher;
};
