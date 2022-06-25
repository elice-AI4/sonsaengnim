import { Router, Request, Response, NextFunction } from "express";
import { userValidateOptional } from "../middlewares/validators";

import UserService from "../../services/userService";

import { MongoUserModel } from "../../db";

import checkLogin from "../middlewares/checkLogin";

const userRouter = Router();
const userService = new UserService(new MongoUserModel());

userRouter.get("/jwt/:token", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.params.token;
    const accessToken = await userService.getToken(token);
    res.status(201).json({ message: "토큰을 재발급 하였습니다.", accessToken });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

userRouter.post("/", userValidateOptional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const loginedUser = await userService.login(email, password);

    res.status(200).json(loginedUser);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

userRouter.put("/", checkLogin, userValidateOptional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email } = req.body;
    const userId = req.user;

    const updatedUser = await userService.updateUser(userId, email, username);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

userRouter.put(
  "/password",
  checkLogin,
  userValidateOptional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;
      const userId = req.user;

      const updatedUser = await userService.changePassword(userId, password);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400);
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
    res.status(400);
    next(error);
  }
});

export { userRouter };
