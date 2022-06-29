import { Router } from "express";
import { MongoScoreModel, MongoUserModel } from "../../db";
import { ScoreService } from "../../services";
import checkLogin from "../middlewares/checkLogin";
import { v4 as uuid } from "uuid";

const scoreRouter = Router();
const scoreService = new ScoreService(new MongoScoreModel());
const userModel = new MongoUserModel();

// login User
scoreRouter.post("/login", checkLogin, async (req, res, next) => {
  try {
    const { score, time } = req.body;
    const userId = req.user;
    const registeredUser = await userModel.findById(userId);
    await userModel;
    console.log("login: ", registeredUser);
    const scoreBoard = await scoreService.addScore({ username: registeredUser.username, score, time, userId: userId });
    await res.status(201).send(scoreBoard);
  } catch (error) {
    next(error);
  }
});

// non login user
scoreRouter.post("/nonlogin", async (req, res, next) => {
  try {
    const { username, score, time } = req.body;
    const UniqueUsername = username + "-" + uuid().split("-")[1];
    const scoreBoard = await scoreService.addScore({ username: UniqueUsername, score, time });
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
