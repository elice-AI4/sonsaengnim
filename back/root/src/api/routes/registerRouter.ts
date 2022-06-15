import { Router, Request, Response, NextFunction } from "express";
import UserService from "../../services/registerService";
import { MongoUserModel } from "../../db";

export default (app: Router) => {
  const userRouter = Router();
  app.use("/register", userRouter);

  // 회원가입 라우터
  userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      const userService = new UserService(new MongoUserModel());
      const newUser = await userService.createUser(username, email, password);

      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  });
};
