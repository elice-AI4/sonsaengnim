import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { v4 as uuid } from "uuid";

const checkLoginForScore = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers["authorization"]) {
      req.user = req.body.username + "-" + uuid().split("-")[1];
      next();
    } else {
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = jwt.verify(token, config.JWT_KEY) as jwt.JwtPayload;
      req.userId = decoded.ObjectId;
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

export default checkLoginForScore;
