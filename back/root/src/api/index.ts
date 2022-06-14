import { Router } from "express";
// import { indexRouter } from "./indexRouter";
import registerRouter from "./routes/registerRouter";
import indexRouter from "./routes/indexRouter";
import userRouter from "./routes/userRouter";

export default () => {
  const app = Router();

  indexRouter(app);
  registerRouter(app);
  userRouter(app);

  return app;
};
