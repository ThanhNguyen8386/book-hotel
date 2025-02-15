/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-[#ddd] dark:bg-gray-900">
      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-normal font-bold text-[black] uppercase dark:text-gray-400">Hỗ trợ</h2>
            <ul className="text-[black] dark:text-gray-400">
              <li className="mb-4 flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="#" className=" hover:underline text-sm">Hotline: 0123456789</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">Hỗ trợ khách hàng: thanh@gmai.com</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">Liên hệ hợp tác: thanh@gmail.com</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">Cơ chế giải quyết tranh chấp, khiếu nại</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-normal font-bold text-[black] uppercase dark:text-gray-400">Giới thiệu</h2>
            <ul className="text-[black] dark:text-gray-400">
              <li className="mb-4">
                <Link href="/introduce" className="hover:underline text-sm" >
                  Về chúng tôi
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/blog" className="hover:underline text-sm" >
                  Trang blog
                </Link>
                {/* <a href="#" className="hover:underline text-sm">Trang blog</a> */}
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">Qui chế hoạt động website</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">Cơ hội nghề nghiệp</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-normal font-bold text-[black] uppercase dark:text-gray-400">Đối tác thanh toán</h2>
            <ul className="text-[black] dark:text-gray-400 flex">
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">
                  <img width="100px" className='pr-2 h-[100%]' src="https://seeklogo.com/images/V/vnpay-logo-CCF12E3F02-seeklogo.com.png" alt="" />
                </a>
              </li>
              <a href="#" className="hover:underline text-sm">
                <img width="100px" className='pl-2' src="https://seeklogo.com/images/V/vnpay-logo-CCF12E3F02-seeklogo.com.png" alt="" />
              </a>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-normal font-bold text-[black] uppercase dark:text-gray-400">Tải ứng dụng</h2>
            <ul className="text-[black] dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">Privacy Policy</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">Licensing</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-sm">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer