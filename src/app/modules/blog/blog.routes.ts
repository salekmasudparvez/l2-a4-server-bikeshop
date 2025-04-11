import { Router } from "express"
import { blogController } from "./blog.controller"
import verifyAdmin from "../../middlewares/verifyAdmin"


const blogRouter = Router()

blogRouter.get('/get',blogController.getAllBlogs)
blogRouter.get('/get/:id',verifyAdmin, blogController.getSingleBlog)
blogRouter.post('/create',verifyAdmin,blogController.createBlog)
blogRouter.patch('/update',verifyAdmin,blogController.updateBlog)
blogRouter.post('/delete/:id',verifyAdmin,blogController.deleteBlog)

export default blogRouter;