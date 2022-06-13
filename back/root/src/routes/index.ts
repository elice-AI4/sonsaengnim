import { Router } from "express";
// import { indexRouter } from "./indexRouter";
import registerRouter from "./registerRouter";
import indexRouter from "./indexRouter";
import userRouter from "./userRouter";

export default () => {
  const app = Router();

  indexRouter(app);
  registerRouter(app);
  userRouter(app);

  return app;
};
