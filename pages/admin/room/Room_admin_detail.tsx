import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import styles from './add/ImageUploader.module.css';
import useProducts from '../../../hook/use-product';
import Image from 'next/image';
import CustomTextField from '../../../components/CustomTextField';
import CustomAccordion from '../../../components/CustomAccordion';
import AddIcon from '@mui/icons-material/Add';
import CurrencyInput from '../../../components/CustomNumberInput';
import { listFacilityByCategory } from '../../../api/facilities';
import dynamic from 'next/dynamic';

const CKEditorClient = dynamic(() => import('../../../components/CkEditor'), {
    ssr: false,
});

function Room_admin_detail(props: any, ref: any) {
    var _ = require('lodash');
    const [previewImages, setPreviewImages] = React.useState(Array(9).fill(null));
    const [loading, setLoading] = React.useState(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fileInputRefs = Array(9).fill(0).map(() => React.useRef(null));
    const [open, setOpen] = React.useState(false);
    const [listFacility, setListFacility] = React.useState([]);
    const categoryDetail = {
        name: "",
        dayPrice: "",
        nightPrice: "",
        hourPrice: "",
        image: "",
        category: "",
        description: "",
        categoryName: "",
        facilities: []
    }
    const [defaultCategory, setDefaultCategory] = React.useState(categoryDetail)
    const refMode = React.useRef(null);
    const { add, edit, data } = useProducts("")
    const defaultErrors = {
        name: false,
        dayPrice: false,
        nightPrice: false,
        hourPrice: false,
        image: false,
        category: false,
        description: false,
        facilities: false
    };
    const [errors, setErrors] = React.useState(defaultErrors);
    const load = async () => {
        await listFacilityByCategory(defaultCategory.category).then((res) => {
            console.log(res);
        })
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDefaultCategory(categoryDetail);
        setErrors(defaultErrors);
        setPreviewImages(Array(9).fill(null))
        props.afterSubmit && props.afterSubmit
    };

    const prepareToPreview = (e: any) => {
        const dayPrice = e.price.find((item: any) => item.brand === 'daily').value;
        const nightPrice = e.price.find((item: any) => item.brand === 'overnight').value;
        const hourPrice = e.price.find((item: any) => item.brand === 'hourly').value;
        const imgUrl = Array(9).fill(null);
        if (e.image) {
            for (let i = 0; i < 9; i++) {
                if (e.image[i]) {
                    imgUrl[i] = { url: e.image[i] };
                }
            }
        }
        setPreviewImages(imgUrl);

        const data = {
            ...e,
            dayPrice,
            nightPrice,
            hourPrice
        }
        setDefaultCategory(data)
    }

    React.useImperativeHandle(ref, () => ({
        create: async (item: any, type: any) => {
            refMode.current = type
            await listFacilityByCategory(item._id).then(({ data }) => {
                setDefaultCategory({
                    ...defaultCategory,
                    categoryName: data.category.name,
                    category: data.category._id,
                })
                setListFacility(data.facilities);
            })
            handleClickOpen()
        },
        update: (item: any, type: any) => {
            refMode.current = type
            prepareToPreview(item)
            handleClickOpen()
        }
    }))

    // React.useEffect(() => {
    //     load()
    // }, [])

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
                case "dayPrice":
                    result[prop] = _defaultCategory.dayPrice.length <= 0;
                    break;
                case "nightPrice":
                    result[prop] = _defaultCategory.nightPrice.length <= 0;
                    break;
                case "hourPrice":
                    result[prop] = _defaultCategory.hourPrice.length <= 0;
                    break;
                case "category":
                    result[prop] = _defaultCategory.category.length <= 0;
                    break;
                case "description":
                    result[prop] = _defaultCategory.description.length <= 0;
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
            case "name":
                _defaultCategory.name = val;
                break;
            case "category":
                _defaultCategory.category = val;
                break;
            case "dayPrice":
                _defaultCategory.dayPrice = val;
                break;
            default:
                _defaultCategory[prop] = val;
        }
        validate([prop], _defaultCategory)
        setDefaultCategory(_defaultCategory);
    }

    const prepareToSubmit = (data: any, img: any) => {
        const imgUrl: any[] = [];
        if (img.length > 0) {
            img.forEach((item: any) => {
                imgUrl.push(item.url);
            });
        }
        const _facilities = data.facilities.map((item: any) => {
            return item._id
        })
        const newdata: any = {
            ...data,
            category: data.category,
            description: data.description,
            name: data.name,
            status: true,
            facilities: _facilities,
            price: [
                {
                    brand: "daily",
                    title: "Giá theo ngày",
                    value: data.dayPrice
                },
                {
                    brand: "overnight",
                    title: "Giá qua đêm",
                    value: data.nightPrice
                },
                {
                    brand: "hourly",
                    title: "Giá theo giờ",
                    value: data.hourPrice
                },
            ],
            image: imgUrl
        }
        return newdata
    }

    const uploadFiles = async (data: any) => {
        const upload = data.map((item: any, index: any) => {
            const formData = new FormData();
            formData.append('file', item);
            formData.append("upload_preset", "hzeskmhn");

            return fetch('https://api.cloudinary.com/v1_1/dkhutgvlb/image/upload', {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
        })
        try {
            const result = await Promise.all(upload)
            return result;

        } catch (error) {
            console.log(error);

        }
    }

    const submit = async (e: any) => {
        const _defaultCategory = { ...defaultCategory };
        const files = getUploadedFiles();
        e.preventDefault()
        const isValid = validate([], _defaultCategory);
        if (isValid.length == 0 && files.length !== 0) {
            if (refMode.current == "CREATE") {
                setLoading(false)
                try {
                    const upload = files.map((item: any, index: any) => {
                        const formData = new FormData();
                        formData.append('file', item);
                        formData.append("upload_preset", "hzeskmhn");

                        return fetch('https://api.cloudinary.com/v1_1/dkhutgvlb/image/upload', {
                            method: "POST",
                            body: formData,
                        })
                            .then(res => res.json())
                    })
                    try {
                        const result = await Promise.all(upload)
                        const data = prepareToSubmit(_defaultCategory, result)
                        add(data).then(() => {
                            <Alert variant="filled" severity="success">
                                This is a success alert — check it out!
                            </Alert>
                            setLoading(true)
                            handleClose()
                            toastr.success("Thêm thành công")
                        }
                        )
                    } catch (error) {
                        console.log(error);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                setLoading(false)
                try {
                    const data = prepareToSubmit(_defaultCategory, [])
                    edit(data).then(() => {
                        <Alert variant="filled" severity="success">
                            This is a success alert — check it out!
                        </Alert>
                        setLoading(true)
                        handleClose()
                        toastr.success("Sửa thành công")
                    }
                    )
                } catch (error) {
                    console.log(error);
                    toastr.error("Có lỗi xảy ra");
                }
            }
        }
    }

    const handleFileSelect = (e: any, boxIndex: any) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        // Tìm các ô trống
        const updatedPreviews = [...previewImages];
        let emptyBoxes = [];

        // Tìm tất cả các ô trống bắt đầu từ ô hiện tại
        for (let i = boxIndex; i < 9; i++) {
            if (!updatedPreviews[i]) {
                emptyBoxes.push(i);
            }
        }

        // Tìm thêm các ô trống trước ô hiện tại nếu cần
        if (emptyBoxes.length < files.length) {
            for (let i = 0; i < boxIndex; i++) {
                if (!updatedPreviews[i]) {
                    emptyBoxes.push(i);
                    if (emptyBoxes.length === files.length) break;
                }
            }
        }

        // Giới hạn số lượng file theo số ô trống
        const filesToProcess = files.slice(0, emptyBoxes.length);

        // Hiển thị thông báo nếu không đủ ô trống
        if (files.length > emptyBoxes.length) {
            alert(`Chỉ có thể hiển thị ${emptyBoxes.length} ảnh. ${files.length - emptyBoxes.length} ảnh còn lại không được hiển thị do không đủ ô trống.`);
        }

        // Tạo URL và lưu thông tin file
        filesToProcess.forEach((file, index) => {
            const boxIdx = emptyBoxes[index];
            updatedPreviews[boxIdx] = {
                url: URL.createObjectURL(file),
                file: file
            };
        });

        setPreviewImages(updatedPreviews);

        // Reset input file
        e.target.value = '';
    };

    // Xóa ảnh
    const handleDeleteImage = (index: any) => {
        const updatedPreviews = [...previewImages];

        // Giải phóng URL để tránh rò rỉ bộ nhớ
        if (updatedPreviews[index]?.url) {
            URL.revokeObjectURL(updatedPreviews[index].url);
        }

        updatedPreviews[index] = null;
        setPreviewImages(updatedPreviews);
    };

    // Lấy tất cả các file đã upload
    const getUploadedFiles = () => {
        return previewImages
            .filter(item => item !== null)
            .map(item => item.file);
    };

    return (
        <div>
            <Dialog
                maxWidth="md"
                fullWidth
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
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
                <div>
                    <div className="flex flex-col bg-white border rounded">
                        <div className="overflow-x-auto ">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <form className='p-4'>
                                        <div className='py-4 border-b border-gray-200'>
                                            <h3 className="font-medium mb-4">Tên phòng</h3>
                                            <div className="ml-2">
                                                <CustomTextField
                                                    label="Tên Phòng"
                                                    name="overview"
                                                    placeholder="Tên phòng"
                                                    value={defaultCategory.name}
                                                    onChange={(e) => applyChange("name", e.target.value)}
                                                    error={!!errors.name}
                                                    helperText={errors.name ? "Tên phòng không được bỏ trống" : ""}
                                                />
                                            </div>

                                            <div className='py-4 border-b border-gray-200'>
                                                <h3 className="font-medium mb-4">Ảnh phòng</h3>
                                                <div className="grid grid-cols-4 gap-4 ml-2">
                                                    {Array(9).fill(0).map((_, index) => (
                                                        <div
                                                            key={index}
                                                            className={` first:col-span-2 first:row-span-2 ${styles.uploadBox} ${previewImages[index] ? styles.hasImage : ''}`}
                                                            onClick={(e) => {
                                                                fileInputRefs[index].current?.click();
                                                            }}
                                                        >
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                multiple
                                                                key={`file-input-${index}`}
                                                                ref={fileInputRefs[index]}
                                                                onChange={(e) => handleFileSelect(e, index)}
                                                                className={styles.fileInput}
                                                            />
                                                            {previewImages[index] ? (
                                                                <>
                                                                    <div className={styles.imageWrapper}>
                                                                        <Image
                                                                            src={previewImages[index].url}
                                                                            alt={`Preview ${index}`}
                                                                            layout='fill'
                                                                            style={{ objectFit: 'cover' }}
                                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className={styles.deleteBtn}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDeleteImage(index);
                                                                        }}
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <div >+</div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className='py-4 border-b border-gray-200'>
                                                <h3 className="font-medium mb-4">Giá phòng</h3>
                                                <div className="ml-2">
                                                    <CurrencyInput
                                                        label="Giá theo ngày"
                                                        name="dayPrice"
                                                        value={defaultCategory.dayPrice}
                                                        onChange={applyChange}
                                                        error={errors.dayPrice}
                                                        helperText={errors.dayPrice ? 'Vui lòng nhập giá hợp lệ' : ''}
                                                    />
                                                    <CurrencyInput
                                                        label="Giá theo giờ"
                                                        name="hourPrice"
                                                        value={defaultCategory.hourPrice}
                                                        onChange={applyChange}
                                                        error={errors.hourPrice}
                                                        helperText={errors.hourPrice ? 'Vui lòng nhập giá hợp lệ' : ''}
                                                    />
                                                    <CurrencyInput
                                                        label="Giá qua đêm"
                                                        name="nightPrice"
                                                        value={defaultCategory.nightPrice}
                                                        onChange={applyChange}
                                                        error={errors.nightPrice}
                                                        helperText={errors.nightPrice ? 'Vui lòng nhập giá hợp lệ' : ''}
                                                    />
                                                </div>
                                            </div>

                                            <div className="py-4 border-b border-gray-200">
                                                <h3 className="font-medium mb-4">Danh mục khách sạn</h3>
                                                <div className="mb-2 ml-2">
                                                    <CustomTextField
                                                        label="Danh mục khách sạn"
                                                        name="category"
                                                        disabled
                                                        onChange={() => { }}
                                                        placeholder="Danh mục khách sạn"
                                                        value={defaultCategory.categoryName}
                                                        error={!!errors.category}
                                                        helperText={errors.category ? "Tên phòng không được bỏ trống" : ""}
                                                    />
                                                </div>
                                            </div>

                                            <div className="border-b border-gray-200 py-4">
                                                <CustomAccordion title="Tiện ích" defaultExpanded>
                                                    <div className="flex flex-wrap gap-4 ml-2">
                                                        {listFacility.map((facility, index) => {
                                                            const isSelected = defaultCategory.facilities.some((f) => f.name === facility.name);
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
                                                                            setDefaultCategory({
                                                                                ...defaultCategory,
                                                                                facilities: defaultCategory.facilities.filter((f) => f.name !== facility.name),
                                                                            });
                                                                        } else {
                                                                            setDefaultCategory({
                                                                                ...defaultCategory,
                                                                                facilities: [...defaultCategory.facilities, facility],
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

                                            <div className="py-4 border-gray-200">
                                                <h3 className="font-medium mb-4">Mô tả phòng</h3>
                                                <CKEditorClient
                                                    value={defaultCategory.description}
                                                    name="description"
                                                    onChange={applyChange}
                                                    error={errors.description}
                                                    helperText="Vui lòng nhập mô tả khách sạn"
                                                />
                                            </div>
                                        </div>
                                        <div className="py-4">
                                            <button
                                                type='submit'
                                                onClick={(e) => { submit(e) }}
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                                                {loading ?
                                                    <span>Xác nhận</span> :
                                                    <svg aria-hidden="true" className="w-6 h6 mx-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </Dialog >
        </div >
    );
}

export default React.forwardRef(Room_admin_detail)