import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { listOrderUser } from '../../../api/order'
import ProfileLayout from '../../../components/Layout/ProfileLayout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import styles from '../../../styles/room.module.css'
import useFavoriteRoom from '../../../hook/favoriteRoom';


type Props = {}

const RoomLike = (props: Props) => {
    const [user, setUser] = useState<any>()
    const { data: favoriteRoomData, addFavoriteRooms, deleFavoriteRooms } = useFavoriteRoom(user);
    const [status, setStatus] = useState(false)
    const router = useRouter();
    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem('user') as string)
        if (getUser == 0 || getUser == null) {
            router.push('/')
            setStatus(false)
        } else {
            setStatus(true)
            setUser(getUser._id)
        }
    }, [])
    return (
        <div className="profile_account relative w-full pl-4">
            <div className="flex flex-row justify-between mb-[32px]">
                <h2 className='text-4xl font-bold'>Phòng yêu thích</h2>
            </div>
            <div className=" max-h-[700px] overflow-y-auto pr-2 space-y-4">
                <div className='grid grid-cols-2 items-center mb:grid items-center mbs:inline'>
                    {favoriteRoomData && favoriteRoomData?.map((item: any, index: any) => {
                        return (
                            <div key={index} className='card w-[90%] m-[0px] pb-[15px] '>
                                <div>
                                    <img className='rounded-2xl w-[100%]' src={item.category.image} alt="" />
                                </div>
                                <div className='text-card'>
                                    <div className='font-semibold text-xl py-3'>{item.category.name}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <span> <FontAwesomeIcon icon={faStar} className='text-orange-400' /> 5(2194) {item.category.address}  </span>
                                    <button className='underline font-medium hover:text-[#636366]'> Bỏ thích</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

RoomLike.Layout = ProfileLayout;
export default RoomLike