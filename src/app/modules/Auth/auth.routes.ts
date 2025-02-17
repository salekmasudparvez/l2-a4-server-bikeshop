import { Router } from "express";
import { authController } from "./auth.controller";
import verifyCustomer from "../../middlewares/verifyCustomer";
import verifyAdmin from "../../middlewares/verifyAdmin";
import { upload } from "../../utils/sendImageToCloudinary";


const authRouter = Router()
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/all',verifyAdmin, authController.getAllUsers);
authRouter.get('/getSingle/:email',verifyCustomer, authController.getSingleUser);
authRouter.patch('/update',verifyAdmin, authController.status);
authRouter.patch('/update/user',verifyCustomer, authController.updateName);
authRouter.patch('/update/password',verifyCustomer, authController.updatePassword);

export default authRouter;