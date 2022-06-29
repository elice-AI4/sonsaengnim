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
      const bearerToken = req.headers["authorization"].split(" ");
      if (bearerToken.length !== 2) {
        next(new Error("Bearer 문구와 함께 token을 보내주세요!"));
      } else if (bearerToken[0] !== "Bearer") {
        next(new Error("Bearer 문구와 함께 token을 보내주세요"));
      } else {
        const token = bearerToken[1];
        const decoded = jwt.verify(token, config.JWT_KEY) as jwt.JwtPayload;
        req.user = decoded.ObjectId;
        next();
      }
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
