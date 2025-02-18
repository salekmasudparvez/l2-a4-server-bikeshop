import { Document } from "mongoose";

export interface TOrder extends Document {
    productName :string;
    productId:number;
    price:number;
    quantity:number;
    userInfo:{
        name:string;
        email:string;
        role:'customer';
    };
    orderId:string;
    orderTrack:[{
        title:string;
        description:string;
    }]|[],
    orderActiveTrack:number
}