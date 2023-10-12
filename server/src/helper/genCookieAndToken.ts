import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { JwtType } from "../types/types";

export const generateCookie = (token: any, res: Response) => {
  return res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
};

export const generateToken = (userId: JwtType, options: {}) => {
  const secret = process.env.EXPRESS_JWT_SECRET as Secret;
  const token = jwt.sign({ userId }, secret, options);
  return token;
};
