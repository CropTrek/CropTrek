export type CryptoProductStatus = 'InStock' | 'notInStock' ;

export interface CryptoProduct {
    _id: string;
    status: CryptoProductStatus;
    name: string;

    description: string;

    price: number;
    countInStock: number;


    user:User;
}
export interface User {
    _id: string;
    name:string;
    surname:string;
    email:string;
    adresse:string;
}
