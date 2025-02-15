/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';;

// import required modules
import ActionAreaCard from "../Card";
type prop = {
    newsList: []
}
export default function App({ newsList }: prop) {
    return (
        <ActionAreaCard newsList={newsList} />
    );
}
