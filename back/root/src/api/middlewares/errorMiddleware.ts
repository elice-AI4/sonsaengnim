import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("\x1b[33m%s\x1b[0m", error);
  res.json({
    status: "fail",
    statusCode: res.statusCode,
    message: error.message,
  });
};

export { errorMiddleware };
