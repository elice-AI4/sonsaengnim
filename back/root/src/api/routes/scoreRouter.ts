import { Router } from "express";
import checkLoginForScore from "../middlewares/checkLoginForScore";
import { MongoScoreModel, MongoUserModel } from "../../db";
import ScoreService from "../../services/scoreService";

const scoreRouter = Router();
const scoreService = new ScoreService(new MongoScoreModel());
const userModel = new MongoUserModel();

scoreRouter.post("/", checkLoginForScore, async (req, res, next) => {
  try {
    const { score, time } = req.body;
    const user = req.user;
    const userId = req.userId;
    let scoreBoard;

    if (typeof user === "string") {
      // Non-login User
      scoreBoard = await scoreService.addScore({ username: user, score, time });
    } else {
      // login User
      const registeredUser = await userModel.findById(userId);
      console.log("login: ", registeredUser);
      scoreBoard = await scoreService.addScore({ username: registeredUser.username, score, time, userId: userId });
    }
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
