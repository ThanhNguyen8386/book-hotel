import React, { useEffect, useState } from 'react'
import userUser from '../../hook/use-user'

import { Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { update } from '../../api/users';
import { useRouter } from 'next/router';
import ProfileLayout from '../../components/Layout/ProfileLayout';

type Form = {
    name: string,
    phone: number,
    avatar: string,
    email: string,
    address: string,
    gender: string
}
type Props = {}

const Profile = (props: Props) => {
    const [edit, setEdit] = useState(true);
    const [display, setdisplay] = useState<any>(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Form>()
    const router = useRouter()
    const onsubmit = () => {
        setEdit(!edit)
    }
    // const get = () => {
    //     const reslut = localStorage.getItem(JSON.stringify('user') as string)
    //     console.log(reslut)
    // }
    const [user, setUser] = useState<any>({})
    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem('user') as string)
        setUser(getUser)
    }, [])
    let imageUpdate = ""
    const Edit: SubmitHandler<any> = async data => {
        if (data.avatar?.[0] != 'h') {
            const file = data.avatar?.[0]
            const formData = new FormData()

            formData.append("file", file)
            formData.append("upload_preset", "mi59v8ju")

            const { data: newimage } = await axios({
                url: "https://api.cloudinary.com/v1_1/dkrifqhuk/image/upload",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-formendcoded",
                }, data: formData,
            })
            imageUpdate = newimage.url
            data.avatar = imageUpdate
        }
        update(data).then((res: any) => {
            localStorage.setItem('user', JSON.stringify(res))
            setdisplay(false)
            router.push(`/`).then(() => { router.push('/profile') })
        })
    }
    const Gender = (key: any) => {
        if (key == "1") {
            return "Nam"
        } else if (key == '2') {
            return "Nữ"
        } else if (key == '3') {
            return "Khác"
        } else {
            return 'Chưa cung cấp'
        }
    }
    return (
        <div className='w-full pl-4'>
            <div className="profile_account relative">
                <div className="flex flex-row justify-between mb-[32px]">
                    <h2 className='text-[40px] font-bold'>Hồ sơ của tôi</h2>
                    <div className=''>
                        <button onClick={() => { setdisplay(true); reset(user) }} className='btn rounded-full border border-gray-700 px-[24px] font-medium py-[10px] '>Chỉnh sửa</button>
                    </div>
                </div>

                <div>
                    <div className="form_item flex flex-row items-center">
                        <label className='flex flex-row w-[180px] text-[18px] ' htmlFor="">Số điện thoại</label>
                        <div className="input font-medium ">
                            {user.phone}
                        </div>
                    </div>
                    <hr className='my-[20px]' />
                    <div className="form_item flex flex-row items-center">
                        <label className='flex flex-row w-[180px] text-[18px] ' htmlFor="">Họ và Tên</label>
                        <div className="input font-medium ">
                            {user.name}
                        </div>
                    </div>
                    <hr className='my-[20px]' />
                    <div className="form_item flex flex-row items-center">
                        <label className='flex flex-row w-[180px] text-[18px] ' htmlFor="">Email</label>
                        <div className="input font-medium ">
                            {user.email}
                        </div>
                    </div>
                    <hr className='my-[20px]' />
                    <div className="form_item flex flex-row items-center">
                        <label className='flex flex-row w-[180px] text-[18px] ' htmlFor="">Giới tính</label>
                        <div className="input font-medium ">
                            {Gender(user.gender)}
                        </div>
                    </div>
                    <hr className='my-[20px]' />
                    <div className="form_item flex flex-row items-center">
                        <label className='flex flex-row w-[180px] text-[18px] ' htmlFor="">Địa chỉ</label>
                        <div className="input font-medium ">
                            {user.address ? user.address : "Chưa được cung cấp"}
                        </div>
                    </div>
                    <hr className='my-[20px]' />
                    <div className="form_item flex flex-row items-center">
                        <label className='flex flex-row w-[180px] text-[18px] ' htmlFor="">Tài khoản liên kết</label>
                        <div className="input font-medium ">
                            chưa cung cấp
                        </div>
                    </div>

                </div>

            </div>
            <Dialog
                fullWidth={true}
                open={display}
                onClose={() => { setdisplay(false) }}
            >
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1 className='font-medium text-[25px]'>Chỉnh sửa thông tin cá nhân</h1>
                    <IconButton onClick={() => { setdisplay(false) }} aria-label="delete">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <div className="card">
                    <div className="my-[30px]">
                        <form action="" onSubmit={handleSubmit(Edit)} className=' py-[0px] w-[500px] m-auto drop-shadow-md rounded-md'>
                            <div className='relative z-0 mb-6 w-full group'>
                                <label htmlFor="" className="z-50 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Họ và tên</label>
                                <input type="text" {...register('name')} className='className="block pt-4  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"' />
                            </div>
                            <div className='relative z-0 mb-6 w-full group'>
                                <label htmlFor="" className="z-50 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại</label>
                                <input type="text" {...register('phone')} className='className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"' />
                            </div>
                            <div className='relative z-0 mb-6 w-full group'>
                                <label htmlFor="" className="z-50 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Avatar</label>
                                <input type="file" {...register('avatar')} className='className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"' />
                            </div>
                            <img width={50} src={`${user.avatar}`} alt="" />

                            <div className='relative z-0 mb-6 w-full group mt-[10px]'>
                                <label htmlFor="" className="z-50 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                <input type="text" {...register('email')} className='className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"' />
                            </div>
                            <div className='relative z-0 mb-6 w-full group'>
                                <label htmlFor="" className="z-50 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Địa chỉ</label>
                                <input type="text" {...register('address')} className='className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"' />
                            </div>
                            <div className='relative z-0 w-full group'>
                                <label htmlFor="" className="z-50 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giới tính</label>
                                <select id="" className='mt-[20px] w-full' {...register('gender')}>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                    <option value="3">Khác</option>
                                </select>
                            </div>
                            <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <div className="flex">
                                    <div>
                                        <button
                                            className="px-4 py-2 rounded-md shadow-xl bg-[orange] text-white"
                                        // onClick={() => { router.push('/payment') }}
                                        >Save</button>
                                    </div>
                                </div>
                            </DialogActions>
                        </form>
                    </div>

                </div>
            </Dialog>
        </div>
    )
}

Profile.Layout = ProfileLayout;
export default Profile
