import Score from "../schemas/score";
import { IScore, IScoreModel } from "../../models";
export class MongoScoreModel implements IScoreModel {
  async createScore(scoreData: IScore) {
    const existUser = await Score.find({ userId: scoreData.userId });
    let score;
    if (existUser.length === 0) {
      score = await Score.create(scoreData);
    } else {
      const mostScored = existUser.sort().reverse()[0];
      if (mostScored.score <= scoreData.score) {
        await Score.deleteMany({ userId: scoreData.userId });
        score = await Score.create(scoreData);
      }
    }

    return score;
  }

  async getTopten() {
    // 동점자 처리 필요
    // return await Score.find().sort({ created_at: -1 }).sort({ score: -1 });
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
