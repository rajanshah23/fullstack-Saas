import express, { Router } from 'express'
import Middleware from '../../../middleware/middleware'
import HandleError from '../../../services/asyncErrorHandler'
import teacherController from '../../../controller/institute/teacher/teacherController'
import upload from '../../../middleware/multerUpload'
const router:Router=express.Router()

router.route('/teacher').post(Middleware.isLoggedIn,upload.single("teacherImage"),HandleError(teacherController.createTeacher))



export default router