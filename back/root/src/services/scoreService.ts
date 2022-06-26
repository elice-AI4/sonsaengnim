import { MongoScoreModel } from "../db/models/Score";
import { IScore } from "../models";

export default class ScoreService {
  constructor(private scoreModel: MongoScoreModel) {}

  async addScore(scoreData: IScore) {
    const newScore = await this.scoreModel.createScore(scoreData);
    return newScore;
  }

  async getTopten() {
    const topten = await this.scoreModel.getTopten();
    return topten;
  }
}
