import Score from "../schemas/score";
// import { MongoUserModel } from "./User";
import { IScore, IScoreModel } from "../../models";

export class MongoScoreModel implements IScoreModel {
  async createScore(scoreData: IScore) {
    const existUser = await Score.find({ username: scoreData.username });
    let score;
    if (existUser.length !== 0) {
      const mostScored = existUser.sort().reverse()[0];
      if (mostScored.score <= scoreData.score) {
        await Score.deleteMany({ username: scoreData.username });
      }
    }
    score = await Score.create(scoreData);
    // const userModel = new MongoUserModel();
    // userModel.pushScore(scoreData.userId);
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
