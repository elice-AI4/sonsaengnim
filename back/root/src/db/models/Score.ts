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
    // let add = 0;
    // for (let i = 0; i < 9; i++) {
    //   console.log(scores[i].score, scores[i].score);
    //   if (scores[i].score >= scores[i + 1].score) {
    //     console.log(i);
    //     console.log(scores[i].rank, scores[i + 1].rank);
    //     console.log("add: ", add);
    //     scores[i + 1].rank += add;
    //     add++;
    //   } else {
    //     add = 0;
    //   }
    // }
    return scores;
    // return await Score.aggregate([
    //   { $sort: { score: -1, time: 1 } },
    //   {
    //     $group: {
    //       _id: "$score",
    //       items: { $push: "$$ROOT" },
    //     },
    //   },
    //   { $unwind: { path: "$items", includeArrayIndex: "items.rank" } },
    //   { $replaceRoot: { newRoot: "$items" } },
    //   { $sort: { score: -1, time: 1 } },
    // ]);
  }
}
