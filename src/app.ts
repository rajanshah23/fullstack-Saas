import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/course/courseRoute"
import categoryRoute from "./route/category/categoryRoute"

app.use(express.json());

app.use("/api", authRoute);
app.use("/api", instituteRoute);
app.use("/api",courseRoute)
app.use("/api",categoryRoute)

export default app;
