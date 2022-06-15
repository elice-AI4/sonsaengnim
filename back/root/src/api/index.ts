import { Router } from "express";
// import { indexRouter } from "./indexRouter";
import registerRouter from "./routes/registerRouter";
import indexRouter from "./routes/indexRouter";
import userRouter from "./routes/userRouter";
import handRouter from "./routes/handRouter";

export default () => {
  const app = Router();

  indexRouter(app);
  registerRouter(app);
  userRouter(app);
  handRouter(app);

  return app;
};
