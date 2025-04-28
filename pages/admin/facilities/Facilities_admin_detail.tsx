// c:\Users\Light\Downloads\HappyWeekendHotel-main\pages\admin\facilities\Facilities_admin_detail.tsx
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, TextField } from '@mui/material';
import useFacilities from '../../../hook/facilities'; // Changed hook
import toastr from "toastr";
import "toastr/build/toastr.min.css";

// Simplified structure, only basic info needed for Facility
function Facilities_admin_detail(props: any, ref: any) {
    const [open, setOpen] = React.useState(false);
    // Simplified data structure for Facility
    const facilityDetail = {
        _id: null, // Keep id for editing
        name: "",
        icon: "",
    }
    const [defaultFacility, setDefaultFacility] = React.useState(facilityDetail)
    const refMode = React.useRef<"CREATE" | "UPDATE" | null>(null);
    const { add, edit } = useFacilities(defaultFacility._id || ""); // Use add/edit from facilities hook
    const [loading, setLoading] = React.useState(false); // Changed initial state to false

    // Simplified errors state
    const defaultErrors = {
        icon: false,
        name: false,
    };
    const [errors, setErrors] = React.useState(defaultErrors);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // Reset state
        setDefaultFacility(facilityDetail);
        setErrors(defaultErrors);
        refMode.current = null; // Reset mode
    };

    React.useImperativeHandle(ref, () => ({
        create: (item: any, type: "CREATE") => {
            // Reset state for creation
            setDefaultFacility(facilityDetail);
            setErrors(defaultErrors);
            refMode.current = type;
            handleClickOpen();
        },
        update: (item: any, type: "UPDATE") => {
            setDefaultFacility({ _id: item._id, name: item.name, icon: item.icon }); // Ensure we get the data correctly
            setErrors(defaultErrors); // Reset errors on open
            refMode.current = type;
            handleClickOpen();
        }
    }));

    // Simplified validation for Facility
    const validate = (props: string[], _facilityData: any) => {
        const _defaultFacility = { ..._facilityData };
        let result = { ...errors }; // Use current errors state

        // Determine which props to validate
        const propsToValidate = props.length === 0 ? Object.keys(result) : props;

        // Validate props
        propsToValidate.forEach((prop: any) => {
            switch (prop) {
                case "name":
                    result[prop] = !_defaultFacility.name || _defaultFacility.name.trim().length <= 0;
                    break;
                case "icon":
                    result[prop] = !_defaultFacility.icon || _defaultFacility.icon.trim().length <= 0;
                    break;
                default:
                    break;
            }
        });

        // Set state
        setErrors(result);

        // Check if any validated prop has an error
        const hasError = propsToValidate.some(prop => result[prop]);
        return hasError; // Return true if there is an error, false otherwise
    };

    // Simplified applyChange for Facility
    const applyChange = (prop: string, val: any) => {
        const _defaultFacility = { ...defaultFacility };
        switch (prop) {
            case "name":
                _defaultFacility.name = val;
                break;
            case "icon":
                _defaultFacility.icon = val;
                break;
            default:
                // Avoid direct assignment if not needed
                break;
        }
        // Validate only the changed prop
        validate([prop], _defaultFacility);
        setDefaultFacility(_defaultFacility);
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _defaultFacility = { ...defaultFacility };
        const hasError = validate([], _defaultFacility); // Validate all fields

        if (!hasError) {
            setLoading(true); // Start loading
            try {
                if (refMode.current === "CREATE") {
                    // Remove _id for creation if it exists
                    const { _id, ...createData } = _defaultFacility;
                    await add(createData); // Call add from the hook
                    toastr.success("Thêm tiện ích thành công");
                } else if (refMode.current === "UPDATE") {
                    await edit(_defaultFacility); // Call edit from the hook
                    toastr.success("Sửa tiện ích thành công");
                }
                setLoading(false); // Stop loading on success
                handleClose(); // Close dialog on success
            } catch (error) {
                console.error("Error submitting facility:", error);
                toastr.error("Đã xảy ra lỗi. Vui lòng thử lại.");
                setLoading(false); // Stop loading on error
            }
        } else {
            toastr.warning("Vui lòng điền đầy đủ thông tin bắt buộc.");
        }
    }

    return (
        <Dialog
            maxWidth="sm" // Adjusted width for simpler form
            fullWidth
            open={open}
            onClose={handleClose}
        >
            <AppBar sx={{ position: 'sticky', display: 'flex', flex: 'justify-between' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {refMode.current === "CREATE" ? "Thêm mới Tiện ích" : "Chỉnh sửa Tiện ích"}
                    </Typography>
                    <IconButton
                        edge="end" // Position close button to the end
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {/* Simplified Content Area */}
            <div className="p-6"> {/* Added padding */}
                <form onSubmit={submit}>
                    <div className='pb-4'>
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 ">Tiện ích</label>
                            <input
                                value={defaultFacility.name}
                                onChange={(e) => applyChange("name", e.target.value)}
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
                        </div>
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block mb-2 text-sm font-medium text-gray-900 ">Icon (Material)</label>
                            <input
                                value={defaultFacility.icon}
                                onChange={(e) => applyChange("icon", e.target.value)}
                                type="text"
                                id="last_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Doe" required />
                        </div>
                        {/* Removed Address, Status, Image fields */}
                    </div>

                    <div className="flex justify-end pt-4"> {/* Align button to the right */}
                        <button
                            type='button' // Prevent default form submission if clicked accidentally
                            onClick={handleClose}
                            disabled={loading}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center mr-2"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type='submit'
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                        >
                            {loading ? (
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-white animate-spin fill-blue-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            ) : (
                                <span>Xác nhận</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}

export default React.forwardRef(Facilities_admin_detail);
