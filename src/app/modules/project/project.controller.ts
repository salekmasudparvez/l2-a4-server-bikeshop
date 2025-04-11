import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { projectService } from './project.service';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const getDoc = req.body;

  const result = await projectService.createProjectFunc(getDoc);
  sendResponse(res, {
    success: true,
    message: 'Project created successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const getDoc = req.body;

  const result = await projectService.updateProjectFunc(getDoc);
  sendResponse(res, {
    success: true,
    message: 'Project updated successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await projectService.deleteProjectFunc(id as any);
  sendResponse(res, {
    success: true,
    message: 'Project deleted successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getAllProjectFunc();
  sendResponse(res, {
    success: true,
    message: 'All Projects Fatch successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await projectService.getSingleProjectFunc(id as any);
  sendResponse(res, {
    success: true,
    message: 'Single Project Fatch successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});
export const projectController = {
  createProject,
  updateProject,
  deleteProject,
  getAllProject,
  getSingleProject,
};
