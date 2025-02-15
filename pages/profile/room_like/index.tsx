import { MenuItem } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { listOrderUser } from '../../../api/order'
import ProfileLayout from '../../../components/Layout/ProfileLayout'
import { OrderType } from '../../../types/order'
import { OrderUser } from '../../../types/OrderUser'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import styles from '../../../styles/room.module.css'


type Props = {}

const RoomLike = (props: Props) => {
    const [user, setUser] = useState<any>({})
    const [order, setorder] = useState([])
    const [status, setStatus] = useState(false)
    const router = useRouter();
    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem('user') as string)
        if (getUser == 0 || getUser == null) {
            router.push('/')
            setStatus(false)
        } else {
            setStatus(true)
        }
        setUser(getUser)
        const get = async () => {
            if (getUser == 0 || getUser == null) {
                router.push('/')
                setStatus(false)
            } else {
                setStatus(true)
                const data: any = await listOrderUser(getUser._id)
                setorder(data)
            }
        }
        get()
    }, [])
    console.log(order)
    const statuss = (value: any) => {
        if (value == 0) {
            return <span className='rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Chờ Xác Nhận</span>
        } else if (value == 1) {
            return <span className='bg-orange-600 rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Đã Xác Nhận</span>
        } else if (value == 2) {
            return <span className='bg-green-600 rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Đang Có Khách</span>
        } else if (value == 3) {
            return <span className='bg-orange-600 rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Đã Trả Phòng</span>
        }
        else {
            return <span className='bg-red-600 rounded-full py-[5px] px-[10px] bg-sky-500 text-center text-white font-medium'>Hủy Phòng</span>
        }
    }
    return (
        <div className=''>
            <div className="account_body container mx-auto justify-center my-[40px] flex flex-row px-[96px] mb:flex mbs:inline">
                <div className="account_sidebar flex flex-col w-[370px] h-fit border  border-gray-20 rounded-3xl p-[24px] pb-[70px] mr-[32px]">
                    <div className="account_info px-[16px] py-[24px]">
                        <div className='contents'><img width={50} className="rounded-full mx-auto h-[100px] w-[100px] object-cover border-current" src={user?.avatar || "https://go2joy.vn/images/icons/user-placeholder.svg"} alt="" /></div>
                        <div className='text-center font-medium text-2xl'>{user?.phone}</div>
                    </div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='/profile' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                        <span className='pl-[10px] font-normal text-lg'>Hồ sơ của tôi</span></a></div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='/profile/order' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg><span className='pl-[10px] font-normal text-lg'>Đặt phòng của tôi</span></a></div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='/profile/room_like' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg><span className='pl-[10px] font-normal text-lg'>Danh sách yêu thích</span></a></div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='#' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg><span className='pl-[10px] font-normal text-lg'>Tem của tôi</span></a></div>
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='#' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg><span className='pl-[10px] font-normal text-lg'>Coupon của tôi </span></a></div>
                    <hr className='my-[16px]' />
                    <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]"><a href='#' className=' flex flex-row justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                        <span onClick={() => {
                            setStatus(false)
                            localStorage.removeItem('user')
                            router.push('/')
                        }} className='pl-[10px] font-normal text-lg'>
                            Đăng Xuất</span></a></div>

                </div>
                <div className="profile_account relative w-[768px] mb:w-[768px] mbs:w-[370px]">
                    <div className="flex flex-row justify-between mb-[32px]">
                        <h2 className='text-[40px] font-bold'>Phòng yêu thích</h2>
                    </div>
                    <div className={styles.content_left1}>
                        <div className='grid grid-cols-2 items-center mb:grid   items-center mbs:inline'>
                            <div className='card w-[90%] m-[0px] pb-[15px] '>
                                <div>
                                    <img className='rounded-2xl w-[100%]' src="https://s3.go2joy.vn/1000w/hotel/4059/118_1623550819_60c56b63bbc75.jpg" alt="" />
                                </div>
                                <div className='text-card'>
                                    <div className='font-bold text-xl py-3'>VENICE 2 HOTEL</div>
                                </div>
                                <div className='flex justify-between'>
                                    <span> <FontAwesomeIcon icon={faStar} className='text-orange-400' /> 5(2194) Đông Anh  </span>
                                    <button className='underline font-medium hover:text-[#636366]'> Bỏ thích</button>
                                </div>
                            </div>
                            <div className='card w-[90%] m-[0px] pb-[15px] '>
                                <div>
                                    <img className='rounded-2xl w-[100%]' src="https://s3.go2joy.vn/1000w/hotel/4059/118_1623550819_60c56b63bbc75.jpg" alt="" />
                                </div>
                                <div className='text-card'>
                                    <div className='font-bold text-xl py-3'>VENICE 2 HOTEL</div>
                                </div>
                                <div className='flex justify-between'>
                                    <span> <FontAwesomeIcon icon={faStar} className='text-orange-400' /> 5(2194) Đông Anh  </span>
                                    <button className='underline font-medium hover:text-[#636366]'> Bỏ thích</button>
                                </div>
                            </div>
                            <div className='card w-[90%] m-[0px] pb-[15px] '>
                                <div>
                                    <img className='rounded-2xl w-[100%]' src="https://s3.go2joy.vn/1000w/hotel/4059/118_1623550819_60c56b63bbc75.jpg" alt="" />
                                </div>
                                <div className='text-card'>
                                    <div className='font-bold text-xl py-3'>VENICE 2 HOTEL</div>
                                </div>
                                <div className='flex justify-between'>
                                    <span> <FontAwesomeIcon icon={faStar} className='text-orange-400' /> 5(2194) Đông Anh  </span>
                                    <button className='underline font-medium hover:text-[#636366]'> Bỏ thích</button>
                                </div>
                            </div>
                            <div className='card w-[90%] m-[0px] pb-[15px] '>
                                <div>
                                    <img className='rounded-2xl w-[100%]' src="https://s3.go2joy.vn/1000w/hotel/4059/118_1623550819_60c56b63bbc75.jpg" alt="" />
                                </div>
                                <div className='text-card'>
                                    <div className='font-bold text-xl py-3'>VENICE 2 HOTEL</div>
                                </div>
                                <div className='flex justify-between'>
                                    <span> <FontAwesomeIcon icon={faStar} className='text-orange-400' /> 5(2194) Đông Anh  </span>
                                    <button className='underline font-medium hover:text-[#636366]'> Bỏ thích</button>
                                </div>
                            </div>
                            <div className='card w-[90%] m-[0px] pb-[15px] '>
                                <div>
                                    <img className='rounded-2xl w-[100%]' src="https://s3.go2joy.vn/1000w/hotel/4059/118_1623550819_60c56b63bbc75.jpg" alt="" />
                                </div>
                                <div className='text-card'>
                                    <div className='font-bold text-xl py-3'>VENICE 2 HOTEL</div>
                                </div>
                                <div className='flex justify-between'>
                                    <span> <FontAwesomeIcon icon={faStar} className='text-orange-400' /> 5(2194) Đông Anh  </span>
                                    <button className='underline font-medium hover:text-[#636366]'> Bỏ thích</button>
                                </div>
                            </div>
                            <div className='card w-[90%] m-[0px] pb-[15px] '>
                                <div>
                                    <img className='rounded-2xl w-[100%]' src="https://s3.go2joy.vn/1000w/hotel/4059/118_1623550819_60c56b63bbc75.jpg" alt="" />
                                </div>
                                <div className='text-card'>
                                    <div className='font-bold text-xl py-3'>VENICE 2 HOTEL</div>
                                </div>
                                <div className='flex justify-between'>
                                    <span> <FontAwesomeIcon icon={faStar} className='text-orange-400' /> 5(2194) Đông Anh  </span>
                                    <button className='underline font-medium hover:text-[#636366]'> Bỏ thích</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

RoomLike.Layout = ProfileLayout;
export default RoomLike