import { Router } from "express";
// import { indexRouter } from "./indexRouter";
import userRouter from "./userRouter";

export default () => {
  const app = Router();

  userRouter(app);

  return app;
};
