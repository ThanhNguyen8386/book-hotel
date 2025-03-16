import { MenuItem } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { listOrderUser } from '../../../api/order'
import ProfileLayout from '../../../components/Layout/ProfileLayout'
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
    return (
        <div className="profile_account relative w-full mb:w-[768px] mbs:w-[370px]">
            <div className="flex flex-row justify-between mb-[32px]">
                <h2 className='text-[40px] font-bold'>Phòng yêu thích</h2>
            </div>
            <div className={styles.content_left1}>
                <div className='grid grid-cols-2 items-center mb:grid items-center mbs:inline'>
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
    )
}

RoomLike.Layout = ProfileLayout;
export default RoomLike