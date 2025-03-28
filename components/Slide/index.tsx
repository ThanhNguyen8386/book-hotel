/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

// import required modules
import ActionAreaCard from "../Card";
type prop = {
    newsList: [],
    dataDate: [],
    indexTab: any
}
export default function App({ newsList, dataDate, indexTab }: prop) {
    return (
        <ActionAreaCard 
        newsList={newsList} 
        indexTab={indexTab} 
        dataDate={dataDate} 
        />
    );
}
