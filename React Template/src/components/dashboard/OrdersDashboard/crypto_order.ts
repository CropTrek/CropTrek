export type CryptoOrderStatus = 'isPaid' | 'pending' | 'failed';

export interface CryptoOrder {
    _id: string;
    status: CryptoOrderStatus;
    orderDetails: string;
    createdAt: Date;
    orderID: string;
    sourceName: string;
    sourceDesc: string;
    totalPrice: number;
    amount: number;
    cryptoCurrency: string;
    currency: string;
    payementMethod:string;
    taxPrice:number;
    shippingPrice:number;
    isPaid:boolean;
    user:User;
    paidAt:Date;
}
export interface User {
    _id: string;
    name:string;
    surname:string;
    email:string;

}
