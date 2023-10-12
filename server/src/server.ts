import express, { Application, NextFunction, Response, Request } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookiePaser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import helmet from "helmet";

import MongoConnection from "./database/MongoConnection";
import UserRoutes from "./routes/UserRoutes";
import PostRoutes from "./routes/PostRoutes";
import logger from "./logger/logger";
import ErrorHandling from "./middleware/ErrorHandling";



dotenv.config();
const app: Application = express();
const port = process.env.EXPRESS_PORT || 3001;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middleware
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookiePaser());
app.use(morgan("dev"));

//routes
app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);


app.use(ErrorHandling)
//mongo db connection
MongoConnection();
app.listen(port, () => logger.info(`Server is up and running on ${port}`));
