import Score from "../schemas/score";
import { IScore, IScoreModel } from "../../models";

export class MongoScoreModel implements IScoreModel {
  public async createScore(scoreData: IScore) {
    const existUser = await Score.find({ username: scoreData.username });
    let score;
    if (existUser.length !== 0) {
      const mostScored = existUser.sort().reverse()[0];
      if (mostScored.score <= scoreData.score) {
        await Score.deleteMany({ username: scoreData.username });
      }
    }
    score = await Score.create(scoreData);
    return score;
  }

  public async getTopten() {
    let scores = await Score.aggregate([{ $sort: { score: -1, time: 1 } }, { $addFields: { rank: 0 } }]);
    let result = [];
    if (scores.length === 0) {
      return result;
    }
    scores[0].rank = 1;
    result.push(scores[0]);
    for (let i = 1, add = 1; i < scores.length; i++) {
      if (scores[i].score == scores[i - 1].score) {
        if (scores[i].time == scores[i - 1].time) {
          add++;
          scores[i].rank = scores[i - 1].rank;
        } else {
          scores[i].rank = scores[i - 1].rank + add;
          add = 1;
        }
      } else {
        scores[i].rank = scores[i - 1].rank + add;
        add = 1;
      }
      result.push(scores[i]);
      if (i == 10) break;
    }
    return result;
  }
}
