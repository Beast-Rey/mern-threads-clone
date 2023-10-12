import { Request, Response, NextFunction } from "express";

const AsyncWrapper =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      return next(error);
    }
  };

export default AsyncWrapper;
