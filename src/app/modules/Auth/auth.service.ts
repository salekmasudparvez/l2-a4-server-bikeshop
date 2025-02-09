import { IUserCreate, TLoginUser } from './auth.interface';
import { Signup } from './auth.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from './auth.utils';
import config from '../../config';

const signupFunc = async (registraionDoc: IUserCreate) => {
  const res = await Signup.create(registraionDoc);
  return res;
};
const loginFunc = async (payload: TLoginUser) => {
  const user = await Signup.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found😒');
  }
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked 🤡');
  }
  if (!(await Signup.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect Password😵‍💫');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
    userInfo: {
      name: user?.name,
      email: user?.email,
      role: user?.role,
    },
  };
};
const getAllUsersFunc = async()=>{
  const users = await Signup.find();
  return users;
}
interface TUpdateDoc{
  id:string,
  action:string
}
const statusFuc = async(payload:TUpdateDoc)=>{
 const users = await Signup.findById(payload?.id);
 if(!users){
  throw new AppError(StatusCodes.NOT_FOUND,'User not found')
 }
 if(users?.role==="admin"){
  throw new AppError(StatusCodes.FORBIDDEN,`Admin's status can not be changed`)
 }
 if(!payload?.action){
  throw new AppError(StatusCodes.BAD_REQUEST,'Invalid action')
 }
 if(payload?.action === 'block'){
  const res = await Signup.findByIdAndUpdate(payload?.id,{isBlocked:true});
  return res;
 }
 if(payload?.action === 'active'){
  const res = await Signup.findByIdAndUpdate(payload?.id,{isActive:true});
  return res;
 }
 if(payload?.action === 'deactive'){
  const res = await Signup.findByIdAndUpdate(payload?.id,{isActive:false});
  return res;
 }

}
export const authService = {
  signupFunc,
  loginFunc,
  getAllUsersFunc,
  statusFuc
};
