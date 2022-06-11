import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    // headers 토큰 유무
    if (!req.headers["authorization"]) {
      res.status(401).json({
        status: "fail",
        message: "token이 없습니다",
      });
    } else {
      // 토큰 변형 확인
      const JWT_KEY = process.env.JWT_KEY;
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = jwt.verify(token, JWT_KEY);
      req.user = decoded.ObjectId;
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "token이 변형되었습니다. ",
      error,
    });
    next(error);
  }
};

export { checkLogin };
