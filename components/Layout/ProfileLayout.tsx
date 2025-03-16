import { useRouter } from "next/router";
import SiteLayout from ".";
import { RECEPTIONIST_ROLE, USER_ROLE } from "../../constants";
import PrivateRouter from "../Private/privateRouter";
import React, { useEffect, useMemo, useState } from 'react'
import { listOrderUser } from "../../api/order";
import Link from "next/link";

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const [user, setUser] = useState<any>({})
  const [rows, setRows] = React.useState<any>([{ _id: 1, name: null }]);
  const [order, setorder] = useState([])
  const [status, setStatus] = useState(false)
  const refDetail = React.useRef<any>();
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
        const { data }: any = await listOrderUser(getUser._id)
        setorder(data)
        setRows(data)
      }
    }
    get()
  }, [])
  type ProfileLayoutProps = {
    children: JSX.Element;
  };
  return (
    <SiteLayout>
      <PrivateRouter acceptRole={[USER_ROLE, RECEPTIONIST_ROLE]}>
        <div className='flex justify-center'>
          <div className="account_body container justify-center my-[40px] flex flex-row px-[96px] mb:flex mbs:inline ">
            <div className="account_sidebar flex flex-col w-[370px] h-fit border border-gray-20 rounded-3xl p-[24px] pb-[70px] mr-[32px] mb:flex mbs:mx-auto">
              <div className="account_info px-[16px] py-[24px]">
                <div className='contents'><img width={50} className="rounded-full mx-auto h-[100px] w-[100px] object-cover border-current" src={user?.avatar || "https://go2joy.vn/images/icons/user-placeholder.svg"} alt="" /></div>
                <div className='text-center font-medium text-2xl'>{user?.phone}</div>
              </div>
              <div className=" cursor-pointer account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]">
                <Link href='/profile'
                  className=' flex flex-row justify-center'>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <span className='pl-[10px] font-normal text-lg'>Hồ sơ của tôi</span>
                  </p>
                </Link>
              </div>
              <div className=" cursor-pointer account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]">
                <Link href='/profile/order' className=' flex flex-row justify-center'>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className='pl-[10px] font-normal text-lg'>Đặt phòng của tôi</span>
                  </p>
                </Link>
              </div>
              <div className="account__sidebar--link cursor-pointer flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]">
                <Link href='/profile/room_like' className=' flex flex-row justify-center'>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px] block m-auto inline">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <span className='pl-[10px] font-normal text-lg'>Danh sách yêu thích</span>
                  </p>
                </Link>
              </div>
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
            {children}
          </div>
        </div>
      </PrivateRouter>
    </SiteLayout>
  );
}

export default ProfileLayout