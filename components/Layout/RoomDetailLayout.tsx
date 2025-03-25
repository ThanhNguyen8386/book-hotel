import React, { useEffect, useState } from 'react'
import { LayoutProps } from '../../models/layout'
import BackToTop from '../BackToTop'
import Footer from '../Footer'
import Header from '../Header'
import HeaderBookingDetail from '../HeaderBookingDetail'
import { RoomContext } from '../../contexts/LayoutContext'

type Props = {}
type RoomDetailLayoutProps = LayoutProps & {
    roomName: string;
};
const RoomDetailLayout = ({ children, roomName }: RoomDetailLayoutProps) => {
    const [visible, setVisible] = useState(true);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 150) {
            setVisible(false)
        }
        else if (scrolled <= 150) {
            setVisible(true)
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", toggleVisible)
    }, [])
    return (
        <div className="w-[80%] mx-auto">
            <HeaderBookingDetail />
            {children}
            <BackToTop visible={visible} />
            <Footer />
        </div>
    )
}

export default RoomDetailLayout