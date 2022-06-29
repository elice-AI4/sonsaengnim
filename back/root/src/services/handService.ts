import { MongoHandModel } from "../db/models/Hand";
import { IHand } from "../models";

export class HandService {
  constructor(private handModel: MongoHandModel) {}

  public async get(english: string) {
    const hand = await this.handModel.findByEnglish(english);
    if (!hand) {
      throw new Error("해당 수화 데이터를 찾을 수 없습니다.");
    }
    return hand;
  }

  async getAll() {
    const hand = await this.handModel.findAll();
    return hand;
  }

  async create(newHandData: IHand) {
    try {
      return await this.handModel.create(newHandData);
    } catch (error) {
      console.log(error);
      throw new Error("수화 데이터 생성에 실패했습니다.");
    }
  }
}
