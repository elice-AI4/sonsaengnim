import { Router, Request, Response, NextFunction } from "express";

import { HandService } from "../services/handService";

const handRouter = Router();

// 수화 데이터 입력하기
handRouter.post(
  "/hand",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { alphabet, handImage, mouthImage, video } = req.body;
      const newHandData = { alphabet, handImage, mouthImage, video };
      const newHand = await HandService.createHand(newHandData);
      res.status(200).json(newHand);
    } catch (error) {
      next(error);
    }
  }
);

// 알파벳별 수화 데이터 가져오기
handRouter.get(
  "/hand/:alphabet", 
  async (req: Request, res: Response, next: NextFunction) =>{
    try{
      const alph = req.params.alphabet;
      const data = await HandService.getHanddata(alph);
      return res.status(200).send(data);
    } catch(error){
      next(error);
    }
  }
);

export { handRouter };
