import express from "express";
import { indexRouter } from "./indexRouter";
import { handRouter } from "./handRouter";
import { userRouter } from "./userRouter";

const routes = express();

routes.use(indexRouter);
routes.use(userRouter);
routes.use(handRouter);

export { routes };