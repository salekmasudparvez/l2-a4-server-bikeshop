import { Router } from "express";
import { skillController } from "./skill.controller";



const skillRouter = Router()

skillRouter.get('/get', skillController.getSkill)

export default skillRouter;