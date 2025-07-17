import { Request } from "express";

export interface IExtendedRequest extends Request {
  user?: {
    id:string
    role:string,
    email: string;
    username: string | null;
  };
  instituteNumber?:string | number
}
