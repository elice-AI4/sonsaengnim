import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../../services";
import { userValidateOptional } from "../middlewares/validators";
import { MongoUserModel } from "../../db";

import checkLogin from "../middlewares/checkLogin";

const userRouter = Router();
const userService = new UserService(new MongoUserModel());

userRouter.post("/donation", checkLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    const point: number = parseInt(req.query.point as string, 10);
    const name: string = req.query.name as string;
    const userDonation = await userService.postDonation(userId, point, name);

    res.status(201).json(userDonation);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

userRouter.get("/studylist", checkLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    const studyList = await userService.studyList(userId);
    res.status(200).json(studyList);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

userRouter.post("/study", checkLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const word = req.query.word;
    const point = parseInt(req.query.point as string, 10);
    console.log(point);
    const userId = req.user;
    const study = await userService.study(userId, word, point);
    res.status(200).json(study);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

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
    res.statusCode = 400;
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

export { userRouter };
