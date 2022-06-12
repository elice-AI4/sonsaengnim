import { Router } from "express";
// import { indexRouter } from "./indexRouter";
import userRouter from "./userRouter";
import indexRouter from "./indexRouter";

export default () => {
  const app = Router();

  userRouter(app);
  indexRouter(app);
  return app;
};
