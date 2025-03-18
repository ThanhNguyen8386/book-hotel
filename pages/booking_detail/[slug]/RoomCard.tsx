import React from 'react'
interface RoomProps {
  room: {
    id: number
    name: string
    image: string
    features: string[]
    price: string
    hourRate: string
  }
}
export function RoomCard({ room }: RoomProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col md:flex-row">
        {/* Room Image */}
        <div className="relative w-full md:w-72 h-72 md:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-20 transition-all duration-300">
            {/* <ChevronRight size={20} className="text-gray-600" /> */}
          </button>
          <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1.5 z-20">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'w-3 bg-white' : 'bg-white/60'}`}
              />
            ))}
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
            {room.features.length > 0 && (
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
            )}
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
                <p className="text-gray-800 font-bold text-2xl">{room.price}</p>
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
