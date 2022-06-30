import { Router } from "express";
import { MongoQuizModel } from "../../db";
import { QuizService } from "../../services/quizService";

const quizRouter = Router();
const quizService = new QuizService(new MongoQuizModel());

quizRouter.get("/", async (req, res, next) => {
  try {
    const data = await quizService.getAll();
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export { quizRouter };
