import { Router, Request, Response, NextFunction } from "express";

import { body } from "express-validator";
import { validate } from "./../middlewares/validator";

import UserService from "../../services/registerService";
import { MongoUserModel } from "../../db";

export default (app: Router) => {
  const userRouter = Router();
  app.use("/register", userRouter);

  // 회원가입 라우터
  userRouter.post(
    "/",
    [
      body("email").trim().isEmail().withMessage("이메일 형식으로 입력하세요"),
      body("username").trim().isLength({ min: 2 }).withMessage("이름은 두글자 이상 입력해주세요"),
      validate,
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, email, password } = req.body;
        const userService = new UserService(new MongoUserModel());
        const newUser = await userService.createUser(username, email, password);

        res.status(200).json(newUser);
      } catch (error) {
        next(error);
      }
    },
  );
};
