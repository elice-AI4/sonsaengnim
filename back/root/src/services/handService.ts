import { HandModel } from "../db";
import { IHand } from "../db/schemas/hand";

class HandService {
  constructor(public model:HandModel){};

  // 수화 데이터 생성
  public async createHand(newHandData: IHand) {
    const newHand = await this.model.create(newHandData);
    return newHand;
  };

  // 수화 데이터 알파벳으로 가져오기
  public async getHanddata (alphabet: string) {
    const newHand = await this.model.findByAlph(alphabet);
    return newHand;
  };
}

export { HandService };
