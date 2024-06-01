import { Application } from "express";

import "dotenv/config";
import "./db";

import express from "express";
import { isAuthenticated } from "./middleware/jwt.middleware";


const app: Application = express();

import setConfig from "./config";
setConfig(app);


// 👇 Start handling routes here
import allRoutes from "./routes";
app.use("/api", allRoutes);

import projectRouter from "./routes/project.routes";
app.use("/api", isAuthenticated, projectRouter);

import taskRouter from "./routes/task.routes";
app.use("/api", isAuthenticated, taskRouter);

import authRouter from "./routes/auth.routes";
app.use("/auth", authRouter);


// Error handling
import setupErrorHandling from "./error-handling";
setupErrorHandling(app);


export default app;
