import { Router, Request, Response, NextFunction } from "express";

import UserService from "../services/userService";

import { MongoUserModel } from "../db";

import checkLogin from "../middlewares/checkLogin";

export default (app: Router) => {
  const userRouter = Router();
  const userService = new UserService(new MongoUserModel());

  app.use("/user", userRouter);

  userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const loginedUser = await userService.login(email, password);

      if (loginedUser.errorMessage) {
        throw new Error(loginedUser.errorMessage);
      }

      res.status(200).json(loginedUser);
    } catch (error) {
      next(error);
    }
  });

  userRouter.put("/", checkLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;
      const userId = req.user;

      const updatedUser = await userService.updateUser(email, password, name, userId);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  });
};
