
// const Validation = {
//     validLength(props, minLength, maxLength, isNumber) {
//         if (isNumber) {
//             if (minLength != null && (CommonFunction.isEmpty(props) || props === 0)) {
//                 return CommonFunction.t('validate.required');
//             }
//             if (minLength && props && props.toString() && props.toString().length < minLength) {
//                 return CommonFunction.t("validate.min-length").format(minLength);
//             }
//             if (maxLength && props && props.toString() && props.toString().length > maxLength) {
//                 return CommonFunction.t("validate.max-length").format(maxLength);
//             }
//         } else {
//             if (minLength != null && CommonFunction.isEmpty(props)) {
//                 return CommonFunction.t('validate.required');
//             }
//             if (minLength != null && props && props.length < minLength) {
//                 return CommonFunction.t("validate.min-length").format(minLength);
//             }
//             if (maxLength != null && props && props.length > maxLength) {
//                 return CommonFunction.t("validate.max-length").format(maxLength);
//             }
//         }
//         return null;
//     },
// }

// export default Validation;

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