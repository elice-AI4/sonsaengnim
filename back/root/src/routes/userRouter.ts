import { Router, Request, Response, NextFunction } from "express";
import UserService from "../services/userService";
import { UserModel } from "../db";

export default (app: Router) => {
  const userRouter = Router();
  app.use("/register", userRouter);

  // 회원가입 라우터
  userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password } = req.body;
      console.log({ email: email, name: name, password: password });
      const userService = new UserService(new UserModel());
      const newUser = await userService.createUser(email, name, password);
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  });
};
