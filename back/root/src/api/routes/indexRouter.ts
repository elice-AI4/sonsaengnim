import { Router, Request, Response } from "express";

const indexRouter = Router();

indexRouter.use("/", indexRouter);
indexRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "succ",
  });
});

export { indexRouter };
