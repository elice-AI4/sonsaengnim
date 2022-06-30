import { MongoQuizModel } from "../db";

export class QuizService {
  constructor(private quizModel: MongoQuizModel) {}

  public async getAll() {
    return await this.quizModel.findAll();
  }
}
