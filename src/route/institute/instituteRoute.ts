import express, { Router } from "express";
import instituteController from "../../controller/institute/instituteController";
import Middleware from "../../middleware/middleware";
import HandleError from "../../services/asyncErrorHandler";
const router: Router = express.Router();

router
  .route("/institute")
  .post(
    HandleError(Middleware.isLoggedIn),
    HandleError(instituteController.createInstitute),
    HandleError(instituteController.createTeacher),
    HandleError(instituteController.createStudent),
    HandleError(instituteController.createCourse)
  );

export default router;
