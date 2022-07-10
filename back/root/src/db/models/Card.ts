import { ICardModel } from "../../models";
import { Card } from "../schemas/card";

class MongoCardModel implements ICardModel {
  public async getCardImage() {
    return await Card.find().lean();
  }
}
export { MongoCardModel };
