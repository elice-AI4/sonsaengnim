import { HandModel } from "../db/index";

class HandService {
  static createHand = async (newHandData) => {
    const newHand = await HandModel.create(newHandData);
    return newHand;
  };

  static findByAlph = async (alphabet) =>{
    const newHand = await HandModel.findByAlph({ alphabet: alphabet });
    return newHand;
  };
}

export { HandService };
