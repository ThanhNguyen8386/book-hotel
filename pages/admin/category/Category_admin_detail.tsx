import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, FormControlLabel, Switch, TextField } from '@mui/material';
import useCategory from '../../../hook/useCategory'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Image from 'next/image';

function Category_admin_detail(props: any, ref: any) {
    var _ = require('lodash');
    const [open, setOpen] = React.useState(false);
    const categoryDetail = {
        name: "",
        status: true,
        address: "",
        image: "",
        imagePreview: "",
    }
    const [defaultCategory, setDefaultCategory] = React.useState(categoryDetail)
    const refMode = React.useRef(null);
    const { create, edit, data } = useCategory()

    const defaultErrors = {
        name: false,
        status: false,
        address: false,
        image: false
    };
    const [errors, setErrors] = React.useState(defaultErrors);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        URL.revokeObjectURL(defaultCategory.imagePreview)
        setDefaultCategory(categoryDetail);
        setErrors(defaultErrors)
    };

    React.useImperativeHandle(ref, () => ({
        create: (item: any, type: any) => {
            refMode.current = type
            handleClickOpen()
        },
        update: (item: any, type: any) => {
            setDefaultCategory(item)
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
            case "image":
                if (_defaultCategory.imagePreview) {
                    URL.revokeObjectURL(_defaultCategory.imagePreview)
                }
                if (val != "") {
                    const file = val?.[0]
                    _defaultCategory.imagePreview = URL.createObjectURL(file)
                    _defaultCategory.image = file;
                }
                else {
                    _defaultCategory.imagePreview = "";
                    _defaultCategory.image = "";
                }

                break;
            default:
                _defaultCategory[prop] = val;
        }
        validate([prop], _defaultCategory)
        setDefaultCategory(_defaultCategory);
    }
    console.log(defaultCategory);

    const [loading, setLoading] = React.useState(true)

    const submit = (e: any) => {
        e.preventDefault()
        const _defaultCategory = { ...defaultCategory };
        const isValid = validate([], _defaultCategory);
        if (isValid.length == 0) {
            if (refMode.current == "CREATE") {
                setLoading(false)
                try {
                    create(_defaultCategory).then(() => {
                        <Alert variant="filled" severity="success">
                            This is a success alert — check it out!
                        </Alert>
                        setLoading(true)
                        handleClose()
                        toastr.success("Thêm thành công")
                    }
                    )
                } catch (error) {
                }
            }
            else {
                setLoading(false)
                try {
                    edit(_defaultCategory).then(() => {
                        <Alert variant="filled" severity="success">
                            This is a success alert — check it out!
                        </Alert>
                        setLoading(true)
                        handleClose()
                        toastr.success("Sửa thành công")
                    }
                    )
                } catch (error) {
                }
            }
        }
    }

    return (
        <div>
            <Dialog
                maxWidth="md"
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
                <div>
                    <div className="flex flex-col bg-white border rounded">
                        <div className="overflow-x-auto ">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <form className='p-4'>
                                        <div className='pb-4'>
                                            <div className="py-4">
                                                <TextField
                                                    fullWidth
                                                    error={errors.name}
                                                    id="outlined-basic"
                                                    label="Tên danh mục"
                                                    variant="outlined"
                                                    value={defaultCategory.name}
                                                    onChange={(e) => {
                                                        applyChange("name", e.target.value)
                                                    }}
                                                />
                                                {Object.keys(errors).length !== 0 && (
                                                    <div>
                                                        {errors.name && <p className='text-red-600'>Tên danh mục không được bỏ trống</p>}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="py-4">
                                                <TextField
                                                    fullWidth
                                                    error={errors.address}
                                                    id="outlined-basic"
                                                    label="Địa chỉ"
                                                    variant="outlined"
                                                    value={defaultCategory.address}
                                                    onChange={(e) => {
                                                        applyChange("address", e.target.value)
                                                    }}
                                                />
                                                {Object.keys(errors).length !== 0 && (
                                                    <div>
                                                        {errors.address && <p className='text-red-600'>Địa chỉ không được bỏ trống</p>}
                                                    </div>
                                                )}
                                            </div>

                                            {/* {
                                                defaultCategory.imagePreview || defaultCategory.image ?
                                                    (
                                                        <div
                                                            onClick={() => {
                                                                applyChange("image", "")
                                                            }}
                                                            className='relative w-full h-64'>
                                                            <Image
                                                                src={defaultCategory.imagePreview ? defaultCategory.imagePreview : defaultCategory.image}
                                                                alt="" 
                                                                layout='fill'
                                                                />
                                                            <CloseIcon fontSize="large" className='absolute top-[10px] right-[10px] bg-[#000] text-white rounded-full ' />
                                                        </div>
                                                    )
                                                    : (
                                                        <div className="py-4">
                                                            <div className="flex items-center justify-center w-full">
                                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                        </svg>
                                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                                    </div>
                                                                    <input
                                                                        id="dropzone-file"
                                                                        type="file"
                                                                        className="hidden"
                                                                        // value={defaultCategory.image}
                                                                        onChange={(e) => {
                                                                            applyChange("image", e.target.files)
                                                                        }}
                                                                    />
                                                                </label>
                                                            </div>
                                                            {Object.keys(errors).length !== 0 && (
                                                                <div>
                                                                    {errors.image && <p className='text-red-600'>Ảnh không được bỏ trống</p>}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                            } */}

                                            <div className="py-4">
                                                <FormControlLabel control={
                                                    <Switch
                                                        name="gilad"
                                                        checked={defaultCategory.status}
                                                        onChange={(e) => {
                                                            applyChange("status", e.target.checked)
                                                        }}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                                    label="Trạng thái"
                                                />
                                                {Object.keys(errors).length !== 0 && (
                                                    <div>
                                                        {errors.status && <p className='text-red-600'>Trạng thái không được bỏ trống</p>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                        </div>
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default React.forwardRef(Category_admin_detail)