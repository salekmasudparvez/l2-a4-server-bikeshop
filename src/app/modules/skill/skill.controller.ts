import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { skillService } from "./skill.service";



const getSkill =catchAsync(async (req: Request, res: Response) => {
    const result =await skillService.getSkillFunc();
    sendResponse(res, {
        success: true,
        message: 'Skills fatch successfully',
        data: result,
        statusCode: StatusCodes.OK,
      });
})


export const skillController = {
    getSkill
}