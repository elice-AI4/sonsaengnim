import { Router, Request, Response, NextFunction } from "express";

import { HandService } from "../services/handService";

const handRouter = Router();

handRouter.post(
  "/hand",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { alphabet, handImage, mouthImage, video } = req.body;
      const newHandData = { alphabet, handImage, mouthImage, video };
      const newHand = await HandService.create(newHandData);
      res.status(200).json(newHand);
    } catch (error) {
      next(error);
    }
  }
);
export { handRouter };
