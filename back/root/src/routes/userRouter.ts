import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { checkLogin } from "../middlewares/checkLogin";
const userRouter = Router();

userRouter.delete("/login", checkLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    const deletedUser = await UserService.delete(userId);
    res.status(200).json({ deletedUser, status: "succ" });
  } catch (error) {
    next(error);
  }
});

userRouter.put("/login", checkLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    const { email, password, name } = req.body;
    const modifiedUser = await UserService.modifyUser({ email, password, name, userId });
    res.status(201).json(modifiedUser);
  } catch (error) {
    next(error);
  }
});

// login
userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const loginedUser = await UserService.login({ email, password });
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
    const { email, name, password } = req.body;

    const newUser = await UserService.createUser({ email, name, password });
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
