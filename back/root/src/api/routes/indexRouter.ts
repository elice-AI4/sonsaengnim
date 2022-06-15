import { Router, Request, Response } from "express";

export default (app: Router) => {
  const indexRouter = Router();

  app.use("/", indexRouter);
  indexRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      status: "succ",
    });
  });
};
