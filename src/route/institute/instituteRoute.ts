import express, { Router } from "express";
import instituteController from "../../controller/institute/instituteController";
import Middleware from "../../middleware/middleware";
 
 
const router: Router = express.Router();

console.log("institute route loaded");
router.route("/institute").post(Middleware.isLoggedIn , instituteController.createInstitute,instituteController.createTeacher,instituteController.createStudent,instituteController.createCourse);
console.log("institute route hit");

export default router;
