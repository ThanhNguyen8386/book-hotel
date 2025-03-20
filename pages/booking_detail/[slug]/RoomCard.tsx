import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
export function RoomCard({ room }: any) {
  const prevId = `prev-${room._id}`;
  const nextId = `next-${room._id}`;
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col md:flex-row">
        {/* Room Image */}
        <div className="relative w-full h-full md:w-72 h-72 md:h-auto overflow-hidden">
          <Swiper
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: `#${nextId}`,
              prevEl: `#${prevId}`,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper w-full h-full"
          >
            {
              room.image.map((item: any, index: any) => {
                return (
                  <SwiperSlide key={item._id}>
                    <div className="relative w-full h-full">
                      <Image
                        src={item}
                        alt='anh'
                        layout="fill"
                        objectFit="cover"
                        priority
                        className='cursor-grab hover:opacity-75 transition rounded-l-xl'
                      />
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>

          <div id={prevId} className="absolute top-1/2 left-2 -translate-y-1/2 z-10 custom-prev bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
            <NavigateBeforeIcon />
          </div>
          <div id={nextId} className="absolute top-1/2 right-2 -translate-y-1/2 z-10 custom-next bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
            <NavigateNextIcon />
          </div>
        </div>
        {/* Room Details */}
        <div className="flex-grow p-6 flex flex-col md:flex-row">
          {/* Room Info */}
          <div className="flex-grow">
            <div className="mb-5">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                Thông tin phòng
              </h3>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800 text-lg">
                  {room.name}
                </p>

              </div>
            </div>
            {/* {room.features.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">
                  Đặc điểm nổi bật
                </h3>
                <div className="flex gap-2">
                  {room.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm border border-gray-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )} */}
            <button
              onClick={() => console.log(`View details for ${room.name}`)}
              className="mt-6 inline-flex items-center text-gray-600 hover:text-gray-800 font-medium text-sm group/btn"
            >
              Xem chi tiết phòng{' '}

            </button>
          </div>
          {/* Price and Book */}
          <div className="mt-6 md:mt-0 md:w-56 flex flex-col items-start md:items-end justify-between border-t md:border-t-0 pt-6 md:pt-0">
            <div className="text-right">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Giá phòng
              </h3>
              <div className="flex items-baseline gap-1 justify-end">
                <p className="text-gray-800 font-bold text-2xl">{room.price[0].value}</p>
                <span className="text-sm font-normal text-gray-500">
                  {room.hourRate}
                </span>
              </div>
            </div>
            <button className="w-full md:w-auto mt-4 px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-300 font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30">
              Đặt phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
