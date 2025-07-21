import express, { Router } from "express";
import Middleware from "../../middleware/middleware";
import HandleError from "../../services/asyncErrorHandler";
import courseController from "../../controller/course/courseController";

const router: Router = express.Router();

router
  .route("/course")
  .post(Middleware.isLoggedIn, HandleError(courseController.createCourse))
  .get(HandleError(courseController.getAllCourse));

router
  .route("/:id")
  .get(Middleware.isLoggedIn, HandleError(courseController.getSingleCourse))
  .delete(Middleware.isLoggedIn, HandleError(courseController.deleteCourse));

export default router;
