import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import { DashboardLayout } from '../../../../components/dashboard-layout';
import React from 'react';
import { useRouter } from 'next/router';
import { Dialog, Switch } from '@mui/material';
import CustomAccordion from '../../../../components/CustomAccordion';
import CustomSelect from '../../../../components/CustomSelect';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { listfac } from '../../../../api/facilities';

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

    const defaultCategory = {
        name: "",
        status: true,
        address: "",
        rooms: [],
        facilities: [],
        Introduction: "",
        type: ""
    };

    const defaultErrors = {
        name: "",
        status: "",
        address: "",
        rooms: "",
        facilities: "",
        Introduction: "",
        type: ""
    };

    const [category, setCategory] = React.useState(defaultCategory);
    const [errors, setErrors] = React.useState(defaultErrors);

    const handleClickOpen = () => {
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
        const updated = { ...category, [prop]: val };
        validate([prop], updated);
        setCategory(updated);
    };

    const validate = (props: any[], _data: any) => {
        const result = { ...errors };
        props.forEach((prop) => {
            switch (prop) {
                case "name":
                case "address":
                    result[prop] = !_data[prop];
                    break;
                default:
                    break;
            }
        });
        setErrors(result);
        return _.uniq(Object.values(result).filter(Boolean));
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto p-6">
                <div className='sticky top-0 z-10 border-b border-gray-200'>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <p className='mr-2 cursor-pointer hover:text-gray-500' onClick={() => router.back()}>
                                <ChevronLeftIcon className='h-8 w-8' />
                            </p>
                            <div>
                                <div className="text-sm text-gray-500">Trở lại</div>
                                <div className="text-lg font-medium">Thêm nhà nghỉ mới</div>
                            </div>
                        </div>
                        <button className="bg-green-500 text-white rounded-md px-3 py-1.5 text-sm">
                            Lưu
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/4 space-y-6">
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
                                    <input
                                        type="text"
                                        value={category.name}
                                        onChange={(e) => applyChange("name", e.target.value)}
                                        placeholder="Nhập tên khách sạn"
                                        className="w-full border border-gray-200 rounded-md px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        value={category.address}
                                        onChange={(e) => applyChange("address", e.target.value)}
                                        placeholder="Nhập địa chỉ"
                                        className="w-full border border-gray-200 rounded-md px-3 py-2"
                                    />
                                    <CustomSelect
                                        value={category.type}
                                        onChange={(e: any) => applyChange("type", e.target.value)}
                                        label="Danh mục khách sạn"
                                        options={[
                                            { value: 'scarlett', label: 'Scarlett Whitening' },
                                            { value: 'another', label: 'Another Option' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Tổng quan</label>
                                <textarea
                                    placeholder="Tổng quan"
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 h-24 resize-none"
                                    value={category.Introduction}
                                    onChange={(e) => applyChange("Introduction", e.target.value)}
                                ></textarea>
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
                                        {category.facilities.map((facility, index) => (
                                            <div
                                                key={index}
                                                onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                                onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                                className="p-4 border rounded-md relative group">
                                                <span className="material-icons mr-2">{facility.icon}</span>
                                                <p>{facility.name}</p>
                                                <ClearIcon
                                                    onClick={() => setCategory({
                                                        ...category,
                                                        facilities: category.facilities.filter((_, i) => i !== index)
                                                    })}
                                                    className="absolute top-0 right-0 translate-y-[10px] cursor-pointer hidden group-hover:block group-hover:translate-y-0 duration-300" />
                                            </div>
                                        ))}
                                        <div
                                            onClick={handleClickOpen}
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
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <div className="flex items-center gap-4 p-4 border-b border-gray-200 flex-wrap">
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
                                            facilities: [...category.facilities, facility],
                                        });
                                    }
                                }}
                            >
                                <span className="material-icons mr-2">{facility.icon}</span>
                                <p>{facility.name}</p>
                                {isSelected && (
                                    <span className="absolute top-0 right-0 translate-y-[10px] text-green-500 material-icons">
                                        check
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end px-4 py-2 border-t">
                    <button
                        onClick={handleClose}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Xong
                    </button>
                </div>
            </Dialog>
        </div>
    );
}

AddCategory.Layout = DashboardLayout;
