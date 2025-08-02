import express, { Router } from 'express'
import HandleError from '../../services/asyncErrorHandler'
import teacherAuthController from '../../controller/teacher/teacheAuthController'
 
const router:Router=express.Router()

router.route('/teacher-login').post(HandleError(teacherAuthController.teacherLogin))


export default router