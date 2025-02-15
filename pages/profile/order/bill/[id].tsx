import { useRouter } from 'next/router'
import React from 'react'
import { update } from '../../../../api/order'
import ProfileLayout from '../../../../components/Layout/ProfileLayout'


type Props = {}


const billpayment = (props: Props) => {
    const myKeyValue = window.location.search;
    const urlParms = new URLSearchParams(myKeyValue);
    // const vnp_Amount = urlParms.get("vnp_Amount");
    const vnp_BankCode = urlParms.get("vnp_BankCode");
    // const vnp_PayDate = urlParms.get("vnp_PayDate")
    const router = useRouter();
    // const vnp_TransactionNo = urlParms.get("vnp_TransactionNo")
    const { id } = router.query
    const updateOrder = () => {

        const data: any = {
            _id: id,
            methodpay: "2"
        }
        update(data).then(() => {
            router.push(`/profile/order/${id}`)
        })
    }

    const button = document.getElementById('linkid')
    setInterval(function () {
        button?.click()
    }, 1)
    return (
        <div id='linkid' onClick={() => updateOrder()}>{id}
            <button id='linkid'>{id}</button>
        </div>
    )
}

billpayment.Layout = ProfileLayout;
export default billpayment