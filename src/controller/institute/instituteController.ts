import sequelize from "../../database/connection";
import {Request,Response,NextFunction} from 'express'
import generateRandomNumber from "../../services/generateRandomNumber";
import { IExtendedRequest } from "../../types/types";
 

 

 
class instituteController {
    static async createInstitute(req: IExtendedRequest, res: Response){
      console.log(req.user,"Name from Middleware")
    console.log("trigger")
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;
    const institutePanNo = req.body.institutePanNo || null;
    const instituteVatNo = req.body.instituteVatNo || null;
    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      res.status(400).json({
        message: "Please provide all the details",
      });
      return;
    }

    //aayo vane --institute create garna paryo --->institute_123445 course_123435
const instituteNumber= generateRandomNumber()
    await sequelize.query(`CREATE TABLE  IF NOT EXISTS institute_${instituteNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     instituteName VARCHAR(256) NOT NULL,
     instituteEmail VARCHAR(256) NOT NULL UNIQUE,
     institutePhoneNumber VARCHAR(256) NOT NULL UNIQUE,
     instituteAddress VARCHAR(256) NOT NULL,
    institutePanNo VARCHAR(256),
    instituteVatNo VARCHAR(256),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    res.status(201).json({ message: "Institute table created successfully." });
  }
  static async createTeacher(req: Request, res: Response){
    const {teacherName,teacherEmail,teacherPhoneNumber,teacherAddress}=req.body
  }
}
export default instituteController