import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import StatusCodes from 'http-status-codes';
import config from '../../config';

const signup = catchAsync(async (req: Request, res: Response) => {
  const getDoc = req.body;
  const payload ={
    ...getDoc,
    isBlocked:false,
    isActive:true,
    role:'customer',
    photoURL:"https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"

  }
  
  const result = await authService.signupFunc(payload);
  sendResponse(res, {
    success: true,
    message: 'User sign up successfully',
    data: {
      name: result.name,
      email: result.email,
    },
    statusCode: StatusCodes.ACCEPTED,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginFunc(req.body);
  const { accessToken, refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      user:result?.userInfo
    },
    statusCode: StatusCodes.OK,
  });
});
const getAllUsers =catchAsync(async (req: Request, res: Response) => {
  const result = await authService.getAllUsersFunc();
  sendResponse(res, {
    success: true,
    message: 'All users fetched successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})
const status = catchAsync(async (req: Request, res: Response) => {
  
  const result = await authService.statusFuc(req?.body);
  sendResponse(res, {
    success: true,
    message: 'Updated user status ',
    data: result,
    statusCode: StatusCodes.OK,
  });
})
export const authController = {
  signup,
  login,
  getAllUsers,
  status
};
