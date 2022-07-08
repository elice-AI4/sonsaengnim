import { Router } from "express";
import { MongoCardModel } from "../../db";
import { CardService } from "../../services/cardService";

const cardRouter = Router();
const cardService = new CardService(new MongoCardModel());

cardRouter.get("/", async (req, res, next) => {
  try {
    const card = await cardService.getAll();
    res.status(200).send(card);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

export { cardRouter };
