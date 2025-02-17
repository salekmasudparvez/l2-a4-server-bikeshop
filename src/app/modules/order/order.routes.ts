import { Router } from "express";
import { orderController } from "./order.controller";
import verifyCustomer from "../../middlewares/verifyCustomer";
import verifyAdmin from "../../middlewares/verifyAdmin";


const orderRoutes = Router();

orderRoutes.post('/pay',verifyCustomer,orderController.placeOrder);
orderRoutes.delete('/delete/:id',verifyAdmin,orderController.deleteOrder);
orderRoutes.patch('/update',verifyAdmin,orderController.updateOrderStatus);
orderRoutes.get('/get/:email',verifyCustomer,orderController.getOrder);
orderRoutes.get('/get-all',verifyAdmin,orderController.getAllOrder);
orderRoutes.get('/getsingleorder',verifyCustomer,orderController.trackOrder);

export default orderRoutes