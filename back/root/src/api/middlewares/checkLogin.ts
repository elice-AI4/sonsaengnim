import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "../../config";

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
      const token = req.headers["authorization"].split(" ")[1];
      const decoded: any = jwt.verify(token, config.JWT_KEY);
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

export default checkLogin;
