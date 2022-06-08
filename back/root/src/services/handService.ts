import { HandModel } from "../db/index";
import { HandType } from "../db/schemas/hand";

class HandService {
  // 수화 데이터 생성
  static createHand = async (newHandData: HandType) => {
    const newHand = await HandModel.create(newHandData);
    return newHand;
  };

  // 수화 데이터 알파벳으로 가져오기
  static getHanddata = async (alphabet: string) =>{
    const newHand = await HandModel.findByAlph({ alphabet: alphabet });
    return newHand;
  };
}

export { HandService };
