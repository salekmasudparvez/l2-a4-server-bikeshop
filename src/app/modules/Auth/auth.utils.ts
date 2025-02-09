import jwt, { JwtPayload } from "jsonwebtoken";
import { TJwtPayload } from "./auth.interface";

export const generateToken = (payload:TJwtPayload,secret:string,expired:string)=>{
    const token = jwt.sign(payload, secret, { expiresIn: expired });
    return token;
}
export const verifyToken = (token: string, secret: string) => {
    const isVerfied = jwt.verify(token, secret) as JwtPayload;
    return isVerfied
  };