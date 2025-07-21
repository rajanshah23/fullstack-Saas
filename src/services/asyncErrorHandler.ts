import { NextFunction, Request, Response } from "express";


// // Type for async route handlers
// type AsyncRouteHandler = (
//   req: Request, 
//   res: Response, 
//   next: NextFunction
// ) => Promise<any>;

class AsyncErrorHandler{
    errorHandler=(fn:Function)=>{
        return (req:Request,res:Response,next:NextFunction)=>{
            fn(req,res,next) .catch((err:Error)=>{
                return res.status(500).json({
                    message:err.message,
                    fullError:err
                })
            })
        }

    }
}
const asyncHandler = new AsyncErrorHandler()
const HandleError = (fn:Function) => asyncHandler.errorHandler(fn);
export default HandleError