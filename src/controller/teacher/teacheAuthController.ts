import { Request, Response } from "express"
import sequelize from "../../database/connection"
import { QueryTypes } from "sequelize"
import bcrypt from 'bcrypt'
import generateJwtToken from "../../services/generateJwtToken"


interface IteacherData{
    teacherEmail:string,
    teacherPassword:string,
    id:string
}

class teacherAuthController{
    static async teacherLogin(req:Request,res:Response){
const {teacherEmail,teacherPassword,teacherInstituteNumber}=req.body
if(!teacherEmail ||!teacherPassword ||!teacherInstituteNumber){
    res.status(400).json({
        message:"Please provide teacherEmail,teacherPassword,teacherInstituteNumber"
    })
}

 const teacherData:IteacherData[]=await sequelize.query(`SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail=?`,{
    type:QueryTypes.SELECT,replacements:[teacherEmail]
})

if(teacherData.length==0){
    res.status(404).json({
        message:"Invalid Credentials"
    })
}
 const isPasswordMatched=await bcrypt.compare(teacherPassword,teacherData[0].teacherPassword)
if(!isPasswordMatched){
res.status(404).json({
    messsage:"Invalid Credentials"
})
}else{
    //token generating
    const token=generateJwtToken({id:teacherData[0].id,instituteNumber:teacherInstituteNumber})
            res.cookie("jwtToken", token);
             return res.status(200).json({ message: " Teacher Login successful", token });

}
    }
}
export default teacherAuthController