import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useCategory from '../../../hook/useCategory'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useDropzone } from 'react-dropzone';

function Room_admin_detail(props: any, ref: any) {
    var _ = require('lodash');
    const category = useCategory()
    const [files, setFiles] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const categoryDetail = {
        name: "",
        dayPrice: "",
        nightPrice: "",
        hourPrice: "",
        file: ""
    }
    const [defaultCategory, setDefaultCategory] = React.useState(categoryDetail)
    const refMode = React.useRef(null);
    const { create, edit, data } = useCategory()

    const defaultErrors = {
        name: false,
        dayPrice: false,
        nightPrice: false,
        hourPrice: false,
        file: false
    };
    const [errors, setErrors] = React.useState(defaultErrors);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDefaultCategory(categoryDetail);
        setErrors(defaultErrors);
        setFiles([])
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
    const onDrop = React.useCallback((acceptedFiles: any) => {
        // Thêm các file mới vào state
        setFiles((previousFiles: any) => {
            return [...previousFiles, ...acceptedFiles];
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const removeFile = (fileToRemove:any) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    // Hàm xóa tất cả các file
    const removeAllFiles = () => {
        setFiles([]);
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
                case "dayPrice":
                    result[prop] = _defaultCategory.dayPrice.length <= 0;
                    break;
                case "nightPrice":
                    result[prop] = _defaultCategory.nightPrice.length <= 0;
                    break;
                case "hourPrice":
                    result[prop] = _defaultCategory.hourPrice.length <= 0;
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

    const handleKeyPress = (e: any) => {
        if (!/[0-9]/.test(e.key)) {
            if (e.keyCode !== 8) {
                e.preventDefault();
            }
        }
    };
    function numberWithCommas(x: any) {
        // if (x) {
        //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        // }
        return x
    }
    const applyChange = (prop: any, val: any) => {
        const _defaultCategory = { ...defaultCategory };
        switch (prop) {
            case "name":
                _defaultCategory.name = val;
                break;
            case "dayPrice":
                if (val?.length > 0 && /^[0-9]+$/.test(val)) {
                    _defaultCategory.dayPrice = val;
                }
                else {
                    _defaultCategory.dayPrice = "";
                }
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
                                            <div className="pb-4">
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    error={errors.name}
                                                    id="outlined-basic"
                                                    label="Tên phòng"
                                                    value={defaultCategory.name}
                                                    onChange={(e) => {
                                                        applyChange("name", e.target.value)
                                                    }}
                                                />
                                                {Object.keys(errors).length !== 0 && (
                                                    <div>
                                                        {errors.name && <p className='text-red-600'>Tên không được bỏ trống</p>}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex justify-between justify-items-stretch pb-4">
                                                <div className="w-full">
                                                    <TextField
                                                        fullWidth
                                                        error={errors.dayPrice}
                                                        id="outlined-basic"
                                                        label="Giá theo ngày"
                                                        variant="standard"
                                                        onKeyDown={handleKeyPress}
                                                        value={numberWithCommas(defaultCategory.dayPrice)}
                                                        onChange={(e) => {
                                                            applyChange("dayPrice", e.target.value)
                                                        }}
                                                    />
                                                    {Object.keys(errors).length !== 0 && (
                                                        <div>
                                                            {errors.dayPrice && <p className='text-red-600'>Giá theo ngày không được bỏ trống</p>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full">
                                                    <TextField
                                                        fullWidth
                                                        error={errors.nightPrice}
                                                        id="outlined-basic"
                                                        label="Giá qua đêm"
                                                        variant="standard"
                                                        onKeyDown={handleKeyPress}
                                                        value={numberWithCommas(defaultCategory.nightPrice)}
                                                        onChange={(e) => {
                                                            applyChange("nightPrice", e.target.value)
                                                        }}
                                                    />
                                                    {Object.keys(errors).length !== 0 && (
                                                        <div>
                                                            {errors.nightPrice && <p className='text-red-600'>Giá qua đêm không được bỏ trống</p>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full">
                                                    <TextField
                                                        fullWidth
                                                        error={errors.hourPrice}
                                                        id="outlined-basic"
                                                        label="Giá theo giờ"
                                                        variant="standard"
                                                        onKeyDown={handleKeyPress}
                                                        value={numberWithCommas(defaultCategory.hourPrice)}
                                                        onChange={(e) => {
                                                            applyChange("hourPrice", e.target.value)
                                                        }}
                                                    />
                                                    {Object.keys(errors).length !== 0 && (
                                                        <div>
                                                            {errors.hourPrice && <p className='text-red-600'>Giá theo giờ không được bỏ trống</p>}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="pb-4">
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Chọn một loại phòng</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={defaultCategory.category}
                                                        label="Chọn một loại phòng"
                                                        variant="standard"
                                                        onChange={(e) => {
                                                            applyChange("category", e.target.value)
                                                        }}
                                                    >
                                                        {category.data?.map((item: any, index: any) => {
                                                            return (
                                                                <MenuItem key={index} MenuItem value={item._id} > {item?.name}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                    {Object.keys(errors).length !== 0 && (
                                                        <div>
                                                            {errors.name && <p className='text-red-600'>Giá theo ngày không được bỏ trống</p>}
                                                        </div>
                                                    )}
                                                </FormControl>
                                            </div>

                                            <section>
                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps()} />
                                                    <p>Kéo và thả file vào đây, hoặc nhấp để chọn file</p>
                                                </div>

                                                <h4>Files</h4>
                                                <ul>
                                                    {files.map((file, index) => (
                                                        <li key={file.name + index}>
                                                            {file.name} - {file.size} bytes
                                                            <button onClick={() => removeFile(file)}>
                                                                Xóa
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {files.length > 0 && (
                                                    <button onClick={removeAllFiles}>
                                                        Xóa tất cả file
                                                    </button>
                                                )}
                                            </section>
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
                </div >
            </Dialog >
        </div >
    );
}

export default React.forwardRef(Room_admin_detail)