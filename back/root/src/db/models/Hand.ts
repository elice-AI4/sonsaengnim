import { IHandModel } from "../../models";
import { IHand } from "../../models";

import { Hand } from "../schemas/hand";

class MongoHandModel implements IHandModel {
  public async create(newHandData: IHand) {
    const newHand = await Hand.create(newHandData);
    return newHand;
  }

  // 수화 데이터 한꺼번에 가져오기
  public async findAll() {
    const newHand = await Hand.find().lean();
    return newHand;
  }

  // 수화 데이터 알파벳별로 가져오기
  public async findByAlph(alphabet: String) {
    const newHand = await Hand.find({ alphabet });
    return newHand;
  }

  public async update({ id, toUpdate }: { id: String; toUpdate: Partial<String> }) {
    const newHand = await Hand.findOneAndUpdate(id, { $set: toUpdate });
    return newHand;
  }

  public async delete(_id: string) {
    const result = await Hand.findByIdAndDelete(_id);
    return result;
  }
}

export { MongoHandModel };
