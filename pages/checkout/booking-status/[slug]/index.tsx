import { AccessTime, CheckCircle, CreditCardOff, Hotel } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { detail } from "../../../../api/order";
import Image from "next/image";
import { format } from "date-fns";

export default function CheckOutStatus() {
    const router = useRouter();
    // Placeholder data - you should fetch or pass the actual booking data here
    const defaultBookingData = {
        hotelName: "Lá Hotel Phú Nhuận",
        roomName: "Superior Room",
        checkInTime: new Date(),
        checkOutTime: new Date(),
        date: "23/04", // Should be dynamic
        paymentMethod: "Trả tại khách sạn",
        cancellationPolicy: "19:00, 22/04/2025", // Should be dynamic
        image: "/placeholder-image.jpg" // Add a path to a placeholder or actual image
    };
    const [bookingData, setBookingData] = useState(defaultBookingData)

    const load = async () => {
        if (router.isReady) {
            const { slug } = router.query;
            await detail(slug).then(({ data }) => {
                setBookingData({
                    ...bookingData,
                    image: data.room[0].image[0],
                    hotelName: data.room[0].name,
                    roomName: data.room[0].name,
                    checkInTime: data.order.checkins,
                    checkOutTime: data.order.checkouts,
                })
            })
        }
    }

    useEffect(() => { load() }, [])
    const handleContinueBrowsing = () => {
        router.back(); // Navigate to homepage or another relevant page
    };

    const handleViewBooking = () => {
        // Replace with the actual path to the user's booking details page
        const slug = router.query.slug;
        router.push('/profile/order/' + slug); // Example path
    };
    return (
        <div className="w-[50%] mx-auto bg-white rounded-xl border p-8 text-center space-y-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Ảnh + check icon */}
            <div className="relative">
                <div className="bg-orange-50 rounded-full w-80 h-80 mx-auto flex items-center justify-center">
                    {
                        bookingData.image && (
                            <Image
                                src={bookingData.image}
                                alt="Royal Hotel Room"
                                className="rounded-md"
                                layout="fill"
                            />
                        )
                    }
                </div>
                <CheckCircle className="text-green-500 text-5xl absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white rounded-full" />
            </div>
            {/* Thông báo */}
            <div className="mt-8"> {/* Added margin-top */}
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Đặt phòng thành công</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Chúc mừng bạn đã đặt thành công phòng tại <br />
                    <span className="font-semibold">{bookingData.hotelName}</span>
                </p>
            </div>

            {/* Room Information */}
            <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 mt-6">
                <div className="flex items-center space-x-3 text-gray-700">
                    <Hotel className="text-gray-500 w-5 h-5" />
                    <span className="text-sm  font-semibold sm:text-base">{bookingData.roomName}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                    <AccessTime className="text-gray-500 w-5 h-5" />
                    <span className="text-sm font-semibold sm:text-base">
                        {bookingData.checkInTime
                            ? format(new Date(bookingData.checkInTime), "HH:mm") + " • " +
                            format(new Date(bookingData.checkInTime), 'dd/MM/yyyy')
                            : "--:--"
                        }
                    </span>
                    <span className="text-sm sm:text-base">
                        đến
                    </span>
                    <span className="text-sm font-semibold sm:text-base">
                        {bookingData.checkOutTime
                            ? format(new Date(bookingData.checkOutTime), "HH:mm") + " • " +
                            format(new Date(bookingData.checkOutTime), 'dd/MM/yyyy')
                            : "--:--"
                        }
                    </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                    <CreditCardOff className="text-orange-500 w-5 h-5" />
                    <span className="text-sm sm:text-base">{bookingData.paymentMethod}</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                <button
                    onClick={handleContinueBrowsing}
                    className="w-full text-orange-600 border border-orange-500 px-4 py-2.5 rounded-lg hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-200 text-sm font-medium">
                    Tiếp tục xem
                </button>
                <button
                    onClick={handleViewBooking}
                    className="w-full bg-orange-500 text-white px-4 py-2.5 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition duration-200 text-sm font-medium">
                    Xem thông tin đặt phòng
                </button>
            </div>
        </div>
    );
}
