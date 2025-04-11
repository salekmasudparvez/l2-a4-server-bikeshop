/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export interface IUserCreate extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  photoURL: string;
}
export interface TLogin extends Model<IUserCreate> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByCustomId(email: string): Promise<IUserCreate>;
}
export type TLoginUser = {
    email: string;
    password: string;
  };
  export interface TJwtPayload {
    email:string;
    role:"admin" | "user";
  }
