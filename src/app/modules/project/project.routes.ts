import { Router } from "express";
import verifyAdmin from "../../middlewares/verifyAdmin";
import { projectController } from "./project.controller";

const projectRouter = Router()

projectRouter.get('/get',projectController.getAllProject)
projectRouter.get('/get/:id',verifyAdmin, projectController.getSingleProject)
projectRouter.post('/create',verifyAdmin,projectController.createProject)
projectRouter.patch('/update',verifyAdmin,projectController.updateProject)
projectRouter.post('/delete/:id',verifyAdmin,projectController.deleteProject)

export default projectRouter;