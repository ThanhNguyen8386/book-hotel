import { Voucher } from "../types/voucher";
import instance from "./instance";

export const remove = (_id: string) => {
  const url = `voucher/${_id}/delete`;
  return instance.delete(url);
};

export const getAll = () => {
  const url = `voucher`;
  return instance.get(url);
};
//
export const getOne = (id?: any) => {
  const url = `voucher/${id}`;
  return instance.get(url);
};
// getByCode
export const getVoucherByCode = (code: string) : Promise<Voucher> => {
  const url = `voucher/getByCode/${code}`;
  return instance.get(url);
};

export const create = (voucher: Voucher): Promise<Voucher> => {
  const url = `voucher`;
  return instance.post(url, voucher);
};

export const update = (voucher: Voucher) => {
  const url = `voucher/${voucher._id}/edit`;
  return instance.put(url, voucher);
};

// gửi mail voucher.
export const sendMailVoucher = (data: { user: string }) => {
  const url = "voucher/sendMail";
  return instance.post(url, data);
}