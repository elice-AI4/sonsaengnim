import { HandModel } from "../db/index";

class HandService {
  static create = async (newHandData) => {
    const newHand = await HandModel.create(newHandData);
    return newHand;
  };
}

export { HandService };
