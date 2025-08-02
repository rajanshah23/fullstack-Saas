import { Response, Request } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateJwtToken from "../../../services/generateJwtToken";

class AuthController {
  static async registerUser(req: Request, res: Response) {
 
    if (req.body === undefined) {
      res.status(400).json({
        Message: "No data was sent",
      });
    }

    //incoming data accept
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({
        message: "Please provide username , email, password",
      });
    } else {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        //  Email already registered
        return res.status(400).json({
          message: "Email already exists",
        });
      }


      //inserts into user table
      await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 12), // hashed password table ma gayera basyo
      });
      res.status(201).json({
        message: "User registered successfully",
      });
    }
  }

  static async loginUser(req: Request, res: Response) {
    //incoming data accept 
  console.log(req.body)
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email,password ",
      });
      return;
    }
    //check if email exist or not in our user Table for this use findALL()
    const data = await User.findAll({
      where: {
        email: email,
      },
    });
    if (data.length == 0) {
      res.status(404).json({
        message: "Not registered",
      });
    } else {
      // Check Password
      //compare(plain password user bata aako password,hashed password  registered vako bela ko password)

      const isPasswordMatched =  await bcrypt.compare(password, data[0].password);
      if (isPasswordMatched) {
        //password milyo vane token generation tira jane
        const token=generateJwtToken({id:data[0].id})
        res.cookie("jwtToken", token);
         return res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(403).json({
          message: "Invalid email or password",
        });
      }
    }
  }
}
export default AuthController;
