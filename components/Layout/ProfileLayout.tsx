import { useRouter } from "next/router";
import { RECEPTIONIST_ROLE, USER_ROLE } from "../../constants";
import PrivateRouter from "../Private/privateRouter";
import React, { useEffect, useMemo, useState } from 'react'
import { listOrderUser } from "../../api/order";
import Link from "next/link";
import SiteLayout from ".";
import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

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
            <div className="account_sidebar sticky top-[100px] flex flex-col w-[400px] h-fit border border-gray-20 rounded-3xl p-[24px] pb-[70px] mr-[32px] mb:flex mbs:mx-auto">
              <div className="account_info px-[16px] py-[24px]">
                <div className='contents'><img width={50} className="rounded-full mx-auto h-[100px] w-[100px] object-cover border-orange-500 p-[2px] border border-dashed" src={user?.avatar || "https://go2joy.vn/images/icons/user-placeholder.svg"} alt="" /></div>
                <div className='text-center font-medium text-2xl'>{user?.phone}</div>
              </div>
              <div className=" cursor-pointer account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]">
                <Link href='/profile'
                  className=' flex flex-row justify-center'>
                  <p className={`${router.pathname === '/profile' ? 'text-amber-500' : ''}`}>
                    <AccountBoxTwoToneIcon />
                    <span className='pl-[10px] font-medium text-lg'>Hồ sơ của tôi</span>
                  </p>
                </Link>
              </div>
              <div className=" cursor-pointer account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]">
                <Link href='/profile/order' className=' flex flex-row justify-center'>
                  <p className={`${router.asPath.includes('/profile/order') ? 'text-amber-500' : ''}`}>
                    <HistoryTwoToneIcon />
                    <span className='pl-[10px] font-medium text-lg'>Đặt phòng của tôi</span>
                  </p>
                </Link>
              </div>
              <div className="account__sidebar--link cursor-pointer flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]">
                <Link href='/profile/room_like' className=' flex flex-row justify-center'>
                  <p className={`${router.asPath.includes('/profile/room_like') ? 'text-amber-500' : ''}`}>
                    <FavoriteTwoToneIcon />
                    <span className='pl-[10px] font-medium text-lg'>Danh sách yêu thích</span>
                  </p>
                </Link>
              </div>
              <div className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px]">
                <a href='#' className=' flex flex-row justify-center'>
                  <ConfirmationNumberTwoToneIcon />
                  <span className='pl-[10px] font-medium text-lg'>Coupon của tôi </span>
                </a>
              </div>
              <hr className='my-[16px]' />
              <div
                onClick={() => {
                  setStatus(false)
                  localStorage.removeItem('user')
                  router.push('/')
                }}
                className="account__sidebar--link flex flex-row hover:bg-gray-200 hover:text-amber-500 px-[24px] py-[10px] cursor-pointer">
                <p className='flex flex-row justify-center'>
                  <LogoutTwoToneIcon />
                  <span className='pl-[10px] font-medium text-lg'>
                    Đăng Xuất
                  </span>
                </p>
              </div>

            </div>
            {children}
          </div>
        </div>
      </PrivateRouter>
    </SiteLayout>
  );
}

export default ProfileLayout