import React, { useState } from 'react'
import {
  Collections as CollectionsIcon,
  CalendarToday as CalendarIcon,
  Schedule as ClockIcon,
} from '@mui/icons-material'
import ImageGallery from './ImageGallery'
const roomImages = [
  {
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    alt: 'Hotel room',
  },
  {
    url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    alt: 'Modern room',
  },
  {
    url: 'https://images.unsplash.com/photo-1557682250-f0ba2d219bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    alt: 'Purple waves',
  },
  {
    url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    alt: 'Coffee cup',
  },
  {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    alt: 'Luxury bathroom',
  },
  {
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    alt: 'Hotel view',
  },
  {
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    alt: 'Room service',
  },
  {
    url: 'https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    alt: 'Hotel lobby',
  },
]
const RoomInfo = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const openGallery = (index: number) => {
    setSelectedImageIndex(index)
    setIsGalleryOpen(true)
  }
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">
          Thông tin phòng
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
        <h3 className="text-2xl font-medium text-gray-800 flex items-center gap-2">
          <span>Nhà nghỉ Bình minh</span>
          <div className="flex-1 h-px bg-gray-200 ml-4"></div>
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        {roomImages.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => openGallery(index)}
          >
            <div className="relative overflow-hidden">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <CollectionsIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-8">
        <button
          onClick={() => openGallery(4)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
        >
          <CollectionsIcon
            sx={{
              fontSize: 20,
            }}
          />
          Xem thêm {roomImages.length - 4} ảnh
        </button>
      </div>
      <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl mb-8">
        <img
          src="https://images.unsplash.com/photo-1556905200-279565513a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Promotion banner"
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h4 className="font-medium mb-4 text-gray-900 flex items-center gap-2">
            <CalendarIcon size={20} className="text-blue-500" />
            Thời gian CheckIn
          </h4>
          <div className="space-y-3">
            <p className="text-gray-700 flex items-center gap-2">
              <ClockIcon size={16} className="text-gray-400" />
              <span className="w-20">Giờ:</span>
              <span className="font-medium text-gray-900">14:00</span>
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <CalendarIcon size={16} className="text-gray-400" />
              <span className="w-20">Ngày:</span>
              <span className="font-medium text-gray-900">24/02/2025</span>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h4 className="font-medium mb-4 text-gray-900 flex items-center gap-2">
            <CalendarIcon size={20} className="text-blue-500" />
            Thời gian CheckOut
          </h4>
          <div className="space-y-3">
            <p className="text-gray-700 flex items-center gap-2">
              <ClockIcon size={16} className="text-gray-400" />
              <span className="w-20">Giờ:</span>
              <span className="font-medium text-gray-900">12:00</span>
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <CalendarIcon size={16} className="text-gray-400" />
              <span className="w-20">Ngày:</span>
              <span className="font-medium text-gray-900">25/02/2025</span>
            </p>
          </div>
        </div>
      </div>
      <ImageGallery
        images={roomImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  )
}
export default RoomInfo
