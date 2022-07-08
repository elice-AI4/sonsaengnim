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
    let scores = await Score.aggregate([
      {
        $setWindowFields: {
          partitionBy: "$score",
          sortBy: { time: 1 },
          output: {
            rank: {
              $rank: {},
            },
          },
        },
      },
      { $sort: { score: -1, time: 1 } },
      { $limit: 10 },
    ]);
    let max = 0;
    for (let i = 1; i < 10; i++) {
      console.log("i: ", i);
      if (scores[i - 1].score !== scores[i].score) {
        console.log(scores[i].score, scores[i + 1].score);
        max = scores[i - 1].rank;
        console.log(max);
      } else {
        console.log("else: ", max);
        scores[i - 1].rank += max;
      }
    }
    return scores;
  }
}
