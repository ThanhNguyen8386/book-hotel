/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Divider, Stack, TextField } from '@mui/material';
import useCategory from '../../../hook/useCategory'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import RoomInfo from './RoomInfo';
import {
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    CreditCard as CreditCardIcon,
    AccountBalanceWallet as WalletIcon,
    VerifiedUser as VerifiedUserIcon,
    Refresh as RefreshIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material'
import OrderHook from '../../../hook/use-order';
import { sendMail, update } from "../../../api/order";

function orderDetail(props: any, ref: any) {
    const { status: statuss } = props;
    var _ = require('lodash');
    const [open, setOpen] = React.useState(false);
    const categoryDetail = {
        name: "",
        phone: "",
        email: "",
        voucher: "",
        statusorder: 100,
        methodpay: "",
        total: "",
        methodPay: "",
        code: ""
    }
    const [defaultCategory, setDefaultCategory] = React.useState(categoryDetail)
    const [statusOrder, setStatusOrder] = React.useState("")
    const refMode = React.useRef(null);
    const { data, error, mutate } = OrderHook()


    const defaultErrors = {
        name: false,
        phone: false,
        email: false,
        voucher: false,
        statusorder: false,
        methodpay: false,
        total: false,
        methodPay: false,
        code: false
    };
    const [errors, setErrors] = React.useState(defaultErrors);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDefaultCategory(categoryDetail);
        setErrors(defaultErrors)
    };

    React.useImperativeHandle(ref, () => ({
        update: (item: any, type: any) => {
            setDefaultCategory(item)
            setStatusOrder(item.statusorder)
            refMode.current = type
            handleClickOpen()
        }
    }))

    const validate = (props: any, _planTask: any) => {
        const _defaultCategory = { ..._planTask };
        let result = { ...errors };
        // validate all props
        if (props.length === 0) {
            for (const property in result) {
                props.push(property);
            }
        }

        // validate props
        props.forEach((prop: any) => {
            switch (prop) {
                case "statusorder":
                    result[prop] = _defaultCategory.statusorder.length <= 0;
                    break;
                default:
                    break;
            }
        });

        // set state
        setErrors(result);
        let errorList = _.uniq(Object.values(result).filter((f) => f));
        return errorList;
    };

    const applyChange = (prop: any, val: any) => {
        const _defaultCategory = { ...defaultCategory };
        switch (prop) {
            case "statusorder":
                _defaultCategory.statusorder = val;
                break;
            default:
                _defaultCategory[prop] = val;
        }
        validate([prop], _defaultCategory)
        setDefaultCategory(_defaultCategory);
    }

    const [loading, setLoading] = React.useState(true)

    const submit = (e: any) => {
        e.preventDefault()
        const _defaultCategory = { ...defaultCategory };
        const isValid = validate([], _defaultCategory);
        const disableSubmit = statusOrder == _defaultCategory.statusorder || _defaultCategory.statusorder == 100;
        if (isValid.length == 0 || !disableSubmit) {
            if (refMode.current == "CREATE") {
                setLoading(false)
                try {
                } catch (error) {
                }
            }
            else {
                setLoading(false)
                try {
                    update(_defaultCategory).then(() => {
                        <Alert variant="filled" severity="success">
                            This is a success alert — check it out!
                        </Alert>
                        setLoading(true)
                        handleClose()
                        toastr.success("Sửa thành công");
                        mutate()
                    }
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }
    }

    // format tiền.
    const formatCurrency = (currency: number) => {
        const tempCurrency = +currency >= 0 ? currency : 0;
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
    };

    const methodPay = (key: string) => {
        if (key == "0") {
            return <div className="pb-[20px]">
                <span className="float-right">
                    Thanh toán trực tiếp
                </span>

            </div>
        } else if (key == "1") {
            return <div className="pb-[20px]">
                <span className="float-right">Thanh toán trực tuyến</span> <br />
                <span className="float-right text-red-500">Chưa thanh toán</span>
            </div>
        } else if (key == "2") {
            return <div className="pb-[20px]">
                <span className="float-right">Thanh toán trực tuyến</span> <br />
                <span className="float-right">Đã thanh toán</span>
            </div>
        }
    }

    const updateStatus = (status: any) => {
        if (status == 0) {
            return [
                { value: 100, name: "--------------------------" },
                { check: true, value: 1, name: "Đã Xác nhận" },
                { check: false, value: 2, name: "Đang có khách" },
                { check: false, value: 4, name: "Hủy" },
            ]
            // return (
            //     <select
            //         id=""
            //         className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            //     >
            //         <option check:true,  value="1">Đã Xác nhận</option>
            //         <option check:true,  value="2">Đang có khách</option>
            //         <option check:true,  value="4">Hủy</option>
            //     </select>
            // );
        } else if (status == 1) {
            return [
                { value: 100, name: "--------------------------" },
                { check: true, value: 2, name: "Đang có khách" },
                { check: false, value: 3, name: "Đã trả phòng" },
                { check: false, value: 4, name: "Hủy" },
            ]
            // return (
            //     <select
            //         id=""
            //         className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            //     >
            //         <option check:true,  value="2">Đang có khách</option>
            //         <option check:true,  value="3">Đã trả phòng</option>
            //         <option check:true,  value="4">Hủy</option>
            //     </select>
            // );
        } else if (status == 2) {
            return [
                { value: 100, name: "--------------------------" },
                { check: true, value: 3, name: "Đã trả phòng" },
            ]
            // return (
            //     <select
            //         id=""
            //         className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            //     >
            //         <option check:true,  value="3">Đã trả phòng</option>
            //         {/* <option check:true,  value="4">Hủy</option> */}
            //     </select>
            // );
        } else if (status == 3) {
            return [
                { value: 100, name: "--------------------------" },
                { check: true, value: 100, name: "Đã trả phòng" },
            ]
        }
    };

    return (
        <div>
            <Dialog
                maxWidth="lg"
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <AppBar sx={{ position: 'sticky', display: 'flex', flex: 'justify-between' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {refMode.current == "CREATE" ? "Thêm mới" : "Chỉnh sửa"}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-7/12 border-r border-gray-100">
                                <RoomInfo roomData={defaultCategory} />
                            </div>
                            <div className="w-full md:w-5/12">
                                <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 h-full">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">
                                            Thông tin khách hàng
                                        </h2>
                                        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8 hover:shadow-lg transition-all duration-300">
                                        <div className="space-y-5">
                                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                                    <PersonIcon
                                                        className="text-blue-500"
                                                        sx={{
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                    Name:
                                                </span>
                                                <span className="text-gray-900">{defaultCategory?.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                                    <PhoneIcon
                                                        className="text-blue-500"
                                                        sx={{
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                    Phone:
                                                </span>
                                                <span className="text-gray-900">{defaultCategory?.phone}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                                    <EmailIcon
                                                        className="text-blue-500"
                                                        sx={{
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                    Email:
                                                </span>
                                                <span className="text-gray-900">{defaultCategory?.email}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                                    <CreditCardIcon
                                                        className="text-blue-500"
                                                        sx={{
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                    Tạm tính:
                                                </span>
                                                <span className="text-gray-900">{formatCurrency(defaultCategory?.total)}</span>
                                            </div>
                                            {defaultCategory?.voucher && (
                                                <div className="pb-[20px]">
                                                    <span className="font-medium">Voucher:</span>
                                                    <span className="float-right">
                                                        {defaultCategory?.voucher.code} (-{formatCurrency(defaultCategory?.voucher?.discount)})
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center text-lg">
                                                <span className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <WalletIcon
                                                        className="text-orange-500"
                                                        sx={{
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                    Tổng tiền:
                                                </span>
                                                <span className="font-bold text-orange-500">{formatCurrency(defaultCategory?.total - (defaultCategory?.voucher?.discount || 0))}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8 hover:shadow-lg transition-all duration-300">
                                        <div className="space-y-5">
                                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                                    <VerifiedUserIcon
                                                        className="text-blue-500"
                                                        sx={{
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                    Trạng thái:
                                                </span>
                                                <div className="relative">
                                                    <Chip
                                                        label={statuss(statusOrder).name}
                                                        size="small"
                                                        color={statuss(statusOrder).color}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                                    <CreditCardIcon
                                                        className="text-blue-500"
                                                        sx={{
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                    Phương thức:
                                                </span>
                                                <span className="text-gray-900">{methodPay(defaultCategory?.methodpay)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between ">
                                        <div className="">
                                            <select
                                                id=""
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                onChange={(e: any) => applyChange("statusorder", e.target.value)}
                                            >
                                                {updateStatus(statusOrder)?.map((item: any, index: any) => {
                                                    return <option
                                                        key={index}
                                                        value={item.value}>
                                                        {item.name}
                                                    </option>
                                                })}
                                            </select>
                                        </div>
                                        <button
                                            disabled={statusOrder == defaultCategory.statusorder || defaultCategory.statusorder == 100}
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-1 rounded-md text-sm shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                                            onClick={(e) => submit(e)}
                                        >
                                            <RefreshIcon
                                                sx={{
                                                    fontSize: 18,
                                                }}
                                            />
                                            Cập Nhật
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </div >
    );
}

export default React.forwardRef(orderDetail)