import { NextFunction, Request, Response } from "express";
import { LoginBodyType, RegisterBodyType } from "../types/types";
import UserModel from "../models/UserModel";
import { generateCookie, generateToken } from "../helper/genCookieAndToken";
import AppError from "../utils/AppError";
import AsyncWrapper from "../utils/AsyncWrapper";
import { Registerschema, Loginschema } from "../validation/ValidationSchema";

//register user
export const RegisterUser = AsyncWrapper(
  async (req: Request, res: Response, _next: NextFunction) => {
    Registerschema.validate({});
    const {
      username,
      name,
      email,
      password: pass,
    }: RegisterBodyType = req.body;
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      throw new AppError({
        message: "Email Already Taken!!",
        statusCode: 400,
      });
    }
    const newUser = new UserModel({
      username,
      email,
      name,
      password: pass,
    });
    await newUser.save();
    if (newUser) {
      const { password, ...user } = newUser._doc;
      return res
        .status(201)
        .json({ message: "User Created Successfully!!", data: user });
    } else {
      throw new AppError({
        message: "Something went wrong!!",
        statusCode: 400,
      });
    }
  }
);

//login user
export const LoginUser = AsyncWrapper(
  async (req: Request, res: Response, _next: NextFunction) => {
    Loginschema.validate({});
    const { username, password: pass }: LoginBodyType = req.body;
    const findUser = (await UserModel.findOne({ username })) as any;
    if (!findUser) {
      throw new AppError({
        message: "User not found!!",
        statusCode: 400,
      });
    }
    await findUser.isComparePassword(pass);
    const accessToken = generateToken(findUser._id, { expiresIn: "1h" });
    generateCookie(accessToken, res);
    const { password, ...user } = findUser._doc;
    res
      .status(200)
      .json({ message: `${user.name} Successfully logged In!!`, data: user });
  }
);

//logout user
export const LogoutUser = AsyncWrapper(async (_req: Request, res: Response, next: NextFunction) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "You have been logged out successfully" });
});
