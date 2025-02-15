import React, { useEffect, useState } from 'react'

type Props = {
    visible: any
}

const BackToTop = ({visible}: Props) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    

    return (
        <div
            onClick={scrollToTop}
            className={`${!visible ? "visible bottom-[10px] opacity-100" : "invisible bottom-[30px] opacity-50"} cursor-pointer duration-150 bg-[orange] p-2 rounded-full fixed right-[10px]`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </div>
    )
}

export default BackToTop