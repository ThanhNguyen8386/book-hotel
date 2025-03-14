import React, { useState } from 'react'
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  VerifiedUser as VerifiedUserIcon,
  Refresh as RefreshIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material'
const statusOptions = [
  {
    label: 'Chờ xác nhận',
    color: 'from-yellow-500 to-yellow-600',
    hoverColor: 'hover:from-yellow-600 hover:to-yellow-700',
  },
  {
    label: 'Đã xác nhận',
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700',
  },
  {
    label: 'Đã hủy',
    color: 'from-red-500 to-red-600',
    hoverColor: 'hover:from-red-600 hover:to-red-700',
  },
]
const CustomerInfo = () => {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0])
  const handleStatusChange = (status: (typeof statusOptions)[0]) => {
    setSelectedStatus(status)
    setIsStatusDropdownOpen(false)
  }
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">
          Thông tin khách hàng
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8 hover:shadow-lg transition-all duration-300">
        <div className="space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <PersonIcon
                className="text-blue-500"
                sx={{
                  fontSize: 18,
                }}
              />
              Name:
            </span>
            <span className="text-gray-900">Trần Ngọc Ánh</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <PhoneIcon
                className="text-blue-500"
                sx={{
                  fontSize: 18,
                }}
              />
              Phone:
            </span>
            <span className="text-gray-900">0354170252</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <EmailIcon
                className="text-blue-500"
                sx={{
                  fontSize: 18,
                }}
              />
              Email:
            </span>
            <span className="text-gray-900">anh@gmail.com</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <CreditCardIcon
                className="text-blue-500"
                sx={{
                  fontSize: 18,
                }}
              />
              Tạm tính:
            </span>
            <span className="text-gray-900">10 đ</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-900 flex items-center gap-2">
              <WalletIcon
                className="text-orange-500"
                sx={{
                  fontSize: 20,
                }}
              />
              Tổng tiền:
            </span>
            <span className="font-bold text-orange-500">10 đ</span>
          </div>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8 hover:shadow-lg transition-all duration-300">
        <div className="space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <VerifiedUserIcon
                className="text-blue-500"
                sx={{
                  fontSize: 18,
                }}
              />
              Status Booking:
            </span>
            <div className="relative">
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className={`bg-gradient-to-r ${selectedStatus.color} text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md ${selectedStatus.hoverColor} flex items-center gap-2`}
              >
                {selectedStatus.label}
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 18,
                  }}
                />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10">
                  {statusOptions.map((status) => (
                    <button
                      key={status.label}
                      onClick={() => handleStatusChange(status)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${selectedStatus.label === status.label ? 'text-blue-500 font-medium' : 'text-gray-700'}`}
                    >
                      {status.label}
                      {selectedStatus.label === status.label && (
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${status.color}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <CreditCardIcon
                className="text-blue-500"
                sx={{
                  fontSize: 18,
                }}
              />
              Phương thức:
            </span>
            <span className="text-gray-900">Thanh toán trực tiếp</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
          <RefreshIcon
            sx={{
              fontSize: 20,
            }}
          />
          Cập Nhật
        </button>
      </div>
    </div>
  )
}
export default CustomerInfo
