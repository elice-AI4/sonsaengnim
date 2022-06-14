import { Hand } from "../schemas/hand";

class HandModel {
  static create = async (newHandData) => {
    const newHand = await Hand.create(newHandData);
    return newHand;
  };

  // 수화 데이터 한꺼번에 가져오기
  static findAll = async () =>{
    const newHand = await Hand.find();
    return newHand;
  };

  // 수화 데이터 알파벳별로 가져오기
  static findByAlph = async ({ alphabet }) =>{
    const newHand = await Hand.find({ alphabet: alphabet });
    return newHand;
  };
  
  static update = async ({ id, toUpdate }) =>{
    const newHand = await Hand.findOneAndUpdate({ filter: id, update: { $set: toUpdate }});
    return newHand;
  }

  static delete = async ({ _id }) => {
    const result = await Hand.remove({ _id });
    return result;
  }
}

export { HandModel };
