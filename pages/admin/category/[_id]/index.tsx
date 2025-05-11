import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import { DashboardLayout } from '../../../../components/dashboard-layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Chip, CircularProgress, Dialog, Stack, Switch, TextField } from '@mui/material';
import CustomAccordion from '../../../../components/CustomAccordion';
import CustomSelect from '../../../../components/CustomSelect';
import AddIcon from '@mui/icons-material/Add';
import { listfac } from '../../../../api/facilities';
import AlertMessage from '../../../../components/AlertMessage';
import useCategory from '../../../../hook/useCategory';
import CustomTextField from '../../../../components/CustomTextField';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import BaseDialog from '../../../../components/BaseDialog';
import Room_admin_detail from '../../room/Room_admin_detail';
import dynamic from 'next/dynamic';

const CKEditorClient = dynamic(() => import('../../../../components/CkEditor'), {
    ssr: false,
});
const sections = [
    { id: "basic-info", label: "Thông tin cơ bản" },
    { id: "product-detail", label: "Chi tiết sản phẩm" },
    { id: "sales-info", label: "Thông tin bán hàng" },
    { id: "shipping", label: "Vận chuyển" },
];

export default function AddCategory() {
    const router = useRouter();
    var _ = require('lodash');
    const [activeSection, setActiveSection] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [facilities, setFacilities] = React.useState<any[]>([]);
    const controllerRef = React.useRef<AbortController | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [dialogType, setDialogType] = useState<'facilities' | 'addRoom' | null>(null);
    const { create, edit, data, mutate } = useCategory()
    const refDetail = React.useRef<any>();

    const defaultCategory = {
        name: "",
        status: true,
        address: "",
        rooms: [
            {
                name: "",
                description: "",
                image: [],
                listFacility: [
                    {
                        name: "",
                        icon: ""
                    }
                ]
            }
        ],
        facilities: [
            {
                name: "",
                icon: ""
            }
        ],
        introduction: "",
        type: ""
    };

    const defaultErrors = {
        name: false,
        status: false,
        address: false,
        rooms: false,
        facilities: false,
        introduction: false,
        type: false
    };

    const [category, setCategory] = React.useState(defaultCategory);
    const [errors, setErrors] = React.useState(defaultErrors);
    const [saving, setSaving] = React.useState(false);

    const actionCrud = {
        create: (item: any, type: any) => {
            refDetail.current.create(item, type)
        },
        update: (item: any, type: any) => {
            refDetail.current.update(item, type)
        }
    }

    const handleClickOpen = (type: 'facilities' | 'addRoom') => {
        setDialogType(type);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
    };

    const loadFacilities = async () => {
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            const res = await listfac(controller.signal);
            setFacilities(res.data);
        } catch (err: any) {
            if (err.name !== 'AbortError') {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (data) {
            setCategory(data);
        }
    }, [data])
    console.log(category, "hihi");

    React.useEffect(() => {
        if (open) {
            loadFacilities();
        }
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        };
    }, [open]);

    React.useEffect(() => {
        const handleScroll = () => {
            let currentSection = "";
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = section.id;
                    }
                }
            });
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const applyChange = (prop: any, val: any) => {
        const _defaultCategory = { ...category };
        switch (prop) {
            case "name":
                _defaultCategory.name = val;
                break;
            case "status":
                _defaultCategory.status = val;
                break;
            case "address":
                _defaultCategory.address = val;
                break;
            case "introduction":
                _defaultCategory.introduction = val;
                break;
            default:
                (_defaultCategory as any)[prop] = val;
        }
        validate([prop], _defaultCategory)
        setCategory((prev) => ({
            ...(prev as any),
            [prop]: val,
        }));
    };

    const validate = (props: any[], _data: any) => {
        const result = { ...errors };
        if (props.length === 0) {
            for (const property in result) {
                props.push(property);
            }
        }
        props.forEach((prop) => {
            switch (prop) {
                case "name":
                case "introduction":
                case "type":
                case "address":
                    result[prop as keyof typeof result] = !_data[prop];
                    break;
                default:
                    break;
            }
        });
        setErrors(result);
        return _.uniq(Object.values(result).filter(Boolean));
    };

    const submit = (e: any) => {
        e.preventDefault()
        const _defaultCategory = { ...category };
        const isValid = validate([], _defaultCategory);

        if (isValid.length == 0) {
            try {
                edit(_defaultCategory).then(() => {
                    <AlertMessage
                        type="success" // hoặc 'error', 'info', 'warning'
                        message="Chỉnh sửa khách sạn thành công!"
                        show={showAlert}
                        onClose={() => setShowAlert(false)}
                        duration={5000}
                    />
                })
            } catch (error) {
                <AlertMessage
                    type="success" // hoặc 'error', 'info', 'warning'
                    message="Hủy phòng thành công!"
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    duration={5000}
                />
            }
        }
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <AlertMessage
                type="success" // hoặc 'error', 'info', 'warning'
                message="Thêm Khách sạn thành công!"
                show={showAlert}
                onClose={() => setShowAlert(false)}
                duration={5000}
            />
            <div className="flex-1 overflow-auto p-6">
                <div className='sticky top-0 z-10 border-b border-gray-200'>
                    <div className='sticky top-0 z-10 border-b border-gray-200'>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <p className='mr-2 cursor-pointer hover:text-gray-500' onClick={() => router.back()}>
                                    <ChevronLeftIcon className='h-8 w-8' />
                                </p>
                                <div>
                                    <div className="text-sm text-gray-500">Trở lại</div>
                                    <div className="text-lg font-medium">Sửa khách sạn</div>
                                </div>
                            </div>
                            <button
                                onClick={submit}
                                className="bg-green-500 text-white rounded-md px-3 py-1.5 text-sm flex items-center gap-2 min-w-[80px] justify-center"
                                disabled={saving}
                            >
                                {saving ? <CircularProgress size={16} color="inherit" /> : "Lưu"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/4 space-y-6 sticky top-[100px] z-10">
                            <div className="flex items-start gap-2 mb-4">
                                <CampaignTwoToneIcon className="text-gray-600" />
                                <div>
                                    <h2 className="font-semibold text-lg">Đề xuất</h2>
                                    <p className="text-sm text-gray-500">Thông tin Danh mục đầy đủ...</p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                {sections.map((section) => (
                                    <a key={section.id} href={`#${section.id}`} className={`py-2 px-3 rounded-md text-md font-medium ${activeSection === section.id ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"}`}>
                                        {section.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-3/4 space-y-6">
                            <div id="basic-info">
                                <h3 className="font-medium mb-4">Thông tin cơ bản</h3>
                                <div className="space-y-4">
                                    <CustomTextField
                                        label="Tên khách sạn"
                                        name="overview"
                                        placeholder="Tên khách sạn"
                                        value={category.name}
                                        onChange={(e) => applyChange("name", e.target.value)}
                                        error={!!errors.name}
                                        helperText={errors.name ? "Tên khách sạn không được bỏ trống" : ""}
                                    />
                                    <CustomTextField
                                        label="Địa chỉ"
                                        name="overview"
                                        placeholder="Địa chỉ"
                                        value={category.address}
                                        onChange={(e) => applyChange("address", e.target.value)}
                                        error={!!errors.address}
                                        helperText={errors.address ? "Địa chỉ không được bỏ trống" : ""}
                                    />
                                    <CustomSelect
                                        value={category.type}
                                        onChange={(e: any) => applyChange("type", e.target.value)}
                                        label="Danh mục khách sạn"
                                        options={[
                                            { _id: 'scarlett', name: 'Scarlett Whitening' },
                                            { _id: 'another', name: 'Another Option' },
                                        ]}
                                        error={!!errors.type}
                                        helperText={errors.type ? "Danh mục khách sạn không được bỏ trống" : ""}
                                    />
                                </div>
                            </div>
                            <div>
                                <CKEditorClient
                                    value={category.introduction}
                                    name="introduction"
                                    onChange={applyChange}
                                    error={errors.introduction}
                                    helperText="Vui lòng nhập mô tả khách sạn"
                                />
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Hoạt động</h3>
                                    <Switch
                                        color="success"
                                        checked={category.status}
                                        onChange={(e) => applyChange("status", e.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <CustomAccordion title="Tiện ích" defaultExpanded>
                                    <div className="flex flex-wrap gap-4">
                                        {category?.facilities?.map((facility, index) => {
                                            const isSelected = category.facilities.some((f) => f.name === facility.name);
                                            return (
                                                <div
                                                    key={index}
                                                    onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                                    onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                                    onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                                    className={`p-4 border rounded-md relative group cursor-pointer transition duration-200 ${isSelected ? "bg-green-100 border-green-400" : "hover:bg-gray-50"
                                                        }`}
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            setCategory({
                                                                ...category,
                                                                facilities: category.facilities.filter((f) => f.name !== facility.name),
                                                            });
                                                        } else {
                                                            setCategory({
                                                                ...category,
                                                                facilities: [...category.facilities, facility],
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <span className="material-icons mr-2">{facility.icon}</span>
                                                    <p>{facility.name}</p>
                                                </div>
                                            );
                                        })}
                                        <div
                                            onClick={() => handleClickOpen('facilities')}
                                            onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                            onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                            className="p-4 border rounded-md cursor-pointer hover:bg-gray-100 transition-transform"
                                        >
                                            <AddIcon />
                                            <p>Thêm tiện ích</p>
                                        </div>
                                    </div>
                                </CustomAccordion>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <CustomAccordion title="Danh sách phòng" defaultExpanded>
                                    <div
                                        onClick={() => actionCrud.create(category, "CREATE")}
                                        onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                        onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                        className="p-4 border rounded-md cursor-pointer hover:bg-gray-100 transition-transform"
                                    >
                                        <AddIcon />
                                        <p>Thêm phòng</p>
                                    </div>
                                    <div className="w-full">
                                        {category?.rooms?.map((item, index) => {
                                            return <div key={index} className="">
                                                <div className="flex flex-col h-full my-4 items-stretch bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 w-full">
                                                    <img
                                                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                                        src={item.image[0]}
                                                        alt=""
                                                    />
                                                    <div className="flex flex-col justify-between p-4 leading-normal w-full">
                                                        <div className="flex items-center justify-between w-full">
                                                            <h5 className="text-2xl font-bold tracking-tight text-gray-900">{item.name}</h5>
                                                            <p className='rounded-full hover:bg-gray-300 cursor-pointer duration-300 p-2'>
                                                                <ModeEditTwoToneIcon />
                                                            </p>
                                                        </div>
                                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                                                        <div className="flex">
                                                            {item?.listFacility?.map((facility, index) => {
                                                                return (
                                                                    <Chip key={index} label={facility.name} variant="outlined" onDelete={() => handleClickOpen('facilities')} />
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        })}
                                    </div>
                                </CustomAccordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BaseDialog
                open={open}
                onClose={handleClose}
                title={dialogType === 'facilities' ? 'Chọn tiện ích' : 'Thêm phòng'}
                maxWidth="md"
                fullWidth
                actions={
                    <button
                        onClick={handleClose}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Xong
                    </button>
                }
            >
                {dialogType === 'facilities' && (
                    <div className="flex items-center gap-4 p-4 border-gray-200 flex-wrap">
                        {facilities?.map((facility: any, index: number) => {
                            const isSelected = category.facilities.some((f) => f.name === facility.name);
                            return (
                                <div
                                    key={index}
                                    onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                    onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                    onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                    className={`p-4 border rounded-md relative group cursor-pointer transition duration-200 ${isSelected ? "bg-green-100 border-green-400" : "hover:bg-gray-50"
                                        }`}
                                    onClick={() => {
                                        if (isSelected) {
                                            setCategory({
                                                ...category,
                                                facilities: category.facilities.filter((f) => f.name !== facility.name),
                                            });
                                        } else {
                                            setCategory({
                                                ...category,
                                                facilities: [...category.facilities, facility as never],
                                            });
                                        }
                                    }}
                                >
                                    <span className="material-icons mr-2">{facility.icon}</span>
                                    <p>{facility.name}</p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {dialogType === 'addRoom' && (
                    <div className="space-y-4 p-4">
                        <TextField
                            label="Tên phòng"
                            fullWidth
                            variant="outlined"
                            onChange={() => { }}
                        />
                        <TextField
                            label="Giá theo ngày"
                            fullWidth
                            variant="outlined"
                            type="number"
                            onChange={() => { }}
                        />
                        <TextField
                            label="Giá theo giờ"
                            fullWidth
                            variant="outlined"
                            type="number"
                            onChange={() => { }}
                        />
                        <TextField
                            label="Giá qua đêm"
                            fullWidth
                            variant="outlined"
                            type="number"
                            onChange={() => { }}
                        />
                        <TextField
                            label="Ảnh (URL)"
                            fullWidth
                            variant="outlined"
                            onChange={() => { }}
                        />
                    </div>
                )}
            </BaseDialog>
            <Room_admin_detail ref={refDetail} afterSubmit={mutate} />
        </div>
    );
}

AddCategory.Layout = DashboardLayout;
