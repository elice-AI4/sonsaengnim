import { IQuizModel } from "../../models";
import { Quiz } from "../schemas/quiz";

class MongoQuizModel implements IQuizModel {
  public async findAll() {
    return await Quiz.find().lean();
  }
}

export { MongoQuizModel };
