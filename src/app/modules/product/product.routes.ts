import { Router } from 'express';
import verifyAdmin from '../../middlewares/verifyAdmin';
import { productController } from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const productRouter = Router();

productRouter.post(
  '/create',
  upload.single('file'),
  verifyAdmin,
  productController.productCreate,
);
productRouter.patch('/update',upload.single('file'), verifyAdmin, productController.productUpdate);
productRouter.patch('/available/:id', verifyAdmin, productController.updateAvailable);
productRouter.delete('/delete/:id', verifyAdmin, productController.deleteProduct);
productRouter.get('/get', productController.getAllProducts);
productRouter.get('/get/:id', productController.getSingleProduct);

export default productRouter;
