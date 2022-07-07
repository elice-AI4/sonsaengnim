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
    return await Score.aggregate([
      {
        $setWindowFields: {
          partitionBy: "$state",
          sortBy: { score: -1 },
          output: {
            rank: {
              $rank: {},
            },
          },
        },
      },
      { $sort: { score: -1, time: 1 } },
    ]).limit(10);
  }
}
