 
import {  Response } from "express";
import sequelize from "../../database/connection";
import { IExtendedRequest } from "../../types/types";


class courseController {
  static async createCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
 
    const {
      courseName,
      coursePrice,
      courseDuration,
      courseLevel,
      courseThumbnail,
      courseDescription,
    } = req.body;
    if (
      !courseName ||
      !coursePrice ||
      !courseDuration ||
      !courseLevel ||
      !courseThumbnail ||
      !courseDescription
    ) {
      res.status(400).json({
        message:
          "Please provide courseName, coursePrice,courseDuration,courseLevel,courseThumbnail,courseDescription",
      });
      return;
    }
 
     await sequelize.query(
      `INSERT INTO course_${instituteNumber}(
      courseName,
      coursePrice,
      courseDuration,
      courseLevel,
      courseDescription,
      courseThumbnail
    ) VALUES(?,?,?,?,?,?)`,
      {
        replacements: [
          courseName,
          coursePrice,
          courseDuration,
          courseLevel,
          courseDescription,
          courseThumbnail || "https://nepal.com/image/hello.png"
        ],
      }
    );
    res.status(200).json({
      message:'course created successfully'
    })
  }

  static async deleteCourse(req: IExtendedRequest, res:Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id;
      // first check if course exists or not , if exists --> delete else not delete 
       const courseData=await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`,{
        replacements:[courseId]
      })
      if (courseData){
        res.status(400).json({
          message:"No course with that id"
        })
      }
await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE ID=?`,{
  replacements:[courseId]
})
res.status(200).json({
message:"Course deleted successfully"
})
}


static async getAllCourse(req:IExtendedRequest,res:Response){
  const instituteNumber=req.user?.currentInstituteNumber
  const courses=await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
  res.status(200).json({
    message:"Course Fetched",
    data:courses || []
  })
}

 
static async getSingleCourse(req:IExtendedRequest,res:Response){
    const instituteNumber = req.user?.currentInstituteNumber; 
    const courseId = req.params.id
    const course = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ?`,{
        replacements : [courseId]
    })
    res.status(200).json({
        message : "single course fetched", 
        data : course
    })
}


}
export default courseController;
