import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ProfileLayout from '../../../components/Layout/ProfileLayout'
import useFavoriteRoom from '../../../hook/favoriteRoom';
import Image from 'next/image';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Link from 'next/link';


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
                <div className='grid grid-cols-3 items-center mb:grid items-center mbs:inline'>
                    {favoriteRoomData && favoriteRoomData?.map((item: any, index: any) => {
                        return (
                            <div className={`mb-4 relative w-[280px] rounded-xl hover:shadow-lg transition overflow-hidden cursor-pointer`} key={index}>
                                <div
                                    onClick={() => {
                                        if (user == null) {
                                            router.push("/signin")
                                            return;
                                        }
                                        // return handleChangeFavoriteRoom({
                                        //     category: item._id,
                                        //     user: user
                                        // })
                                    }}
                                    className="absolute top-2 right-2 z-10">
                                    <p className={`${favoriteRoomData?.some(fav => fav?.category?._id === item._id) ? "text-red-600" : ""} text-gray-600 hover:text-red-600 hover:scale-125 duration-300`}>
                                        <FavoriteTwoToneIcon className="" />
                                    </p>
                                </div>
                                <Link href={`/booking_detail/${item.category.slug}`}>
                                    <div className="">
                                        <div className="">
                                            <Image
                                                src={item.category.image}
                                                alt="Ba Vì"
                                                width={280}
                                                height={200}
                                                className="rounded-xl object-cover"
                                            />
                                        </div>

                                        <div className="p-3">
                                            <h3 className="font-semibold">{item.category.name}</h3>
                                            <p className="text-gray-500 text-sm">{item.category.address}</p>
                                        </div>
                                    </div>
                                </Link>
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