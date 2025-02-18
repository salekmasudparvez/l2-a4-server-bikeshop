import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { productService } from './product.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const productCreate = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const productData = JSON.parse(data.data);
  const file = req.file;
  const result = await productService.productCreateFunc({
    data: productData,
    file,
  });
  sendResponse(res, {
    success: true,
    message: 'Product Created successfully 😊',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const productUpdate = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const updateDoc = JSON.parse(data.data);

  const result = await productService.productUpdateFunc({
    payload: updateDoc,
    file: data?.file,
  });
  sendResponse(res, {
    success: true,
    message: 'Product updated successfully 😊',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const updateAvailable =catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await productService.updateAvailableFunc(id);
  sendResponse(res, {
    success: true,
    message: 'Updated product status',
    data: result,
    statusCode: StatusCodes.OK,
  });
})
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const queries = req.query;
  const result = await productService.getAllProductsFunc(queries);
  sendResponse(res, {
    success: true,
    message: 'Products fetched successfully ',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const getAllCateAndBrand = catchAsync(async (req: Request, res: Response) => {
  
  const result = await productService.getAllCateAndBrandFunc();
  sendResponse(res, {
    success: true,
    message: 'Category fetched successfully ',
    data: result,
    statusCode: StatusCodes.OK,
  });
});


const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const params = req.params.id;
  const result = await productService.getSingleProductFunc(params);
  sendResponse(res, {
    success: true,
    message: 'Product fetched successfully 😊',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id  = req.params.id;

  const result = await productService.deleteProductFunc(id);
  sendResponse(res, {
    success: true,
    message: 'Product deleted successfully ',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

export const productController = {
  productCreate,
  productUpdate,
  getSingleProduct,
  deleteProduct,
  getAllProducts,
  updateAvailable,
  getAllCateAndBrand,

};
