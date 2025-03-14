/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Divider, Stack, TextField } from '@mui/material';
import useCategory from '../../../hook/useCategory'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import RoomInfo from './RoomInfo';
import CustomerInfo from './CustomerInfo';

function orderDetail(props: any, ref: any) {
    var _ = require('lodash');
    const [open, setOpen] = React.useState(false);
    const categoryDetail = {
        name: ""
    }
    const [defaultCategory, setDefaultCategory] = React.useState(categoryDetail)
    const refMode = React.useRef(null);
    const { create, edit, data } = useCategory()

    const defaultErrors = {
        name: false,
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
                                <RoomInfo />
                            </div>
                            <div className="w-full md:w-5/12">
                                <CustomerInfo />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default React.forwardRef(orderDetail)