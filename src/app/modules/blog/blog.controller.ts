import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createBlog = catchAsync(async (req: Request, res: Response) => {
  const getDoc = req.body;

  const result = await blogService.createBlogFunc(getDoc);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const getDoc = req.body;

  const result = await blogService.updateBlogFunc(getDoc);
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogService.deleteBlogFunc(id as any);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getAllBlogsFunc();
  sendResponse(res, {
    success: true,
    message: 'All blogs Fatch successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogService.getSingleBlogFunc(id as any);
  sendResponse(res, {
    success: true,
    message: 'Single blog Fatch successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
};
