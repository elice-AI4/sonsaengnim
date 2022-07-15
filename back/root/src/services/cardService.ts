import { MongoCardModel } from "../db";

export class CardService {
  constructor(private cardModel: MongoCardModel) {}
  public async getAll() {
    return await this.cardModel.getCardImage();
  }
}
