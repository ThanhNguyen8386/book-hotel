import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Mousewheel, Navigation, Pagination, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { Dialog, DialogContent } from '@material-ui/core';

const Carousel = ({ images }: []) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [thumbsSwiperDialog, setThumbsSwiperDialog] = useState(null);
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false);
        setThumbsSwiperDialog(null);
    }

    return (
        <>
            <div className='grid grid-rows-3 grid-cols-4 gap-4'>
                <div className='col-span-3 row-span-3 rounded-l-xl overflow-hidden'>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-[400px]"
                        direction="vertical"
                    >
                        {
                            images.map((item: any, index: any) => {
                                return (
                                    <SwiperSlide key={index}>
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
                </div>
                <div className='relative row-span-3 overflow-hidden rounded-tr-xl rounded-br-xl'>
                    <p
                        onClick={() => {
                            setOpen(true)
                        }}
                        className='absolute bottom-[10px] text-sm cursor-pointer left-[50%] translate-x-[-50%] z-[999] p-2 rounded-xl shadow-xl bg-[#fff]'>Xem tất cả</p>
                    <Swiper
                        onSwiper={(swiper:any) => setThumbsSwiper(swiper)}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={3}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        direction="vertical"
                        className="h-[400px]"
                    >
                        {
                            images.map((item: any, index: any) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={item}
                                                alt='anh'
                                                layout="fill"
                                                priority
                                                objectFit="cover"
                                                className='cursor-grab hover:opacity-75 transition'
                                            />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>

            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                fullScreen
                className='z-[9999]'
            >
                <DialogContent>
                    <button
                        className="absolute top-[20px] right-[20px] p-2 rounded-full bg-[white] z-[10000] shadow-xl"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="relative h-full">
                        <div className="h-[60%] w-[60%] rounded-xl overflow-hidden absolute top-[100px] left-[50%] translate-x-[-50%]">
                            <Swiper
                                direction={"vertical"}
                                slidesPerView={1}
                                spaceBetween={30}
                                mousewheel={true}
                                thumbs={{ swiper: thumbsSwiperDialog }}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Mousewheel, Pagination, FreeMode, Thumbs]}
                                className="mySwiper w-full h-full"
                            >
                                {
                                    images.map((item: any, index: any) => {
                                        return (
                                            <SwiperSlide key={index}>
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
                        </div>
                        <div className='w-[40%] absolute bottom-[10px] left-[50%] translate-x-[-50%]'>
                            <Swiper
                                onSwiper={(swiperDialog:any) => setThumbsSwiperDialog(swiperDialog)}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={5}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-[90px]"
                            >
                                {
                                    images.map((item: any, index: any) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <div className="w-full h-full">
                                                    <Image
                                                        src={item}
                                                        alt='anh'
                                                        layout='fill'
                                                        priority
                                                        objectFit="cover"
                                                        className='cursor-grab hover:opacity-75 transition border rounded-xl'
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Carousel
