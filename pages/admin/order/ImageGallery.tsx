import React, { useState } from 'react'
import {
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material'
interface Image {
  url: string
  alt: string
}
interface ImageGalleryProps {
  images: Image[]
  isOpen: boolean
  onClose: () => void
}
const ImageGallery = ({ images, isOpen, onClose }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  if (!isOpen) return null
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <CloseIcon size={24} />
        </button>
        <button
          onClick={previousImage}
          className="absolute left-4 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronLeftIcon size={36} />
        </button>
        <img
          src={images && images[currentImageIndex]}
          alt="anh"
          className="max-h-[80vh] max-w-[80vw] object-contain"
        />
        <button
          onClick={nextImage}
          className="absolute right-4 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronRightIcon size={36} />
        </button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-4' : 'bg-gray-400 hover:bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default ImageGallery
