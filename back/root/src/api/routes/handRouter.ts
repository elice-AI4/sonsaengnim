import { Router, Request, Response, NextFunction } from "express";
import HandService from "../../services/handService";
import { MongoHandModel } from "../../db/models/Hand";
import { IHand } from "../../models";
import { checkAlphabetParam, handValidate } from "../middlewares/validators";

const handRouter = Router();
const handService = new HandService(new MongoHandModel());

// 알파벳별 수화 데이터 가져오기
handRouter.get("/:alphabet", checkAlphabetParam, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { alphabet } = req.params;
    const data = await handService.get(alphabet);
    res.status(200).send(data);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// 전체 수화 데이터 가져오기
handRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await handService.getAll();
    return res.status(200).send(data);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// 수화 데이터 입력하기
handRouter.post("/", handValidate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { alphabet, handVideo, mouthVideo } = req.body;
    const newHandData: IHand = { alphabet, handVideo, mouthVideo };
    const newHand = await handService.create(newHandData);
    res.status(200).json(newHand);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

export { handRouter };
