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
  }
]
export function RoomList({roomList}: any) {
  return (
    <div className="space-y-6">
      {roomList.map((room:any, index:any) => (
        <RoomCard key={index} room={room} />
      ))}
    </div>
  )
}
