import Score from "../schemas/score";
import { IScore, IScoreModel } from "../../models";
export class MongoScoreModel implements IScoreModel {
  async createScore(scoreData: IScore) {
    const existUser = await Score.find({ userId: scoreData.userId });
    let score;
    if (existUser.length !== 0) {
      const mostScored = existUser.sort().reverse()[0];
      if (mostScored.score <= scoreData.score) {
        await Score.deleteMany({ userId: scoreData.userId });
      }
    }
    score = await Score.create(scoreData);
    console.log("score: ", score);
    return score;
  }

  async getTopten() {
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
    ]).limit(10);
  }
}
