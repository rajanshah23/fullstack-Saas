import sequelize from "../../database/connection";
import { Request, Response, NextFunction } from "express";
import generateRandomNumber from "../../services/generateRandomNumber";
import { IExtendedRequest } from "../../types/types";
import User from "../../database/models/userModel";
import { Sequelize } from "sequelize";

class instituteController {
  static async createInstitute(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    console.log(req.user, "Name from Middleware");
    console.log("trigger");
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
        message:
          "Please provide instituteName,instituteEmail,institutePhoneNumber,instituteAddress",
      });
      return;
    }

    //aayo vane --institute create garna paryo --->institute_123445 course_123435
    const instituteNumber = generateRandomNumber();
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
    await sequelize.query(
      `INSERT INTO institute_${instituteNumber}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          institutePanNo,
          instituteVatNo,
        ],
      }
    );

    //to create user institute table jaha chai user ley k k institute haru cretae garyo saabaiko number basnu  paryo
    //user ko history yaha xa ra tesko current history hernu paryo vane hamley user ma hernu parxa jaha teskoo institute number hunxa  eg:
    await sequelize.query(`CREATE TABLE  IF NOT EXISTS user_institute(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        userId VARCHAR(256) REFERENCES user(id),                                     
        instituteNumber INT UNIQUE
     )`);

    //  if(req.user){
    //   const user=await User.findByPk(req.user.id)
    //   user?.currentInstituteNumber=instituteNumber
    //   await user?.save()
    //  }

    if (req.user) {
      await sequelize.query(
        `INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,
        {
          replacements: [req.user.id, instituteNumber],
        }
      );

      await User.update(
        {
          currentInstituteNumber: instituteNumber,
          role: "institute",
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
    }
    req.instituteNumber = instituteNumber;
    next();
  }

  static async createTeacher(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.instituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        teacherName VARCHAR(256) NOT NULL,
        teacherEmail VARCHAR(256) NOT NULL UNIQUE,
        teacherPhoneNumber VARCHAR(256) NOT NULL UNIQUE,
        teacherAddress VARCHAR(256) NOT NULL
      )`);
    next();
  }

  static async createStudent(req: IExtendedRequest,res: Response,next: NextFunction
  ) {
    const instituteNumber = req.instituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    studentName VARCHAR(256) NOT NULL,
    studentEmail VARCHAR(256) NOT NULL UNIQUE,
    studentPhoneNumber VARCHAR(256) NOT NULL UNIQUE,
    studentAddress VARCHAR(256) NOT NULL
    )`);
    next();
  }

  static async createCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.instituteNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS courese_${instituteNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    courseName VARCHAR(256) NOT NULL UNIQUE,
    coursePrice VARCHAR(256) NOT NULL
    )`);
    res.status(201).json({
      message: "Institute created successfully",
      instituteNumber
    });
  }
}
export default instituteController;
