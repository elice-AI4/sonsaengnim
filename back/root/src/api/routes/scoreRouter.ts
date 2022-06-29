import { Router } from "express";
import { MongoScoreModel, MongoUserModel } from "../../db";
import ScoreService from "../../services/scoreService";
import checkLogin from "../middlewares/checkLogin";

const scoreRouter = Router();
const scoreService = new ScoreService(new MongoScoreModel());
const userModel = new MongoUserModel();

// login User
scoreRouter.post("/login", checkLogin, async (req, res, next) => {
  try {
    const { score, time } = req.body;
    const userId = req.user;
    const registeredUser = await userModel.findById(userId);
    console.log("login: ", registeredUser);
    const scoreBoard = await scoreService.addScore({ username: registeredUser.username, score, time, userId: userId });
    res.status(201).send(scoreBoard);
  } catch (error) {
    next(error);
  }
});

// non login user
scoreRouter.post("/nonlogin", async (req, res, next) => {
  try {
    const { username, score, time } = req.body;
    const scoreBoard = await scoreService.addScore({ username, score, time });
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
