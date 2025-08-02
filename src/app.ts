import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/institute/course/courseRoute"
import categoryRoute from "./route/institute/category/categoryRoute"
import teacherRoute from './route/institute/teacher/teacherRoute'
import smsRoute from "./route/SMS/smsRoute"
import teacherLoginRoute from './route/teacher/teacherLoginRoute'
app.use(express.json())

//Global Route
app.use("/api", authRoute);

//Institute Route
app.use("/api", instituteRoute);
app.use("/api",courseRoute)
app.use("/api",categoryRoute)
app.use("/api",teacherRoute)

// SMS route
app.use("/api",smsRoute)


//teacher login route
app.use('/api',teacherLoginRoute)



export default app;
