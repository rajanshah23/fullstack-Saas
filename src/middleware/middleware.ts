import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
 
import { IExtendedRequest } from "../types/types";
import User from "../database/models/userModel";

 
class Middleware {
  static async isLoggedIn(req: IExtendedRequest,res: Response,next: NextFunction){
    //check if login or not
    //token accept
    console.log("is logged in triggered");
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        message: "Please provide token",
      });
      return;
    }

    //verify garne
    jwt.verify(token, "hahaha", async (error,success:any) => {
      if (error) {
        res.status(403).json({ messgae: "Invalid token" });
      } else {
        //double verification
        const userData = await User.findByPk(success.id);
        if (!userData) {
          res.status(403).json({
            message: "No user with that is, Invalid token",
          });
        } else {
         req.user =userData  
          next();
        }
      }
    });
  }
}
export default Middleware;
