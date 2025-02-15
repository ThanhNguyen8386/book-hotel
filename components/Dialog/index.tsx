import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { checkStatusRoom, creatOrder } from "../../api/order";
import Swal from "sweetalert2";
import { update } from "../../api/voucher";
import { creat } from "../../api/bookedDate";
import { useRouter } from "next/router";
import { bangking } from "../../api/banking";
import dayjs from "dayjs";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const DialogConfirm = ({ data, datebooks, room }: any, ref: any) => {
  const [displayBasic2, setDisplayBasic2] = useState<any>(false);
  const router = useRouter();
  console.log(data);

  const handleClose = () => {
    setDisplayBasic2(false);
  };

  useImperativeHandle(ref, () => ({
    open: (props: any) => {
      setDisplayBasic2(true);
    },
  }));

  const order = async () => {
    await creat(datebooks)
      .then(async (res: any) => {
        const newdataOrder: any = {
          status: res._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          total: data.total,
          checkins: data.checkins,
          checkouts: data.checkouts,
          room: data.room,
          statusorder: data.statusorder,
          user: data.user,
          methodpay: data.methodpay
        };
        // check nếu user áp voucher
        if (data && data.voucher) {
          newdataOrder.voucher = data.voucher._id;
        };
        await creatOrder(newdataOrder);
        // giảm số lượng voucher, lưu id user nếu user sử dụng voucher.
        if (data.voucher && data.user) {
          const users = [...data.voucher.users, data.user];
          const voucherData = {
            ...data.voucher,
            quantity: data.voucher.quantity - 1 >= 0 ? data.voucher.quantity - 1 : 0,
            users,
          }
          await update(voucherData);
        };
        Swal.fire("Đặt phòng thành công", "Thông tin chi tiết sẽ được gửi tới email của bạn.", "success");
        handleClose()
      })
      .catch(() => {
        Swal.fire({
          title: "Có lỗi gì đó.",
          icon: "error",
        });
      });
  }


  const orderTT = async () => {
    await creat(datebooks)
      .then(async (res: any) => {
        const newdataOrder: any = {
          status: res._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          total: data.total,
          checkins: data.checkins,
          checkouts: data.checkouts,
          room: data.room,
          statusorder: data.statusorder,
          user: data.user,
          methodpay: "1"
        };
        // check nếu user áp voucher
        if (data && data.voucher) {
          newdataOrder.voucher = data.voucher._id;
        };
        await creatOrder(newdataOrder).then((responsive: any) => {
          bangking({
            'id_order': responsive._id,
            "total": responsive.total,
            "orderDescription": "",
            "orderType": "billpayment",
            "language": "vn",
            "bankCode": ""
          }).then((res: any) => { router.push(`${res.redirect}`) })
        });
        // giảm số lượng voucher, lưu id user nếu user sử dụng voucher.
        if (data.voucher && data.user) {
          const users = [...data.voucher.users, data.user];
          const voucherData = {
            ...data.voucher,
            quantity: data.voucher.quantity - 1 >= 0 ? data.voucher.quantity - 1 : 0,
            users,
          }
          await update(voucherData);
        };
        Swal.fire("Đặt phòng thành công", "Thông tin chi tiết sẽ được gửi tới email của bạn.", "success");
        handleClose()
      })
      .catch(() => {
        Swal.fire({
          title: "Có lỗi gì đó.",
          icon: "error",
        });
      });
  }

  const handleCheckRoom = async () => {
    // kiểm tra phòng đang có khách không.
    const { isRoomEmpty } = await checkStatusRoom({
      checkin: data.checkins,
      checkout: data.checkouts,
      room: data.room,
    });

    return isRoomEmpty;
  }

  //format tiền.
  const formatCurrency = (currency: any) => {
    const money = +currency >= 0 ? currency : 0;
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(money);
  }
  return (
    <div>
      <Dialog fullWidth={true} open={displayBasic2} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Kiểm tra thông tin đặt phòng</h1>
          <IconButton
            onClick={() => {
              handleClose();
            }}
            aria-label="delete"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className="card">
          <div className="my-[30px]">
            <table className=" py-[30px] w-[500px] m-auto drop-shadow-md rounded-md">
              <tbody>
                <tr className="bg-[#F5FAFF] rounded-lg">
                  <td className="py-[10px] pl-[20px]">
                    <label htmlFor="" className="font-medium text-[#A7A7A7]">
                      Tên khách hàng
                    </label>{" "}
                  </td>
                  <td className="pl-[42px] text-[#424241]">{data.name}</td>
                </tr>
                <tr className="bg-[#ffffff]">
                  <td className="py-[10px] pl-[20px]">
                    <label htmlFor="" className="font-medium text-[#A7A7A7]">
                      Email{" "}
                    </label>{" "}
                  </td>
                  <td className="pl-[42px] text-[#424241]"> {data.email}</td>
                </tr>
                <tr className="bg-[#F5FAFF] ">
                  <td className="py-[10px] pl-[20px]">
                    <label htmlFor="" className="font-medium text-[#A7A7A7]">
                      Số điện thoại
                    </label>{" "}
                  </td>
                  <td className="py-[5px] pl-[42px] text-[#424241]">{data.phone}</td>
                </tr>
                <tr className=" bg-[#ffffff]">
                  <td className="py-[10px] pl-[20px]">
                    <label htmlFor="" className="font-medium text-[#A7A7A7]">
                      Tên phòng đặt
                    </label>{" "}
                  </td>
                  <td className="py-[5px] pl-[42px] text-[#424241]">{room}</td>
                </tr>
                <tr className="bg-[#f5faff]">
                  <td className="py-[10px] pl-[20px]">
                    <label htmlFor="" className="font-medium text-[#A7A7A7]">
                      Tạm tính
                    </label>{" "}
                  </td>
                  <td className="py-[5px] pl-[42px]  text-[#424241]">{formatCurrency(data.total)}</td>
                </tr >
                {data && data.voucher && (
                  <tr className="bg-[#f5faff]">
                    <td className="py-[10px] pl-[20px]">
                      <label htmlFor="" className="font-medium text-[#A7A7A7]">
                        Voucher
                      </label>{" "}
                    </td>
                    <td className="py-[5px] pl-[42px] text-[#424241]">
                      {data.voucher.code} (-{formatCurrency(data.voucher.discount)})
                    </td>
                  </tr >
                )}
                <tr className=" bg-[#ffffff]">
                  <td className="py-[10px] pl-[20px]">
                    <label htmlFor="" className="font-medium text-[#A7A7A7]">
                      Tổng tiền
                    </label>{" "}
                  </td>
                  <td className="py-[5px] pl-[42px] text-[#424241]">
                    {formatCurrency(data.total - (data.voucher?.discount || 0))}
                  </td>
                </tr>
                <tr className="bg-[#F5FAFF] ">
                  <td className="py-[10px] pl-[20px]">
                    <label htmlFor="" className="font-medium text-[#A7A7A7]">
                      Check In
                    </label>{" "}
                  </td>
                  <td className="py-[5px] pl-[42px] text-[#424241]">
                    {" "}
                    {dayjs(datebooks.dateFrom).format("HH:mm DD/MM/YYYY")}{" "}
                  </td>
                </tr>
                <tr className="bg-[#ffffff]">
                  <td className="py-[10px] pl-[20px]">
                    <label htmlFor="" className="font-medium text-[#A7A7A7]">
                      Check Out
                    </label>{" "}
                  </td>
                  <td className="py-[5px] pl-[42px] text-[#424241]">
                    {dayjs(datebooks.dateTo).format("HH:mm DD/MM/YYYY")}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="max-w-[500px] m-auto pt-[30px]">
              <p className="text-center text-gray-700 text-[15px]">
                Bạn muốn{" "}
                <span className="font-medium text-green-500 underline decoration-solid">thanh toán trực tiếp</span> hay{" "}
                <span className="font-medium text-blue-500 underline decoration-solid">thanh toàn trực tuyến</span> thì
                vui lòng chọn vào mục bạn mốn!
              </p>
            </div>
          </div>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <div className="flex">
              <div className="mr-[20px]">
                <button className="px-4 py-2 rounded-md shadow-xl bg-[green] text-white" onClick={async () => {
                  const isRoomEmpty = await handleCheckRoom();
                  if (isRoomEmpty) {
                    order()
                  } else {
                    toastr.info("Phòng bạn đang chọn hiện tại đang có khách, vui lòng thử chọn lại");
                  }
                }}>
                  Thanh toán trực tiếp
                </button>
              </div>
              <div>
                <button
                  className="px-4 py-2 rounded-md shadow-xl bg-[orange] text-white"
                  onClick={async () => {
                    const isRoomEmpty = await handleCheckRoom();

                    if (isRoomEmpty) {
                      orderTT()
                    } else {
                      toastr.info("Phòng bạn đang chọn hiện tại đang có khách, vui lòng thử chọn lại");
                    }

                  }}
                >
                  Thanh toán trực tuyến
                </button>
              </div>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
export default forwardRef(DialogConfirm);