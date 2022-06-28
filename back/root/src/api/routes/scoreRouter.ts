import { Router } from "express";
import checkLogin from "../middlewares/checkLogin";
import ScoreService from "../../services/scoreService";
import { MongoScoreModel } from "../../db/models/Score";

const scoreRouter = Router();
const scoreService = new ScoreService(new MongoScoreModel());

scoreRouter.post("/", checkLogin, async (req, res, next) => {
  try {
    const { score } = req.body;
    const userId: string = req.user;
    const scoreBoard = await scoreService.addScore({ userId, score });
    res.status(201).send(scoreBoard);
  } catch (error) {
    next(error);
  }
});

scoreRouter.get("/topten", async (req, res, next) => {
  try {
    const scoreBoard = await scoreService.getTopten();
    res.status(200).send(scoreBoard);
  } catch (error) {
    next(error);
  }
});

export { scoreRouter };
