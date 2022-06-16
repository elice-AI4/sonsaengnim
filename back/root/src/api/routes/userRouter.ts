import { Router, Request, Response, NextFunction } from "express";
import { body, check } from "express-validator";
import { validate } from "../middlewares/validator";

import UserService from "../../services/userService";

import { MongoUserModel } from "../../db";

import checkLogin from "../middlewares/checkLogin";

export default (app: Router) => {
  const userRouter = Router();
  const userService = new UserService(new MongoUserModel());

  app.use("/user", userRouter);

  userRouter.post(
    "/",
    [
      body("email").trim().isEmail().withMessage("이메일 형식으로 입력하세요"),
      body("password").trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."),
      validate,
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const loginedUser = await userService.login(email, password);

        res.status(200).json(loginedUser);
      } catch (error) {
        res.statusCode = 400;
        next(error);
      }
    },
  );

  userRouter.put(
    "/",
    checkLogin,
    [
      check("email").optional().trim().isEmail().withMessage("이메일 형식으로 입력하세요"),
      body("username").trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."),
      validate,
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, email } = req.body;
        const userId = req.user;

        const updatedUser = await userService.updateUser(userId, email, username);
        res.status(200).json(updatedUser);
      } catch (error) {
        next(error);
      }
    },
  );

  userRouter.patch(
    "/",
    checkLogin,
    [body("password").trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."), validate],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { password } = req.body;
        const userId = req.user;

        const updatedUser = await userService.changePassword(userId, password);
        res.status(200).json(updatedUser);
      } catch (error) {
        next(error);
      }
    },
  );

  userRouter.delete("/", checkLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user;

      const deletedUser = await userService.deleteUser(userId);
      res.status(200).json(deletedUser);
    } catch (error) {
      next(error);
    }
  });
};
