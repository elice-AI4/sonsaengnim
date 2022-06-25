import { Router, Request, Response, NextFunction } from "express";
import { userValidateOptional } from "../middlewares/validators";

import UserService from "../../services/userService";

import { MongoUserModel } from "../../db";
import { IScore } from "../../models/interfaces/IScore";
import checkLogin from "../middlewares/checkLogin";
import { getToptenScores } from "../../utils/topTenScore";

const userRouter = Router();
const userService = new UserService(new MongoUserModel());

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

userRouter.patch("/", checkLogin, userValidateOptional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const userId = req.user;

    const updatedUser = await userService.changePassword(userId, password);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

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

userRouter.get("/score", async (req, res, next) => {
  try {
    const { username, score } = req.query;
    let name: string = username as string;
    let num_score: number = Number(score);

    const newScore: IScore = {
      username: name,
      score: num_score,
      rank: -1,
    };
    req.body = JSON.parse(JSON.stringify(req.body));
    const topten = getToptenScores(newScore, req);
    res.status(200).send(topten);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

export { userRouter };
