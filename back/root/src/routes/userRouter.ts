import { Router, Request, Response, NextFunction } from "express";
import UserService from "../services/userService";
import { MongoUserModel } from "../db";

export default (app: Router) => {
  const userRouter = Router();

  app.use("/user", userRouter);

  userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userService = new UserService(new MongoUserModel());

      const { email, password } = req.body;
      const loginedUser = await userService.login(email, password);

      res.status(200).json(loginedUser);
    } catch (error) {
      next(error);
    }
  });
};
