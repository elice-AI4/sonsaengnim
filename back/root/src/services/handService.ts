import { MongoHandModel } from "../db/models/Hand";
import { IHand } from "../models";

export default class HandService {
  constructor(private handModel: MongoHandModel) {}

  async get(alphabet: string) {
    const hand = await this.handModel.findByAlph(alphabet);

    if (!hand) {
      const errorMessage = "해당 알파벳 데이터를 찾을 수 없스니다.";
      return errorMessage;
    }

    return hand;
  }

  async getAll() {
    const hand = await this.handModel.findAll();
    if (!hand) {
      const errorMessage = "데이터가 존재하지 않습니다.";
      return errorMessage;
    }
    return hand;
  }

  async create(newHandData: IHand) {
    const newHand = await this.handModel.create(newHandData);
    if (!newHand) {
      const errorMessage = "생성에 실패했습니다.";
      return errorMessage;
    }
    return newHand;
  }
}
