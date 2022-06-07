import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";

const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body;

    const newUser = await UserService.createUser({ email, name, password });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
