import { IScore } from "./IScore";

export interface IScoreModel {
  createScore: (scoreData: IScore) => Promise<IScore>;
}
