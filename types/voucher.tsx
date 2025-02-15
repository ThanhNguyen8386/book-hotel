
export type Voucher = {
    _id?: string;
    code: string;
    quantity: number;
    discount: number;
    activeTime: string;
    expriedTime: string;
    users?: string[];
}