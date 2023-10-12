import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import AsyncWrapper from "../utils/AsyncWrapper";

const ProtectedRoute = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.EXPRESS_JWT_SECRET!) as any;
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const user = await UserModel.findById(decoded?.userId).select("-password");
    req.user = user;
    next();
  }
);

export default ProtectedRoute;
