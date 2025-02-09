import { Product } from './product.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

interface TProductCreate {
  data:{
    productName: string;
    price: number;
    category: string;
    model: string;
    brand: string;
    description: string;
    photoURL?: string;
    productId?: string;
  
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file:any
}
const productCreateFunc = async (payload:TProductCreate) => {
  const userData = payload?.data;

  const session = await mongoose.startSession();

  const numericAlphabet = '0123456789';
  const nanoid = customAlphabet(numericAlphabet, 5);
  const productId = nanoid();

  userData.productId = productId;
  const file = payload?.file;
  const newProductDoc = {
    ...userData,
    isAvailable: true,
    productId,
  };

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${userData.productName}${productId}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      newProductDoc.photoURL = secure_url as string;
    }

    const newproduct = await Product.create([newProductDoc], { session });

    //create a newproduct
    if (!newproduct.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create product');
    }

    await session.commitTransaction();
    await session.endSession();

    return newproduct;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create product for error');
  }
};
interface TProductUpdate{
  payload: {
    productName: string;
    price: number;
    category: string;
    model: string;
    brand: string;
    description: string;
    photoURL: string;
    productId: string;
    id: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
}
const productUpdateFunc = async ({
  payload,
  file,
}: TProductUpdate) => {
  const session = await mongoose.startSession();

  const newProductDoc = {
    productName: payload?.productName,
    price: payload?.price,
    category: payload?.category,
    model: payload?.model,
    brand: payload?.brand,
    description: payload?.description,
    photoURL: payload?.photoURL,
    productId: payload?.productId,
  };

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${newProductDoc?.productName}${newProductDoc?.productId}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      newProductDoc.photoURL = secure_url as string;
    }

    const updateProduct = await Product.findByIdAndUpdate(
      payload?.id,
      { $set: newProductDoc },
      { new: true, session, runValidators: true }
    );

    if (!updateProduct) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update product');
    }

    await session.commitTransaction();
    session.endSession();

    return updateProduct;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new Error('Failed to update product for error');
  }
};

const updateAvailableFunc = async (id: string) => {

  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  const res = await Product.findByIdAndUpdate(
    id,
    { isAvailable: !product.isAvailable }, 
    { new: true }
  );
  return res
};


interface TQuery {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  model?: string;
  brand?: string;
  limit?: number;
}

const getAllProductsFunc = async (queries: TQuery) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {};

  // Add search query if available
  if (queries.search) {
    query.$or = [
      { productName: { $regex: queries.search, $options: 'i' } },
      { model: { $regex: queries.search, $options: 'i' } },
      { brand: { $regex: queries.search, $options: 'i' } },
      { category: { $regex: queries.search, $options: 'i' } },
    ];
  }

  if (queries.minPrice || queries.maxPrice) {
    query.price = {
      ...(queries.minPrice && { $gte: queries.minPrice }),
      ...(queries.maxPrice && { $lte: queries.maxPrice }),
    };
  }

  if (queries.model) {
    query.model = queries.model;
  }

  if (queries.brand) {
    query.brand = queries.brand;
  }
  let limit;
  if (queries?.limit) {
    limit = Number(queries?.limit);
  }
  const res = await Product.find(query).limit(limit as number);
  return res;
};

const getSingleProductFunc = async (params: string) => {
  return await Product.findById(params);
};
const deleteProductFunc = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const productService = {
  productCreateFunc,
  productUpdateFunc,
  getSingleProductFunc,
  deleteProductFunc,
  getAllProductsFunc,
  updateAvailableFunc
};
