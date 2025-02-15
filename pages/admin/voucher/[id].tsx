/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";
import AdminShowForPermissionLayout from "../../../components/Layout/AdminShowForPermissionLayout";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useRouter } from "next/router";
import useVoucher from "../../../hook/use-voucher";

type Props = {};

type formInput = {
  code: string;
  quantity: number;
  discount: number;
  activeTime: string;
  expriedTime: string;
};

const UpdateVoucher = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<formInput>();
  const activeTime = useRef({});

  const router = useRouter();
  const { id }: any = router.query;
  const { data, edit } = useVoucher(id);

  activeTime.current = watch("activeTime", "");

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        activeTime: formatTime(data.activeTime),
        expriedTime: formatTime(data.expriedTime),
      });
      activeTime.current = watch("activeTime", data.activeTime);
    }
  }, [data, reset, watch]);

  const handleAddVoucher: SubmitHandler<formInput> = async (data: formInput) => {
    await edit({
      _id: id,
      code: data.code,
      quantity: +data.quantity,
      discount: +data.discount,
      activeTime: data.activeTime,
      expriedTime: data.expriedTime,
    });

    toastr.success("Cập nhật voucher thành công");
    router.push("/admin/voucher");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    const getDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const getMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const getHours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const getMinutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${date.getFullYear()}-${getMonth}-${getDate}T${getHours}:${getMinutes}`;
  };

  return (
    <>
      <Head>
        <title>Cập nhật Voucher</title>
      </Head>
      <div className="flex w-[100vh] min-w-full items-center justify-center">
        <form onSubmit={handleSubmit(handleAddVoucher)} className="m-4 p-4 shadow-xl rounded w-full">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              {...register("code", {
                required: "Vui lòng nhập mã voucher",
                pattern: {
                  value: /^\S*$/,
                  message: "Mã giảm giá không chứa khoảng trắng",
                },
              })}
              name="code"
              id="code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="text"
              className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Code
            </label>
            <div className="text-sm mt-1 text-red-500">{errors.code?.message}</div>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              {...register("quantity", {
                required: "Vui lòng nhập số lượng voucher",
                validate: (value) => +value >= 0 || "Vui lòng nhập số",
              })}
              name="quantity"
              id="quantity"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="text"
              className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số lượng
            </label>
            <div className="text-sm mt-1 text-red-500">{errors.quantity?.message}</div>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              {...register("discount", {
                required: "Vui lòng nhập số lượng giảm",
                validate: (value) => +value >= 0 || "Vui lòng nhập số",
              })}
              name="discount"
              id="discount"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="text"
              className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số lượng giảm (VNĐ)
            </label>
            <div className="text-sm mt-1 text-red-500">{errors.discount?.message}</div>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="activeTime" className="block text-sm font-medium text-gray-700">
              Bắt đầu hiệu lực
            </label>
            <input
              type="datetime-local"
              {...register("activeTime", {
                required: "Vui lòng nhập thời gian hiệu lực",
              })}
              name="activeTime"
              id="activeTime"
              className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md valid"
              defaultValue=""
              aria-invalid="false"
            />
            <div className="text-sm mt-1 text-red-500">{errors.activeTime?.message}</div>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="expriedTime" className="block text-sm font-medium text-gray-700">
              Hết hiệu lực
            </label>
            <input
              type="datetime-local"
              {...register("expriedTime", {
                required: "Vui lòng nhập thời gian hết hiệu lực",
                validate: (value) => {
                  const expriedTime = new Date(value).getTime();
                  const startTime = new Date(activeTime.current as string).getTime();

                  return expriedTime > startTime || "Thời gian hết hiệu lực phải lớn hơn thời gian bắt đầu hiệu lực";
                },
              })}
              name="expriedTime"
              id="expriedTime"
              className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md valid"
              defaultValue=""
              aria-invalid="false"
            />
            <div className="text-sm mt-1 text-red-500">{errors.expriedTime?.message}</div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

UpdateVoucher.Layout = AdminShowForPermissionLayout;
export default UpdateVoucher;
