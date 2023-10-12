import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const ErrorHandling = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if(error instanceof AppError) {
    return res.status(error.statusCode).json({error: error.message})
  }

  return res.status(500).json(error.message);
};

export default ErrorHandling;
