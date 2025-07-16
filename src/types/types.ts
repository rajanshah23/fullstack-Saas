import { Request } from "express";

export interface IExtendedRequest extends Request {
  user?: {
    role:string,
    email: string;
    username: string | null;
  };
}
