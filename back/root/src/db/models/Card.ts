import { ICardModel } from "../../models";
import { Card } from "../schemas/card";

class MongoCardModel implements ICardModel {
  public async getCardImage() {
    return await Card.find().sort({ _id: 1 }).lean();
  }
}
export { MongoCardModel };
