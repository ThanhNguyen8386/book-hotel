import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { signup } from '../../api/users'
import AuthLayout from '../../components/Layout/AuthLayout'
import toastr from "toastr"
import 'toastr/build/toastr.min.css'

type Props = {}
type form = {
    name: string,
    email: string,
    password: string,
    phone: number,
    avatar: string,
    role: number,
}
const Signup = (props: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<form>();
    const router = useRouter();
    const onSubmit: SubmitHandler<form> = data => {
        console.log(data);
        const newdata: any = { ...data, role: 0 }
        const file = newdata.avatar[0]
        const formData = new FormData()

        formData.append('file', file)
        formData.append("upload_preset", "mi59v8ju")

        axios({
            url: "https://api.cloudinary.com/v1_1/dkrifqhuk/image/upload",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-formendcoded",
            }, data: formData,
        }).then((res) => {
            newdata.avatar = res.data.url
            console.log(newdata.avatar)
            // mutate(creat(data).then(() => router.push('/admin/products')))

            mutate(signup(newdata))
            router.push('/signin')
            toastr.success("Bạn đã đăng ký thành công")

        })

        //toastr.success("Đăng ký thành công")

    }

    return (
        <div className='overflow-hidden mb:h-[100vh] mbs:h-[110vh]'>
            <Link href={'/'}><button className='relative mbs:hidden mb:block top-[50px] left-[100px] border bg-[#fac26f] hover:bg-[#fed496] px-6 py-2 rounded-full text-white'>Trở về</button></Link>
            <div className='flex items-center mb:h-[auto]  justify-center mbs:h-[inherit]'>
                <div className="mb:w-[70%] mbs:mx-[20px] py-[10px] mbs:w-[100%] h-[fit-content]  shadow-2xl rounded-xl mx-auto  flex justify-between items-center">
                    <div className='maskgroup relative mbs:hidden mb:block  w-[366px] h-[600px] shadow-2xl shadow-[#ffd79a] bg-[#fed496] overflow-hidden rounded-[30px] '>
                        <div className="a bg-[#efce90] h-[70%] rounded-bl-[108px]"><h2 className='pt-[300px] font-bold text-[50px] leading-[53px] pl-[15px] text-white'>Happy <p className='pl-[20px]'>Weekend</p></h2></div>
                        <div className="b absolute top-[-50px] right-[-60px] w-[196px] h-[187px] bg-[#fbf1cf] overflow-hidden rounded-tl-[200px] rounded-bl-[200px]">a</div>
                        <div className="c absolute bottom-[-50px] left-[-20px] w-[196px] h-[187px] rounded-tr-[108px] rounded-br-[20px]  bg-[#fbf1cf]  ">b</div>
                    </div>
                    <div className='form mx-[auto] mb:w-[50%] mbs:w-[90%]'>
                        <Link className='text-right' href={'/'}><span className='flex justify-end'><button className='mbs:block mb:hidden border bg-[#fac26f] hover:bg-[#fed496] px-6 py-2 rounded-full text-white text-end'>Trở về</button></span></Link>
                        <h3 className='text-5xl font-bold '>Sign Up</h3>
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="password" className='mt-[30px]' >Name</label>
                                    <input {...register('name', { required: true, minLength: { value: 1, message: "Không được để trống" } })} id="name" name="name" type="text" autoComplete="current-password" className="relative  block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Name" />
                                    {Object.keys(errors).length !== 0 && (
                                        <ul>
                                            {errors.name?.type == 'required' && (<li className='text-[red] '>Không được để trống</li>)}
                                            {errors.name?.message && <p className='text-[red] '>Phải lớn hơn 3 ký tự</p>}
                                        </ul>
                                    )}
                                </div>
                                <div className='pt-[30px]'>
                                    <label htmlFor="password" className='mt-[30px]' >Email</label>
                                    <input {...register('email', { required: true, minLength: { value: 1, message: "Không được để trống" } })} required id="email" name="email" type="email" autoComplete="current-password" className="relative  block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email" />
                                    {Object.keys(errors).length !== 0 && (
                                        <ul>
                                            {errors.email?.type == 'required' && (<li className='text-[red] '>Không được để trống</li>)}
                                            {errors.email?.message && <p className='text-[red] '>Phải lớn hơn 6 ký tự</p>}
                                        </ul>
                                    )}
                                </div>
                                <div className='pt-[30px]'>
                                    <label htmlFor="password" className='mt-[30px]' >Password</label>
                                    <input {...register('password', { required: true, minLength: { value: 6, message: "Không được nhập dưới 6 ký tự" } })} id="password" name="password" type="password" autoComplete="current-password" className="relative  block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                                    {Object.keys(errors).length !== 0 && (
                                        <ul>
                                            {errors.password?.type == 'required' && (<li className='text-[red] '>Không được để trống</li>)}
                                            {errors.password?.message && <p className='text-[red] '>Phải lớn hơn 6 ký tự</p>}
                                        </ul>
                                    )}
                                </div>
                                <div className='pt-[30px]'>
                                    <label htmlFor="password" className='mt-[30px]' >avatar</label>
                                    <input {...register('avatar')} id="avatar" name="avatar" type="file" autoComplete="current-password" className="relative  block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Avatar" />
                                </div>
                                <div className='pt-[30px]'>
                                    <label htmlFor="password" className='mt-[30px]' >phone</label>
                                    <input  {...register('phone', { required: true, minLength: { value: 10, message: "Số điện thoại chưa đúng" }, maxLength: { value: 11, message: "Số điện thọa chưa đúng" } })} id="phone" name="phone" type="number" autoComplete="current-password" className="relative  block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Phone" />
                                    {Object.keys(errors).length !== 0 && (
                                        <ul>
                                            {errors.phone?.type == 'required' && (<li className='text-[red] '>Không được để trống</li>)}
                                            {errors.phone?.message && <p className='text-[red] '>Số điện thoại chưa đúng</p>}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-orange-500 text-[#FFA500] focus:bg-[#FFA500]" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#FFA500]">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-[#BDBDBD] hover:text-indigo-500">No account?  <span className='text-[#28CDBA]'>Sign Up</span></a>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#FFA500] py-2 px-4 text-sm font-medium text-white hover:bg-[#fed496] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        {/* Heroicon name: mini/lock-closed */}
                                        <svg className="h-5 w-5  text-white group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

Signup.Layout = AuthLayout
export default Signup