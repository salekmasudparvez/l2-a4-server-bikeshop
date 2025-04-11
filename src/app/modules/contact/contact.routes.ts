import { Router } from "express"
import { contactController } from "./contact.controller"



const contactRouter = Router()

contactRouter.get('/get',contactController)
contactRouter.get('/get/:id',verifyAdmin, contactController.getSingleBlog)
contactRouter.post('/create',verifyAdmin,contactController.createBlog)
contactRouter.patch('/update',verifyAdmin,contactController.updateBlog)
contactRouter.post('/delete/:id',verifyAdmin,contactController.deleteBlog)

export default contactRouter;