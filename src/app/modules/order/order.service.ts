import Stripe from "stripe";
import config from "../../config";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { Order } from "./order.model";
import mongoose from "mongoose";
const stripe = new Stripe(config.STRIPE_SECRET_KEY as string);



const placeOrderFunc = async (payload: any) => {
    const session = await mongoose.startSession();
  
    try {
        session.startTransaction();
        const totalPrice = Number(payload?.price) * Number(payload?.quantity);
        const currency = "usd";


        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: totalPrice,
                currency,
            },
            { idempotencyKey: payload?.orderId }
        );


        if (!paymentIntent?.client_secret) {
            await session.abortTransaction();
            session.endSession();
            throw new AppError(StatusCodes.BAD_REQUEST, "Payment failed");
        }
        const orderProduct = {
            productName: payload?.productName,
            productId: payload?.productId,
            price: payload?.price,
            quantity: payload?.quantity,
            userInfo: {
                name: payload?.userInfo?.name,
                email: payload?.userInfo?.email,
                role: payload?.userInfo?.role,
            },
            orderId: paymentIntent?.id,
            orderTrack: [
                { title: "Pending", description: "Your order is in pending." },
                { title: "Processing", description: "Your order has processed." },
                { title: "Shipped", description: "Your order has been shipped successfully." },
                { title: "Delivered", description: "Your order has been delivered successfully." },
            ],
            orderActiveTrack: 1,
        };

      
        const res = await Order.create([orderProduct], { session });

        if (!res) {
            await session.abortTransaction();
            session.endSession();
            throw new AppError(StatusCodes.BAD_REQUEST, "Payment failed");
        }
        await session.commitTransaction();
        session.endSession();

        return paymentIntent;
    } catch (error) {
          
        await session.abortTransaction();
        session.endSession();
       
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to pay");
    }
};
const getOrderFunc = async (payload: string) => {
    const result = await Order.find({ 'userInfo.email': payload });
    return result
}
const getAllOrderFunc = async () => {
    const result = await Order.find();
    return result
}
const trackOrderFunc = async (payload: any) => {
    try {

        if (payload?.email && payload?.search) {
            const searchTerm = {
                "userInfo.email": { $regex: payload?.email, $options: "i" },
                orderId: { $regex: String(payload?.search), $options: "i" }
            };
            const res = await Order.findOne(searchTerm);
            return res;
        }
        return {}

    } catch (error) {

        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to track order");
    }
};
const deleteOrderFunc =async(id:any)=>{
    try {
        const res = await Order.findByIdAndDelete(id);
        return res
    } catch (error) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to delete order");
    }
}
const updateOrderStatusFunc = async(track:any)=>{
    try {
        const order = await Order.findByIdAndUpdate(track?.id,{
            $set:{
                orderActiveTrack:track?.trackId
            }
        } );
        return order
    } catch (error) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update order status");
    }
 }






export const orderService = {
    placeOrderFunc,
    getOrderFunc,
    trackOrderFunc,
    getAllOrderFunc,
    deleteOrderFunc,
    updateOrderStatusFunc
}