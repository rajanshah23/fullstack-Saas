import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import HandleError from "../../../services/asyncErrorHandler";
import categoryController from "../../../controller/institute/category/categoryController";

const router:Router=express.Router()


router
  .route("/category")
  .post(Middleware.isLoggedIn,HandleError(categoryController.createCategory))
  .get(Middleware.isLoggedIn,HandleError(categoryController.getCategory));

router
  .route("/category/:id")
   .delete(Middleware.isLoggedIn, HandleError(categoryController.deleteCategory));



export default router