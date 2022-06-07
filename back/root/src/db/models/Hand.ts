import { Hand } from "../schemas/hand";

class HandModel {
  static create = async (newHandData) => {
    const newHand = await Hand.create(newHandData);
    return newHand;
  };
}

export { HandModel };
