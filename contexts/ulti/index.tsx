export const formatCurrency = (currency: number) => {
    const tempCurrency = +currency >= 0 ? currency : 0;
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
};

export const methodPay = (key: string) => {
    if (key == "0") {
        return <div className="">
            <span className="">
                Thanh toán trực tiếp
            </span>
        </div>
    } else if (key == "1") {
        return <div className="flex items-center justify-between">
            <span className="">Thanh toán trực tuyến</span>
            <span className=" text-red-500">Chưa thanh toán</span>
        </div>
    } else if (key == "2") {
        return <div className="flex items-center justify-between">
            <span className="">Thanh toán trực tuyến</span>
            <span className="">Đã thanh toán</span>
        </div>
    }
}