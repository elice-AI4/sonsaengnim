import express from "express";
import { routes } from "./routes/index";

import morgan from "morgan";

import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorMiddleware);

export { app };
