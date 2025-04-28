
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import { DashboardLayout } from '../../../../components/dashboard-layout';
import React from 'react';
import { useRouter } from 'next/router';
import { Switch } from '@mui/material';
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
    const defaultCategory = {
        "name": "",
        "status": true,
        "address": "",
        "rooms": [],
        "facilities": [],
        "Introduction": "",
        "type": ""
    }
    const defaultErros = {
        "name": "",
        "status": "",
        "address": "",
        "rooms": "",
        "facilities": "",
        "Introduction": "",
        "type": ""
    }
    const [category, setCategory] = React.useState(defaultCategory)
    const [errors, setErrors] = React.useState(defaultErros)

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
        handleScroll(); // Gọi lần đầu khi load

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const applyChange = (prop: any, val: any) => {
        const _defaultCategory = { ...defaultCategory };
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
            default:
                _defaultCategory[prop] = val;
        }
        validate([prop], _defaultCategory)
        setCategory(_defaultCategory);
    }

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
                case "name":
                    result[prop] = _defaultCategory.name.length <= 0;
                    break;
                case "status":
                    result[prop] = _defaultCategory.status.length <= 0;
                    break;
                case "address":
                    result[prop] = _defaultCategory.address.length <= 0;
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
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Content Area */}
            <div className="flex-1 overflow-auto p-6">
                {/* Page Header */}
                <div className=' sticky top-0 z-10 border-b border-gray-200'>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <p
                                className='mr-2 cursor-pointer transition-all duration-300 hover:text-gray-500'
                                onClick={() => router.back()}>
                                <ChevronLeftIcon className='h-8 w-8 ' />
                            </p>
                            <div>
                                <div className="text-sm text-gray-500">Trở lại</div>
                                <div className="text-lg font-medium">Thêm nhà nghỉ mới</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="bg-green-500 text-white rounded-md px-3 py-1.5 text-sm">
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Column - Product Image */}
                        <div className="w-full md:w-1/4 space-y-6">
                            <div className="flex items-start gap-2 mb-4">
                                <CampaignTwoToneIcon className="text-gray-600" size={20} />
                                <div>
                                    <h2 className="font-semibold text-lg">Đề xuất</h2>
                                    <p className="text-sm text-gray-500">
                                        Thông tin Danh mục đầy đủ có thể giúp tăng cường khả năng hiển thị Nhà nghỉ của bạn.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className={`py-2 px-3 rounded-md text-md font-medium ${activeSection === section.id
                                            ? "bg-gray-100 text-black"
                                            : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {section.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                        {/* Right Column - Product Details */}
                        <div className="w-full md:w-3/4 space-y-6">
                            <div>
                                <h3 className="font-medium mb-4">Thông tin cơ bản</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Tên khách sạn
                                        </label>
                                        <input
                                            type="text"
                                            value={category.name}
                                            onChange={(e) => {
                                                applyChange("name", e.target.value)
                                            }}
                                            placeholder="Nhập tên khách sạn"
                                            className="w-full border border-gray-200 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Địa chỉ
                                        </label>
                                        <input
                                            type="text"
                                            value={category.address}
                                            onChange={(e) => {
                                                applyChange("address", e.target.value)
                                            }}
                                            placeholder="Nhập địa chỉ"
                                            className="w-full border border-gray-200 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Danh mục khách sạn
                                        </label>
                                        <div className="relative">
                                            <select className="w-full border border-gray-200 rounded-md px-3 py-2 appearance-none bg-white">
                                                <option>Scarlett Whitening</option>
                                            </select>
                                            <ExpandMoreTwoToneIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm text-gray-500 mb-1">
                                        Tổng quan
                                    </label>
                                    <span className="text-xs text-gray-400">0/1000</span>
                                </div>
                                <textarea
                                    placeholder="Tổng quan"
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 h-24 resize-none"
                                    value={category.Introduction}
                                    onChange={(e) => {
                                        applyChange("Introduction", e.target.value)
                                    }}
                                ></textarea>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Hoạt động</h3>
                                    <Switch
                                        color="success"
                                        checked={category.status}
                                        onChange={(e) => {
                                            setCategory({ ...category, status: e.target.checked })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Tiện ích</h3>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            <ExpandMoreTwoToneIcon className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs ml-2">1/2</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Danh sách phòng</h3>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            <ExpandMoreTwoToneIcon className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs ml-2">1/2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

AddCategory.Layout = DashboardLayout