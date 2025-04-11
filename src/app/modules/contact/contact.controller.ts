import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

const createContact = catchAsync(async (req: Request, res: Response) => {
  const getDoc = req.body;

  const result = await blogService.createBlogFunc(getDoc);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
export const contactController = {
  createContact,
};
const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await blogService.createBlogFunc(id);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
export const contactController = {
  createContact,
};
const getContactMessage = catchAsync(async (req: Request, res: Response) => {

  const result = await blogService.createBlogFunc(getDoc);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const getSingleContactMessage = catchAsync(async (req: Request, res: Response) => {

  const result = await blogService.createBlogFunc(getDoc);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
export const contactController = {
  createContact,
  getSingleContactMessage,
  getContactMessage,
  deleteContact
};
