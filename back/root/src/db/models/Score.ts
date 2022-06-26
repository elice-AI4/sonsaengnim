import Score from "../schemas/score";
import { IScore, IScoreModel } from "../../models";
export class MongoScoreModel implements IScoreModel {
  async createScore(scoreData: IScore) {
    const score = await Score.create(scoreData);
    return score;
  }
}
