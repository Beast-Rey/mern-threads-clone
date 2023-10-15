import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { ZodError } from "zod";

const ErrorHandling = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if(error instanceof AppError) {
    return res.status(error.statusCode).json({error: error?.message})
  }

  if(error instanceof ZodError) {
    return res.status(500).json({error: error?.message})
  }

  if(error.name === 'ValidationError') {
    return res.status(500).json({error: error.name})
  }

  return res.status(500).json(error.message);
};

export default ErrorHandling;
