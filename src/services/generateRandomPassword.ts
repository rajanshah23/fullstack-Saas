import bcrypt from 'bcrypt'

class generateRandomPassword{
    static async randomPassword(teacherName:string){
        const randomNumber=Math.floor(10000 + Math.random() *90000)
        const passwordData={
            hashedVersion:await bcrypt.hash(`${randomNumber}_${teacherName}`,12),  //able ma store garna ko lagi 
            plainVersion:`${randomNumber}_${teacherName}`//teacher lai mail ma send garna ko lagi
        }
        return  passwordData

    }
}
export default generateRandomPassword