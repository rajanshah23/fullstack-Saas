import express, { Router } from "express";
import Middleware from "../../middleware/middleware";
import HandleError from "../../services/asyncErrorHandler";
import courseController from "../../controller/course/courseController";
// import {multer,storage} from './../../middleware/multerMiddleware'

import multer from  'multer'
import { cloudinary,storage } from "../../services/cloudinaryConfig";
const upload=multer({storage})
const router: Router = express.Router();

router
  .route("/course")
  .post(Middleware.isLoggedIn,upload.single("courseThumbnail"),HandleError(courseController.createCourse))
  .get(HandleError(courseController.getAllCourse));

router
  .route("/:id")
  .get(Middleware.isLoggedIn, HandleError(courseController.getSingleCourse))
  .delete(Middleware.isLoggedIn, HandleError(courseController.deleteCourse));

export default router;
