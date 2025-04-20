import { AccessTime, CheckCircle, CreditCardOff, Hotel } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function CheckOutStatus() {
    const router = useRouter();

    // Placeholder data - you should fetch or pass the actual booking data here
    const bookingData = {
        hotelName: "Lá Hotel Phú Nhuận",
        roomName: "Superior Room",
        checkInTime: "21:00",
        checkOutTime: "12:00",
        date: "23/04", // Should be dynamic
        paymentMethod: "Trả tại khách sạn",
        cancellationPolicy: "19:00, 22/04/2025", // Should be dynamic
        roomImage: "/placeholder-image.jpg" // Add a path to a placeholder or actual image
    };

    const handleContinueBrowsing = () => {
        router.push('/'); // Navigate to homepage or another relevant page
    };

    const handleViewBooking = () => {
        // Replace with the actual path to the user's booking details page
        router.push('/my-bookings'); // Example path
    };
    return (
        <div className="w-[60%] mx-auto bg-white rounded-xl border p-8 text-center space-y-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Ảnh + check icon */}
            <div className="relative">
                {/* <div className="bg-orange-50 rounded-full w-40 h-40 mx-auto flex items-center justify-center">
                    {
                        dataorder.image && (
                            <Image
                                src={dataorder.image[0]}
                                alt="Royal Hotel Room"
                                className="rounded-md"
                                width={100}
                                height={100}
                            />
                        )
                    }
                </div> */}
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
                    <span className="text-sm sm:text-base">{bookingData.roomName}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                    <AccessTime className="text-gray-500 w-5 h-5" />
                    <span className="text-sm sm:text-base">{`${bookingData.checkInTime} - ${bookingData.checkOutTime}, ${bookingData.date}`}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                    <CreditCardOff className="text-orange-500 w-5 h-5" />
                    <span className="text-sm sm:text-base">{bookingData.paymentMethod}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 pl-8"> {/* Adjusted padding */}
                    Hủy miễn phí trước <span className="text-black font-semibold">{bookingData.cancellationPolicy}</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                <button
                    // onClick={handleContinueBrowsing}
                    className="w-full text-orange-600 border border-orange-500 px-4 py-2.5 rounded-lg hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-200 text-sm font-medium">
                    Tiếp tục xem
                </button>
                <button
                    // onClick={handleViewBooking}
                    className="w-full bg-orange-500 text-white px-4 py-2.5 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition duration-200 text-sm font-medium">
                    Xem thông tin đặt phòng
                </button>
            </div>
        </div>
    );
}
