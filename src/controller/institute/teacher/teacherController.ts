
import { Response } from "express";
import { IExtendedRequest } from "../../../types/types";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword";
import sendMail from "../../../services/sendMail";
import { generateTeacherWelcomeEmail } from "../../../utils/generateTeacherWelcomeEmail ";

class teacherController{
    static async createTeacher(req: IExtendedRequest, res: Response) {
        const instituteNumber = req.user?.currentInstituteNumber
        const { teacherName, teacherEmail, teacherPhoneNumber, teacherAddress, teacherExpertise, teacherJoinedDate, teacherSalary, teacherPassword ,courseId} = req.body
        const teacherImage = req.file ? req.file.path : "https://imgs.search.brave.com/8cFnD4eHYOlVFMyJeHo-hSTwOl9bUsR0ghBZiZeqwiM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8x/NS8xOC9tYWxlLXBl/cnNvbi1hbm9ueW1v/dXMtbW9ub2Nocm9t/ZS1hdmF0YXItdmVj/dG9yLTU0NDExNTE4/LmpwZw"

        if (!teacherName || !teacherEmail || !teacherAddress || !teacherPhoneNumber || !teacherExpertise || !teacherJoinedDate || !teacherSalary  || !teacherImage ||!courseId) {
            res.status(400).json({
                message: "Please provide teacherName,teacherEmail,teacherPhoneNumber,teacherAddress,teacherExpertise,teacherJoinedDate,teacherSalary,courseId"
            })
            return
        }
        const data= await generateRandomPassword.randomPassword(teacherName)
        const insertedData=await sequelize.query(`INSERT INTO teacher_${instituteNumber}(teacherName,teacherEmail,teacherAddress,teacherPhoneNumber,teacherExpertise,joinedDate,salary,teacherImage,teacherPassword) VALUES(?,?,?,?,?,?,?,?,?)`, {
            type:QueryTypes.INSERT,
            replacements: [teacherName, teacherEmail, teacherAddress, teacherPhoneNumber, teacherExpertise, teacherJoinedDate, teacherSalary,teacherImage,data.hashedVersion

            ]
        })
        const teacherData:{id:string}[]=await sequelize.query(`SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail=?`,{
            type:QueryTypes.SELECT,replacements:[teacherEmail]
        })
        console.log(insertedData)
await sequelize.query(`UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,{
    type:QueryTypes.UPDATE,
    replacements:[teacherData[0].id,courseId]
})
  // Fetching  course information
const [course]: any = await sequelize.query(
      `SELECT   courseName,
      coursePrice,
      courseDuration,
      courseLevel,
      courseDescription,
      courseThumbnail FROM course_${instituteNumber} WHERE id = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [courseId],
      }
    );

//send mail function goes here
 const emailHtml = generateTeacherWelcomeEmail({
     teacherName,
  instituteNumber: String(instituteNumber),
  tempPassword: data.plainVersion,
  course: {
    courseName: course.courseName,
    coursePrice: course.coursePrice,
    courseDuration: course.courseDuration,
    courseLevel: course.courseLevel,
    courseDescription: course.courseDescription,
    courseThumbnail: course.courseThumbnail,
  },
  courseLink: `https://yourplatform.com/courses/view?id=${courseId}&authToken=xyz`,
syllabusLink: `https://yourplatform.com/syllabus/download?id=${courseId}&token=abc`,

});
 

await sendMail({
  to: teacherEmail,                         
  subject: "Welcome to Fullstack-SaaS project",
  html: emailHtml
});

 

res.status(200).json({
    message:"Teacher created sucssfully"
})
    }

}   
export default teacherController