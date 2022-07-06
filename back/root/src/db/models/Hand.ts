import { IHandModel } from "../../models";
import { IHand } from "../../models";

import { Hand } from "../schemas/hand";
// mongoose findByIddml ruddn
// ObjectId 형식 체킹

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
  public async findByEnglish(english: string) {
    const newHand = await Hand.findOne({ english }).lean();
    return newHand;
  }

  public async update({ id, toUpdate }: { id: string; toUpdate: Partial<IHand> }) {
    // type validation 필요 없음.
    const newHand = await Hand.findByIdAndUpdate(id, { $set: toUpdate });
    return newHand;
  }

  public async delete(id: string) {
    // Objectid 체크
    const result = await Hand.findByIdAndDelete(id);
    return result;
  }
}

export { MongoHandModel };
