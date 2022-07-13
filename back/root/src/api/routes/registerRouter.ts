import { Router, Request, Response, NextFunction } from "express";
import { userValidate } from "../middlewares/validators";

import { RegisterService } from "../../services";
import { MongoUserModel } from "../../db";

const registerRouter = Router();

// 회원가입 라우터
registerRouter.post("/", userValidate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const registerService = new RegisterService(new MongoUserModel());
    const newUser = await registerService.createUser(username, email, password);

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

export { registerRouter };
