import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { checkLogin } from "../middlewares/checkLogin";
const userRouter = Router();

// login
userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, password } = req.body;
    const loginedUser = await UserService.login({ id, password });
    if (loginedUser.errorMessage) {
      throw new Error(loginedUser.errorMessage);
    }

    res.status(201).json(loginedUser);
  } catch (error) {
    next(error);
  }
});

// 회원가입 라우터
userRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, password } = req.body;

    const newUser = await UserService.createUser({ id, name, password });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 토큰 확인 삭제 해도 됨
userRouter.post("/verify", checkLogin, (req: Request, res: Response) => {
  res.status(201).json({
    status: "succ",
    req: req.user,
  });
});
export { userRouter };
