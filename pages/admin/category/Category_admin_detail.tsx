import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, FormLabel } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { creat } from '../../../api/category';
import useCategory from '../../../hook/useCategory'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Input from '@mui/material/Input';

function Category_admin_detail(props: any, ref: any) {
    const [open, setOpen] = React.useState(false);
    const categoryDetail = {
        name: ""
    }
    const [defaultCategory, setDefaultCategory] = React.useState(categoryDetail)
    const refMode = React.useRef(null);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: defaultCategory
    });
    const { create, data } = useCategory()

    const defaultErrors = {
        name: null,
    };
    const [errors, setErrors] = React.useState(defaultErrors);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDefaultCategory(categoryDetail)
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
        const _defaultCategory = { ...defaultCategory };
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
                    result[prop] = true;
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
            default:
                _defaultCategory[prop] = val;
        }
        setDefaultCategory(_defaultCategory);
    }

    const [loading, setLoading] = React.useState(true)
    const themsp: SubmitHandler<any> = (data: any) => {

        if (refMode.current == "CREATE") {
            setLoading(false)
            try {
                create(data).then(() => {
                    <Alert variant="filled" severity="success">
                        This is a success alert — check it out!
                    </Alert>
                    setLoading(true)
                    handleClose()
                    toastr.success("Thêm thành công")
                    reset()
                }
                )
            } catch (error) {
            }
        }
        else {
            setLoading(false)
            try {
                create(data).then(() => {
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
                                    <form action="" onSubmit={handleSubmit(themsp)} className='p-4'>
                                        <div className='pb-4'>
                                            <div className="py-4">
                                                <FormLabel>Name</FormLabel>
                                                <Input
                                                    fullWidth
                                                    placeholder="Placeholder"
                                                    value={defaultCategory.name}
                                                    onChange={(e) => {
                                                        applyChange("name", e.target.value)
                                                    }}
                                                />
                                                {Object.keys(errors).length !== 0 && (
                                                    <div>
                                                        {errors.name === "required" && <p className='text-red-600'>Tên sản phẩm không được bỏ trống</p>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                            {loading ?
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg> :
                                                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>}
                                            <span>Submit</span>
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