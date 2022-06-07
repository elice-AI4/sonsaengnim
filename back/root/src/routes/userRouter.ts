import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";

const userRouter = Router();

// userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
// });

// 회원가입 라우터
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
