import React from 'react'
import { RoomCard } from './RoomCard'
const roomData = [
  {
    id: 1,
    name: 'Standard Double',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/evfZcjyB1AARAzxWaFH3SG/Screenshot_2025-03-18_155344.png',
    features: [],
    price: '184.000đ',
    hourRate: '/2 giờ',
  },
  {
    id: 2,
    name: 'Superior King Room',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/evfZcjyB1AARAzxWaFH3SG/Screenshot_2025-03-18_155344.png',
    features: ['Cửa Sổ', 'Thành Phố'],
    price: '230.000đ',
    hourRate: '/2 giờ',
  },
  {
    id: 3,
    name: 'Premier King Room City View',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/evfZcjyB1AARAzxWaFH3SG/Screenshot_2025-03-18_155344.png',
    features: [],
    price: '345.000đ',
    hourRate: '/2 giờ',
  },
]
export function RoomList() {
  return (
    <div className="space-y-6">
      {roomData.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}
