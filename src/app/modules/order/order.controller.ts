
import { Request, Response } from "express";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { orderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const placeOrder = catchAsync(async (req: Request, res: Response) => {
  const orderDoc = req.body;
  const result = await orderService.placeOrderFunc(orderDoc);
  sendResponse(res, {
    success: true,
    message: 'Order Place successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})
const getOrder = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await orderService.getOrderFunc(email);
  sendResponse(res, {
    success: true,
    message: 'Order fetch successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})
const trackOrder = catchAsync(async (req: Request, res: Response) => {
  const email = req.query.email;
  const search = req.query.search;
  const trackDoc = {
    email,
    search
  }

  const result = await orderService.trackOrderFunc(trackDoc as { email: string; search: string });
  sendResponse(res, {
    success: true,
    message: 'track fetch successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})
const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrderFunc();
  sendResponse(res, {
    success: true,
    message: 'All Order fetch successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await orderService.deleteOrderFunc(id);
  sendResponse(res, {
    success: true,
    message: 'Order Deleted successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const orderinfo = req.body;
  const result = await orderService.updateOrderStatusFunc(orderinfo);
  sendResponse(res, {
    success: true,
    message: 'Order Deleted successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

export const orderController = {
  placeOrder,
  getOrder,
  trackOrder,
  getAllOrder,
  deleteOrder,
  updateOrderStatus
} 