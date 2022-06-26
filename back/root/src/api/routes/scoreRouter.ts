import { Router } from "express";
import checkLogin from "../middlewares/checkLogin";
import ScoreService from "../../services/scoreService";
import { MongoScoreModel } from "../../db/models/Score";

const scoreRouter = Router();
const scoreService = new ScoreService(new MongoScoreModel());

scoreRouter.get("/", checkLogin, async (req, res, next) => {
  try {
    const { score } = req.body;
    const userId: string = req.user;
    let scoreObject = {};
    const scoreBoard = await scoreService.addScore(userId, score);
    res.status(200).send(scoreBoard);
  } catch (error) {
    next(error);
  }
});

scoreRouter.get("/topten", async (req, res, next) => {
  try {
    res.status(200).send("Top 10");
  } catch (error) {
    next(error);
  }
});

export { scoreRouter };
