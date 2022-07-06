import { MongoScoreModel } from "../db";
import { IScore } from "../models";

export class ScoreService {
  constructor(private scoreModel: MongoScoreModel) {}

  public async addScore(scoreData: IScore) {
    const newScore = await this.scoreModel.createScore(scoreData);
    return newScore;
  }

  public async getTopten() {
    const topten = await this.scoreModel.getTopten();
    return topten;
  }
}
