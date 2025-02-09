import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
const productSchema = new Schema<TProduct>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    productId: { type: Number, required: true, unique: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    photoURL: { type: String },
    isAvailable: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Products',
  },
);

export const Product = model<TProduct>('Products', productSchema);
