import { IScore } from "../models/interfaces/IScore";

const getToptenScores = (newScore: IScore, req) => {
  let topten = [];
  topten.push(newScore);
  for (let key in req.body) {
    // eslint-disable-next-line no-prototype-builtins
    if (req.body.hasOwnProperty(key)) {
      let score = req.body[key];
      // console.log(score["score"]);
      topten.push(score);
    }
  }

  topten
    .sort((a: IScore, b: IScore) => {
      return b.score - a.score;
    })
    .map((a: IScore, rank: number) => {
      a.rank = rank + 1;
      rank++;
    });

  // 동점자 처리
  for (let i = 0, add = 1; i < topten.length - 1; i++) {
    console.log(topten[i]);
    if (topten[i].score === topten[i + 1].score) {
      topten[i + 1].rank = topten[i].rank;
      add++;
      console.log("topten[i + 1]:", topten[i + 1], "add: ", add);
    } else {
      topten[i + 1].rank = topten[i].rank + add;
      add = 1;
    }
    console.log("\n");
  }
  topten.pop();
  console.log(topten);

  return topten;
};

export { getToptenScores };
