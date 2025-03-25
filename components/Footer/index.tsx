import React from 'react'
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
const Footer = () => (
  <footer className="bg-white border-t border-gray-200 w-[90%] mx-auto">
    <div className="container mx-auto px-4 py-8">
      {/* Main footer sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Support section */}
        <div>
          <h3 className="font-medium text-lg mb-4">Hỗ trợ</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <LocalPhoneTwoToneIcon size={18} className="mr-2" />
              <span>Hotline: 1900 638 838</span>
            </div>
            <p>Hỗ trợ khách hàng: cskh@go2joy.vn</p>
            <p>Liên hệ hợp tác: support@go2joy.vn</p>
            <p>Cơ chế giải quyết tranh chấp, khiếu nại</p>
          </div>
        </div>
        {/* Introduction section */}
        <div>
          <h3 className="font-medium text-lg mb-4">Giới thiệu</h3>
          <ul className="space-y-2">
            <li>Về chúng tôi</li>
            <li>Trang blog</li>
            <li>Quy chế hoạt động website</li>
            <li>Cơ hội nghề nghiệp</li>
            <li>Dành cho đối tác</li>
          </ul>
        </div>
        {/* Payment partners section */}
        <div>
          <h3 className="font-medium text-lg mb-4">Đối tác thanh toán</h3>
          <div className="flex flex-wrap gap-3">
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
              alt="VNPay"
              className="h-8 object-contain" />
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
              alt="MoMo"
              className="h-8 object-contain" />
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Zalo-Pay.png"
              alt="ZaloPay"
              className="h-8 object-contain" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
              alt="MasterCard"
              className="h-8 object-contain" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
              alt="Visa"
              className="h-8 object-contain" />
          </div>
        </div>
        {/* App download section */}
        <div>
          <h3 className="font-medium text-lg mb-4">Tải ứng dụng</h3>
          <div className="flex flex-col space-y-3">
            <img
              src="https://uploadthingy.s3.us-west-1.amazonaws.com/9EFQgc9Si16Met8VKV9RQZ/image.png"
              alt="QR Code"
              className="h-32 w-32 object-contain" />
            <div className="flex flex-col space-y-2">
              <a href="#" className="inline-block">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on App Store"
                  className="h-10" />
              </a>
              <a href="#" className="inline-block">
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-12" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-200 my-6" />
      {/* Copyright section */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-sm text-gray-600">
          <p>
            Copyright © 2023 GO2JOY Vietnam, Jsc. · Điều khoản · Bảo mật ·
            Quy định đăng tin · Sơ đồ trang web
          </p>
        </div>
      </div>
      {/* Company info */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p className="font-medium mb-2">CÔNG TY CỔ PHẦN GO2JOY VIỆT NAM</p>
        <p className="mb-1">
          Địa chỉ trụ sở: 5A/2 đường Trần Phú, Phường 04, Quận 5, Thành phố Hồ
          Chí Minh, Việt Nam
        </p>
        <p className="mb-1">
          Người đại diện theo pháp luật: BYUN SUNG MIN - chức vụ: Tổng Giám
          đốc
        </p>
        <p>
          Mã số thuế: 0311850218 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp
          lần đầu ngày 11/06/2012, thay đổi lần thứ 19 ngày 10/01/2024
        </p>
      </div>
    </div>
  </footer>
)
export default Footer
