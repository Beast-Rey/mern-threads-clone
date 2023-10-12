import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import AsyncWrapper from "../utils/AsyncWrapper";
import AppError from "../utils/AppError";

const ProtectedRoute = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.EXPRESS_JWT_SECRET!) as any;
    if (!decoded) {
      throw new AppError({
        message: "Unauthorized",
        statusCode: 400,
      });
    }
    const user = await UserModel.findById(decoded?.userId).select("-password");
    req.user = user;
    next();
  }
);

export default ProtectedRoute;
