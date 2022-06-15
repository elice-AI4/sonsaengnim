import { Router, Request, Response, NextFunction } from "express";
import HandService from "../../services/handService";
import { MongoHandModel } from "../../db/models/Hand";
import IHand from "../../models/interfaces/IHand";

export default (app: Router) => {
  const handRouter = Router();
  app.use("/hands", handRouter);
  const handService = new HandService(new MongoHandModel());

  // 알파벳별 수화 데이터 가져오기
  handRouter.get("/:alphabet", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { alphabet } = req.params;
      const data = await handService.get(alphabet);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  });

  // 전체 수화 데이터 가져오기
  handRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await handService.getAll();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  });

  // 수화 데이터 입력하기
  handRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { alphabet, handImage, mouthImage, video } = req.body;
      const newHandData: IHand = { alphabet, handImage, mouthImage, video };
      const newHand = await handService.create(newHandData);
      res.status(200).json(newHand);
    } catch (error) {
      next(error);
    }
  });
};
