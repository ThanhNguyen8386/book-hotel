
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