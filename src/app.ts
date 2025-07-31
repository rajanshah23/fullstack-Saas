import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/course/courseRoute"
import categoryRoute from "./route/category/categoryRoute"
import teacherRoute from './route/teacher/teacherRoute'
app.use(express.json());

app.use("/api", authRoute);
app.use("/api", instituteRoute);
app.use("/api",courseRoute)
app.use("/api",categoryRoute)
app.use("/api",teacherRoute)

export default app;
